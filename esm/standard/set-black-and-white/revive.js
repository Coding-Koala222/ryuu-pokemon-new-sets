import { ChooseCardsPrompt, GameError, GameMessage, PokemonCard, Stage, SuperType, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const slots = player.bench.filter(b => b.pokemons.cards.length === 0);
    // Player has no empty bench slot
    if (slots.length === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // Player has no basic Pokemons in the discard pile
    if (!player.discard.cards.some(c => c instanceof PokemonCard && c.stage === Stage.BASIC)) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // We will discard this card after prompt confirmation
    effect.preventDefault = true;
    return store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_PUT_ONTO_BENCH, player.discard, { superType: SuperType.POKEMON, stage: Stage.BASIC }, { min: 1, max: 1, allowCancel: true }), selected => {
        if (selected && selected.length > 0) {
            // Discard trainer only when user selected a Pokemon
            player.hand.moveCardTo(effect.trainerCard, player.discard);
            // Recover discarded Pokemon
            player.discard.moveCardsTo(selected, slots[0].pokemons);
            slots[0].pokemonPlayedTurn = state.turn;
        }
    });
}
export class Revive extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Revive';
        this.fullName = 'Revive BW';
        this.text = 'Put a Basic Pokémon from your discard pile onto your Bench.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
