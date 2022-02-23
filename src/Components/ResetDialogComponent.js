import React from 'react';
import CONSTANTS from './../Constants.js';
import AppState from './../AppState.js';

// Class is a window asking for yes/no confirmation before resetting the game
class ResetDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            style: { left: props.x + 'px', top: props.y + 'px', position: 'absolute' },
            myClass : "reset_dialog",
            callbackYes : props.callbackYes, callbackNo : props.callbackNo
            };
        AppState.dialog_refs[0] = this;
        this.open = this.open.bind(this);
        this.closeAndNo = this.closeAndNo.bind(this);
        this.closeAndYes = this.closeAndYes.bind(this);
    }
    
    // Open and close the dialog window
    open() { 
        this.setState({myClass : "reset_dialog_open"});
        AppState.blocked = true;
    }
    closeAndNo() { 
        this.setState({myClass : "reset_dialog"}); 
        AppState.blocked = false;
        if (this.state.callbackYes != null) { this.state.callbackNo(); }
    }
    closeAndYes() {
        this.setState({myClass : "reset_dialog"}); 
        AppState.blocked = false;
        if (this.state.callbackYes != null) { this.state.callbackYes(); }
    }

    render() {
        let spacer = { float: 'left', width: '50px' };
        return (
            <div>
            <div className={this.state.myClass}>{CONSTANTS.RESTART_MESSAGE}<br/>
                    <div><button className="reset_yesno" onClick={this.closeAndYes}>{CONSTANTS.RESET_YES_TEXT}</button></div>
                    <div style={spacer}>&nbsp;</div>
                    <div><button className="reset_yesno" onClick={this.closeAndNo}>{CONSTANTS.RESET_NO_TEXT}</button></div>
            </div>
            
            </div>
            );
    }
}

export default ResetDialog;