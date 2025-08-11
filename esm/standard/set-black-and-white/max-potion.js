import { ChoosePokemonPrompt, GameError, GameMessage, HealEffect, PlayerType, SlotType, TrainerCard, TrainerEffect, TrainerType, } from '@ptcg/common';
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const blocked = [];
    let hasPokemonWithDamage = false;
    player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList, card, target) => {
        if (cardList.damage === 0) {
            blocked.push(target);
        }
        else {
            hasPokemonWithDamage = true;
        }
    });
    if (hasPokemonWithDamage === false) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // Do not discard the card yet
    effect.preventDefault = true;
    let targets = [];
    yield store.prompt(state, new ChoosePokemonPrompt(player.id, GameMessage.CHOOSE_POKEMON_TO_HEAL, PlayerType.BOTTOM_PLAYER, [SlotType.ACTIVE, SlotType.BENCH], { allowCancel: true, blocked }), results => {
        targets = results || [];
        next();
    });
    if (targets.length === 0) {
        return state;
    }
    // Discard trainer only when user selected a Pokemon
    player.hand.moveCardTo(effect.trainerCard, player.discard);
    targets.forEach(target => {
        // Heal Pokemon
        const healEffect = new HealEffect(player, target, target.damage);
        store.reduceEffect(state, healEffect);
        // Discard its energy cards
        target.energies.moveTo(player.discard);
    });
    return state;
}
export class MaxPotion extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.ITEM;
        this.set = 'BW';
        this.name = 'Max Potion';
        this.fullName = 'Max Potion EPO';
        this.text = 'Heal all damage from 1 of your Pokémon. Then, discard all Energy attached to that Pokémon.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
