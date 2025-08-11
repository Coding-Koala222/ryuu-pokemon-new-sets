import { TrainerCard, TrainerType } from '@ptcg/common';

export class BuddyBuddyPoffin extends TrainerCard {
  public trainerType: TrainerType = TrainerType.ITEM;
  public set = 'TEF';
  public name = 'Buddy-Buddy Poffin';
  public fullName = 'Buddy-Buddy Poffin TEF 144';
  public text = 'Search your deck for up to 2 Basic Pokémon with 70 HP or less, reveal them, and put them into your hand. Then, shuffle your deck.';
}