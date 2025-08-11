import { AttackEffect, CardType, ChooseCardsPrompt, EndTurnEffect, GameError, GameMessage, PlayerType, PlayPokemonEffect, PokemonCard, PowerEffect, PowerType, Stage, StateUtils, } from '@ptcg/common';
export class Empoleon extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.STAGE_2;
        this.evolvesFrom = 'Prinplup';
        this.cardTypes = [CardType.WATER];
        this.hp = 140;
        this.weakness = [{ type: CardType.LIGHTNING }];
        this.retreat = [CardType.COLORLESS, CardType.COLORLESS];
        this.powers = [
            {
                name: 'Diving Draw',
                useWhenInPlay: true,
                powerType: PowerType.ABILITY,
                text: 'Once during your turn (before your attack), you may discard ' +
                    'a card from your hand. If you do, draw 2 cards.',
            },
        ];
        this.attacks = [
            {
                name: 'Attack Command',
                cost: [CardType.WATER],
                damage: '10×',
                text: 'Does 10 damage times the number of Pokémon in play (both yours and your opponent\'s).',
            },
        ];
        this.set = 'BW';
        this.name = 'Empoleon';
        this.fullName = 'Empoleon DEX';
        this.DIVING_DRAW_MAREKER = 'DIVING_DRAW_MAREKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
            const player = effect.player;
            player.marker.removeMarker(this.DIVING_DRAW_MAREKER, this);
        }
        if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
            const player = effect.player;
            if (player.hand.cards.length === 0) {
                throw new GameError(GameMessage.CANNOT_USE_POWER);
            }
            if (player.marker.hasMarker(this.DIVING_DRAW_MAREKER, this)) {
                throw new GameError(GameMessage.POWER_ALREADY_USED);
            }
            state = store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_DISCARD, player.hand, {}, { allowCancel: true, min: 1, max: 1 }), cards => {
                cards = cards || [];
                if (cards.length === 0) {
                    return;
                }
                player.marker.addMarker(this.DIVING_DRAW_MAREKER, this);
                player.hand.moveCardsTo(cards, player.discard);
                player.deck.moveTo(player.hand, 2);
            });
            return state;
        }
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = StateUtils.getOpponent(state, player);
            let pokemonInPlay = 0;
            player.forEachPokemon(PlayerType.BOTTOM_PLAYER, () => {
                pokemonInPlay += 1;
            });
            opponent.forEachPokemon(PlayerType.TOP_PLAYER, () => {
                pokemonInPlay += 1;
            });
            effect.damage = 10 * pokemonInPlay;
        }
        if (effect instanceof EndTurnEffect) {
            effect.player.marker.removeMarker(this.DIVING_DRAW_MAREKER, this);
        }
        return state;
    }
}
