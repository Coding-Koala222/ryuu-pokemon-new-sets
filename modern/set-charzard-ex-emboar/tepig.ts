import { PokemonCard, CardType, Stage } from '@ptcg/common';

export class Tepig extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public cardTypes = [CardType.FIRE];
  public hp = 70;
  public set = 'WHT';
  public name = 'Tepig';
  public fullName = 'Tepig WHT 11';

  public attacks = [
    {
      name: 'Rollout',
      cost: [CardType.COLORLESS],
      damage: '10',
      text: ''
    },
    {
      name: 'Flare',
      cost: [CardType.FIRE, CardType.COLORLESS],
      damage: '30',
      text: ''
    }
  ];

  public weakness = [
    { type: CardType.WATER }
  ];
  public retreat = [CardType.COLORLESS];
}