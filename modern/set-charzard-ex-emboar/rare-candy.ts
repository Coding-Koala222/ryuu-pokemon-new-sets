import { TrainerCard, TrainerType } from '@ptcg/common';

export class RareCandy extends TrainerCard {
  public trainerType: TrainerType = TrainerType.ITEM;
  public set = 'SVI';
  public name = 'Rare Candy';
  public fullName = 'Rare Candy SVI 191';
  public text = 'Choose 1 of your Basic Pokémon in play. If you have a Stage 2 card in your hand that evolves from that Pokémon, put that card onto the Basic Pokémon to evolve it. You can’t use this card during your first turn or on a Basic Pokémon that was put into play this turn.';
}