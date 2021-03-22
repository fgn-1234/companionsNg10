export class WkoCompanyInteraction {
  constructor(
    public id: number, 
    public createdAt: Date,
    public text: string, 
    public companyId: string) {
  }
}