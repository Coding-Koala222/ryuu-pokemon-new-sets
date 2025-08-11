import { AttackEffect, CardType, CoinFlipPrompt, GameMessage, PokemonCard, Stage, } from '@ptcg/common';
export class Piplup extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.WATER];
        this.hp = 60;
        this.weakness = [{ type: CardType.LIGHTNING }];
        this.retreat = [CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Fury Attack',
                cost: [CardType.WATER],
                damage: '10×',
                text: 'Flip 3 coins. This attack does 10 damage times the number of heads.',
            },
        ];
        this.set = 'BW';
        this.name = 'Piplup';
        this.fullName = 'Piplup DEX';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            return store.prompt(state, [
                new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP),
                new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP),
                new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP),
            ], results => {
                let heads = 0;
                results.forEach(r => {
                    heads += r ? 1 : 0;
                });
                effect.damage = 10 * heads;
            });
        }
        return state;
    }
}
