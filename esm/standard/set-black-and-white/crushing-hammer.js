import { ChooseCardsPrompt, ChoosePokemonPrompt, CoinFlipPrompt, GameError, GameMessage, PlayerType, SlotType, StateUtils, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const opponent = StateUtils.getOpponent(state, player);
    let hasPokemonWithEnergy = false;
    const blocked = [];
    opponent.forEachPokemon(PlayerType.TOP_PLAYER, (pokemonSlot, card, target) => {
        if (pokemonSlot.energies.cards.length > 0) {
            hasPokemonWithEnergy = true;
        }
        else {
            blocked.push(target);
        }
    });
    if (!hasPokemonWithEnergy) {
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
    let targets = [];
    yield store.prompt(state, new ChoosePokemonPrompt(player.id, GameMessage.CHOOSE_POKEMON_TO_DISCARD_CARDS, PlayerType.TOP_PLAYER, [SlotType.ACTIVE, SlotType.BENCH], { allowCancel: false, blocked }), results => {
        targets = results || [];
        next();
    });
    if (targets.length === 0) {
        return state;
    }
    const target = targets[0];
    let cards = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_DISCARD, target.energies, {}, { min: 1, max: 1, allowCancel: false }), selected => {
        cards = selected;
        next();
    });
    target.moveCardsTo(cards, opponent.discard);
    return state;
}
export class CrushingHammer extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Crushing Hammer';
        this.fullName = 'Crushing Hammer EPO';
        this.text = 'Flip a coin. If heads, discard an Energy attached to 1 of your opponent\'s Pokémon.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
