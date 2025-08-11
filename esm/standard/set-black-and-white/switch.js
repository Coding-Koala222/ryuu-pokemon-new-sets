import { ChoosePokemonPrompt, GameError, GameMessage, PlayerType, SlotType, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const hasBench = player.bench.some(b => b.pokemons.cards.length > 0);
    if (hasBench === false) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // Do not discard the card yet
    effect.preventDefault = true;
    let targets = [];
    yield store.prompt(state, new ChoosePokemonPrompt(player.id, GameMessage.CHOOSE_POKEMON_TO_SWITCH, PlayerType.BOTTOM_PLAYER, [SlotType.BENCH], { allowCancel: true }), results => {
        targets = results || [];
        next();
    });
    if (targets.length === 0) {
        return state;
    }
    // Discard trainer only when user selected a Pokemon
    player.hand.moveCardTo(effect.trainerCard, player.discard);
    player.switchPokemon(targets[0]);
    return state;
}
export class Switch extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Switch';
        this.fullName = 'Switch SSH';
        this.text = 'Switch your Active Pokémon with 1 of your Benched Pokémon.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
