import { ChoosePokemonPrompt, GameError, GameMessage, PlayerType, SlotType, StateUtils, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const opponent = StateUtils.getOpponent(state, player);
    let pokemonsWithTool = 0;
    const blocked = [];
    player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (pokemonSlot, card, target) => {
        if (pokemonSlot.trainers.cards.some(t => t.trainerType === TrainerType.TOOL)) {
            pokemonsWithTool += 1;
        }
        else {
            blocked.push(target);
        }
    });
    opponent.forEachPokemon(PlayerType.TOP_PLAYER, (pokemonSlot, card, target) => {
        if (pokemonSlot.trainers.cards.some(t => t.trainerType === TrainerType.TOOL)) {
            pokemonsWithTool += 1;
        }
        else {
            blocked.push(target);
        }
    });
    if (pokemonsWithTool === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // We will discard this card after prompt confirmation
    effect.preventDefault = true;
    const max = Math.min(2, pokemonsWithTool);
    let targets = [];
    yield store.prompt(state, new ChoosePokemonPrompt(player.id, GameMessage.CHOOSE_POKEMON_TO_DISCARD_CARDS, PlayerType.ANY, [SlotType.ACTIVE, SlotType.BENCH], { min: 1, max: max, allowCancel: true, blocked }), results => {
        targets = results || [];
        next();
    });
    if (targets.length === 0) {
        return state;
    }
    // Discard trainer only when user selected a Pokemon
    player.hand.moveCardTo(effect.trainerCard, player.discard);
    targets.forEach(target => {
        const owner = StateUtils.findOwner(state, target);
        const tools = target.getTools();
        target.moveCardsTo(tools, owner.discard);
    });
    return state;
}
export class ToolScrapper extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Tool Scrapper';
        this.fullName = 'Tool Scrapper DRX';
        this.text = 'Choose up to 2 Pokémon Tool cards attached to Pokémon in play (yours or your opponent\'s) and discard them.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
