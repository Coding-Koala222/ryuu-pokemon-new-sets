import { AddSpecialConditionsEffect, AttackEffect, CardType, CoinFlipPrompt, GameMessage, PokemonCard, SpecialCondition, Stage, } from '@ptcg/common';
export class Tynamo extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.LIGHTNING];
        this.hp = 40;
        this.weakness = [{ type: CardType.FIGHTING }];
        this.retreat = [CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Thunder Wave',
                cost: [CardType.LIGHTNING],
                damage: '10',
                text: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.',
            },
        ];
        this.set = 'BW';
        this.name = 'Tynamo';
        this.fullName = 'Tynamo NV';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            return store.prompt(state, [new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP)], result => {
                if (result === true) {
                    const specialConditionEffect = new AddSpecialConditionsEffect(effect, [SpecialCondition.PARALYZED]);
                    store.reduceEffect(state, specialConditionEffect);
                }
            });
        }
        return state;
    }
}
