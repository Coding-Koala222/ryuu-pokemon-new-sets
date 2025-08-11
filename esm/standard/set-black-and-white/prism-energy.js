import { CardType, CheckProvidedEnergyEffect, EnergyCard, EnergyType } from '@ptcg/common';
export class PrismEnergy extends EnergyCard {
    constructor() {
        super(...arguments);
        this.provides = [CardType.COLORLESS];
        this.energyType = EnergyType.SPECIAL;
        this.set = 'BW';
        this.name = 'Prism Energy';
        this.fullName = 'Prism Energy NXD';
        this.text = 'This card provides C Energy. If the Pokémon this card is attached to is ' +
            'a Basic Pokémon, this card provides every type of Energy but provides ' +
            'only 1 Energy at a time.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof CheckProvidedEnergyEffect && effect.source.energies.cards.includes(this) && effect.source.isBasic()) {
            effect.energyMap.forEach(item => {
                if (item.card === this) {
                    item.provides = [CardType.ANY];
                }
            });
        }
        return state;
    }
}
