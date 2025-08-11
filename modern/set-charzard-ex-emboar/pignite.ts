import { PokemonCard, CardType, Stage } from '@ptcg/common';

export class Pignite extends PokemonCard {
  public stage: Stage = Stage.STAGE_1;
  public evolvesFrom = 'Tepig';
  public cardTypes = [CardType.FIRE];
  public hp = 100;
  public set = 'WHT';
  public name = 'Pignite';
  public fullName = 'Pignite WHT 12';

  public attacks = [
    {
      name: 'Flame Charge',
      cost: [CardType.FIRE],
      damage: '30',
      text: 'Search your deck for a [R] Energy card and attach it to this Pokémon. Then, shuffle your deck.'
    },
    {
      name: 'Combustion',
      cost: [CardType.FIRE, CardType.COLORLESS],
      damage: '50',
      text: ''
    }
  ];

  public weakness = [
    { type: CardType.WATER }
  ];
  public retreat = [CardType.COLORLESS, CardType.COLORLESS];
}