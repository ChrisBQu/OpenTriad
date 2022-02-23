import cardData from "./CardData.js";

// Class represents a card, made up by its name, current color, and its four directional values
class Card {
    constructor(name, color) {
        this.name = name;
        // Passing in the random parameter generates a random card from the cardData object
        if (name == "random") {
                let keys = Object.keys(cardData);
                this.name = keys[Math.floor(Math.random()*keys.length)];
            }
        this.left = cardData[this.name].left;
        this.right = cardData[this.name].right;
        this.up = cardData[this.name].up;
        this.down = cardData[this.name].down;
        this.color = color;
    }
}

export default Card;