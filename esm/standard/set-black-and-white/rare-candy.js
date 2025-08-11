import { TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
import { commonTrainers } from '../../common';
export class RareCandy extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Rare Candy';
        this.fullName = 'Rare Candy SUM';
        this.text = 'Choose 1 of your Basic Pokémon in play. If you have a Stage 2 card in ' +
            'your hand that evolves from that Pokémon, put that card onto the Basic ' +
            'Pokémon to evolve it. You can\'t use this card during your first turn ' +
            'or on a Basic Pokémon that was put into play this turn.';
    }
    reduceEffect(store, state, effect) {
        const rareCandy = commonTrainers.rareCandy(this, store, state, effect);
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            rareCandy.playCard(effect);
        }
        return state;
    }
}
