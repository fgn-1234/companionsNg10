export class WkoCategory {
  constructor(
    public wkoId: number,
    public name: string,
    public parentCategory: WkoCategory,
    public childCategories: WkoCategory[]) {
  }
}

