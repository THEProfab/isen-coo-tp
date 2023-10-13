import { Beer } from "../../domain/entity/Beer";
import { BeerRepository } from "../../domain/repository/BeerRepository";

export type GetAllBeersDependencies = {
  beerRepository: BeerRepository;
};

export async function getAllBeers(deps: GetAllBeersDependencies): Promise<Beer[]> {
  return await deps.beerRepository.getAllBeers();
}
