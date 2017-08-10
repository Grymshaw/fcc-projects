import "normalize.css";
import "../styles/main.scss";
import { Game } from "./game.js";
import { Player } from "./player.js";

const p1 = new Player(false, 'X'),
    p2 = new Player(true, 'O');

let game = new Game([p1, p2]);
game.initializeGame();
