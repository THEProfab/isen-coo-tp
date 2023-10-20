import { TastedBeer } from "../entity/TastedBeer";

export interface TastedBeerRepository {
  getAllTastedBeers(): Promise<TastedBeer[]>;
  addTastedBeer(beer: TastedBeer): Promise<void>;
  setBeerLikedOpinionOnTastedBeer(id: number, hasBeenLiked: boolean): Promise<void>;
}
