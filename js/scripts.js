// Bussiness logic.

// Constractor of Map objects (to map the board).
function Board() {
  this.rows = [[], [], [], [], [], [], [], [], []];
  this.columns = [[], [], [], [], [], [], [], [], []];
  this.boxes = [[], [], [], [], [], [], [], [], []];
  this.history = [];
}

// Function to check the value for the duplicates in a row, column and 3 by 3 box.
Board.prototype.getSet = function(num, row, col) {
  if (this.rows[row].includes(num) || this.columns[col].includes(num) || this.boxes[this.toBoxIndex(row, col)].includes(num)) {
    return false;
  } else {
  this.rows[row].push(num);
  this.columns[col].push(num);
  this.boxes[this.toBoxIndex(row, col)].push(num);
  this.history.push([row, col]);
}
  return true;
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

Board.prototype.generate = function(level) {
  var set = 0;
  var col = 0;
  var row = 0;
  var num = 0;
  while (set < level) {
    col = Math.floor(Math.random() * 8);
    row = Math.floor(Math.random() * 8);
    num = Math.floor(Math.random() * 9 + 1);

    if(!$("input#" + col + row).val()){
      if(this.getSet(num, row, col)) {
        set++;
        $("input#" + col + row).val(num).prop('disabled', true);
      }
    }
  }
}

function restart(){
  renew();
  timer();
}

function timer() {
var time = 0;
var minutes = 0;
clearInterval(time);
setInterval(function(){
  time = time + 1;
  if (time == 60){
    time = 0;
    minutes = minutes + 1
  }
$("#time").text(minutes+":"+time);}, 1000)
}

Board.prototype.refresh = function() {
  for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++){
      this.rows.pop();
      $("input#" + j + i).val("").prop( "disabled", false);
    }
  }
};


// UI logic.

$(document).ready(function(){
  var board = new Board();

  $("#easy").click(function(event){
    event.preventDefault();
    board.refresh();
    board = new Board();
    board.generate(35);
    timer();
  })
  $("#medium").click(function(event){
    event.preventDefault();
    //console.log(board);
    board.refresh();
    board = new Board();
    board.generate(31);
    console.log(board);
    timer();
  })
  $("#hard").click(function(event){
    event.preventDefault();
    board.refresh();
    board = new Board();
    board.generate(28);
    timer();
  })

  $("#restart").click(function(event) {
    event.preventDefault();
    board.refresh();
  })

  console.log(board);

  /* $("input#" + $target.data("col") + $target.data("row")).val("hey")*/
  $("#table input").keyup(function(e) {
    var $target = $(e.target);
    var userInput = $target.val();

    if (!board.validation(userInput)){
      alert("Input is out of range");
    }
    console.log($target.data("col"));
    if (!board.getSet(userInput, $target.data("row"), $target.data("col"))) {
      $target.val("");
    }
    console.log(board);
  });


});
