import { CardList, ChooseCardsPrompt, GameError, GameMessage, ShowCardsPrompt, ShuffleDeckPrompt, StateUtils, SuperType, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const opponent = StateUtils.getOpponent(state, player);
    if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    const deckTop = new CardList();
    player.deck.moveTo(deckTop, 7);
    let cards = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_HAND, deckTop, { superType: SuperType.TRAINER, trainerType: TrainerType.SUPPORTER }, { min: 1, max: 1, allowCancel: true }), selected => {
        cards = selected || [];
        next();
    });
    deckTop.moveCardsTo(cards, player.hand);
    deckTop.moveTo(player.deck);
    if (cards.length > 0) {
        yield store.prompt(state, new ShowCardsPrompt(opponent.id, GameMessage.CARDS_SHOWED_BY_THE_OPPONENT, cards), () => next());
    }
    return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
        player.deck.applyOrder(order);
    });
}
export class Pokegear30 extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Pokegear 3.0';
        this.fullName = 'Pokegear 30 UNB';
        this.text = 'Look at the top 7 cards of your deck. You may reveal a Supporter card ' +
            'you find there and put it into your hand. Shuffle the other cards back ' +
            'into your deck.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
