import { Beer } from "../entity/Beer";

export interface BeerRepository {
  getAllBeers(): Promise<Beer[]>;
}
