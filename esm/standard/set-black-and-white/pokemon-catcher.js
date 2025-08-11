import { ChoosePokemonPrompt, CoinFlipPrompt, GameError, GameMessage, PlayerType, SlotType, StateUtils, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const opponent = StateUtils.getOpponent(state, player);
    const hasBench = opponent.bench.some(b => b.pokemons.cards.length > 0);
    if (!hasBench) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    let coinResult = false;
    yield store.prompt(state, new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP), result => {
        coinResult = result;
        next();
    });
    if (coinResult === false) {
        return state;
    }
    return store.prompt(state, new ChoosePokemonPrompt(player.id, GameMessage.CHOOSE_POKEMON_TO_SWITCH, PlayerType.TOP_PLAYER, [SlotType.BENCH], {
        allowCancel: false,
    }), result => {
        const cardList = result[0];
        opponent.switchPokemon(cardList);
    });
}
export class PokemonCatcher extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Pokemon Catcher';
        this.fullName = 'Pokemon Catcher SSH';
        this.text = 'Flip a coin. If heads, switch 1 of your opponent\'s Benched Pokémon with their Active Pokémon.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
