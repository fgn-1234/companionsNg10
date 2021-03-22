export class TreeEntity {
  constructor(id: number, wkoId: number, name: string, parent: TreeEntity, children: TreeEntity[]) {
    this.id = id;
    this.wkoId = wkoId;
    this.name = name;
    this.parent = parent;
    this.children = children;
  }
  id: number;
  wkoId: number;
  name: string;
  parent: TreeEntity;
  children: TreeEntity[];
}