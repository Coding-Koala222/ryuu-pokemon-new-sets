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
  EnergyCard,
} from '@ptcg/common';

export class Emboar extends PokemonCard {
  public stage: Stage = Stage.STAGE_2;
  public evolvesFrom = 'Pignite';
  public cardTypes = [CardType.FIRE];
  public hp = 170;
  public set = 'WHT';
  public name = 'Emboar';
  public fullName = 'Emboar WHT 13';

  public powers = [
    {
      name: 'Inferno Fandango',
      text: 'As often as you like during your turn, you may attach a Basic fire Energy card from your hand to 1 of your Pokémon.',
    }
  ];

  public attacks = [
    {
      name: 'Heat Crash',
      cost: [CardType.FIRE, CardType.COLORLESS],
      damage: '60',
      text: ''
    },
    {
      name: 'Flare Blitz',
      cost: [CardType.FIRE, CardType.FIRE, CardType.COLORLESS],
      damage: '150',
      text: 'Discard all Energy from this Pokémon.'
    }
  ];

  public weakness = [
    { type: CardType.WATER }
  ];
  public retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    // Ability: Inferno Fandango
    if (effect instanceof AbilityEffect && effect.ability === this.powers[0]) {
      const player = effect.player;
      const target = effect.target; // The Pokémon to attach to
      const energyCard = effect.energyCard as EnergyCard;

      // Check that the energy card is a basic fire energy
      if (!energyCard || !energyCard.provides.includes(CardType.FIRE) || energyCard.special) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      // Check that the card is in hand
      if (!player.hand.cards.includes(energyCard)) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      // Attach to target Pokémon
      target.attachEnergy(energyCard);
      player.hand.moveCardTo(energyCard, target.energies);
    }
    return state;
  }
}