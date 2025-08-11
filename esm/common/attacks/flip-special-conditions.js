import { AddSpecialConditionsEffect, CoinFlipPrompt, GameMessage, } from '@ptcg/common';
export const flipSpecialConditions = function (self, store, state, effect) {
    return {
        use: (attackEffect, conditions) => {
            const player = attackEffect.player;
            return store.prompt(state, [new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP)], result => {
                if (result === true) {
                    const specialConditionEffect = new AddSpecialConditionsEffect(attackEffect, conditions);
                    store.reduceEffect(state, specialConditionEffect);
                }
            });
        }
    };
};
