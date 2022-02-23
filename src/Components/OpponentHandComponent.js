import React from 'react';
import OpponentCard from './OpponentCardComponent.js';
import CONSTANTS from './../Constants.js';

// Class represents the opponent's hand
class OpponentHand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: { left: props.x + 'px', top: props.y + 'px' },
            // Create some cards to fill the opponent's hand
            cards: 
               [<OpponentCard x={props.x} y={props.y} id={0} name="random" />,
                <OpponentCard x={props.x} y={props.y + CONSTANTS.CARD_SPACING} id={1} name="random" />,
                <OpponentCard x={props.x} y={props.y + CONSTANTS.CARD_SPACING * 2} id={2} name="random" />,
                <OpponentCard x={props.x} y={props.y + CONSTANTS.CARD_SPACING * 3} id={3} name="random" />,
                <OpponentCard x={props.x} y={props.y + CONSTANTS.CARD_SPACING * 4} id={4} name="random" />]
            };
    }

    render() {
        return (
            <div>
                {this.state.cards[0]}
                {this.state.cards[1]}
                {this.state.cards[2]}
                {this.state.cards[3]}
                {this.state.cards[4]}
            </div>
        );
    }
}

export default OpponentHand;