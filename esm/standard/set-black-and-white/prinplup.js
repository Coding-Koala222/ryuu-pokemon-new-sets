import { AttackEffect, CardType, CoinFlipPrompt, GameMessage, PokemonCard, Stage, } from '@ptcg/common';
export class Prinplup extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.STAGE_1;
        this.evolvesFrom = 'Piplup';
        this.cardTypes = [CardType.WATER];
        this.hp = 80;
        this.weakness = [{ type: CardType.LIGHTNING }];
        this.retreat = [CardType.COLORLESS, CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Razor Wing',
                cost: [CardType.COLORLESS],
                damage: '20',
                text: '',
            },
            {
                name: 'Fury Attack',
                cost: [CardType.WATER, CardType.COLORLESS, CardType.COLORLESS],
                damage: '30×',
                text: 'Flip 3 coins. This attack does 30 damage times the number of heads.',
            },
        ];
        this.set = 'BW';
        this.name = 'Prinplup';
        this.fullName = 'Prinplup DEX';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
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
                effect.damage = 30 * heads;
            });
        }
        return state;
    }
}
