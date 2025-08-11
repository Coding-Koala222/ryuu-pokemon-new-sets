import { ChooseCardsPrompt, ChoosePokemonPrompt, EnergyType, GameError, GameMessage, PlayerType, SlotType, StateUtils, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const opponent = StateUtils.getOpponent(state, player);
    let hasPokemonWithEnergy = false;
    const blocked = [];
    opponent.forEachPokemon(PlayerType.TOP_PLAYER, (pokemonSlot, card, target) => {
        if (pokemonSlot.energies.cards.some(c => c.energyType === EnergyType.SPECIAL)) {
            hasPokemonWithEnergy = true;
        }
        else {
            blocked.push(target);
        }
    });
    if (!hasPokemonWithEnergy) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // We will discard this card after prompt confirmation
    effect.preventDefault = true;
    let targets = [];
    yield store.prompt(state, new ChoosePokemonPrompt(player.id, GameMessage.CHOOSE_POKEMON_TO_DISCARD_CARDS, PlayerType.TOP_PLAYER, [SlotType.ACTIVE, SlotType.BENCH], { allowCancel: true, blocked }), results => {
        targets = results || [];
        next();
    });
    if (targets.length === 0) {
        return state;
    }
    const target = targets[0];
    let cards = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_DISCARD, target.energies, { energyType: EnergyType.SPECIAL }, { min: 1, max: 1, allowCancel: true }), selected => {
        cards = selected || [];
        next();
    });
    if (cards.length > 0) {
        // Discard trainer only when user selected a Pokemon
        player.hand.moveCardTo(effect.trainerCard, player.discard);
        // Discard selected special energy card
        target.moveCardsTo(cards, opponent.discard);
    }
    return state;
}
export class EnhancedHammer extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Enhanced Hammer';
        this.fullName = 'Enhanced Hammer DEX';
        this.text = 'Discard a Special Energy attached to 1 of your opponent\'s Pokémon.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
