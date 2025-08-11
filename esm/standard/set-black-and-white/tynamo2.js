import { AttackEffect, CardType, ChoosePokemonPrompt, GameMessage, PlayerType, PokemonCard, PutDamageEffect, SlotType, Stage, StateUtils, } from '@ptcg/common';
export class Tynamo2 extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.LIGHTNING];
        this.hp = 40;
        this.weakness = [{ type: CardType.FIGHTING }];
        this.retreat = [CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Spark',
                cost: [CardType.LIGHTNING],
                damage: '10',
                text: 'Does 10 damage to 1 of your opponent\'s Benched Pokémon. ' +
                    '(Don\'t apply Weakness and Resistance for Benched Pokémon.)',
            },
        ];
        this.set = 'BW';
        this.name = 'Tynamo';
        this.fullName = 'Tynamo DEX';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = StateUtils.getOpponent(state, player);
            const hasBenched = opponent.bench.some(b => b.pokemons.cards.length > 0);
            if (!hasBenched) {
                return state;
            }
            return store.prompt(state, new ChoosePokemonPrompt(player.id, GameMessage.CHOOSE_POKEMON_TO_DAMAGE, PlayerType.TOP_PLAYER, [SlotType.BENCH], { allowCancel: false }), targets => {
                if (!targets || targets.length === 0) {
                    return;
                }
                const damageEffect = new PutDamageEffect(effect, 10);
                damageEffect.target = targets[0];
                store.reduceEffect(state, damageEffect);
            });
        }
        return state;
    }
}
