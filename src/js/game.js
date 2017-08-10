import $ from 'jquery';
// import Player from './player.js';

function Game(playersArray) {
    // Initialize Variables
    const players = playersArray;
    let board,
        currentPlayer,
        isGameOver;
    // Cache DOM
    const gameTiles = $('.game-board__tile'),
        $innerWrapper = $('.board-overlay');

    this.initializeGame = () => {
        $.each(gameTiles, (index, el) => {
            $(el).on('click', () => {
                let col = index % 3;
                let row = Math.floor(index / 3);
                this.makeMove(players[currentPlayer], col, row);
            });
        });

        currentPlayer = Math.round(Math.random());
        isGameOver = false;
        board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        this.render();
    };

    this.makeMove = (player, x, y) => {
        if(board[y][x] === null) {
            board[y][x] = player.getToken();
            let winningToken = this.checkGameOver();
            this.render();
            if(isGameOver) {
                this.endGame(winningToken);
            } else {
                currentPlayer = (currentPlayer + 1) % 2;
            }
        }
    };

    this.checkGameOver = () => {
        let winningToken;
        //check rows
        for(let i = 0; i < 3 && !isGameOver; i++) {
            if(board[i][0] !== null && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                isGameOver = true;
                winningToken = board[i][0];
            }
        }
        //check columns
        for(let i = 0; i < 3 && !isGameOver; i++) {
            if(board[0][i] !== null && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                isGameOver = true;
                winningToken = board[0][i];
            }
        }
        //check diagonals
        if( (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
            (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) ) {
            isGameOver = true;
            winningToken = board[1][1];
        }

        if(winningToken) console.log(winningToken);
        return winningToken;
    };

    this.render = () => {
        board.map((val, i) => {
            val.map((val, j) => {
                if(board[i][j]) {
                    let index = 3 * i + j;
                    $(gameTiles[index]).html(board[i][j]);
                }
            });
        });
    };

    this.endGame = (token) => {
        $innerWrapper.removeClass('hidden');
        $innerWrapper.html(`
            Game over.<br/>
            ${token}s win!
            <button>Play again</button>
            <button>Quit</button>
        `);

        //TODO: toggle overlay with winner message
        if (players[0].getToken() === token)
            players[0].incrementWins();
        else
            players[1].incrementWins();
    };

    this.resetGame = () => {
        currentPlayer = Math.round(Math.random());
        board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        isGameOver = false;
        render();
    };

}

export { Game };
