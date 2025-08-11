import { AttachEnergyEffect, AttackEffect, CardType, CoinFlipPrompt, EndTurnEffect, GameMessage, PlayerType, PokemonCard, PowerEffect, PowerType, PutDamageEffect, Stage, StateUtils, } from '@ptcg/common';
export class Shuckle extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.FIGHTING];
        this.hp = 60;
        this.weakness = [{ type: CardType.WATER }];
        this.retreat = [CardType.COLORLESS];
        this.powers = [
            {
                name: 'Fermenting Liquid',
                powerType: PowerType.POKEBODY,
                text: 'Whenever you attach an Energy card from your hand to Shuckle, draw a card.',
            },
        ];
        this.attacks = [
            {
                name: 'Shell Stunner',
                cost: [CardType.GRASS, CardType.COLORLESS],
                damage: '20',
                text: 'Flip a coin. If heads, prevent all damage done to Shuckle by attacks during your opponent\'s next turn.',
            },
        ];
        this.set = 'BW';
        this.name = 'Shuckle';
        this.fullName = 'Shuckle PR';
        this.SHELL_STUNNER_MAREKER = 'SHELL_STUNNER_MAREKER';
        this.CLEAR_SHELL_STUNNER_MAREKER = 'CLEAR_SHELL_STUNNER_MAREKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttachEnergyEffect && effect.target.pokemons.cards.includes(this)) {
            const player = effect.player;
            const pokemonCard = effect.target.getPokemonCard();
            if (pokemonCard !== this) {
                return state;
            }
            // Try to reduce PowerEffect, to check if something is blocking our ability
            try {
                const powerEffect = new PowerEffect(player, this.powers[0], this);
                store.reduceEffect(state, powerEffect);
            }
            catch (_a) {
                return state;
            }
            player.deck.moveTo(player.hand, 1);
            return state;
        }
        if (effect instanceof PutDamageEffect && effect.target.marker.hasMarker(this.SHELL_STUNNER_MAREKER)) {
            effect.preventDefault = true;
            return state;
        }
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = StateUtils.getOpponent(state, player);
            state = store.prompt(state, new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP), flipResult => {
                if (flipResult) {
                    player.active.marker.addMarker(this.SHELL_STUNNER_MAREKER, this);
                    opponent.marker.addMarker(this.CLEAR_SHELL_STUNNER_MAREKER, this);
                }
            });
            return state;
        }
        if (effect instanceof EndTurnEffect && effect.player.marker.hasMarker(this.CLEAR_SHELL_STUNNER_MAREKER, this)) {
            effect.player.marker.removeMarker(this.CLEAR_SHELL_STUNNER_MAREKER, this);
            const opponent = StateUtils.getOpponent(state, effect.player);
            opponent.forEachPokemon(PlayerType.TOP_PLAYER, pokemonSlot => {
                pokemonSlot.marker.removeMarker(this.SHELL_STUNNER_MAREKER, this);
            });
        }
        return state;
    }
}
