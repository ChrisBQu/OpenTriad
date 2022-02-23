import React from 'react';

// Class represents the golden border that appears overlayed on all the cards
class CardFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            style: { left: props.x + 'px', top: props.y + 'px', position: 'absolute' }
            };
    }
    

    render() {
        return (
            <div>
                <div style={this.state.style}>
                    <img src={require('./../assets/card_frame.png')} />
                </div>
            </div>
            );
    }
}

export default CardFrame;