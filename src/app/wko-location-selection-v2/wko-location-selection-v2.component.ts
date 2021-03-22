import { Component, OnInit } from '@angular/core';
import { WkoCategorySelectionV2Component } from '../wko-category-selection-v2/wko-category-selection-v2.component';

@Component({
  selector: 'app-wko-location-selection-v2',
  templateUrl: '../wko-category-selection-v2/wko-category-selection-v2.component.html',
  styleUrls: [
    './wko-location-selection-v2.component.less',
    '../wko-category-selection-v2/wko-category-selection-v2.component.less'
  ]
})
export class WkoLocationSelectionV2Component extends WkoCategorySelectionV2Component {

  loadData() {
    this.wko.getLocations()
      .subscribe((locations) => {
        this.items = this.convertToTreeviewItems(locations);
      });
  }
  
  updateGlobalValues(values: number[]) {
    this.wko.setSelectedLocations(values);
  }

}
