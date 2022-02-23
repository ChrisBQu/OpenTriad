import CONSTANTS from './Constants.js';

var AppState = {
    selectedCard: null,
    selectedCardComponent: null,
    player_cards:[null, null, null, null, null],
    opponent_cards:[null, null, null, null, null],
    board_cards:[null, null, null, null, null, null, null, null, null],
    board_reference : null,
    playerTurn : true,
    score : 5,
    score_reference : null,
    game_over : false,
    game_over_message_ref : null,
    difficulty: CONSTANTS.DIFFICULTY_EASY,
    blocked : false,
    dialog_refs : [null, null]
};

export default AppState;