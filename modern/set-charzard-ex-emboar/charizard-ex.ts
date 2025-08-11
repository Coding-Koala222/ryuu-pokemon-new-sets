import { PokemonCard, CardType, Stage, CardTag } from '@ptcg/common';

export class CharizardEx extends PokemonCard {
  public tags = [CardTag.POKEMON_EX];
  public stage: Stage = Stage.STAGE_2;
  public evolvesFrom = 'Charmeleon';
  public cardTypes = [CardType.FIRE];
  public hp = 330;
  public set = 'MEW';
  public name = 'Charizard ex';
  public fullName = 'Charizard ex MEW 6';

  public attacks = [
    {
      name: 'Explosive Vortex',
      cost: [CardType.FIRE, CardType.FIRE, CardType.COLORLESS],
      damage: '330',
      text: 'Discard 3 Energy from this Pokémon.'
    },
    {
      name: 'Wild Blaze',
      cost: [CardType.FIRE, CardType.FIRE, CardType.COLORLESS, CardType.COLORLESS],
      damage: '160',
      text: 'Discard the top 3 cards of your deck.'
    }
  ];

  public weakness = [
    { type: CardType.WATER }
  ];
  public retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];
}