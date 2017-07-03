var Maze = {
    create: function(width, height) {
        // @TODO implement validation
        // given 400, 400 or assuming divisible by 10
        // divide 400 by 10 = 40 x 40
        let x = (width / 10); // 40
        let y = (height / 10); // 40
        
        let totalCells = x * y;
        let cells = [];
        let unvis = []; // unvisited
        
        for (let i = 0; i < y; i++) {
            cells[i] = [];
            unvis[i] = [];
            
            for (let j = 0; j < x; j++) {
                cells[i][j] = [0, 0, 0, 0];
                unvis[i][j] = true;
            }
        }
        
        let currentCell = [Math.floor(Math.random() * y), Math.floor(Math.random() * x)];
        let path = [currentCell];
        
        unvis[currentCell[0]][currentCell[1]] = false; // [y, x]
        
        let visited = 1;
        
        // Loop through all available cell positions
        while(visited < totalCells) {
            
        }
        
        return cells;
    },
    
    run: function(selector) {
        let $el = $(selector);
        
        console.log('Maze running...');
        
        let mazeData = this.create(400, 400);
        
        console.log($el, mazeData);
    }
};



module.exports = Maze;