let InvalidCanvasElementException = function(value) {
    this.value = value;
    this.message = 'No canvas element provided';
    this.toString = function() {
        return this.value + this.message;
    }
};

class Cell {
    constructor(param) {
        this.x = param.x || 0;
        this.y = param.y || 0;
        this.width = param.width || 10;
        this.height = param.height || 10;

        this.isWall = param.isWall;
    }
    
    draw(ctx) {
        let fillStyle = this.isWall ? '#efffef' : '#555555';
        ctx.fillStyle = fillStyle;
        console.log('isWall: ' + this.isWall);
        console.log('fillStyle: ' + fillStyle);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

let Maze = {
    getCanvas(selector) {
        let el = $(selector) ? $(selector).get(0) : null;

        if (this.isCanvas(el)) {
            return el;
        }

        throw new InvalidCanvasElementException(el);
    },
    isCanvas(el) {
        let isCanvas = (el && el.nodeType === 1 && el.nodeName === 'CANVAS');

        if (isCanvas === true) {
            console.log('Valid canvas element: ' + el.nodeName + ' found. Element id is ' + el.id);
        }

        return isCanvas;
    },
    create(width, height) {
        console.log(width, height); // 400 400
        const MAZE_SIZE = 10;

        // Assume canavas width and height are divisible evenly by 10
        const CELL_WIDTH = width / MAZE_SIZE; // 400 / 10 = 40 == 10 cells of 40
        const CELL_HEIGHT = height / MAZE_SIZE; // 400 / 10 = 40 == 10 cells of 40

        // 400 400 10 40 40
        // console.log(width, height, MAZE_SIZE, CELL_WIDTH, CELL_HEIGHT);
        // generate an array where each item is a row
        // each row is an array of cell objects
        // generate a grid based on the given dimensions of the canvas
        // generate the blocksize/cellSize where it is a size that produces an even number of cells
        let grid = [];
        
        let yPos = 0;
        for (let y = 0; y < MAZE_SIZE; y++) {
            grid[y] = [];

            let xPos = 0;
            for (let x = 0; x < MAZE_SIZE; x++) {
                let isWall = Math.random() >= 0.5;
                console.log('create isWall: ' + isWall);
                let c = new Cell({
                    x: xPos,
                    y: yPos,
                    width: CELL_WIDTH,
                    height: CELL_HEIGHT,
                    isWall: isWall
                });
                grid[y][x] = c;
                xPos += CELL_WIDTH;
            }

            yPos += CELL_HEIGHT;
        }

        return grid;
    },

    draw(canvas, ctx, grid) {
        for (y = 0; y < grid.length; y++) {
            for (x = 0; x < grid[y].length; x++) {
                grid[y][x].draw(ctx);
            }
        }
    },

    run(selector) {
        // get a reference to the canvas element
        let canvas = this.getCanvas(selector);
        let ctx = canvas.getContext('2d');
        let grid = this.create(canvas.width, canvas.width);
        this.draw(canvas, ctx, grid);
    }
};



module.exports = Maze;
