import AppState from './../AppState.js';
import cardData from './../CardData.js';

// Heurestic for scoring the board: the more red cards, the better
function scoreState(state) {
    let total = 0;
    for (let i = 11; i < 20; i++) { 
        if (state[i] < 0) { total += 1; }
    }
    return total;
}

// The game state is represented as an array of 19 elements
// array[0] = turn (0 for player, 1 for opponent)
// array[1-5] = the cards in the player's hand, or 0 for no card
// array[6-10] = the cards in the opponent's hand, or 0 for no card
// array[11-18] = the cards on the board, or -1 for no card. Top to bottom, left to right
// Opponent cards are negative, player cards are positive
function getStateOfGame() {
    let return_state = Array(20);
    return_state[0] = AppState.playerTurn ? 0 : 1;  
    for (let i = 0; i < 5; i++) { 
        let got_card = AppState.player_cards[i];
        return_state[i+1] = 0;
        if (got_card != null) { return_state[i+1] = cardData[got_card.name].id; }
    }
    for (let i = 0; i < 5; i++) { 
        let got_card = AppState.opponent_cards[i];
        if (got_card === undefined || got_card == null) { return_state[i+6] = 0; }
        else { return_state[i+6] = cardData[got_card.state.value.name].id * -1; }
    }
    for (let i = 0; i < 9; i++) { 
        let got_card = AppState.board_cards[i];
        if (got_card === undefined || got_card == null) { return_state[i+11] = 0; }
        else { 
            let modifier = got_card.props.value.color ? 1 : -1;
            return_state[i+11] = cardData[got_card.props.value.name].id * modifier; 
        }
    }
    return return_state;
}

// Take one state to another state by playing a card [1-5] for player, [6-10] for opponent, to board space [11-19]
// This applies the logic to flip cards as necessary, as the new card enters the board
function makeMove(state, from, to) {

    let ns = [...state];
    ns[0] = state[0]==0 ? 1 : 0;
    ns[to] = state[from];
    ns[from] = 0;

    // Handle flips
    let nc = [null, null, null, null, null, null, null, null, null];

    for (let i = 0; i < 9; i++) {
        if (ns[i+11] != 0) { nc[i] = Object.values(cardData).filter(c => { return c.id === Math.abs(Math.abs(ns[i+11])) })[0]; }
    }

    switch (to) {
        case 11: // Top-left
            if (nc[1]!=null && nc[0].right>nc[1].left && ns[11]*ns[12]<0) { ns[12] *= -1; }
            if (nc[3]!=null && nc[0].down>nc[3].up && ns[11]*ns[14]<0) { ns[14] *= -1; }
            break;
        case 12: // Top-middle
            if (nc[0]!=null && nc[1].left>nc[0].right && ns[12]*ns[11]<0) { ns[11] *= -1; }
            if (nc[2]!=null && nc[1].right>nc[2].left && ns[12]*ns[13]<0) { ns[13] *= -1; }
            if (nc[4]!=null && nc[1].down>nc[4].up && ns[12]*nc[15]<0) { ns[15] *= -1; }
            break;
        case 13: // Top-right
            if (nc[1]!=null && nc[2].left>nc[1].right && ns[13]*ns[12]<0) { ns[12] *= -1; }
            if (nc[5]!=null && nc[2].down>nc[5].up && ns[13]*ns[16]<0) { ns[16] *= -1; }
            break;
        case 14: // Middle-left
            if (nc[0]!=null && nc[3].up>nc[0].down && ns[14]*ns[11]<0) { ns[11] *= -1; }
            if (nc[4]!=null && nc[3].right>nc[4].left && ns[14]*ns[15]<0) { ns[15] *= -1; }
            if (nc[6]!=null && nc[3].down>nc[6].up && ns[14]*ns[17]<0) { ns[17] *= -1; }
            break;
        case 15: // Middle-middle
            if (nc[1]!=null && nc[4].up>nc[1].down && ns[15]*ns[12]<0) { ns[12] *= -1; }
            if (nc[3]!=null && nc[4].left>nc[3].right && ns[15]*ns[14]<0) { ns[14] *= -1; }
            if (nc[5]!=null && nc[4].right>nc[5].left && ns[15]*ns[16]<0) { ns[16] *= -1; }
            if (nc[7]!=null && nc[4].down>nc[7].up && ns[15]*ns[18]<0) { ns[18] *= -1; }
            break;
        case 16: // Middle-right
            if (nc[2]!=null && nc[5].up>nc[2].down && ns[16]*ns[13]<0) { ns[13] *= -1; }
            if (nc[4]!=null && nc[5].left>nc[4].right && ns[16]*ns[15]<0) { ns[15] *= -1; }
            if (nc[8]!=null && nc[5].down>nc[8].up && ns[16]*ns[19]<0) { ns[19] *= -1; }
            break;
        case 17: // Bottom-left
            if (nc[3]!=null && nc[6].up>nc[3].down && ns[17]*ns[14]<0) { ns[14] *= -1; }
            if (nc[7]!=null && nc[6].right>nc[7].left && ns[17]*ns[18]<0) { ns[18] *= -1; }
            break;
        case 18: // Bottom-middle
            if (nc[4]!=null && nc[7].up>nc[4].down && ns[18]*ns[15]<0) { ns[15] *= -1; }
            if (nc[6]!=null && nc[7].left>nc[6].right && ns[18]*ns[17]<0) { ns[17] *= -1; }
            if (nc[8]!=null && nc[7].right>nc[8].left && ns[18]*ns[19]<0) { ns[19] *= -1; }
            break;
        case 19: // Bottom-right
            if (nc[5]!=null && nc[8].up>nc[5].down && ns[19]*ns[16]<0) { ns[16] *= -1; }
            if (nc[7]!=null && nc[8].left>nc[7].right && ns[19]*ns[18]<0) { ns[18] *= -1; }
            break;
        default:
            break;
    }

    return ns;
}

