import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WkoCategory } from '../entities/wkocategory.entity';
import { WkoCompany } from '../entities/wkocompany.entity';
import { WkoLocation } from '../entities/wkolocation.entity';
import { WkoService } from '../wko.service';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.less']
})
export class CompanylistComponent implements OnInit {

  constructor(private wko: WkoService) {
  }

  companies$: Observable<WkoCompany[]> = this.wko.getCurrentCompaniesObservable();

  filteredCompanies$: Observable<WkoCompany[]> = this.getFilteredCompanies();

  companyFilterText = "";

  onFilterTextEnter() {
    this.filteredCompanies$ = this.getFilteredCompanies();
  }

  getFilteredCompanies() {
    return this.companies$
      .pipe(map(companies => {
        console.log("blubub");
        var result = companies;
        for (let filterword of this.companyFilterText.split(" ").filter(e => e)) {
          if (filterword[0] === "!")
            result = result.filter(c => c.name.indexOf(filterword.substring(1)) == -1);
          else
            result = result.filter(c => c.name.indexOf(filterword) > -1);
        }
        return result;
      }));
  }

  getLocationsString(locations: WkoLocation[]) {
    return locations.map(e => e.name).join();
  }

  getCategoriesString(categories: WkoCategory[]) {
    return categories.map(e => e.name).join();
  }

  showInfo(companyId: string) {
    console.log("clicked info " + companyId);
    this.wko.setSelectedCompany(companyId);
  }

  ngOnInit(): void {
    // this.wko.getCategories().toPromise().then(c => this.categories = c);
  }

}
