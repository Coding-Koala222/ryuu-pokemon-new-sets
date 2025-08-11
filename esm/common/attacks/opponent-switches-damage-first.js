import { ChoosePokemonPrompt, DealDamageEffect, GameMessage, PlayerType, SlotType, StateUtils, } from '@ptcg/common';
export const opponentSwichesDamageFirst = function (self, store, state, effect) {
    return {
        use: (attackEffect) => {
            const player = attackEffect.player;
            const opponent = StateUtils.getOpponent(state, player);
            const hasBench = opponent.bench.some(b => b.pokemons.cards.length > 0);
            if (hasBench === false) {
                return state;
            }
            return store.prompt(state, new ChoosePokemonPrompt(opponent.id, GameMessage.CHOOSE_POKEMON_TO_SWITCH, PlayerType.BOTTOM_PLAYER, [SlotType.BENCH], { allowCancel: false }), targets => {
                if (targets && targets.length > 0) {
                    const dealDamage = new DealDamageEffect(attackEffect, attackEffect.damage);
                    dealDamage.target = opponent.active;
                    store.reduceEffect(state, dealDamage);
                    attackEffect.damage = 0;
                    opponent.switchPokemon(targets[0]);
                }
            });
        }
    };
};
