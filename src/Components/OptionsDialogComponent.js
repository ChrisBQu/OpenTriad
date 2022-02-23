import React from 'react';
import CONSTANTS from './../Constants.js';
import AppState from './../AppState.js';

// Class is a window letting the player change game options such as difficulty
class OptionsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            style: { left: props.x + 'px', top: props.y + 'px', position: 'absolute' },
            myClass : "options_dialog",
            callback : props.callback,
            difficulty: 2
            };
        AppState.dialog_refs[1] = this;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onDifficultyChange = this.onDifficultyChange.bind(this);
    }
    
    // Open and close the dialog window
    open() { 
        this.setState({myClass : "options_dialog_open"});
        AppState.blocked = true;
    }
    close() { 
        this.setState({myClass : "options_dialog"}); 
        AppState.blocked = false;
        if (this.state.callback != null) { this.state.callback(); }
    }

    // The game difficulty slider bar was changed
    onDifficultyChange(event) {
        let n = event.target.value;
        this.setState({difficulty: n});
        if (n == 1) { AppState.difficulty = CONSTANTS.DIFFICULTY_EASY; }
        if (n == 2) { AppState.difficulty = CONSTANTS.DIFFICULTY_MEDIUM; }
        if (n == 3) { AppState.difficulty = CONSTANTS.DIFFICULTY_HARD; }
     }

    render() {
        return (
            <div>
            <div className={this.state.myClass}>{CONSTANTS.OPTIONS_MESSAGE}<br/>
                    <div className="options_difficulty_slider_wrapper">
                        {CONSTANTS.EASY_OPTION_LABEL}&nbsp;<input type="range" min="1" max="3" value={this.state.difficulty} className="options_difficulty_slider" onChange={this.onDifficultyChange}/>&nbsp; {CONSTANTS.HARD_OPTION_LABEL}
                    </div>
                    <div><button className="options_closebutton" onClick={this.close}>{CONSTANTS.CLOSE_BUTTON_LABEL}</button></div>
            </div>
            
            </div>
            );
    }
}

export default OptionsDialog;