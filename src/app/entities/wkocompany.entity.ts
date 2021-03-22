import { WkoCategory } from "./wkocategory.entity";
import { WkoLocation } from "./wkolocation.entity";

export class WkoCompany {
  constructor(public id: string,
    public name: string,
    public wkoLink: string,
    public street: string,
    public zip: string,
    public locality: string,
    public phone: string,
    public email: string,
    public web: string,
    public createdAt: Date,
    public updatedAt: Date,
    public remember: boolean,
    public categories: WkoCategory[],
    public locations: WkoLocation[]) {
  }
}
