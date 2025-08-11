import { ChooseCardsPrompt, EnergyCard, EnergyType, GameError, GameMessage, SuperType, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    // Player has no Basic Energy in the discard pile
    let basicEnergyCards = 0;
    player.discard.cards.forEach(c => {
        if (c instanceof EnergyCard && c.energyType === EnergyType.BASIC) {
            basicEnergyCards++;
        }
    });
    if (basicEnergyCards === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // We will discard this card after prompt confirmation
    effect.preventDefault = true;
    const min = Math.min(basicEnergyCards, 2);
    return store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_HAND, player.discard, { superType: SuperType.ENERGY, energyType: EnergyType.BASIC }, { min, max: min, allowCancel: true }), cards => {
        cards = cards || [];
        if (cards.length > 0) {
            // Discard trainer only when user selected a Pokemon
            player.hand.moveCardTo(effect.trainerCard, player.discard);
            // Recover discarded Pokemon
            player.discard.moveCardsTo(cards, player.hand);
        }
    });
}
export class EnergyRetrieval extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Energy Retrieval';
        this.fullName = 'Energy Retrieval SUM';
        this.text = 'Put 2 basic Energy cards from your discard pile into your hand.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
