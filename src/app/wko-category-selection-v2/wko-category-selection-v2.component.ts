import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { Component, OnInit } from '@angular/core';
import { WkoService } from '../wko.service';
import { WkoTreeItem } from '../entities/wkoTreeItem.entity';

@Component({
  selector: 'app-wko-category-selection-v2',
  templateUrl: './wko-category-selection-v2.component.html',
  styleUrls: ['./wko-category-selection-v2.component.less']
})
export class WkoCategorySelectionV2Component implements OnInit {
  // dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 300
  });

  // buttonClasses = [
  //   'btn-outline-primary',
  //   'btn-outline-secondary',
  //   'btn-outline-success',
  //   'btn-outline-danger',
  //   'btn-outline-warning',
  //   'btn-outline-info',
  //   'btn-outline-light',
  //   'btn-outline-dark'
  // ];
  // buttonClass = this.buttonClasses[0];

  constructor(
    protected wko: WkoService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  // virtual methods...
  loadData() {
    this.wko.getCategories()
      .subscribe((categories) => {
        this.items = this.convertToTreeviewItems(categories);
      });
  }

  updateGlobalValues(values: number[]) {
    this.wko.setSelectedCategories(values);
  }

  // end virtual methods

  convertToTreeviewItems(wkoTreeItems: WkoTreeItem[]): TreeviewItem[] {
    return wkoTreeItems.map(c => new TreeviewItem({
      text: c.name,
      value: c.wkoId,
      collapsed: true,
      checked: false,
      disabled: false,
      children: this.convertToTreeviewItems(c.children)
    }))
  }

  // onFilterChange(value: string): void {
  //   console.log('filter:', value);
  // }

  async updateValues(selectedValuesFromTreeview: number[]) {
    // this.values = this.items.filter(i => i.checked != false).map(i => i.value);
    this.values = this.getCheckedChildren(this.items);
    this.updateGlobalValues(this.values);
  }


  getCheckedChildren(trees: TreeviewItem[]): number[] {
    var currentLevelSelected = trees.filter(i => i.checked).map(i => i.value as number);
    var currentLevelPartiallySelected = trees
      .filter(i => i.indeterminate)
      .map(i => i.children);
    var flattenedCurrentPartiallySelected = [].concat.apply([], currentLevelPartiallySelected);
    if (currentLevelPartiallySelected.length)
      this.getCheckedChildren(flattenedCurrentPartiallySelected)
        .forEach(t => currentLevelSelected.push(t));

    return currentLevelSelected;
  }

}
