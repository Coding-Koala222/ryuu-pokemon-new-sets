import { TrainerCard, TrainerType } from '@ptcg/common';

export class Mela extends TrainerCard {
  public trainerType: TrainerType = TrainerType.SUPPORTER;
  public set = 'PAR';
  public name = 'Mela';
  public fullName = 'Mela PAR 167';
  public text = 'You can play this card only if any of your Pokémon were Knocked Out during your opponent’s last turn. Attach a basic Energy card from your discard pile to 1 of your Pokémon.';
}