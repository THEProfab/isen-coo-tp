import { TastedBeer } from "../entity/TastedBeer";
import { TastedBeerStats } from "../entity/TastedBeerStats";

export interface TastedBeerRepository {
  getAllTastedBeers(): Promise<TastedBeer[]>;
  addTastedBeer(beer: TastedBeer): Promise<void>;
  setBeerLikedOpinionOnTastedBeer(id: number, hasBeenLiked: boolean): Promise<void>;
  getTastedBeersStats(): Promise<TastedBeerStats>;
}
