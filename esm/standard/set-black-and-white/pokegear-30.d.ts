import { Effect, State, StoreLike, TrainerCard, TrainerType } from '@ptcg/common';
export declare class Pokegear30 extends TrainerCard {
    trainerType: TrainerType;
    set: string;
    name: string;
    fullName: string;
    text: string;
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
