import React from 'react';
import AppState from './../AppState.js';
import CONSTANTS from './../Constants.js'

// Class represents the text that rocks back and forth, saying win, lose, or draw when the game is over
class GameOverMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            style: { left: props.x + 'px', top: props.y + 'px', position: 'absolute', visibility: 'hidden'},
            msg : ""
            };
        this.showme = this.showme.bind(this);
        AppState.game_over_message_ref = this;
    }
    
    // Cause the text to become visible
    showme() {
            let style_copy = { left: this.state.style.left, top: this.state.style.top, position: this.state.style.position, visibility: 'visible'};
            this.setState({style : style_copy });
            let new_message = CONSTANTS.DRAW_MESSAGE;
            if (AppState.score > 5) { new_message = CONSTANTS.WIN_MESSAGE; }
            if (AppState.score < 5) { new_message = CONSTANTS.LOSE_MESSAGE; }
            this.setState({msg : new_message});
        }

    render() {

        return (
            <div style={this.state.style} className="game_over_message">
            {this.state.msg}
            </div>
            );
    }
}

export default GameOverMessage;