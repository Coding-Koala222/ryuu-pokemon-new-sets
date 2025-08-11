import { ChooseCardsPrompt, GameMessage, ShowCardsPrompt, ShuffleDeckPrompt, StateUtils, } from '@ptcg/common';
function* useSurprise(next, store, state, effect) {
    const player = effect.player;
    const opponent = StateUtils.getOpponent(state, player);
    // Opponent has no cards in the hand
    if (opponent.hand.cards.length === 0) {
        return state;
    }
    let cards = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_DECK, opponent.hand, {}, { min: 1, max: 1, allowCancel: false, isSecret: true }), selected => {
        cards = selected || [];
        next();
    });
    opponent.hand.moveCardsTo(cards, opponent.deck);
    if (cards.length > 0) {
        yield store.prompt(state, new ShowCardsPrompt(player.id, GameMessage.CARDS_SHOWED_BY_THE_OPPONENT, cards), () => next());
    }
    return store.prompt(state, new ShuffleDeckPrompt(opponent.id), order => {
        opponent.deck.applyOrder(order);
    });
}
export const surprise = function (self, store, state, effect) {
    return {
        use: (attackEffect) => {
            const generator = useSurprise(() => generator.next(), store, state, attackEffect);
            return generator.next().value;
        }
    };
};
