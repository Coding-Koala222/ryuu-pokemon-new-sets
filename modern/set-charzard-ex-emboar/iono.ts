import { TrainerCard, TrainerType } from '@ptcg/common';

export class Iono extends TrainerCard {
  public trainerType: TrainerType = TrainerType.SUPPORTER;
  public set = 'PAL';
  public name = 'Iono';
  public fullName = 'Iono PAL 185';
  public text = 'Each player shuffles their hand and puts it on the bottom of their deck. Then, each player draws a card for each of their remaining Prize cards.';
}