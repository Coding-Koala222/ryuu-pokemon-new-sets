import { GameError, GameMessage, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
export class ProfessorJuniper extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.SUPPORTER;
        this.set = 'BW';
        this.name = 'Professor Juniper';
        this.fullName = 'Professor Juniper BW';
        this.text = 'Discard your hand and draw 7 cards.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            if (player.deck.cards.length === 0) {
                throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
            }
            const cards = player.hand.cards.filter(c => c !== this);
            player.hand.moveCardsTo(cards, player.discard);
            player.deck.moveTo(player.hand, 7);
        }
        return state;
    }
}
