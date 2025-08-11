import { ChooseCardsPrompt, GameMessage, ShuffleDeckPrompt, Stage, SuperType } from '@ptcg/common';
function* useCallForFamily(next, store, state, effect, filterType) {
    const player = effect.player;
    const slots = player.bench.filter(b => b.pokemons.cards.length === 0);
    const max = Math.min(slots.length, 1);
    if (player.deck.cards.length === 0) {
        return state;
    }
    let cards = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_PUT_ONTO_BENCH, player.deck, filterType, { min: 0, max, allowCancel: true }), selected => {
        cards = selected || [];
        next();
    });
    if (cards.length > slots.length) {
        cards.length = slots.length;
    }
    cards.forEach((card, index) => {
        player.deck.moveCardTo(card, slots[index].pokemons);
        slots[index].pokemonPlayedTurn = state.turn;
    });
    return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
        player.deck.applyOrder(order);
    });
}
export const callForFamily = function (self, store, state, effect) {
    return {
        use: (attackEffect, filterType) => {
            if (!(filterType instanceof Array)) {
                filterType = [filterType];
            }
            const generator = useCallForFamily(() => generator.next(), store, state, effect, filterType.map(filter => (Object.assign(Object.assign({}, filter), { superType: SuperType.POKEMON, stage: Stage.BASIC }))));
            return generator.next().value;
        }
    };
};
