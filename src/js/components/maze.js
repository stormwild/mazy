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
    MAZE_SIZE: 10,
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
    
    createGrid(width, height) {
        const MAZE_SIZE = this.MAZE_SIZE;
        const CELL_WIDTH = width / MAZE_SIZE;
        const CELL_HEIGHT = height / MAZE_SIZE;
        let grid = [];

        let yPos = 0;
        for (let y = 0; y < MAZE_SIZE; y++) {
            grid[y] = [];

            let xPos = 0;
            for (let x = 0; x < MAZE_SIZE; x++) {
                let c = new Cell({
                    x: xPos,
                    y: yPos,
                    width: CELL_WIDTH,
                    height: CELL_HEIGHT,
                    isWall: true
                });
                grid[y][x] = c;
                xPos += CELL_WIDTH;
            }

            yPos += CELL_HEIGHT;
        }

        return grid;
    },
    
    getRandomCell(width, height) {
        let mazeWidth = width || this.MAZE_SIZE;
        let mazeHeight = height || this.MAZE_SIZE; 
        let x = Math.floor(Math.random() * mazeWidth);
        let y = Math.floor(Math.random() * mazeHeight);
        
        return {
            x: x,
            y: y
        };
    },
    
    getAvailableCells(currentCell) {
        // based on the positon of the current cell in the grid
        // get a list of available cells
        // get the top, right, bottom, left values based on the currentCell's position (y, x) in the grid
        let available = [];
        for(let n = 0; n < 4; n++) {
            // Check for the top of the currentCell
            
            if(currentCell.y - 1 > -1 && true) {
                available.push({ x: currentCell.x, y: currentCell.y - 1 });
            }
        }
    },
    
    create(width, height) {
        let grid = this.createGrid(width, height);
        let maze = grid;
        
        const totalCells = Math.pow(this.MAZE_SIZE, 2); // 
        let cells = [];
        let unvis = [];
        
        let currentCell = this.getRandomCell();
        
        maze[currentCell.y][currentCell.x].isWall = false;
        
/*        let path = [currentCell.y, currentCell.x];
        unvis[currentCell.y][currentCell.x] = false; // We have visited the first cell (in the grid)
        
        let visited = 1;
        
        while(visited < totalCells) {
            
            let availableCells = this.getAvailableCells(currentCell);
            
        }
*/        
        return maze;
    },

    draw(canvas, ctx, grid) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                grid[y][x].draw(ctx);
            }
        }
    },

    run(selector) {
        // get a reference to the canvas element
        let canvas = this.getCanvas(selector);
        let ctx = canvas.getContext('2d');
        let maze = this.create(canvas.width, canvas.width);
        this.draw(canvas, ctx, maze);
    }
};



module.exports = Maze;
