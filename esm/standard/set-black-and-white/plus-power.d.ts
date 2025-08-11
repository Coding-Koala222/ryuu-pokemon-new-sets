import { Effect, State, StoreLike, TrainerCard, TrainerType } from '@ptcg/common';
export declare class PlusPower extends TrainerCard {
    trainerType: TrainerType;
    set: string;
    name: string;
    fullName: string;
    text: string;
    private readonly PLUS_POWER_MARKER;
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
