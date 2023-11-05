import { BeerColorIntensity } from "./Beer";
import { TastedBeer } from "./TastedBeer";

export type TastedBeerStatsDependencies = {
  percentageLikedByTastedRatio: number;
  averageABV: number;
  threeBitterestTastedBeers: TastedBeer[];
  favouriteBeerColour: BeerColorIntensity;
};

export class TastedBeerStats {
  public percentageLikedByTastedRatio: number;
  public averageABV: number;
  public threeBitterestTastedBeers: TastedBeer[];
  public favouriteBeerColour: BeerColorIntensity;

  constructor({
    percentageLikedByTastedRatio,
    averageABV,
    threeBitterestTastedBeers,
    favouriteBeerColour,
  }: TastedBeerStatsDependencies) {
    this.percentageLikedByTastedRatio = percentageLikedByTastedRatio;
    this.averageABV = averageABV;
    this.threeBitterestTastedBeers = threeBitterestTastedBeers;
    this.favouriteBeerColour = favouriteBeerColour;
  }
}
