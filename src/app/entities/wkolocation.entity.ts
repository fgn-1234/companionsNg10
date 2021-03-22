export class WkoLocation {
  constructor(public wkoId: number,
    public name: string,
    public parentLocation: WkoLocation,
    public childLocations: WkoLocation[]) {
  }
}

