
const canvas = $('#mazee');

console.log(canvas);

const board = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
];

let player = {
    x: 0,
    y: 0
};

const draw = function() {
    let width = canvas.width();
    const BLOCK_SIZE = width / board.length;
    const ctx = canvas[0].getContext('2d');
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    
    ctx.fillStyle = "white";
    
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            // Draw a wall
            if(board[y][x] === 1) {
                ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            } else if (board[y][x] === -1) {
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x * BLOCK_SIZE, y * BLOCK_SIZE);
                ctx.lineTo((x + 1) * BLOCK_SIZE, (y + 1) * BLOCK_SIZE);
                ctx.moveTo(x * BLOCK_SIZE, (y + 1) * BLOCK_SIZE);
                ctx.lineTo((x + 1) * BLOCK_SIZE, y * BLOCK_SIZE);
                ctx.stroke();
            }
        }
    }
    
    // Draw the player
    ctx.beginPath();
    let half = BLOCK_SIZE / 2;
    ctx.fillStyle = "blue";
    ctx.arc(player.x * BLOCK_SIZE + half, player.y * BLOCK_SIZE + half, half, 0, 2 * Math.PI);
    ctx.fill();
};

let canMove = function(x, y) {
    return (y >= 0) && (y < board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] !== 1)
};

$(document).keyup(function(e) {
    e.preventDefault();
    
    if((e.which === 38) && canMove(player.x, player.y - 1)) {
        // up arrow
        player.y--;
    } else if((e.which === 40) && canMove(player.x, player.y + 1)) {
        // down arrow
        player.y++;
    } else if((e.which === 37) && canMove(player.x - 1, player.y)) {
        player.x--;
    } else if((e.which === 39) && canMove(player.x + 1, player.y)) {
        player.x++;
    }
    draw();
});

draw();