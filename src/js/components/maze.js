
class InvalidCanvasElementException {
    constructor(value) {
        this.value = value;
        this.message = 'No canvas element provided';
    }
    
    toString() {
        return this.value + ' ' + this.message;
    }
}

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
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

class Maze {
    constructor(options) {
        
        let opt = Object.assign({
            selector: '#mazy',
            mazeSize: 10
        }, options || {});
        
        this.canvas = this.getCanvas(opt.selector);
        this.ctx = this.canvas.getContext('2d');
        this.mazeSize = opt.mazeSize;
        
        // Bind keyup event
        let self = this;
        $(document).keyup(function(e){
            self.keyUpHandler(e);
        });
        
        // Initialize maze
        this.grid = this.createGrid(this.canvas.width, this.canvas.height);
        this.draw();
    }
    
    getCanvas(selector) {
        let el = document.getElementById(selector) || $(selector).get(0);
        if(el && el.nodeType === 1 && el.nodeName === 'CANVAS') {
            return el;       
        }
        throw new InvalidCanvasElementException(selector);
    }
    
    draw(grid) {
        let maze = [...(grid || this.grid)];
        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                maze[y][x].draw(this.ctx);
            }
        }
    }
    
    step() {
        let newGrid = [...this.grid];
        let currentCell = newGrid[0][0];
        currentCell.isWall = false;
        this.draw(newGrid);
    }
    
    keyUpHandler(e) {
        e.preventDefault();
        
        console.log(e.which);
        
        if(e.which === 221) {
            // right square bracket
            this.step();
        }
        
        if(e.which === 219) {
            // left square bracket
            
        }
    }
    
    createGrid(width, height) {
        let grid = [];
        let cellWidth = width / this.mazeSize;
        let cellHeight = height / this.mazeSize;
        
        let yPos = 0;
        for (let y = 0; y < this.mazeSize; y++) {
            grid[y] = [];
            
            let xPos = 0;
            for (let x = 0; x < this.mazeSize; x++) {
                grid[y][x] = new Cell({
                    x: xPos,
                    y: yPos,
                    width: cellWidth,
                    height: cellHeight,
                    isWall: true
                });
                xPos += cellWidth;
            }
            yPos += cellHeight;
        }
        return grid;
    }
};

let MazeBAK = {
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

    getNextAvailableCell(grid, visitedCells) {
        let newCell;
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                newCell = {x: x, y: y};
                if(visitedCells.indexOf(newCell) === -1 && this.getNonAdjacent([newCell], visitedCells, newCell).length > 0) {
                    return newCell;                    
                }
            }
        }
    },

    getNonAdjacent(availableCells, visitedCells, currentCell) {
        return availableCells.filter(function(availableCell, i) {
            let keep = true;
            visitedCells.forEach(function(visitedCell, j) {
                if (visitedCell.x !== currentCell.x && visitedCell.y !== currentCell.y) {
                    // Check top
                    if (availableCell.y - 1 === visitedCell.y) {
                        keep = false;
                    }

                    // Check right
                    if (availableCell.x + 1 === visitedCell.x) {
                        keep = false;
                    }

                    // Check bottom
                    if (availableCell.y + 1 === visitedCell.y) {
                        keep = false;
                    }

                    // Check left
                    if (availableCell.x - 1 === visitedCell.x) {
                        keep = false;
                    }
                }
            });
            return keep;
        });
    },

    getAvailableCells(currentCell, visitedCells) {
        // based on the positon of the current cell in the grid
        // get a list of available cells
        // get the top, right, bottom, left values based on the currentCell's position (y, x) in the grid
        let availableCells = [];

        // Check top of currentCell
        let top = currentCell.y - 1;
        if (top > -1 && visitedCells.indexOf({
                x: currentCell.x,
                y: top
            }) === -1) {
            availableCells.push({
                y: top,
                x: currentCell.x
            });
        }

        // Check the right of currentCell
        let right = currentCell.x + 1;
        if (right < this.MAZE_SIZE && visitedCells.indexOf({
                x: right,
                y: currentCell.y
            }) === -1) {
            availableCells.push({
                y: currentCell.y,
                x: right
            });
        }

        // Check the bottom of the currentCell
        let bottom = currentCell.y + 1;
        if (bottom < this.MAZE_SIZE && visitedCells.indexOf({
                x: currentCell.x,
                y: bottom
            }) === -1) {
            availableCells.push({
                y: bottom,
                x: currentCell.x
            });
        }

        // Check the left of currentCell
        let left = currentCell.x - 1;
        if (left > -1 && visitedCells.indexOf({
                x: left,
                y: currentCell.y
            }) !== -1) {
            availableCells.push({
                y: currentCell.y,
                x: left
            });
        }

        return this.getNonAdjacent(availableCells, visitedCells, currentCell);
    },

    getAnyAvailableCell(availableCells) {
        // if availableCells.length = 3 then index could be any value from 0-2
        let index = Math.floor(Math.random() * availableCells.length);
        console.log('Available Cells: ' + availableCells.length, 'Random : ' + index);
        return availableCells[index];
    },

    create(width, height) {
        let grid = this.createGrid(width, height);
        let maze = grid;

        const totalCells = Math.pow(this.MAZE_SIZE, 2); // 
        let visitedCells = [];
        let currentCell = this.getNextAvailableCell(grid, visitedCells)
        
        let path = [];
        let nextCell;
        
        while(currentCell) {
            console.log('currentCell: ', currentCell);
            visitedCells.push(currentCell);
            let availableCells = this.getAvailableCells(currentCell, visitedCells);
            
            if (availableCells.length > 0) {
                nextCell = this.getAnyAvailableCell(availableCells);
                maze[nextCell.y][nextCell.x].isWall = false;
                visitedCells.push(nextCell); // We have visited the nextCell
                currentCell = nextCell;
                path.push(currentCell);
            } else {
                console.log('No availableCells');
                currentCell = this.getNextAvailableCell(grid, visitedCells);
            }
        }
        
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
