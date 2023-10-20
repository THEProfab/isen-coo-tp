import { Beer, BeerDependencies } from "./Beer";

export class TastedBeer extends Beer {
  public hasBeenLiked: boolean = false;

  constructor(deps: BeerDependencies) {
    super(deps);
  }
}
