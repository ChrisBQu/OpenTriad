import React from 'react';
import PlayerCard from './PlayerCardComponent.js';
import CONSTANTS from './../Constants.js';

// Class represents the player's hand
class PlayerHand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: { left: props.x + 'px', top: props.y + 'px' },
            // Create some cards to fill the player's hand

            cards:
                [
                    <PlayerCard x={props.x} y={props.y} id={0} name="random" />,
                    <PlayerCard x={props.x} y={props.y + CONSTANTS.CARD_SPACING} id={1} name="random" />,
                    <PlayerCard x={props.x} y={props.y + CONSTANTS.CARD_SPACING * 2} id={2} name="random" />,
                    <PlayerCard x={props.x} y={props.y + CONSTANTS.CARD_SPACING * 3} id={3} name="random" />,
                    <PlayerCard x={props.x} y={props.y + CONSTANTS.CARD_SPACING * 4} id={4} name="random" />
                ]
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
export default PlayerHand;