import React from 'react';
import CONSTANTS from './../Constants.js';
import AppState from './../AppState.js';
import Card from './../CardClass.js';
import CardNumbers from './CardNumberComponent.js'

// Class represents a player's card, in hand
class PlayerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: { left: 0 + 'px', top: 0 + 'px', zIndex: props.id }, value: new Card(props.name, CONSTANTS.COLOR_BLUE), hovered: false, selected: false, alive : true, id : parseInt(props.id)};
        this.handleHoverOn = this.handleHoverOn.bind(this);
        this.handleHoverOff = this.handleHoverOff.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.unselect = this.unselect.bind(this);
        this.kill = this.kill.bind(this);
        AppState.player_cards[this.state.id] = this.state.value;
    }

    unselect() { this.setState({ selected: false }); }

    // Remove the card from the hand
    kill() {
        this.unselect();
        AppState.player_cards[this.state.id] = null;
        this.setState({ alive: false });
    }

    handleHoverOn() { 
        if (!AppState.blocked && AppState.playerTurn) {
                        if (AppState.selectedCardComponent == null) { 
                this.setState({ hovered: true});
                            }
        }
    }

    handleHoverOff() { 
        if (!AppState.blocked) {
            this.setState({ hovered: false}); 
        }
    }

    // When a card is clicked, if it is already selected, put it back.
    // Otherwise, update it so that it is the currently selected card
    handleClick() {
        if (AppState.playerTurn) {

            if (AppState.selectedCardComponent == this) {
                AppState.selectedCardComponent.unselect(); 
                AppState.selectedCardComponent = null;
                AppState.selectedCard = null
            }

            else {
                if (AppState.selectedCardComponent != null) { AppState.selectedCardComponent.unselect(); }   
                AppState.selectedCardComponent = this;
                AppState.selectedCard = this.state.value;
                this.setState({ selected: true });
            }

         }
    }

    render() {

        // Allow the card to slide forward when it is hovered, or selected
        let sl = "card_player";
        if (this.state.hovered) { sl = "card_player_slide"; }
        if (this.state.selected) { sl = "card_player_selected"; }
        let wrapper_style = { width: CONSTANTS.CARD_WIDTH + CONSTANTS.CARD_SLIDE_WIDTH + 'px', height: CONSTANTS.CARD_HEIGHT + 'px', left: this.props.x + 'px', top: this.props.y + 'px', position : 'absolute' };
   
        if (this.state.alive) {
            return (
                <div onMouseOver={this.handleHoverOn} onMouseOut={this.handleHoverOff} onClick={this.handleClick} style={wrapper_style}>
                    <div className={sl} style={this.state.style}>
                    <CardNumbers value={this.state.value} />
                    </div>
                </div>
            );
        }
        return(<div></div>);
    }
}

export default PlayerCard;