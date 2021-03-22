import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList, MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { WkoService } from './wko.service';
import { CompanylistComponent } from './companylist/companylist.component';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { FormsModule } from '@angular/forms';
import { WkoCategorySelectionV2Component } from './wko-category-selection-v2/wko-category-selection-v2.component';
import { TreeviewModule } from 'ngx-treeview';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WkoLocationSelectionV2Component } from './wko-location-selection-v2/wko-location-selection-v2.component';

// import { DisabledOnSelectorDirective } from './disabled-on-selector.directive';

@NgModule({
  declarations: [
    AppComponent,
    CompanylistComponent,
    CompanydetailComponent,
    WkoCategorySelectionV2Component,
    WkoLocationSelectionV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, BrowserAnimationsModule,
    MatTreeModule, MatIconModule, MatListModule, MatExpansionModule,
    FormsModule,
    TreeviewModule.forRoot(),
    NgbModule
  ],
  providers: [WkoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
