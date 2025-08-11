import { CardType, Effect, EnergyCard, EnergyType, State, StoreLike } from '@ptcg/common';
export declare class RescueEnergy extends EnergyCard {
    provides: CardType[];
    energyType: EnergyType;
    set: string;
    name: string;
    fullName: string;
    readonly RESCUE_ENERGY_MAREKER = "RESCUE_ENERGY_MAREKER";
    text: string;
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
