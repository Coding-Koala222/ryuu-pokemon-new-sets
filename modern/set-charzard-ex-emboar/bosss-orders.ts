import { TrainerCard, TrainerType } from '@ptcg/common';

export class BosssOrders extends TrainerCard {
  public trainerType: TrainerType = TrainerType.SUPPORTER;
  public set = 'PAL';
  public name = 'Boss\'s Orders';
  public fullName = 'Boss\'s Orders PAL 172';
  public text = 'Switch 1 of your opponent’s Benched Pokémon with their Active Pokémon.';
}