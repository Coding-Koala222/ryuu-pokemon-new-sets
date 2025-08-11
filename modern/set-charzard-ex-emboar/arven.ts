import { TrainerCard, TrainerType } from '@ptcg/common';

export class Arven extends TrainerCard {
  public trainerType: TrainerType = TrainerType.SUPPORTER;
  public set = 'SVI';
  public name = 'Arven';
  public fullName = 'Arven SVI 166';
  public text = 'Search your deck for an Item card and a Pokémon Tool card, reveal them, and put them into your hand. Then, shuffle your deck.';
}