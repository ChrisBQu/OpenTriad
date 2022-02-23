import React from 'react';

// Class represents the numbers drawn on a card
class CardNumbers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }

    render() {
            return (
                <div className="card_numbers">
                &nbsp;&nbsp;&nbsp;&nbsp;{this.state.value.up}<br />
                &nbsp;{this.state.value.left} &nbsp;&nbsp;&nbsp;{this.state.value.right}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{this.state.value.down}
                </div>
            );
        }
}

export default CardNumbers;