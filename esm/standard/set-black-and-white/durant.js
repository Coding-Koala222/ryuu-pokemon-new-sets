import { AttackEffect, CardType, PlayerType, PokemonCard, Stage, StateUtils, } from '@ptcg/common';
export class Durant extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.METAL];
        this.hp = 70;
        this.weakness = [{ type: CardType.FIRE }];
        this.resistance = [{ type: CardType.PSYCHIC, value: -20 }];
        this.retreat = [CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Devour',
                cost: [CardType.METAL],
                damage: '',
                text: 'For each of your Durant in play, discard the top card of your opponent\'s deck.',
            },
            {
                name: 'Vice Grip',
                cost: [CardType.COLORLESS, CardType.COLORLESS],
                damage: '30',
                text: '',
            },
        ];
        this.set = 'BW';
        this.name = 'Durant';
        this.fullName = 'Durant NV';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = StateUtils.getOpponent(state, player);
            let durantsInPlay = 0;
            player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList, card, target) => {
                if (card.name === this.name) {
                    durantsInPlay++;
                }
            });
            opponent.deck.moveTo(opponent.discard, durantsInPlay);
        }
        return state;
    }
}
