import {
  Effect,
  GameError,
  GameMessage,
  State,
  StoreLike,
  PokemonCard,
  CardType,
  Stage,
  PowerEffect,
  AttackEffect,
  PlayerType,
  StateUtils,
} from '@ptcg/common';

export class Charmeleon extends PokemonCard {
  public stage: Stage = Stage.STAGE_1;
  public evolvesFrom = 'Charmander';
  public cardTypes = [CardType.FIRE];
  public hp = 90;
  public set = 'PAF';
  public name = 'Charmeleon';
  public fullName = 'Charmeleon PAF 8';

  public powers = [
    {
      name: 'Flare Veil',
      text: 'Prevent all effects of attacks used by your opponent\'s Pokémon done to this Pokémon. (Damage is not an effect.)'
    }
  ];

  public attacks = [
    {
      name: 'Flare',
      cost: [CardType.FIRE, CardType.COLORLESS],
      damage: '40',
      text: ''
    },
    {
      name: 'Heat Blast',
      cost: [CardType.FIRE, CardType.FIRE, CardType.COLORLESS],
      damage: '90',
      text: ''
    }
  ];

  public weakness = [
    { type: CardType.WATER }
  ];
  public retreat = [CardType.COLORLESS];

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    // Ability: Flare Veil — block non-damage effects of attacks from opponent's Pokémon to this Charmeleon
    if (
      effect instanceof AttackEffect &&
      effect.target === this &&
      effect.player !== StateUtils.findOwner(state, effect.target) && // from opponent
      effect.effectType !== 'DAMAGE'
    ) {
      // Block the effect; damage is not an effect, so only block other effects.
      throw new GameError(GameMessage.BLOCKED_BY_ABILITY);
    }
    return state;
  }
}