import { AttackEffect, CardType, ChooseCardsPrompt, EnergyType, GameMessage, PokemonCard, ShuffleDeckPrompt, Stage, StateUtils, SuperType, } from '@ptcg/common';
function* useFlameCharge(next, store, state, self, effect) {
    const player = effect.player;
    const pokemonSlot = StateUtils.findPokemonSlot(state, self);
    if (!pokemonSlot) {
        return state;
    }
    if (player.deck.cards.length === 0) {
        return state;
    }
    let cards = [];
    yield store.prompt(state, new ChooseCardsPrompt(player.id, GameMessage.CHOOSE_CARD_TO_ATTACH, player.deck, {
        superType: SuperType.ENERGY,
        energyType: EnergyType.BASIC,
        name: 'Fire Energy',
    }, { min: 1, max: 1, allowCancel: true }), selected => {
        cards = selected || [];
        next();
    });
    if (cards.length > 0) {
        player.deck.moveCardsTo(cards, pokemonSlot.energies);
    }
    return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
        player.deck.applyOrder(order);
    });
}
export class Pignite extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.STAGE_1;
        this.evolvesFrom = 'Tepig';
        this.cardTypes = [CardType.FIRE];
        this.hp = 100;
        this.weakness = [{ type: CardType.WATER }];
        this.retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Flame Charge',
                cost: [CardType.COLORLESS],
                damage: '',
                text: 'Search your deck for a R Energy card and attach it to this Pokémon. Shuffle your deck afterward.',
            },
            {
                name: 'Heat Crash',
                cost: [CardType.FIRE, CardType.FIRE, CardType.COLORLESS],
                damage: '50',
                text: '',
            },
        ];
        this.set = 'BW';
        this.name = 'Pignite';
        this.fullName = 'Pignite BW';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const generator = useFlameCharge(() => generator.next(), store, state, this, effect);
            return generator.next().value;
        }
        return state;
    }
}
