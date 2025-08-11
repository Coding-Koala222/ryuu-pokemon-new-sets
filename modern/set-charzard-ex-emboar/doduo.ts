import { PokemonCard, CardType, Stage } from '@ptcg/common';

export class Doduo extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public cardTypes = [CardType.COLORLESS];
  public hp = 60;
  public set = 'MEW';
  public name = 'Doduo';
  public fullName = 'Doduo MEW 84';

  public attacks = [
    {
      name: 'Peck',
      cost: [CardType.COLORLESS],
      damage: '10',
      text: ''
    }
  ];

  public weakness = [
    { type: CardType.LIGHTNING }
  ];
  public retreat = [CardType.COLORLESS];
}