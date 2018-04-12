// Bussiness logic.

// Constractor of Map objects (to map the board).
function Board() {
  this.rows = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]];
  this.columns = [[], [], [], [], [], [], [], [], []];
  this.boxes = [[], [], [], [], [], [], [], [], []];
  this.history = [];
}

// Function to check the value for the duplicates in a row, column and 3 by 3 box.
Board.prototype.getSet = function(num, row, col) {
  if (this.rows[row].includes(num) || this.columns[col].includes(num) || this.boxes[this.toBoxIndex(row, col)].includes(num)) {
    return false;
  } else {
    return true;
  }
};

Board.prototype.fillBoard = function(num, row, col) {
  this.rows[row][col] = num;
  this.columns[col].push(num);
  this.boxes[this.toBoxIndex(row, col)].push(num);
  this.history.push([num, row, col]);
}

Board.prototype.emptyCell = function(num, row, col) {
  this.rows[row][col] = 0;
  this.columns[col].pop(num);
  this.boxes[this.toBoxIndex(row, col)].pop(num);
  this.history.pop([num, row, col]);
}


Board.prototype.toBoxIndex = function(row, col) {
  return Math.floor(row / 3) * 3 + Math.floor(col/3);
}

Board.prototype.validation = function(input){
  if (!(/^\d+$/.test(input))){
    return false;
  } else if(parseInt(input) > 9 || parseInt(input) < 1) {
    return false;
  } else {
    return true;
  }
}


function generate(level, board, newBoard) {
  console.log(board.history.length);
  board.history = shuffle(board.history);
  for (var i = 0; i < level; i++) {
      newBoard.fillBoard(board.history[i][0], board.history[i][1], board.history[i][2]);
      $("input#" + board.history[i][2] + board.history[i][1]).val(board.history[i][0]).prop('disabled', true).removeClass('presetHint').addClass('preset');
  }
}

function showSolution(board, newBoard) {
  console.log(board.history.length);
  board.history = shuffle(board.history);
  for (var i = 0; i < board.history.length; i++) {
      newBoard.fillBoard(board.history[i][0], board.history[i][1], board.history[i][2]);
      $("input#" + board.history[i][2] + board.history[i][1]).val(board.history[i][0]).prop('disabled', true).removeClass('presetHint');
  }
}

function generateHint(board, newBoard) {
  var set = 0;
  var col = 0;
  var row = 0;
  while (set < 1) {
    col = Math.floor(Math.random() * 9);
    row = Math.floor(Math.random() * 9);

    if(newBoard.rows[row][col] == 0){
      console.log(board.rows[row][col]);
      if(newBoard.getSet(board.rows[row][col], row, col)) {
        set++;
        newBoard.fillBoard(board.rows[row][col], row, col);
        $("input#" + col + row).val(board.rows[row][col]).prop('disabled', true).addClass('presetHint');
      }
    }
  }
}

function restart(){
  renew();
  timer();
}


var reset;
function timer() {
var digit = 0;
var decimal = 0;
var minutes = 0;
reset = setInterval(function(){
 digit = digit + 1;
 if (digit == 10){
   digit = 0;
   decimal = decimal + 1
 }
 if (decimal == 6){
   decimal = 0;
   minutes = minutes + 1;
 }
$("#time").text(minutes+":"+decimal+digit);}, 1000);
};

function refresh() {
  for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++){
      $("input#" + j + i).val("").prop( "disabled", false).removeClass('preset');
    }
  } clearInterval(reset);
};

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Function is filling an empty board.
function solver(depth, board) {
  if (depth == 81) {
    return true;
  }
  var col = depth % 9;
  var row = Math.floor(depth / 9);
  var arr = [1,2,3,4,5,6,7,8,9];
  arr = shuffle(arr);
  for (var i = 1; i < 9; i++) {
    if (!board.getSet(arr[i], row, col)) {
      continue;
    }
    board.fillBoard(arr[i], row, col);
    //console.log(board);
    if (solver((depth + 1), board)) {
      return true;
    }
    board.emptyCell(arr[i], row, col);
  }
  return false;
}



// UI logic.

$(document).ready(function(){
  var board = new Board();
  var newBoard = new Board();
  solver(0, board);

  //newBoard.history.forEach(function(arr){
    //$("input#" + arr[2] + arr[1]).val(arr[0]).prop('disabled', true).removeClass('presetHint').addClass('preset');
  //});




  $("#easy").click(function(event){
    event.preventDefault();
    board = new Board();
    newBoard = new Board();
    refresh();
    solver(0, board);

    console.log(board.history.length);
    generate(35, board, newBoard);
    console.log(newBoard);
    timer();
  })
  $("#medium").click(function(event){
    event.preventDefault();
    board = new Board();
    newBoard = new Board();
    refresh();
    solver(0, board);
    console.log(board);
    console.log(board.history.length);
    generate(31, board, newBoard);
    console.log(newBoard);
    timer();
  })
  $("#hard").click(function(event){
    event.preventDefault();
    board = new Board();
    newBoard = new Board();
    refresh();
    solver(0, board);
    console.log(board);
    console.log(board.history.length);
    generate(28, board, newBoard);
    console.log(newBoard);
    timer();
  })

  $("#restart").click(function(event) {
    event.preventDefault();
    board = new Board();
    newBoard = new Board();
    console.log(newBoard);
    refresh();
  });

  $("#solution").click(function(event) {
    event.preventDefault();
    showSolution(board, newBoard);
  });







  $("table input").keyup(function(e) {
    var $target = $(e.target);
    var userInput = $target.val();

    if(e.keyCode == 8) {
      console.log("hello");
      newBoard.emptyCell($target.val() , $target.data("row"), $target.data("col"));
      console.log(newBoard);
      return;
    }

    if (!board.validation(userInput)){
       alert("Input is out of range");
       $target.val("");
       return;
     };

    userInput = parseInt(userInput);
    console.log($target.data("col"));
    console.log($target.data("row"));
    console.log(userInput);
    var check = newBoard.getSet(userInput, $target.data("row"), $target.data("col"));
    console.log(check);
    if (check) {
      newBoard.fillBoard(userInput , $target.data("row"), $target.data("col"));
      $("input#" + $target.data("col") + $target.data("row")).prop('disabled', false);
    } else {
      $target.val("");
    }
    console.log(newBoard);

  });


  $("#showhint").click(function(event){
    event.preventDefault();
    generateHint(board, newBoard);
  });


});
