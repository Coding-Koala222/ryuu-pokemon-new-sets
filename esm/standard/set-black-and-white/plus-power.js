import { DealDamageEffect, EndTurnEffect, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
export class PlusPower extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'PlusPower';
        this.fullName = 'PlusPower BW';
        this.text = 'During this turn, your Pokémon\'s attacks do 10 more damage to the ' +
            'Active Pokémon (before applying Weakness and Resistance).';
        this.PLUS_POWER_MARKER = 'PLUS_POWER_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            player.marker.addMarker(this.PLUS_POWER_MARKER, this);
        }
        if (effect instanceof DealDamageEffect) {
            const marker = effect.player.marker;
            if (marker.hasMarker(this.PLUS_POWER_MARKER, this) && effect.damage > 0) {
                effect.damage += 10;
            }
        }
        if (effect instanceof EndTurnEffect) {
            effect.player.marker.removeMarker(this.PLUS_POWER_MARKER, this);
        }
        return state;
    }
}
