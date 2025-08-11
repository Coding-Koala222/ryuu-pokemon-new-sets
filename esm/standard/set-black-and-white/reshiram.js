import { AttackEffect, CardType, CheckProvidedEnergyEffect, ChooseEnergyPrompt, DiscardCardsEffect, GameMessage, PokemonCard, Stage, } from '@ptcg/common';
export class Reshiram extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.FIRE];
        this.hp = 130;
        this.weakness = [{ type: CardType.WATER }];
        this.retreat = [CardType.COLORLESS, CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Outrage',
                cost: [CardType.COLORLESS, CardType.COLORLESS],
                damage: '20+',
                text: 'Does 10 more damage for each damage counter on this Pokémon.',
            },
            {
                name: 'Blue Flare',
                cost: [CardType.FIRE, CardType.FIRE, CardType.COLORLESS],
                damage: '120',
                text: 'Discard 2 R Energy attached to this Pokémon.',
            },
        ];
        this.set = 'BW';
        this.name = 'Reshiram';
        this.fullName = 'Reshiram BW';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            effect.damage += effect.player.active.damage;
            return state;
        }
        if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
            const player = effect.player;
            const checkProvidedEnergy = new CheckProvidedEnergyEffect(player);
            state = store.reduceEffect(state, checkProvidedEnergy);
            state = store.prompt(state, new ChooseEnergyPrompt(player.id, GameMessage.CHOOSE_ENERGIES_TO_DISCARD, checkProvidedEnergy.energyMap, [CardType.FIRE, CardType.FIRE], { allowCancel: false }), energy => {
                const cards = (energy || []).map(e => e.card);
                const discardEnergy = new DiscardCardsEffect(effect, cards);
                discardEnergy.target = player.active;
                store.reduceEffect(state, discardEnergy);
            });
        }
        return state;
    }
}
