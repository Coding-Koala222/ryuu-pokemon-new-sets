import { ChooseCardsPrompt, CoinFlipPrompt, GameError, GameMessage, ShowCardsPrompt, ShuffleDeckPrompt, StateUtils, SuperType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const opponent = StateUtils.getOpponent(state, player);
    let cards = [];
    if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    let flipResult = false;
    yield store.prompt(state, [new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP)], result => {
        flipResult = result;
        next();
    });
    if (!flipResult) {
        return state;
    }
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_HAND, player.deck, { superType: SuperType.POKEMON }, { min: 1, max: 1, allowCancel: true }), selected => {
        cards = selected || [];
        next();
    });
    player.deck.moveCardsTo(cards, player.hand);
    if (cards.length > 0) {
        yield store.prompt(state, new ShowCardsPrompt(opponent.id, GameMessage.CARDS_SHOWED_BY_THE_OPPONENT, cards), () => next());
    }
    return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
        player.deck.applyOrder(order);
    });
}
export const pokeBall = function (self, store, state, effect) {
    return {
        playCard: trainerEffect => {
            const generator = playCard(() => generator.next(), store, state, trainerEffect);
            return generator.next().value;
        }
    };
};
