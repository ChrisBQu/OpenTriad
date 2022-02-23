import React from 'react';
import AppState from './../AppState.js';
import PlacedCard from './PlacedCardComponent.js';
import opponentTakeTurn from './../Logic/OpponentTakeTurn.js';

// Class represents one square on the board
class BoardSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = { style: { left: props.x + 'px', top: props.y + 'px', position: 'absolute'}, card: null, hovered: true, id : parseInt(props.id)};
        this.handleHover = this.handleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

        // Unless the clicked spot was blank, and no dialog is open, we don't care about this event at all
        if (!AppState.blocked && AppState.selectedCard != null && AppState.playerTurn && AppState.board_reference.spaceIsFree(this.state.id)) {
            let new_card = <PlacedCard x={AppState.selectedCardComponent.props.x} y={AppState.selectedCardComponent.props.y} dest={this.state.id} value={AppState.selectedCard}/>;
            AppState.selectedCardComponent.kill();

            // It's time to start the "thinking" card bob effect
            for (const each_card of AppState.opponent_cards) { if (each_card != null) { each_card.start_bobbing(); } }

            // Place the card, and trigger the computer opponent taking its turn
            AppState.board_reference.placeCard(this.state.id, new_card);
            AppState.selectedCard = null;
            AppState.selectedCardComponent = null;
            AppState.playerTurn = false;
            opponentTakeTurn();
        }
    }

    handleHover() { 
        if (!AppState.blocked) {
                this.setState({ hovered: !this.state.hovered }); 
            }
    }

    render() {
        const myClass = this.state.hovered ? "board_space" : "board_space_hovered";
        return (<div className={myClass} style={this.state.style} onMouseOver={this.handleHover} onMouseOut={this.handleHover} onClick={this.handleClick}></div>);
    }
}

export default BoardSpace;