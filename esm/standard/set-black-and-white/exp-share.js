import { AttachEnergyPrompt, CardList, EnergyType, GameMessage, GamePhase, KnockOutEffect, PlayerType, SlotType, StateUtils, SuperType, TrainerCard, TrainerType, } from '@ptcg/common';
export class ExpShare extends TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = TrainerType.TOOL;
        this.set = 'BW';
        this.name = 'Exp Share';
        this.fullName = 'Exp Share SUM';
        this.text = 'When your Active Pokémon is Knocked Out by damage from an opponent\'s ' +
            'attack, you may move 1 basic Energy card that was attached to that ' +
            'Pokémon to the Pokémon this card is attached to.';
        this.EXP_SHARE_MARKER = 'EXP_SHARE_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof KnockOutEffect && effect.target === effect.player.active) {
            const player = effect.player;
            const opponent = StateUtils.getOpponent(state, player);
            const active = effect.target;
            // Do not activate between turns, or when it's not opponents turn.
            if (state.phase !== GamePhase.ATTACK || state.players[state.activePlayer] !== opponent) {
                return state;
            }
            if (active.marker.hasMarker(this.EXP_SHARE_MARKER)) {
                return state;
            }
            let expShareCount = 0;
            const blockedTo = [];
            player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (pokemonSlot, card, target) => {
                if (pokemonSlot === effect.target) {
                    return;
                }
                if (pokemonSlot.trainers.cards.some(t => t instanceof ExpShare)) {
                    expShareCount++;
                }
                else {
                    blockedTo.push(target);
                }
            });
            if (expShareCount === 0) {
                return state;
            }
            // Add marker, do not invoke this effect for other exp. share
            active.marker.addMarker(this.EXP_SHARE_MARKER, this);
            // Make copy of the active pokemon cards,
            // because they will be transfered to discard shortly
            const activeCopy = new CardList();
            activeCopy.cards = player.active.energies.cards.slice();
            state = store.prompt(state, new AttachEnergyPrompt(player.id, GameMessage.ATTACH_ENERGY_TO_BENCH, activeCopy, PlayerType.BOTTOM_PLAYER, [SlotType.BENCH], { superType: SuperType.ENERGY, energyType: EnergyType.BASIC }, {
                allowCancel: true,
                min: 1,
                max: expShareCount,
                differentTargets: true,
                blockedTo,
            }), transfers => {
                transfers = transfers || [];
                active.marker.removeMarker(this.EXP_SHARE_MARKER);
                for (const transfer of transfers) {
                    const target = StateUtils.getTarget(state, player, transfer.to);
                    player.discard.moveCardTo(transfer.card, target.energies);
                }
            });
        }
        return state;
    }
}
