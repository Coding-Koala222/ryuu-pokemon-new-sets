import { CardType, Effect, PokemonCard, Stage, State, StoreLike } from '@ptcg/common';
export declare class Reshiram extends PokemonCard {
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
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
