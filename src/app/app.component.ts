import { Component } from '@angular/core';
import { WkoService } from './wko.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'companions';

  constructor(private wko: WkoService) { }

  async loadCompanies(onlyRemembered: boolean, zeroInteractions: boolean) {
    this.wko.getCompaniesGlobal(onlyRemembered, zeroInteractions);
  }

  lastRequestAmount: number = 0;
  async fetchCompaniesAmountFromWko() {
    this.wko.getCompaniesAmountFromWko()
      .toPromise()
      .then(res => {
        this.lastRequestAmount = res;
      })
      .catch(error => console.log(error));
  }

  async fetchCompaniesFromWko() {
    this.wko.fetchCompaniesFromWko()
      .toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }
}