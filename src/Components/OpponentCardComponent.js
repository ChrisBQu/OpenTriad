import React from 'react';
import CONSTANTS from './../Constants.js';
import Card from './../CardClass.js';
import CardNumbers from './CardNumberComponent.js'
import AppState from './../AppState.js';

// Class represents an opponent's card, in hand
class OpponentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { style: { left: props.x + 'px', top: props.y + 'px' }, value: new Card(props.name, CONSTANTS.COLOR_RED), alive : true, id : props.id};
        AppState.opponent_cards[this.state.id] = this;
        this.kill = this.kill.bind(this);
        this.unselect = this.unselect.bind(this);
        this.start_bobbing = this.start_bobbing.bind(this);
        this.stop_bobbing = this.stop_bobbing.bind(this);
        this.fadeout = this.fadeout.bind(this);
    }

    // Start the "thinking" bobbing animation
    start_bobbing() { 
        let style_copy = { left: this.props.x + 'px', top: this.props.y + 'px', animation: "cardbob 1.0s infinite", animationDelay: 100*this.props.id + 'ms'};
        this.setState({"style" : style_copy});
    }

    // Stop the "thinking" bobbing animation
    stop_bobbing() { 
        let style_copy = { left: this.props.x + 'px', top: this.props.y + 'px', animation: 'none' };
        this.setState({"style" : style_copy});
    }

    // Fade the card out, if it is in the hand when the game ends
    fadeout() {
        let style_copy = { left: this.props.x + 'px', top: this.props.y + 'px', animation: 'cardfade 0.25s forwards' };
        this.setState({"style" : style_copy});
        }

    // If a call is made to unselect this card, safely do nothing. It's so this can be called on a card object without checking its type first
    unselect() { return; } 

    // Remove the card from the hand
    kill() {
        AppState.opponent_cards[this.state.id] = null;
        this.setState({ alive: false });
    }

    render() {
        if (this.state.alive) {
            return (
                <div className={"card_opponent"} style={this.state.style}>
                <CardNumbers value={this.state.value} />
                </div>
            );
        }
        return(<div></div>);
    }
}

export default OpponentCard;