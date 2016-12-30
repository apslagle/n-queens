// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var theRows = this.get(rowIndex);
      //var rowIndexlength = theRows.length;
      //var acc = 0;
      //for(var i=0; i<rowIndexlength; i++) {
        //acc += theRows[i];
      //}
        //return acc>1;
        var sum = theRows.reduce(function(a, b){
          return a + b;
        }, 0);
        return (sum > 1);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // var result = false;
      // var length = this.get(0).length;
      // for(var i = 0; i <length; i++) {
      //   if(foundConflict) {
      //     return true;
      //   }
      // }
      // return result;
      var boardSize = this.get('n');
      // console.log(this.get('n'));
      for (var i = 0; i < boardSize; i++){
        if (this.hasRowConflictAt(i)){
          // console.log("this is i", i)
          return true;
        }
      }
      return false;
    },

/*
displayBoard([
          [0, 1, 0, 0],
          [0, 0, 0, 1],
          [1, 0, 0, 0],
          [0, 0, 1, 0]
        ]);
*/

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var boardSize = this.get('n');
      var acc =0;
      for(var i=0; i<boardSize; i++) {
        var row = this.get(i);
        acc += row[colIndex]
      }
      return acc>1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
            var boardSize = this.get('n');
      // console.log(this.get('n'));
      for (var i = 0; i < boardSize; i++){
        if (this.hasColConflictAt(i)){
          // console.log("this is i", i)
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
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
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardSize = this.get('n');
      var diagonalNumber = -boardSize + 1;
      for(var i = boardSize - 1; i > diagonalNumber; i--) {
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      var boardSize = this.get('n'); //4
      var acc = 0;
      var fullBoard = [];
      for(var i = 0; i < boardSize; i++) {
        fullBoard.push(this.get(i));
      }
      for (var j = 0; j < boardSize; j++){
        var columnIndex = minorDiagonalColumnIndexAtFirstRow - j; //3
        var rowIndex = 0 + j;
        if(this._isInBounds(rowIndex, columnIndex)){
          acc += fullBoard[rowIndex][columnIndex];
        }
      //first:            1             3
      }
      return acc>1;

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var boardSize =this.get('n');
      var double = boardSize*2;
      for(var i = 0; i < (boardSize*2)-1; i++) {
        if(this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
