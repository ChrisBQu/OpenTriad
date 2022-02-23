import React from 'react';
import CONSTANTS from './../Constants.js';
import AppState from './../AppState.js';

// Class represents the score, and the visual rendering and tracking of it
class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            style: { left: props.x + 'px', top: props.y + 'px', position: 'absolute' },
            score_blue: 5,
            score_red : 5
            };
        this.countScore = this.countScore.bind(this);
        AppState.score_reference = this;
    }
    
    // Update the values of the score to be rendered
    countScore() { 
        this.setState({ score_blue : AppState.score, score_red : 10-AppState.score}); 
    }

    render() {
        let sl = { float: 'left' };
        return (
            <div>
                <div className="score" style={this.state.style}>{this.state.score_blue}</div>
                <div className="score_two" style={this.state.style}>{this.state.score_red}</div>
            </div>
            );
    }
}

export default Score;