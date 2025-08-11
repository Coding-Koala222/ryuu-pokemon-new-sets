import { TrainerCard, TrainerType } from '@ptcg/common';

export class SuperiorEnergyRetrieval extends TrainerCard {
  public trainerType: TrainerType = TrainerType.ITEM;
  public set = 'PAL';
  public name = 'Superior Energy Retrieval';
  public fullName = 'Superior Energy Retrieval PAL 189';
  public text = 'You can use this card only if you discard 2 other cards from your hand. Put up to 4 basic Energy cards from your discard pile into your hand. (You can’t use this card if you have fewer than 2 other cards in your hand.)';
}