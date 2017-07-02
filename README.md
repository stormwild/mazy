# mazy

Simple Js Maze Game

## Description

Building upon [Nate Jones](http://jsfiddle.net/n8j1s/4y22135r/) sample js maze game among others.

The data structure is a simple array of arrays which makes up the maze.

We need to generate a random maze or data structure similar to the board array.

The solution is to generate an acyclic graph or tree specifically a spanning tree (a tree comprises every node in a graph).

## Notes

```bash
npm i -D webpack babel-loader babel-core
npm i -D html-webpack-plugin

npm install css-loader style-loader sass-loader node-sass --save-dev
npm install --save-dev extract-text-webpack-plugin
```

## Setup Notes

```
npm install --save jquery
```

Import jquery in app.js `import 'jquery`

```
// In webpack config add webpack's built in ProvidePlugin to the plugins array

new webpack.ProvidePlugin({
  jQuery: 'jquery',
  $: 'jquery',
  jquery: 'jquery'
})
```

[A Beginner’s Guide to Webpack 2 and Module Bundling](https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/)

## References

[Simple Maze](http://jsfiddle.net/n8j1s/4y22135r/)

[Algorithm is not a !@%#$@ 4-letter word by Jamis Buck](http://www.jamisbuck.org/presentations/rubyconf2011/index.html)

[Maze Generation Algorithm](https://rosettacode.org/wiki/Maze_generation#JavaScript)

[Simple Java 2d array maze sample](https://stackoverflow.com/questions/21815839/simple-java-2d-array-maze-sample)

[Make a Maze Game on an HTML5 Canvas](https://html5.litten.com/make-a-maze-game-on-an-html5-canvas/)

[Moving Shapes on the HTML5 Canvas With the Keyboard](https://html5.litten.com/moving-shapes-on-the-html5-canvas-with-the-keyboard/)

[Canvas: Maze Generator and Solver](https://codepen.io/ada-lovecraft/pen/osHcf)

[Create an HTML5 (and JavaScript) Maze Game with a timer](https://www.codeproject.com/articles/577080/create-an-html5-and-javascript-maze-game-with-a-ti)

[Simple implementation of a maze generation method (random DFS)](https://stackoverflow.com/questions/36592057/simple-implementation-of-a-maze-generation-method-random-dfs?noredirect=1&lq=1)

[Generating a maze with Javascript & Canvas](https://stackoverflow.com/questions/37625952/generating-a-maze-with-javascript-canvas)

