import {
  Effect,
  GameError,
  GameMessage,
  State,
  StoreLike,
  PokemonCard,
  CardType,
  Stage,
  AbilityEffect,
} from '@ptcg/common';

export class Dodrio extends PokemonCard {
  public stage: Stage = Stage.STAGE_1;
  public evolvesFrom = 'Doduo';
  public cardTypes = [CardType.COLORLESS];
  public hp = 110;
  public set = 'MEW';
  public name = 'Dodrio';
  public fullName = 'Dodrio MEW 85';

  public powers = [
    {
      name: 'Zooming Draw',
      text: 'Once during your turn, you may put 1 damage counter on this Pokémon. If you do, draw a card.',
    }
  ];

  public attacks = [
    {
      name: 'Rampage Drill',
      cost: [CardType.COLORLESS, CardType.COLORLESS],
      damage: '60+',
      text: 'This attack does 30 more damage for each Prize card your opponent has taken.'
    }
  ];

  public weakness = [
    { type: CardType.LIGHTNING }
  ];
  public retreat = [CardType.COLORLESS];

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    // Ability: Zooming Draw
    if (effect instanceof AbilityEffect && effect.ability === this.powers[0]) {
      const player = effect.player;
      const dodrioSlot = player.active.getPokemonCard() === this
        ? player.active
        : player.bench.find(slot => slot.getPokemonCard() === this);

      if (!dodrioSlot) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      // Put 1 damage counter on Dodrio (10 damage)
      dodrioSlot.damage += 10;
      player.deck.moveTo(player.hand, 1);
    }
    return state;
  }
}