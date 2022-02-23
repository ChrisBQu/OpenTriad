import React from 'react';
import BoardSpace from './BoardSpaceComponent.js';
import CONSTANTS from './../Constants.js'
import AppState from './../AppState.js'

// Class represents the game board
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            style: {
                width: parseInt(CONSTANTS.CARD_WIDTH*3 + 4) + 'px', 
                height : parseInt(CONSTANTS.CARD_HEIGHT*3 + 4), 
                left: parseInt(props.x - 2) + 'px',
                top : parseInt(props.y - 2) + 'px' 
            },
            mySpaces: [],
            myCards : [null, null, null, null, null, null, null, null, null]
    };

        // Create nine spaces on the board
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.state.mySpaces.push(<BoardSpace x={CONSTANTS.CARD_WIDTH * i + 1} y={CONSTANTS.CARD_HEIGHT * j + 1} id={3*j+i} />);
            }
        }

        // Bind functions, and create a reference to this board in the AppState object
        AppState.board_reference = this;
        this.placeCard = this.placeCard.bind(this);
        this.spaceIsFree = this.spaceIsFree.bind(this);
        this.flipCheck = this.flipCheck.bind(this);
    }

    // When a new card lands on the board, we have to check the cards around it, as some of them may have to be flipped in accordance with the rules of the game
    flipCheck(slot_num, card) {
        let v = card.props.value;
        if (slot_num == 0) {
                if (!this.spaceIsFree(1)) { if (v.right > this.state.myCards[1].props.value.left && v.color != this.state.myCards[1].props.value.color) { AppState.board_cards[1].flip(); }; }
                if (!this.spaceIsFree(3)) { if (v.down > this.state.myCards[3].props.value.up && v.color != this.state.myCards[3].props.value.color) { AppState.board_cards[3].flip(); }; }
        }
        if (slot_num == 1) {
                if (!this.spaceIsFree(0)) { if (v.left > this.state.myCards[0].props.value.right && v.color != this.state.myCards[0].props.value.color) { AppState.board_cards[0].flip(); }; }
                if (!this.spaceIsFree(2)) { if (v.right > this.state.myCards[2].props.value.left && v.color != this.state.myCards[2].props.value.color) { AppState.board_cards[2].flip(); }; }
                if (!this.spaceIsFree(4)) { if (v.down > this.state.myCards[4].props.value.up && v.color != this.state.myCards[4].props.value.color) { AppState.board_cards[4].flip(); }; }
        }
        if (slot_num == 2) {
                if (!this.spaceIsFree(1)) { if (v.left > this.state.myCards[1].props.value.right && v.color != this.state.myCards[1].props.value.color) { AppState.board_cards[1].flip(); }; }
                if (!this.spaceIsFree(5)) { if (v.down > this.state.myCards[5].props.value.up && v.color != this.state.myCards[5].props.value.color) { AppState.board_cards[5].flip(); }; }
        }
        if (slot_num == 3) {
                if (!this.spaceIsFree(0)) { if (v.up > this.state.myCards[0].props.value.down && v.color != this.state.myCards[0].props.value.color) { AppState.board_cards[0].flip(); }; }
                if (!this.spaceIsFree(4)) { if (v.right > this.state.myCards[4].props.value.left && v.color != this.state.myCards[4].props.value.color) { AppState.board_cards[4].flip(); }; }
                if (!this.spaceIsFree(6)) { if (v.down > this.state.myCards[6].props.value.up && v.color != this.state.myCards[6].props.value.color) { AppState.board_cards[6].flip(); }; }
        }
        if (slot_num == 4) {
                if (!this.spaceIsFree(1)) { if (v.up > this.state.myCards[1].props.value.down && v.color != this.state.myCards[1].props.value.color) { AppState.board_cards[1].flip(); }; }
                if (!this.spaceIsFree(3)) { if (v.left > this.state.myCards[3].props.value.right && v.color != this.state.myCards[3].props.value.color) { AppState.board_cards[3].flip(); }; }
                if (!this.spaceIsFree(5)) { if (v.right > this.state.myCards[5].props.value.left && v.color != this.state.myCards[5].props.value.color) { AppState.board_cards[5].flip(); }; }
                if (!this.spaceIsFree(7)) { if (v.down > this.state.myCards[7].props.value.up && v.color != this.state.myCards[7].props.value.color) { AppState.board_cards[7].flip(); }; }
        }
        if (slot_num == 5) {
                if (!this.spaceIsFree(2)) { if (v.up > this.state.myCards[2].props.value.down && v.color != this.state.myCards[2].props.value.color) { AppState.board_cards[2].flip(); }; }
                if (!this.spaceIsFree(4)) { if (v.left > this.state.myCards[4].props.value.right && v.color != this.state.myCards[4].props.value.color) { AppState.board_cards[4].flip(); }; }
                if (!this.spaceIsFree(8)) { if (v.down > this.state.myCards[8].props.value.up && v.color != this.state.myCards[8].props.value.color) { AppState.board_cards[8].flip(); }; }
        }
        if (slot_num == 6) {
                if (!this.spaceIsFree(3)) { if (v.up > this.state.myCards[3].props.value.down && v.color != this.state.myCards[3].props.value.color) { AppState.board_cards[3].flip(); }; }
                if (!this.spaceIsFree(7)) { if (v.right > this.state.myCards[7].props.value.left && v.color != this.state.myCards[7].props.value.color) { AppState.board_cards[7].flip(); }; }
        }
        if (slot_num == 7) {
                if (!this.spaceIsFree(4)) { if (v.up > this.state.myCards[4].props.value.down && v.color != this.state.myCards[4].props.value.color) { AppState.board_cards[4].flip(); }; }
                if (!this.spaceIsFree(6)) { if (v.left > this.state.myCards[6].props.value.right && v.color != this.state.myCards[6].props.value.color) { AppState.board_cards[6].flip(); }; }
                if (!this.spaceIsFree(8)) { if (v.right > this.state.myCards[8].props.value.left && v.color != this.state.myCards[8].props.value.color) { AppState.board_cards[8].flip(); }; }
        }
        if (slot_num == 8) {
                if (!this.spaceIsFree(5)) { if (v.up > this.state.myCards[5].props.value.down && v.color != this.state.myCards[5].props.value.color) { AppState.board_cards[5].flip(); }; }
                if (!this.spaceIsFree(7)) { if (v.left > this.state.myCards[7].props.value.right && v.color != this.state.myCards[7].props.value.color) { AppState.board_cards[7].flip(); }; }
        }
    }

    // Put a card on the board at a certain spot, and call the flip checks
    placeCard(slot_num, card) {
        let temp_copy = this.state.myCards;
        temp_copy[slot_num] = card;
        this.setState({ myCards : temp_copy });
        this.flipCheck(slot_num, card);
    }

    // Helper function: check whether a slot is free
    spaceIsFree(slot_num) { return (this.state.myCards[slot_num] == null); }

    render() {
        return (
            <div>
                {this.state.myCards[0]}{this.state.myCards[1]}{this.state.myCards[2]}
                {this.state.myCards[3]}{this.state.myCards[4]}{this.state.myCards[5]}
                {this.state.myCards[6]}{this.state.myCards[7]}{this.state.myCards[8]}
            <div className="board_wrapper" style={this.state.style}>
                {this.state.mySpaces[0]} {this.state.mySpaces[1]} {this.state.mySpaces[2]}
                {this.state.mySpaces[3]} {this.state.mySpaces[4]} {this.state.mySpaces[5]}
                {this.state.mySpaces[6]} {this.state.mySpaces[7]} {this.state.mySpaces[8]}
            </div>
            </div>
        );
    }
}

export default Board;