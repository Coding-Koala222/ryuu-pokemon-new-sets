import { TrainerCard, TrainerType } from '@ptcg/common';

export class EnergyRetrieval extends TrainerCard {
  public trainerType: TrainerType = TrainerType.ITEM;
  public set = 'SVI';
  public name = 'Energy Retrieval';
  public fullName = 'Energy Retrieval SVI 171';
  public text = 'Put up to 2 basic Energy cards from your discard pile into your hand.';
}