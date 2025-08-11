import { AttackEffect, CardType, DealDamageEffect, PokemonCard, Stage } from '@ptcg/common';
export class Zekrom extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.LIGHTNING];
        this.hp = 130;
        this.weakness = [{ type: CardType.FIGHTING }];
        this.retreat = [CardType.COLORLESS, CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Outrage',
                cost: [CardType.COLORLESS, CardType.COLORLESS],
                damage: '20+',
                text: 'Does 10 more damage for each damage counter on this Pokémon.',
            },
            {
                name: 'Bolt Strike',
                cost: [CardType.LIGHTNING, CardType.LIGHTNING, CardType.COLORLESS],
                damage: '120',
                text: 'This Pokémon does 40 damage to itself.',
            },
        ];
        this.set = 'BW';
        this.name = 'Zekrom';
        this.fullName = 'Zekrom BW';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            effect.damage += effect.player.active.damage;
            return state;
        }
        if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
            const player = effect.player;
            const dealDamage = new DealDamageEffect(effect, 40);
            dealDamage.target = player.active;
            return store.reduceEffect(state, dealDamage);
        }
        return state;
    }
}
