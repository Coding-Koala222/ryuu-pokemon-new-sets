import { CheckAttackCostEffect, CheckProvidedEnergyEffect, StateUtils, } from '@ptcg/common';
export const additionalEnergyDamage = function (self, store, state, effect) {
    return {
        use: (attackEffect, cardType, damage, max) => {
            const player = attackEffect.player;
            const checkAttackCost = new CheckAttackCostEffect(player, attackEffect.attack);
            state = store.reduceEffect(state, checkAttackCost);
            const attackCost = checkAttackCost.cost;
            const checkProvidedEnergyEffect = new CheckProvidedEnergyEffect(player);
            store.reduceEffect(state, checkProvidedEnergyEffect);
            const provided = checkProvidedEnergyEffect.energyMap;
            const energyCount = StateUtils.countAdditionalEnergy(provided, attackCost, cardType);
            attackEffect.damage += Math.min(energyCount, max) * damage;
            return state;
        }
    };
};
