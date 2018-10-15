import React, {PureComponent} from 'react'

class Cell extends PureComponent {
  render(){
    return (
      <div 
        onClick={() => this.props.clicked([this.props.rowIndex, this.props.columnIndex])}
        className={`GameOfLife-Cell${this.props.sqState === true ? ' GameOfLife-Cell-Alive' : ''}`}
      />
    )
  }
}


export default Cell;
