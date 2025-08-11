import { AttackEffect, CardType, ChooseCardsPrompt, GameMessage, PokemonCard, ShuffleDeckPrompt, Stage, SuperType, } from '@ptcg/common';
function* useCallForFamily(next, store, state, effect) {
    const player = effect.player;
    const slots = player.bench.filter(b => b.pokemons.cards.length === 0);
    const max = Math.min(slots.length, 2);
    if (player.deck.cards.length === 0) {
        return state;
    }
    let cards = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_PUT_ONTO_BENCH, player.deck, { superType: SuperType.POKEMON, stage: Stage.BASIC }, { min: 0, max, allowCancel: true }), selected => {
        cards = selected || [];
        next();
    });
    if (cards.length > slots.length) {
        cards.length = slots.length;
    }
    cards.forEach((card, index) => {
        player.deck.moveCardTo(card, slots[index].pokemons);
        slots[index].pokemonPlayedTurn = state.turn;
    });
    return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
        player.deck.applyOrder(order);
    });
}
export class Emolga extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.LIGHTNING];
        this.hp = 70;
        this.weakness = [{ type: CardType.LIGHTNING }];
        this.resistance = [{ type: CardType.FIGHTING, value: -20 }];
        this.retreat = [];
        this.attacks = [
            {
                name: 'Call for Family',
                cost: [CardType.COLORLESS],
                damage: '',
                text: 'Search your deck for 2 Basic Pokémon and put them onto your Bench. Shuffle your deck afterward.',
            },
            {
                name: 'Static Shock',
                cost: [CardType.LIGHTNING],
                damage: '20',
                text: '',
            },
        ];
        this.set = 'BW';
        this.name = 'Emolga';
        this.fullName = 'Emolga DRX';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const generator = useCallForFamily(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
