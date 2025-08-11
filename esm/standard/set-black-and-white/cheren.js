import { GameError, GameMessage, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
export class Cheren extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.SUPPORTER;
        this.set = 'BW';
        this.name = 'Cheren';
        this.fullName = 'Cheren EPO';
        this.text = 'Draw 3 cards.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            if (player.deck.cards.length === 0) {
                throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
            }
            player.deck.moveTo(player.hand, 3);
        }
        return state;
    }
}
