import { TrainerCard, TrainerType } from '@ptcg/common';

export class TeamRocketsVentureBomb extends TrainerCard {
  public trainerType: TrainerType = TrainerType.ITEM;
  public set = 'DRI';
  public name = 'Team Rocket\'s Venture Bomb';
  public fullName = 'Team Rocket\'s Venture Bomb DRI 179';
  public text = 'Flip a coin. If heads, attach this card to 1 of your Pokémon as a Pokémon Tool card. If tails, discard it. If the Pokémon this card is attached to is Knocked Out, your opponent takes 1 more Prize card.';
}