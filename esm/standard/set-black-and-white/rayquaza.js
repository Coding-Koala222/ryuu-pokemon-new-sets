import { AfterDamageEffect, ApplyWeaknessEffect, AttackEffect, CardType, PokemonCard, Stage, StateUtils, } from '@ptcg/common';
export class Rayquaza extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.DRAGON];
        this.hp = 120;
        this.weakness = [{ type: CardType.DRAGON }];
        this.retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Dragon Pulse',
                cost: [CardType.LIGHTNING],
                damage: '40',
                text: 'Discard the top 2 cards of your deck.',
            },
            {
                name: 'Shred',
                cost: [CardType.FIRE, CardType.LIGHTNING, CardType.COLORLESS],
                damage: '90',
                text: 'This attack\'s damage isn\'t affected by any effects on the Defending Pokémon.',
            },
        ];
        this.set = 'BW';
        this.name = 'Rayquaza';
        this.fullName = 'Rayquaza DRV';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            player.deck.moveTo(player.discard, 2);
            return state;
        }
        if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
            const player = effect.player;
            const opponent = StateUtils.getOpponent(state, player);
            const applyWeakness = new ApplyWeaknessEffect(effect, 90);
            store.reduceEffect(state, applyWeakness);
            const damage = applyWeakness.damage;
            effect.damage = 0;
            if (damage > 0) {
                opponent.active.damage += damage;
                const afterDamage = new AfterDamageEffect(effect, damage);
                state = store.reduceEffect(state, afterDamage);
            }
        }
        return state;
    }
}
