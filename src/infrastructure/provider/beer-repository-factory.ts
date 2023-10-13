import { PunkAPIBeerRepository } from "./punk-api/punk-api-beer-repository";

export function makeBeerRepository() {
  return new PunkAPIBeerRepository();
}
