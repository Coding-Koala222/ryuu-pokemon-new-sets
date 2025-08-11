import { PokemonCard, CardType, Stage, CardTag } from '@ptcg/common';

export class ReshiramEx extends PokemonCard {
  public tags = [CardTag.POKEMON_EX];
  public stage: Stage = Stage.BASIC;
  public cardTypes = [CardType.FIRE];
  public hp = 180;
  public set = 'WHT';
  public name = 'Reshiram ex';
  public fullName = 'Reshiram ex WHT 20';

  public attacks = [
    {
      name: 'Blue Flare',
      cost: [CardType.FIRE, CardType.FIRE, CardType.COLORLESS],
      damage: '120',
      text: 'Discard 2 [R] Energy from this Pokémon.'
    }
  ];

  public weakness = [
    { type: CardType.WATER }
  ];
  public retreat = [CardType.COLORLESS, CardType.COLORLESS];
}