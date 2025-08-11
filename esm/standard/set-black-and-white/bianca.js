import { GameError, GameMessage, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
export class Bianca extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.SUPPORTER;
        this.set = 'BW';
        this.name = 'Bianca';
        this.fullName = 'Bianca EPO';
        this.text = 'Draw cards until you have 6 cards in your hand.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            const cards = player.hand.cards.filter(c => c !== this);
            const cardsToDraw = Math.max(0, 6 - cards.length);
            if (cardsToDraw === 0 || player.deck.cards.length === 0) {
                throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
            }
            player.deck.moveTo(player.hand, cardsToDraw);
        }
        return state;
    }
}
