import { CardType, GameMessage, PokemonCard, PokemonSlot } from '@ptcg/common';
export declare const VALUE_TO_TYPE: {
    [key: string]: CardType;
};
export declare const PROMPT_OPTIONS: {
    message: GameMessage;
    value: string;
}[];
export declare function getMarkerType(self: PokemonCard, markerType: string, target: PokemonSlot): CardType | undefined;
export declare function removeMarkersByName(markerType: string, target: PokemonSlot): void;
