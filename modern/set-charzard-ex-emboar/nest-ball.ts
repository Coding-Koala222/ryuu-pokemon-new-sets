import { TrainerCard, TrainerType } from '@ptcg/common';

export class NestBall extends TrainerCard {
  public trainerType: TrainerType = TrainerType.ITEM;
  public set = 'SVI';
  public name = 'Nest Ball';
  public fullName = 'Nest Ball SVI 181';
  public text = 'Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck.';
}