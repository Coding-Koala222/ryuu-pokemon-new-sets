import { ShuffleDeckPrompt, TrainerCard, TrainerEffect, TrainerType } from '@ptcg/common';
function* playCard(next, store, state, self, effect) {
    const player = effect.player;
    const cards = player.hand.cards.filter(c => c !== self);
    if (cards.length > 0) {
        player.hand.moveCardsTo(cards, player.deck);
        yield store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
            player.deck.applyOrder(order);
            next();
        });
    }
    player.deck.moveTo(player.hand, 6);
    return state;
}
export class ProfessorOaksNewTheory extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.SUPPORTER;
        this.set = 'BW';
        this.name = 'Professor Oak\'s New Theory';
        this.fullName = 'Professor Oaks New Theory HGSS';
        this.text = 'Shuffle your hand into your deck. Then, draw 6 cards.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, this, effect);
            return generator.next().value;
        }
        return state;
    }
}
