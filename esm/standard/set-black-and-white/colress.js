import { GameError, GameMessage, ShuffleDeckPrompt, StateUtils, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
export class Colress extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.SUPPORTER;
        this.set = 'BW';
        this.name = 'Colress';
        this.fullName = 'Colress PLS';
        this.text = 'Shuffle your hand into your deck. Then, draw a number of cards equal ' +
            'to the number of Benched Pokémon (both yours and your opponent\'s).';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            const opponent = StateUtils.getOpponent(state, player);
            const cards = player.hand.cards.filter(c => c !== this);
            if (cards.length === 0 && player.deck.cards.length === 0) {
                throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
            }
            let benchCount = 0;
            player.bench.forEach(b => (benchCount += b.pokemons.cards.length > 0 ? 1 : 0));
            opponent.bench.forEach(b => (benchCount += b.pokemons.cards.length > 0 ? 1 : 0));
            player.hand.moveCardsTo(cards, player.deck);
            return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
                player.deck.applyOrder(order);
                player.deck.moveTo(player.hand, benchCount);
            });
        }
        return state;
    }
}