// From a starting state, generate a list of all additional board states that can be reached
function generateStates(state) {
    let return_list = [];
    let opp_mod = (state[0]==0) ? 0 : 5;
    for (let i = 0; i < 5; i++) {
        if (state[i+1+opp_mod] != 0) {
            for (let j = 0; j < 9; j++) {
                if (state[j+11] == 0) { 
                        let new_state = makeMove(state, i+1+opp_mod, j+11);
                        return_list.push(new_state);
                    } 

                }
            }
        }
    return return_list;
 }

// Go through a minimax tree so the AI can make a strong move
function minimax(state, depth, maximizing, alpha, beta) {
    let possible_moves = generateStates(state);
    if (possible_moves.length == 0 || depth == 0) { return scoreState(state); }
    if (maximizing) {
        let v = -9999;    
        for (let i = 0; i < possible_moves.length; i++) { 
            v = minimax(possible_moves[i], depth - 1, false, alpha, beta);
            alpha = Math.max(v, alpha);
            if (beta <= alpha) { break; }
        }
        return v;
    }
    else {
        let v = 9999;
        for (let i = 0; i < possible_moves.length; i++) { 
            v = minimax(possible_moves[i], depth - 1, true, alpha, beta);
            beta = Math.min(v, beta);
            if (beta <= alpha) { break; }
        }
        return v;
        }
}

// Given two states, find which move will take one state to the other
// Returns in form [a, b] where a is the card in your hand, 0-4, and b is the slot on the board, 0-8 (left to right, top to bottom)
// a [-1, -1] being returned means no move was found
function findMoveFor(input_state, output_state) {
    let ret_val = [-1, -1];
    for (let i = 1; i < 20; i++) {
        if (input_state[i] != output_state[i] && ret_val[0]==-1) { 
            ret_val[0] = (i-1)%5; 
        }
        else if (Math.abs(input_state[i]) != Math.abs(output_state[i]) && ret_val[0]!=-1) { ret_val[1] = i-11; }
        }
    return ret_val;
}

// Gets the best possible move, given a maximum search depth, from a current state
function selectMove(state, maxdepth) {
    let g = generateStates(state);
    let scores = [];
    let besti = 0;
    let bestv = -9999;
    for (let i = 0; i < g.length; i++) {
            let v = minimax(g[i], maxdepth, true, -9999, 9999);
                scores.push(v);
            if (v > bestv) { bestv = v; besti = i; }
        }
    let fmf = findMoveFor(state, g[besti]);
    return fmf;
}

// For the easiest difficulty, return a possible move at random
function getRandomMove(state) {
    let myCards = [];
    let ret_val = [0, 0];
    for (let i = 0; i < 5; i++) { if (state[i+6] != 0) { myCards.push(i); } }
    ret_val[0] = myCards[Math.floor(Math.random()*myCards.length)];
    let mySlots = [];
    for (let i = 0; i < 9; i++) { if (state[i+11] == 0) { mySlots.push(i); } }
    ret_val[1] = mySlots[Math.floor(Math.random()*mySlots.length)];
    return ret_val;
}

// Exposes the above algorithm to the rest of the codebase, as a single function call
function getAIMove(maxdepth) {
    let s = getStateOfGame();
    if (s[1]==0 && s[2]==0 && s[3]==0 && s[4]==0 && s[5]==0) { return [-1, -1]; } // Game is over, because no moves are left
    if (maxdepth < 0) { return getRandomMove(s); }
    return selectMove(s, maxdepth);
}

export default getAIMove;