import { Beer } from "../../domain/entity/Beer";
import { TastedBeerRepository } from "../../domain/repository/TastedBeerRepository";

export type GetTastedBeersDependencies = {
  tastedBeerRepository: TastedBeerRepository;
};

export async function getAllTastedBeers(deps: GetTastedBeersDependencies): Promise<Beer[]> {
  return await deps.tastedBeerRepository.getAllTastedBeers();
}
