import { CoinFlipPrompt, GameMessage, } from '@ptcg/common';
export const flipDamageTimes = function (self, store, state, effect) {
    return {
        use: (attackEffect, times, damage) => {
            const player = attackEffect.player;
            const coinFlipPrompts = [];
            for (let i = 0; i < times; i++) {
                coinFlipPrompts.push(new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP));
            }
            return store.prompt(state, coinFlipPrompts, results => {
                let heads = 0;
                results.forEach(r => {
                    heads += r ? 1 : 0;
                });
                attackEffect.damage = damage * heads;
            });
        }
    };
};
