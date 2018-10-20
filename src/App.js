import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: 'Start',
      board: Array(Math.pow(0,2)).fill(''),
      sqr: {width:'50px',height:'50px'},
      brd: {width:'50px',height:'50px'},
      sprites: '',
      player: '',
      dim: null,
      move: 0
    }
  }

  handleClick() {
    // Get board length from user
    var dim = parseInt(prompt('Enter length of the board: '))

    if(dim) {

      this.setState({
        dim: dim
      })

      // Create Array of squares
      var bod = Array(Math.pow(dim,2)).fill('') 

      // Generate random numbers for the sprites
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      function getRandomInts(num) {
        var ints = [];
        while (ints.length < num) {
          var randNum = getRandomInt(Math.pow(dim,2));
          if(ints.indexOf(randNum) === -1){
            ints.push(randNum);
          }
        }
        return ints;
      }
      var l = getRandomInts(dim);

    this.setState({
      sprites: l
    })

      //populate the grid with sprites
      var i;
      for (i = 0; i < l.length; i++) {
        bod[l[i]] = 'a'
      }

      //Place the player in the grid

      //Odd number board length
      if(dim%2){
        // eslint-disable-next-line
        this.state.player = ((bod).length-1)/2
      }
      //Even number board length
      else{
        // eslint-disable-next-line
        this.state.player = dim*(dim-1)/2
      }
        bod[this.state.player] = dim

      // Update the board with new data
      this.setState({
        board: bod,
        brd: {width:dim*'50'+'px',height:dim*'50'+'px'},
        sprites: this.state.sprites,
        message: 'Reset'
      })
    }
  }

  handleKeyPress = (event) => {

    switch(event.key) {

      case "ArrowUp":
      if(this.state.player >= this.state.dim){

        [this.state.board[this.state.player - this.state.dim], this.state.board[this.state.player]] =
                  [this.state.board[this.state.player], this.state.board[this.state.player - this.state.dim]]
        // eslint-disable-next-line
        this.state.board[this.state.player] = ''

        this.setState({
          player : this.state.player - this.state.dim,
          move : this.state.move+1
        })
      }
      break;

      case "ArrowRight":
      if((this.state.player + this.state.dim + 1)%this.state.dim){

          [this.state.board[this.state.player+1], this.state.board[this.state.player]] = 
                    [this.state.board[this.state.player], this.state.board[this.state.player+1]]
          // eslint-disable-next-line
          this.state.board[this.state.player] = ''

          this.setState({
            player : this.state.player + 1,
            move : this.state.move + 1
          }
        )}
      break;

      case "ArrowDown":
      if(this.state.player < this.state.board.length - this.state.dim){

        [this.state.board[this.state.player + this.state.dim], this.state.board[this.state.player]] = 
                  [this.state.board[this.state.player], this.state.board[this.state.player + this.state.dim]]
        // eslint-disable-next-line
        this.state.board[this.state.player] = ''

        this.setState({
          player : this.state.player + this.state.dim,
          move : this.state.move+1
        })
      }
      break;

      case "ArrowLeft":
      if((this.state.player + this.state.dim )%this.state.dim){

        [this.state.board[this.state.player-1], this.state.board[this.state.player]] =
                  [this.state.board[this.state.player], this.state.board[this.state.player-1]]
        // eslint-disable-next-line  
        this.state.board[this.state.player] = ''

        this.setState({
          player : this.state.player - 1,
          move : this.state.move+1
        })
      }
      break;
    }
    this.setState({
      message: this.state.message ,board: this.state.board
    })
  }
  


  render() {
    return (
      <div className="app-container">
        <div style={this.state.brd} className="board" onKeyUp = {this.handleKeyPress} tabIndex="0">
        
        {this.state.board.map((cell) => {
          return <div style={this.state.sqr} className="square">{cell}</div>;
        })}

        </div>
        <br/><button onClick={() => this.handleClick()}>{this.state.message+' '+this.state.player+' '+this.state.move+' '+(this.state.board).length}</button><br/><br/>
      </div>
    )
  }
}



export default App;