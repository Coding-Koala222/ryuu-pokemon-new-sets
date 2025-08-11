import { CoinFlipPrompt, EndTurnEffect, GameMessage, StateUtils, UseAttackEffect, } from '@ptcg/common';
const SMOKESCREEN_MARKER = 'SMOKESCREEN_MARKER';
export const smokescreen = function (self, store, state, effect) {
    function reduceEffect() {
        if (effect instanceof UseAttackEffect && effect.player.active.marker.hasMarker(SMOKESCREEN_MARKER, self)) {
            const player = effect.player;
            effect.preventDefault = true;
            return store.prompt(state, [new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP)], result => {
                player.active.marker.removeMarker(SMOKESCREEN_MARKER);
                const attackEffect = result ? new UseAttackEffect(player, effect.attack) : new EndTurnEffect(player);
                store.reduceEffect(state, attackEffect);
            });
        }
        if (effect instanceof EndTurnEffect) {
            effect.player.active.marker.removeMarker(SMOKESCREEN_MARKER);
        }
        return state;
    }
    state = reduceEffect();
    return {
        use: (attackEffect) => {
            const player = attackEffect.player;
            const opponent = StateUtils.getOpponent(state, player);
            opponent.active.marker.addMarker(SMOKESCREEN_MARKER, self);
            return state;
        }
    };
};
