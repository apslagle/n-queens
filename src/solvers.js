/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    /*
    var hasColConflictAt = function(colIndex) {
      var boardSize = this.get('n');
      var acc =0;
      for(var i=0; i<boardSize; i++) {
        var row = this.get(i);
        acc += row[colIndex]
      }
      return acc>1;
    };

    // test if any columns on this board contain conflicts
    var hasAnyColConflicts = function() {
            var boardSize = this.get('n');
      // console.log(this.get('n'));
      for (var i = 0; i < boardSize; i++){
        if (this.hasColConflictAt(i)){
          // console.log("this is i", i)
          return true;
        }
      }
      return false;
    };



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    var hasMajorDiagonalConflictAt = function(majorDiagonalColumnIndexAtFirstRow) {
      var corrector = 0;
      if(majorDiagonalColumnIndexAtFirstRow < 0) {
        corrector = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      }
      var boardSize = this.get('n');
      var acc =0;
      var fullBoard = [];
      for(var i = 0; i < boardSize; i++) {
        fullBoard.push(this.get(i));
      }
      var diagonalLength = boardSize - majorDiagonalColumnIndexAtFirstRow;
      if(corrector > 0) {
        diagonalLength = boardSize;
      }
      for(corrector; corrector < diagonalLength; corrector++) {
        acc += fullBoard[0 + corrector][majorDiagonalColumnIndexAtFirstRow + corrector];
      }
      return acc>1;
    };

    // test if any major diagonals on this board contain conflicts
    var hasAnyMajorDiagonalConflicts = function() {
      var boardSize = this.get('n');
      var diagonalNumber = -boardSize + 1;
      for(var i = boardSize - 1; i > diagonalNumber; i--) {
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    };



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    var hasMinorDiagonalConflictAt = function(minorDiagonalColumnIndexAtFirstRow) {
      var boardSize = this.get('n');
      var corrector = 0;
      var lastIndex = boardSize-1;
      if(minorDiagonalColumnIndexAtFirstRow > lastIndex){
        corrector = minorDiagonalColumnIndexAtFirstRow - lastIndex;
      }
      var acc = 0;
      var fullBoard = [];
      for(var i = 0; i < boardSize; i++) {
        fullBoard.push(this.get(i));
      }
      var columnIndex = minorDiagonalColumnIndexAtFirstRow;
      var rowIndex = 0;
      var rowsLength = columnIndex + 1;
      if(corrector > 0) {
        rowsLength = rowsLength - corrector*2;
        columnIndex = lastIndex;
        rowIndex = corrector;
      }
      for (var j = 0; j < rowsLength; j++){
        acc += fullBoard[rowIndex + j][columnIndex - j];
      }
      return acc>1;
    };

    // test if any minor diagonals on this board contain conflicts
    var hasAnyMinorDiagonalConflicts = function() {
      var boardSize =this.get('n');
      var double = boardSize*2;
      for(var i = 0; i < boardSize; i++) {
        if(this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    };

    /*--------------------  End of Helper Functions  ---------------------

    var hasAnyRooksConflicts = function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    }

    var hasAnyQueensConflicts = function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    }



  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

*/

window.findNRooksSolution = function(n) {
  var board = [];
  for (var row = 0; row < n; row++){
    var myRow = [];
    for(var column = 0; column < n; column++){
      if(row === column){
        myRow.push(1);
      } else {
        myRow.push(0);
      }
    }
    board.push(myRow);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other


window.countNRooksSolutions = function(n){
  var solutionCount = 0;
  var board = new Board({n:n});
  //recursive function
  var findASolution= function(rowIndex){
    //base case
    if(rowIndex === n){
      solutionCount++;
      return;
    }

    for(var column = 0; column < n; column++) {
      board.togglePiece(rowIndex, column);
      // var bubble = hasAnyRooksConflicts();
      // console.log("hasAnyRooksConflicts", board.hasAnyRooksConflicts)
      if (!board.hasAnyRooksConflicts()){
        findASolution(rowIndex+1);
      }
      board.togglePiece(rowIndex, column);
    }

  };
  //call function
  findASolution(0);

  //return answer
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if(n===0){
    return [];
  }
  var solution;
  var board = new Board({n:n});
  solution = JSON.stringify(board.rows());
  solution = JSON.parse(solution);
  var findASolution= function(rowIndex){
    if(rowIndex === n){
      //console.log("board", JSON.stringify(board.rows()));
      solution = JSON.stringify(board.rows());
      solution = JSON.parse(solution);
      //solution = board;
      return;
    }

    for(var column = 0; column < n; column++) {
      board.togglePiece(rowIndex, column);
      if (!board.hasAnyQueensConflicts()){
        findASolution(rowIndex+1);
      }
      board.togglePiece(rowIndex, column);
    }
  };
  findASolution(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 2 || n === 3){
    return 0;
  }
  var solutionCount = 0;
  var board = new Board({n:n});
  var findASolution= function(rowIndex){
    if(rowIndex === n){
      var fullBoard = [];
      for(var i = 0; i < n; i++) {
        fullBoard.push(board.get(i));
      }
      //console.log("board", JSON.stringify(board.rows()));
      solutionCount++;
      return;
    }

    for(var column = 0; column < n; column++) {
      board.togglePiece(rowIndex, column);
      if (!board.hasAnyQueensConflicts()){
        findASolution(rowIndex+1);
      }
      board.togglePiece(rowIndex, column);
    }
  };
  findASolution(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
