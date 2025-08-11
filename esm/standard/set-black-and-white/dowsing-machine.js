import { CardList, CardTag, ChooseCardsPrompt, GameError, GameMessage, SuperType, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, self, effect) {
    const player = effect.player;
    let cards = [];
    cards = player.hand.cards.filter(c => c !== self);
    if (cards.length < 2) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    let trainersInDiscard = 0;
    player.discard.cards.forEach(c => {
        if (c instanceof TrainerCard) {
            trainersInDiscard += 1;
        }
    });
    if (trainersInDiscard === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // We will discard this card after prompt confirmation
    effect.preventDefault = true;
    // prepare card list without Junk Arm
    const handTemp = new CardList();
    handTemp.cards = player.hand.cards.filter(c => c !== self);
    cards = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_DISCARD, handTemp, {}, { min: 2, max: 2, allowCancel: true }), selected => {
        cards = selected || [];
        next();
    });
    // Operation canceled by the user
    if (cards.length === 0) {
        return state;
    }
    let recovered = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_HAND, player.discard, { superType: SuperType.TRAINER }, { min: 1, max: 1, allowCancel: true }), selected => {
        recovered = selected || [];
        next();
    });
    // Operation cancelled by the user
    if (recovered.length === 0) {
        return state;
    }
    player.hand.moveCardTo(self, player.discard);
    player.hand.moveCardsTo(cards, player.discard);
    player.discard.moveCardsTo(recovered, player.hand);
    return state;
}
export class DowsingMachine extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.tags = [CardTag.ACE_SPEC];
        this.set = 'BW';
        this.name = 'Dowsing Machine';
        this.fullName = 'Dowsing Machine PLS';
        this.text = 'Discard 2 cards from your hand. (If you can\'t discard 2 cards, ' +
            'you can\'t play this card.) Put a Trainer card from your discard ' +
            'pile into your hand.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, this, effect);
            return generator.next().value;
        }
        return state;
    }
}
