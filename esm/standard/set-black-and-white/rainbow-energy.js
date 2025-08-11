import { AttachEnergyEffect, CardType, CheckProvidedEnergyEffect, EnergyCard, EnergyType, } from '@ptcg/common';
export class RainbowEnergy extends EnergyCard {
    constructor() {
        super(...arguments);
        this.provides = [CardType.COLORLESS];
        this.energyType = EnergyType.SPECIAL;
        this.set = 'BW';
        this.name = 'Rainbow Energy';
        this.fullName = 'Rainbow Energy SUM';
        this.text = 'This card provides C Energy. While in play, this card provides every ' +
            'type of Energy but provides only 1 Energy at a time. When you attach ' +
            'this card from your hand to 1 of your Pokémon, put 1 damage counter ' +
            'on that Pokémon.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof CheckProvidedEnergyEffect && effect.source.energies.cards.includes(this)) {
            effect.energyMap.forEach(item => {
                if (item.card === this) {
                    item.provides = [CardType.ANY];
                }
            });
        }
        if (effect instanceof AttachEnergyEffect && effect.energyCard === this) {
            effect.target.damage += 10;
        }
        return state;
    }
}
