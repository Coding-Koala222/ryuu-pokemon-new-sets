import { AttachEnergyEffect, AttachEnergyPrompt, CardType, EnergyCard, EnergyType, GameError, GameMessage, PlayerType, PokemonCard, PowerEffect, PowerType, SlotType, Stage, StateUtils, SuperType, } from '@ptcg/common';
export class Emboar extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.STAGE_2;
        this.evolvesFrom = 'Pignite';
        this.cardTypes = [CardType.FIRE];
        this.hp = 150;
        this.weakness = [{ type: CardType.WATER }];
        this.retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];
        this.powers = [
            {
                name: 'Inferno Fandango',
                useWhenInPlay: true,
                powerType: PowerType.ABILITY,
                text: 'As often as you like during your turn (before your attack), ' +
                    'you may attach a R Energy card from your hand to 1 of your Pokémon.',
            },
        ];
        this.attacks = [
            {
                name: 'Heat Crash',
                cost: [CardType.FIRE, CardType.FIRE, CardType.COLORLESS, CardType.COLORLESS],
                damage: '80',
                text: '',
            },
        ];
        this.set = 'BW';
        this.name = 'Emboar';
        this.fullName = 'Emboar LTR';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
            const player = effect.player;
            const hasEnergyInHand = player.hand.cards.some(c => {
                return c instanceof EnergyCard && c.energyType === EnergyType.BASIC && c.provides.includes(CardType.FIRE);
            });
            if (!hasEnergyInHand) {
                throw new GameError(GameMessage.CANNOT_USE_POWER);
            }
            state = store.prompt(state, new AttachEnergyPrompt(player.id, GameMessage.ATTACH_ENERGY_CARDS, player.hand, PlayerType.BOTTOM_PLAYER, [SlotType.BENCH, SlotType.ACTIVE], {
                superType: SuperType.ENERGY,
                energyType: EnergyType.BASIC,
                name: 'Fire Energy',
            }, { allowCancel: true }), transfers => {
                transfers = transfers || [];
                for (const transfer of transfers) {
                    const target = StateUtils.getTarget(state, player, transfer.to);
                    const energyCard = transfer.card;
                    const attachEnergyEffect = new AttachEnergyEffect(player, energyCard, target);
                    store.reduceEffect(state, attachEnergyEffect);
                }
            });
            return state;
        }
        return state;
    }
}
