import { PokemonCard, CardType, Stage } from '@ptcg/common';

export class Charmander extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public cardTypes = [CardType.FIRE];
  public hp = 70;
  public set = 'MEW';
  public name = 'Charmander';
  public fullName = 'Charmander MEW 4';

  public attacks = [
    {
      name: 'Singed',
      cost: [CardType.FIRE],
      damage: '',
      text: 'Your opponent\'s Active Pokémon is now Burned.'
    },
    {
      name: 'Reckless Charge',
      cost: [CardType.FIRE, CardType.COLORLESS],
      damage: '30',
      text: 'This Pokémon also does 10 damage to itself.'
    }
  ];

  public weakness = [
    { type: CardType.WATER }
  ];

  public retreat = [CardType.COLORLESS];
}