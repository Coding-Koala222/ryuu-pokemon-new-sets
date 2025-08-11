import { CardType, EnergyCard } from '@ptcg/common';

export class BasicFireEnergy extends EnergyCard {
  public provides: CardType[] = [CardType.FIRE];
  public set: string = 'SVE';
  public name = 'Basic Fire Energy';
  public fullName = 'Basic Fire Energy SVE 10';
}