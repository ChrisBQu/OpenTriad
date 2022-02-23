import AppState from './../AppState.js';
import CONSTANTS from './../Constants.js';
import PlacedCard from './../Components/PlacedCardComponent.js'
import getAIMove from './MinMax.js';

function delayedTakeTurn() {

    // Use the minmax algorithm to get a move, represented as a tuple
    let move_tuple = [-1, -1];
    move_tuple = getAIMove(AppState.difficulty);

    // Make the move if it is valid
    if (move_tuple[0] != -1 && move_tuple[1] != -1) {
        AppState.selectedCardComponent = AppState.opponent_cards[move_tuple[0]];
        AppState.selectedCard = AppState.opponent_cards[move_tuple[0]].state.value;
        let new_card = <PlacedCard x={CONSTANTS.OPPONENT_HAND_X} y={20} dest={move_tuple[1]} value={AppState.selectedCard}/>;
        AppState.board_reference.placeCard(move_tuple[1], new_card);
        AppState.selectedCardComponent.kill();
        AppState.selectedCardComponent = null;
        AppState.selectedCard = null;
        for (const each_card of AppState.opponent_cards) { if (each_card != null) { each_card.stop_bobbing(); } }
        AppState.playerTurn = true;
     }

    // If it wasn't valid, the game must be over
    else {
         for (const each_card of AppState.opponent_cards) { if (each_card != null) { each_card.fadeout(); } }
         AppState.game_over = true;
         AppState.game_over_message_ref.showme();
        }
}

const opponentTakeTurn = function() {
    // Sanity check, and give a short delay before the turn is taken
    if (!AppState.playerTurn) {
            setTimeout(delayedTakeTurn, 1000);
        }
}

export default opponentTakeTurn;