import { CardType, Effect, PokemonCard, PowerType, Stage, State, StoreLike } from '@ptcg/common';
export declare class Shuckle extends PokemonCard {
    stage: Stage;
    cardTypes: CardType[];
    hp: number;
    weakness: {
        type: CardType;
    }[];
    retreat: CardType[];
    powers: {
        name: string;
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
    readonly SHELL_STUNNER_MAREKER = "SHELL_STUNNER_MAREKER";
    readonly CLEAR_SHELL_STUNNER_MAREKER = "CLEAR_SHELL_STUNNER_MAREKER";
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
