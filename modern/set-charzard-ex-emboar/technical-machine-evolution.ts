import { TrainerCard, TrainerType } from '@ptcg/common';

export class TechnicalMachineEvolution extends TrainerCard {
  public trainerType: TrainerType = TrainerType.TECHNICAL_MACHINE;
  public set = 'PAR';
  public name = 'Technical Machine: Evolution';
  public fullName = 'Technical Machine: Evolution PAR 178';
  public text = 'The Pokémon this card is attached to can use the attack on this card (Evolution). (You still need the necessary Energy to use this attack.) [C] Evolution: Choose up to 2 of your Benched Pokémon. For each of those Pokémon, search your deck for a card that evolves from that Pokémon and put it onto that Pokémon to evolve it. Then, shuffle your deck.';
}