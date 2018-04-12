# _Classic Sudoku Game_

#### _A webpage with classic Sudoku game. The user can solve the puzzle by entering numbers from 1 to 9 into 9 by 9 board boxes._

#### By _Eva Antipina, Noah Medoff, Eric Nicolas, Verna Santos_

## Description

_The user can choose a level of complexity: easy (35 randomly generated numbers from 1 to 9 randomly spread on the board), medium (31 numbers), and hard (28 numbers)._
_To solve, the user has to place a number into each blank box so that each row across, each column down, and each small 3 by 3 boxes square within the whole board will contain every number from 1 to 9. No number may appear more than once in any row, column, or 3 by 3 square._


## Specifications

* _The user chooses easy level set up by default and clicks on one of the blank boxes_
  * _Example Event: click on the box_
  * _Example Output: highlighted corresponding row, column and 3 by 3 box._

* _The user chooses easy level set up by default, clicks on one of the blank boxes and put some number there. The number doesn't have duplicates in corresponding row, column or 3 by 3 box._
  * _Example Input: 1_
  * _Example Output: [1], the field doesn't take user input any more_

* _The user chooses easy level set up by default, clicks on one of the blank boxes and put some number there. The number has duplicate in corresponding row, column or 3 by 3 box._
  * _Example Input: 7_
  * _Example Output: highlight the box with duplicate number and reject the user input (reset field)_

* _The user hits "undo" button in the middle of the game._
  * _Example Event: hit "undo" button._
  * _Example Output: clear previously filled box._

* _The user put some number in the blank field but the number is out of the range._
  * _Example Input: 34_
  * _Example Output: ["Please enter the number from 1 to 9."]_

* _The user enters not digital input in the blank field._
  * _Example Input: j_
  * _Example Output: ["Please enter the number from 1 to 9."]_


## Setup/Installation Requirements

* _Clone this repository_
* _Find index.html file in the repository_
* _Open index.html file with your web browser of choice._


## Known Bugs

_If the user hits Hint button too fast it crashes._

## Support and contact details

_If You run into any issues or have questions, ideas, concerns or would like to make a contribution to the code, please contact any of the contributors via email: eva.antipina@gmail.com, eric.e.nicolas@gmail.com, vernajs@gmail.com, nmedoff123@gmail.com}_

## Technologies Used

* _HTML_
* _CSS_
* _JavaScript_
* _Bootstrap_
* _jQuery_

### License

_Not licensed_

Copyright (c) 2018 **_Eva Antipina, Eric Nicolas, Verna Santos, Noah Medoff_**
