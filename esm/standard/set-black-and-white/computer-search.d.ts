import { CardTag, Effect, State, StoreLike, TrainerCard, TrainerType } from '@ptcg/common';
export declare class ComputerSearch extends TrainerCard {
    trainerType: TrainerType;
    tags: CardTag[];
    set: string;
    name: string;
    fullName: string;
    text: string;
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
