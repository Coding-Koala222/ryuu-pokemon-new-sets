import { CardType, CheckRetreatCostEffect, GameError, GameMessage, Stage, StateUtils, TrainerCard, TrainerType, UseStadiumEffect, } from '@ptcg/common';
export class SkyarrowBridge extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.STADIUM;
        this.set = 'BW';
        this.name = 'Skyarrow Bridge';
        this.fullName = 'Skyarrow Bridge NXD';
        this.text = 'The Retreat Cost of each Basic Pokémon in play is C less.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof CheckRetreatCostEffect && StateUtils.getStadiumCard(state) === this) {
            const player = effect.player;
            const pokemonCard = player.active.getPokemonCard();
            if (pokemonCard && pokemonCard.stage == Stage.BASIC) {
                const index = effect.cost.indexOf(CardType.COLORLESS);
                if (index !== -1) {
                    effect.cost.splice(index, 1);
                }
            }
        }
        if (effect instanceof UseStadiumEffect && StateUtils.getStadiumCard(state) === this) {
            throw new GameError(GameMessage.CANNOT_USE_STADIUM);
        }
        return state;
    }
}
