import CONSTANTS from './../Constants.js';
import AppState from './../AppState.js';
import React from 'react';
import Board from './../Components/BoardComponent.js';
import OpponentHand from './../Components/OpponentHandComponent.js';
import PlayerHand from './../Components/PlayerHandComponent.js';
import Score from './../Components/ScoreComponent.js';
import GameOverMessage from './../Components/GameOverMessageComponent.js';

function restartGame() {

    AppState.selectedCard= null;
    AppState.selectedCardComponent = null
    AppState.player_cards = [null, null, null, null, null];
    AppState.opponent_cards = [null, null, null, null, null];
    AppState.board_cards = [null, null, null, null, null, null, null, null, null];
    AppState.playerTurn = true;
    AppState.score = 5;
    AppState.game_over = false;
    }

export default restartGame;