export class WkoTreeItem {
  constructor(wkoId: number, name: string, parent: WkoTreeItem, children: WkoTreeItem[]) {
    this.wkoId = wkoId;
    this.name = name;
    this.parent = parent;
    this.children = children;
  }
  wkoId: number;
  name: string;
  parent: WkoTreeItem;
  children: WkoTreeItem[];
}
