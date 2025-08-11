import { BetweenTurnsEffect, CardType, EnergyCard, EnergyType, GamePhase, KnockOutEffect, } from '@ptcg/common';
export class RescueEnergy extends EnergyCard {
    constructor() {
        super(...arguments);
        this.provides = [CardType.COLORLESS];
        this.energyType = EnergyType.SPECIAL;
        this.set = 'BW';
        this.name = 'Rescue Energy';
        this.fullName = 'Rescue Energy TRM';
        this.RESCUE_ENERGY_MAREKER = 'RESCUE_ENERGY_MAREKER';
        this.text = 'Rescue Energy provides C Energy. If the Pokémon this card is attached ' +
            'to is Knocked Out by damage from an attack, put that Pokémon back into ' +
            'your hand. (Discard all cards attached to that Pokémon.)';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof KnockOutEffect && effect.target.energies.cards.includes(this)) {
            const player = effect.player;
            // Do not activate between turns, or when it's not opponents turn.
            if (state.phase !== GamePhase.ATTACK) {
                return state;
            }
            const target = effect.target;
            const cards = target.getPokemons();
            cards.forEach(card => {
                player.marker.addMarker(this.RESCUE_ENERGY_MAREKER, card);
            });
        }
        if (effect instanceof BetweenTurnsEffect) {
            state.players.forEach(player => {
                if (!player.marker.hasMarker(this.RESCUE_ENERGY_MAREKER)) {
                    return;
                }
                const rescued = player.marker.markers
                    .filter(m => m.name === this.RESCUE_ENERGY_MAREKER)
                    .map(m => m.source);
                player.discard.moveCardsTo(rescued, player.hand);
                player.marker.removeMarker(this.RESCUE_ENERGY_MAREKER);
            });
        }
        return state;
    }
}
