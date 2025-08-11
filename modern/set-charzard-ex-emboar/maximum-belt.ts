import { TrainerCard, TrainerType } from '@ptcg/common';

export class MaximumBelt extends TrainerCard {
  public trainerType: TrainerType = TrainerType.POKEMON_TOOL;
  public set = 'TEF';
  public name = 'Maximum Belt';
  public fullName = 'Maximum Belt TEF 154';
  public text = 'The attacks of the Pokémon this card is attached to do 50 more damage to your opponent’s Active Pokémon ex and Pokémon V (before applying Weakness and Resistance).';
}