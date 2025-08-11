import { AttackEffect, CardType, EndTurnEffect, GamePhase, KnockOutEffect, PokemonCard, Stage, StateUtils, } from '@ptcg/common';
export class Terrakion extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.FIGHTING];
        this.hp = 130;
        this.weakness = [
            {
                type: CardType.GRASS,
            },
        ];
        this.retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Retaliate',
                cost: [CardType.FIGHTING, CardType.COLORLESS],
                damage: '30+',
                text: 'If any of your Pokémon were Knocked Out by damage from an opponent\'s ' +
                    'attack during his or her last turn, this attack does 60 more damage.',
            },
            {
                name: 'Land Crush',
                cost: [CardType.FIGHTING, CardType.FIGHTING, CardType.COLORLESS],
                damage: '90',
                text: '',
            },
        ];
        this.set = 'BW';
        this.name = 'Terrakion';
        this.fullName = 'Terrakion NV';
        this.RETALIATE_MARKER = 'RETALIATE_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            if (player.marker.hasMarker(this.RETALIATE_MARKER)) {
                effect.damage += 60;
            }
            return state;
        }
        if (effect instanceof KnockOutEffect) {
            const player = effect.player;
            const opponent = StateUtils.getOpponent(state, player);
            // Do not activate between turns, or when it's not opponents turn.
            if (state.phase !== GamePhase.ATTACK || state.players[state.activePlayer] !== opponent) {
                return state;
            }
            const cardList = StateUtils.findCardList(state, this);
            const owner = StateUtils.findOwner(state, cardList);
            if (owner === player) {
                effect.player.marker.addMarker(this.RETALIATE_MARKER, this);
            }
            return state;
        }
        if (effect instanceof EndTurnEffect) {
            effect.player.marker.removeMarker(this.RETALIATE_MARKER);
        }
        return state;
    }
}
