import { CardType, Effect, PokemonCard, PowerType, Stage, State, StoreLike } from '@ptcg/common';
export declare class Eelektrik extends PokemonCard {
    stage: Stage;
    evolvesFrom: string;
    cardTypes: CardType[];
    hp: number;
    weakness: {
        type: CardType;
    }[];
    retreat: CardType[];
    powers: {
        name: string;
        powerType: PowerType;
        useWhenInPlay: boolean;
        text: string;
    }[];
    attacks: {
        name: string;
        cost: CardType[];
        damage: string;
        text: string;
    }[];
    set: string;
    name: string;
    fullName: string;
    readonly DYNAMOTOR_MAREKER = "DYNAMOTOR_MAREKER";
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
