import { TastedBeer } from "../../domain/entity/TastedBeer";
import { BeerRepository } from "../../domain/repository/BeerRepository";
import { TastedBeerRepository } from "../../domain/repository/TastedBeerRepository";

export type AddTastedBeerDependencies = {
  beerRepository: BeerRepository;
  tastedBeerRepository: TastedBeerRepository;
};

export async function addTastedBeer(deps: AddTastedBeerDependencies, id: number): Promise<boolean> {
  const beer = await deps.beerRepository.getBeer(id);

  if (beer) {
    const beerToAdd = new TastedBeer(beer);
    beerToAdd.description = beer.description;
    beerToAdd.image_url = beer.image_url;
    beerToAdd.abv = beer.abv;
    beerToAdd.ibu = beer.ibu;
    beerToAdd.color = beer.color;

    await deps.tastedBeerRepository.addTastedBeer(beerToAdd);
    return true;
  }

  return false;
}
