import React from 'react';
import CONSTANT from './../Constants.js';
import CardNumbers from './CardNumberComponent.js';
import AppState from './../AppState.js';
import CardFrame from './CardFrameComponent.js';
// Class represents a card as it moves from one player's hand, and then lands on the board
class PlacedCard extends React.Component {
    constructor(props) {
        super(props);
        // Ensure that the zIndex is greater than all of the cards already on the board
        let cards_on_board = 0;
        for (const each_card of AppState.board_cards) { cards_on_board++; }
        this.state = { 
            style: { left: props.x + 'px', top: props.y + 'px', animation: 'hand_to_board_slide' + parseInt(props.dest) + ' 500ms forwards',  zIndex: cards_on_board, 
                }, 
            value: props.value,
            myClass : (props.value.color == CONSTANT.COLOR_BLUE ? "card_placed_blue" : "card_placed_red")
            };
        this.flip = this.flip.bind(this);
        AppState.board_cards[props.dest] = this;
    }
    
    // Change from red to blue, or from blue to red
    flip() {
        if (this.state.value.color == CONSTANT.COLOR_BLUE) { AppState.score--; }
        else { AppState.score++; }
        let temp_card = this.state.value;
        temp_card.color = (temp_card.color == CONSTANT.COLOR_BLUE ? CONSTANT.COLOR_RED : CONSTANT.COLOR_BLUE);
        this.setState({ value : temp_card });
        let temp_style = { left: this.state.style.left, top: this.state.style.top, animation: this.state.style.animation };
        this.setState({ style : temp_style });
        this.setState({ myClass : (this.state.value.color == CONSTANT.COLOR_BLUE ? "card_placed_blue" : "card_placed_red") });
        AppState.score_reference.countScore(); // The only time a score can change is when a card is flipped
    }


    render() {
        return (
            <div>
                <div className={this.state.myClass} style={this.state.style}>
                    <CardNumbers value={this.state.value} />
                </div>
            </div>
            );
    }
}

export default PlacedCard;