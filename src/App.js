import './App.css';
import React from 'react';
import Board from './Components/BoardComponent.js';
import CONSTANTS from './Constants.js';
import OpponentHand from './Components/OpponentHandComponent.js';
import PlayerHand from './Components/PlayerHandComponent.js';
import Score from './Components/ScoreComponent.js';
import GameOverMessage from './Components/GameOverMessageComponent.js';
import restartGame from './Logic/RestartGame.js';
import ResetDialog from './Components/ResetDialogComponent.js';
import OptionsDialog from './Components/OptionsDialogComponent.js';
import AppState from './AppState.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { key : 1, myResetDialog : null, reset_style : "restart_button", options_style : "options_button" }
        this.restart = this.restart.bind(this);
        this.popResetDialog = this.popResetDialog.bind(this);
        this.popOptionsDialog = this.popOptionsDialog.bind(this);
        this.restoreButtons = this.restoreButtons.bind(this);
        }

    // Restart the game by resetting everything
    restart() { 
        this.setState({key : this.state.key+1}); 
        restartGame(); 
        this.restoreButtons();
    }

    // Restore the buttons stylings after the reset game dialog is closed
    restoreButtons() {
        this.setState({ options_style : "options_button" });
        this.setState({ reset_style : "restart_button" });   
    }


    // Opening a dialog box will disable styling for the buttons
    popResetDialog() { 
        this.setState({ options_style : "options_button_disabled" });
        this.setState({ reset_style : "restart_button_disabled" });
        if (!AppState.blocked) { AppState.dialog_refs[0].open(); }
    }
    popOptionsDialog() {
        this.setState({ options_style : "options_button_disabled" });
        this.setState({ reset_style : "restart_button_disabled" });
        if (!AppState.blocked) { AppState.dialog_refs[1].open(); }
    }


    render() {

    return (
            <div>
                <ResetDialog callbackYes={this.restart} callbackNo={this.restoreButtons}/>
                <OptionsDialog callback={this.restoreButtons}/>
                <PlayerHand x={CONSTANTS.PLAYER_HAND_X} y={CONSTANTS.PLAYER_HAND_Y} key={this.state.key+1} />
                <Board x={CONSTANTS.BOARD_X} y={CONSTANTS.BOARD_Y} key={this.state.key+2}/>
                <OpponentHand x={CONSTANTS.OPPONENT_HAND_X} y={CONSTANTS.OPPONENT_HAND_Y} key={this.state.key+3} />
                <Score x={CONSTANTS.SCORE_X} y={CONSTANTS.SCORE_Y} key={this.state.key+4}/>;
                <GameOverMessage x={CONSTANTS.GAME_OVER_MESSAGE_X} y={CONSTANTS.GAME_OVER_MESSAGE_Y} key={this.state.key+5}/>;
                <button className={this.state.reset_style} onClick={this.popResetDialog}>Reset</button>
                <button className={this.state.options_style} onClick={this.popOptionsDialog}>Options</button>
            </div>
            );
        }
}

export default App;