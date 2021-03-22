import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WkoCompany } from '../entities/wkocompany.entity';
import { WkoCompanyInteraction } from '../entities/wkocompanyinteraction.entity';
import { WkoService } from '../wko.service';

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.less']
})
export class CompanydetailComponent implements OnInit {

  constructor(private wko: WkoService) { 
  }

  company$: Observable<WkoCompany> = this.wko.getCurrentCompanyObservable();
  interactions$: Observable<WkoCompanyInteraction[]> = this.wko.getCurrentCompanyInteractionsObservable();

  interactionModel = new WkoCompanyInteraction(1, new Date(), '', '1');

  async saveInteraction() {
    await this.wko.saveInteraction(this.interactionModel).toPromise();
  }

  async updateCurrentCompany() {
    // console.log("blub");
    var company = this.wko.getCurrentCompany();
    // console.log(JSON.stringify(company));
    await this.wko.saveCompany(company).toPromise();
  }

  ngOnInit(): void {
    this.company$.subscribe(c => this.interactionModel.companyId = c.id);

  }

}
