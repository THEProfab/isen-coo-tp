import { TastedBeerStats } from "../../domain/entity/TastedBeerStats";
import { TastedBeerRepository } from "../../domain/repository/TastedBeerRepository";

export type TastedBeersStatsDependencies = {
  tastedBeerRepository: TastedBeerRepository;
};

export async function getTastedBeersStats(deps: TastedBeersStatsDependencies): Promise<TastedBeerStats> {
  return await deps.tastedBeerRepository.getTastedBeersStats();
}
