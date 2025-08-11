import { Effect, State, StoreLike, TrainerCard, TrainerType } from '@ptcg/common';
export declare class ExpShare extends TrainerCard {
    trainerType: TrainerType;
    set: string;
    name: string;
    fullName: string;
    text: string;
    readonly EXP_SHARE_MARKER: string;
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
