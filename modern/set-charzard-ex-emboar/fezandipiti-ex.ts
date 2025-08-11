import {
  Effect,
  GameError,
  GameMessage,
  State,
  StoreLike,
  PokemonCard,
  AttackEffect,
  CardTag,
  CardType,
  Stage,
  SpecialCondition,
  AddSpecialConditionsEffect,
  PlayerType,
  StateUtils,
  AbilityEffect,
} from '@ptcg/common';

export class FezandipitiEx extends PokemonCard {
  public tags = [CardTag.POKEMON_EX];
  public stage: Stage = Stage.BASIC;
  public cardTypes = [CardType.PSYCHIC];
  public hp = 140;
  public set = 'SFA';
  public name = 'Fezandipiti ex';
  public fullName = 'Fezandipiti ex SFA 38';

  public powers = [
    {
      name: 'Flip the Script',
      text: 'Once during your turn, if any of your Pokémon were Knocked Out during your opponent\'s last turn, you may draw 3 cards. You can\'t use more than 1 Flip the Script Ability each turn.',
    }
  ];

  public attacks = [
    {
      name: 'Toxic Shot',
      cost: [CardType.PSYCHIC, CardType.COLORLESS],
      damage: '70',
      text: 'Your opponent\'s Active Pokémon is now Poisoned.'
    },
    {
      name: 'Brave Wing',
      cost: [CardType.PSYCHIC, CardType.COLORLESS, CardType.COLORLESS],
      damage: '120',
      text: 'If this Pokémon has any damage counters on it, this attack does 120 more damage.'
    }
  ];

  public weakness = [
    { type: CardType.DARK }
  ];
  public retreat = [CardType.COLORLESS];

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    // Toxic Shot attack: poison the opponent's Active Pokémon.
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const specialConditionEffect = new AddSpecialConditionsEffect(effect, [SpecialCondition.POISONED]);
      store.reduceEffect(state, specialConditionEffect);
    }

    // Ability: Flip the Script
    if (effect instanceof AbilityEffect && effect.ability === this.powers[0]) {
      const player = effect.player;
      // Once per turn: you must track usage, usually with a custom marker in state
      if (state.effectFlags && state.effectFlags.fezaFlipTheScriptUsed) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }
      // Check if any of player's Pokémon were Knocked Out during opponent's last turn
      // This usually requires a marker in state, e.g. state.lastTurnKnockouts[player.id] = true
      if (!state.effectFlags || !state.effectFlags.fezaPokemonKnockedOutLastTurn) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      player.deck.moveTo(player.hand, 3);

      // Mark this ability as used for the turn
      state.effectFlags = state.effectFlags || {};
      state.effectFlags.fezaFlipTheScriptUsed = true;
    }

    return state;
  }
}