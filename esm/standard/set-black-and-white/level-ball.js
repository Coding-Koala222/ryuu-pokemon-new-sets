import { ChooseCardsPrompt, GameError, GameMessage, PokemonCard, ShowCardsPrompt, ShuffleDeckPrompt, StateUtils, SuperType, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const opponent = StateUtils.getOpponent(state, player);
    let cards = [];
    if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    const blocked = [];
    player.deck.cards.forEach((card, index) => {
        if (card instanceof PokemonCard && card.hp > 90) {
            blocked.push(index);
        }
    });
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_HAND, player.deck, { superType: SuperType.POKEMON }, { min: 1, max: 1, allowCancel: true, blocked }), selected => {
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
export class LevelBall extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Level Ball';
        this.fullName = 'Level Ball NXD';
        this.text = 'Search your deck for a Pokémon with 90 HP or less, reveal it, ' +
            'and put it into your hand. Shuffle your deck afterward.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
