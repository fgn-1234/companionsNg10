import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WkoTreeItem } from './entities/wkoTreeItem.entity';
import { map } from 'rxjs/operators';
import { WkoCompany } from './entities/wkocompany.entity';
import { TreeEntity } from './entities/treeentity.entity';
import { WkoCompanyInteraction } from './entities/wkocompanyinteraction.entity';

interface WkoCompanyResponse {
  loadingHistory: string[];
  companies: WkoCompany[];
}

const postOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WkoService {
  backendAddress = 'http://10.0.0.60:3000/';

  private categoriesFlattened: WkoTreeItem[] = [];
  private _currentCategories: BehaviorSubject<WkoTreeItem[]> = new BehaviorSubject<WkoTreeItem[]>([]);

  private locationsFlattened: WkoTreeItem[] = [];
  private _currentLocations: BehaviorSubject<WkoTreeItem[]> = new BehaviorSubject<WkoTreeItem[]>([]);

  private _currentCompanies: BehaviorSubject<WkoCompany[]> = new BehaviorSubject<WkoCompany[]>([]);
  private _currentCompany: BehaviorSubject<WkoCompany> = new BehaviorSubject<WkoCompany>(WkoCompany.prototype);

  private _currentCompanyInteractions: BehaviorSubject<WkoCompanyInteraction[]> = new BehaviorSubject<WkoCompanyInteraction[]>([]);

  constructor(private http: HttpClient) { }

  getLocations(): Observable<WkoTreeItem[]> {
    var $locations = this.http.get<TreeEntity[]>(this.backendAddress + 'wko/locations')
      .pipe(map(l => this.mapTreeItems(l, WkoTreeItem.prototype)));
    $locations.subscribe(locations => this.locationsFlattened = this.flattenTreeItems(locations));
    return $locations;
  }

  getCategories(): Observable<WkoTreeItem[]> {
    var $categories = this.http.get<TreeEntity[]>(this.backendAddress + 'wko/categories')
      .pipe(map(l => this.mapTreeItems(l, WkoTreeItem.prototype)));
    $categories.subscribe(categories => this.categoriesFlattened = this.flattenTreeItems(categories));
    return $categories;
  }

  getCompanies(locations: number[], categories: number[], onlyRemembered: boolean, zeroInterations: boolean): Observable<WkoCompanyResponse> {
    var args = 'locations=' + locations.join() + '&categories=' + categories.join() + '&onlyRemembered=' + onlyRemembered + '&zeroInteractions=' + zeroInterations;
    return this.http.get<WkoCompanyResponse>(this.backendAddress + 'wko/companies?' + args);
  }

  getCompanyInteractions(companyId: string): Observable<WkoCompanyInteraction[]> {
    var args = 'companyId=' + companyId;
    return this.http.get<WkoCompanyInteraction[]>(this.backendAddress + 'wko/interactions?' + args);
  }

  getCompaniesGlobal(onlyRemembered: boolean, zeroInterations: boolean): void {
    this.getCompanies(
      this._currentLocations.getValue().map(t => t.wkoId),
      this._currentCategories.getValue().map(t => t.wkoId),
      onlyRemembered,
      zeroInterations)
      .subscribe(
        res => {
          this._currentCompanies.next(res.companies);
        },
        err => console.log("Error retrieving companies")
      );
  }

  getCompanyInteractionsGlobal(companyId: string): void {
    this.getCompanyInteractions(companyId).subscribe(
      res => {
        this._currentCompanyInteractions.next(res.sort((a, b) => b.id - a.id));
      },
      err => console.log("Error retrieving interactions")
    )
  }

  getCurrentCompaniesObservable(): Observable<WkoCompany[]> {
    return this._currentCompanies.asObservable();
  }

  getCurrentCompanyObservable(): Observable<WkoCompany> {
    return this._currentCompany.asObservable();
  }

  getCurrentCompany(): WkoCompany {
    return this._currentCompany.value;
  }

  getCurrentCompanyInteractionsObservable(): Observable<WkoCompanyInteraction[]> {
    return this._currentCompanyInteractions.asObservable();
  }

  setSelectedCompany(companyId: string): void {
    var company = this._currentCompanies.getValue().find(c => c.id == companyId);
    if (company !== undefined) {
      this._currentCompany.next(company);
      this.getCompanyInteractionsGlobal(companyId);
    }
  }

  setSelectedCategories(categoryIds: number[]): void {
    var treeItems = this.categoriesFlattened.filter(t => categoryIds.indexOf(t.wkoId) > -1);
    this._currentCategories.next(treeItems);
  }

  setSelectedLocations(locations: number[]): void {
    var treeItems = this.locationsFlattened.filter(c => locations.indexOf(c.wkoId) > -1);
    this._currentLocations.next(treeItems);
  }

  fetchCompaniesFromWko(): Observable<boolean> {
    var locations = this._currentLocations.getValue().map(t => t.wkoId);
    var categories = this._currentCategories.getValue().map(t => t.wkoId);
    var args = 'locations=' + locations.join() + '&categories=' + categories.join();
    return this.http.post<boolean>(this.backendAddress + 'wko/fetchCompanies?' + args, {});
  }

  getCompaniesAmountFromWko(): Observable<number> {
    var locations = this._currentLocations.getValue().map(t => t.wkoId);
    var categories = this._currentCategories.getValue().map(t => t.wkoId);
    var args = 'locations=' + locations.join() + '&categories=' + categories.join();
    return this.http.get<number>(this.backendAddress + 'wko/companiesAmount?' + args);
  }

  saveInteraction(interaction: WkoCompanyInteraction): Observable<void> {
    console.log("clicked: " + JSON.stringify(interaction));
    return this.http.post<void>(this.backendAddress + 'wko/addInteraction', JSON.stringify(interaction), postOptions);
  }

  saveCompany(company: WkoCompany): Observable<void> {
    // console.log("cliceked");
    // console.log(JSON.stringify(company));
    return this.http.post<void>(this.backendAddress + 'wko/updateCompany', JSON.stringify(company), postOptions);
  }

  // treeItemshelper
  mapTreeItems(entities: TreeEntity[], parent: WkoTreeItem): WkoTreeItem[] {
    return entities.map(e => {
      var result: WkoTreeItem = (
        {
          wkoId: e.wkoId,
          name: e.name,
          parent: parent,
          children: []
        });
      var children = this.mapTreeItems(e.children, result);
      result.children = children;
      return result;
    });
  }

  flattenTreeItems(treeItems: WkoTreeItem[]): WkoTreeItem[] {
    var result: WkoTreeItem[] = [];

    // take current level 
    treeItems.forEach(t => result.push(t));
    // select all children and call again
    var allChildren = [].concat.apply([], treeItems.map(t => t.children));
    if (allChildren.length)
      this.flattenTreeItems(allChildren).forEach(t => result.push(t));

    return result;
  }
}
