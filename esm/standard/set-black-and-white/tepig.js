import { CardType, PokemonCard, Stage } from '@ptcg/common';
export class Tepig extends PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = Stage.BASIC;
        this.cardTypes = [CardType.FIRE];
        this.hp = 60;
        this.weakness = [
            {
                type: CardType.WATER,
            },
        ];
        this.retreat = [CardType.COLORLESS];
        this.attacks = [
            { name: 'Tackle', cost: [CardType.FIRE], damage: '10', text: '' },
            {
                name: 'Rollout',
                cost: [CardType.FIRE, CardType.COLORLESS],
                damage: '20',
                text: '',
            },
        ];
        this.set = 'BW';
        this.name = 'Tepig';
        this.fullName = 'Tepig BW';
    }
}
