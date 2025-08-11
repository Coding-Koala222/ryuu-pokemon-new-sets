import { ChooseCardsPrompt, EnergyCard, EnergyType, GameError, GameMessage, PokemonCard, ShuffleDeckPrompt, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, self, effect) {
    const player = effect.player;
    let pokemonsOrEnergyInDiscard = 0;
    const blocked = [];
    player.discard.cards.forEach((c, index) => {
        const isPokemon = c instanceof PokemonCard;
        const isBasicEnergy = c instanceof EnergyCard && c.energyType === EnergyType.BASIC;
        if (isPokemon || isBasicEnergy) {
            pokemonsOrEnergyInDiscard += 1;
        }
        else {
            blocked.push(index);
        }
    });
    // Player does not have correct cards in discard
    if (pokemonsOrEnergyInDiscard === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // We will discard this card after prompt confirmation
    effect.preventDefault = true;
    const max = Math.min(3, pokemonsOrEnergyInDiscard);
    let cards = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_DECK, player.discard, {}, { min: max, max, allowCancel: true, blocked }), selected => {
        cards = selected || [];
        next();
    });
    // Operation canceled by the user
    if (cards.length === 0) {
        return state;
    }
    player.hand.moveCardTo(self, player.discard);
    player.discard.moveCardsTo(cards, player.deck);
    return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
        player.deck.applyOrder(order);
    });
}
export class SuperRod extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Super Rod';
        this.fullName = 'Super Rod NV';
        this.text = 'Shuffle 3 in any combination of Pokémon and basic Energy cards from your discard pile back into your deck.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, this, effect);
            return generator.next().value;
        }
        return state;
    }
}
