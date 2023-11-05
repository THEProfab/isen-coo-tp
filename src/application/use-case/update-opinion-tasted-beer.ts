import { TastedBeerRepository } from "../../domain/repository/TastedBeerRepository";

export type UpdateTastedBeerDependencies = {
  tastedBeerRepository: TastedBeerRepository;
};

export async function setBeerLikedOpinionOnTastedBeer(
  deps: UpdateTastedBeerDependencies,
  id: number,
  hasBeenLiked: boolean,
): Promise<void> {
  await deps.tastedBeerRepository.setBeerLikedOpinionOnTastedBeer(id, hasBeenLiked);
}
