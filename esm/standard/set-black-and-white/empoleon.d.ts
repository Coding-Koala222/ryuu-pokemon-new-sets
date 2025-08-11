import { CardType, Effect, PokemonCard, PowerType, Stage, State, StoreLike } from '@ptcg/common';
export declare class Empoleon extends PokemonCard {
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
        useWhenInPlay: boolean;
        powerType: PowerType;
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
    readonly DIVING_DRAW_MAREKER = "DIVING_DRAW_MAREKER";
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
