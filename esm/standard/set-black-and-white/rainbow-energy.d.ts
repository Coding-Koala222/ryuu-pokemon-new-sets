import { CardType, Effect, EnergyCard, EnergyType, State, StoreLike } from '@ptcg/common';
export declare class RainbowEnergy extends EnergyCard {
    provides: CardType[];
    energyType: EnergyType;
    set: string;
    name: string;
    fullName: string;
    text: string;
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
