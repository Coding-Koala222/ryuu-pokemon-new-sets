import { TrainerCard, TrainerType } from '@ptcg/common';

export class Switch extends TrainerCard {
  public trainerType: TrainerType = TrainerType.ITEM;
  public set = 'SVI';
  public name = 'Switch';
  public fullName = 'Switch SVI 194';
  public text = 'Switch your Active Pokémon with 1 of your Benched Pokémon.';
}