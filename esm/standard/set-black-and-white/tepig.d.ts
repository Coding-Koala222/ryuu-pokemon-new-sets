import { CardType, PokemonCard, Stage } from '@ptcg/common';
export declare class Tepig extends PokemonCard {
    stage: Stage;
    cardTypes: CardType[];
    hp: number;
    weakness: {
        type: CardType;
    }[];
    retreat: CardType[];
    attacks: {
        name: string;
        cost: CardType[];
        damage: string;
        text: string;
    }[];
    set: string;
    name: string;
    fullName: string;
}
