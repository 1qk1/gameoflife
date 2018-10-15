import React, {PureComponent} from 'react';

import Cell from './Cell/Cell';

import './Grid.css';

// const grid = ({grid, gridSize, clicked}) => {
//   return (
//     <div style={{width: gridSize[1] * 12 }} className="GameOfLife-Grid">
//       {grid.map((row, rowIndex) => 
//         <div className="GameOfLife-Row" key={rowIndex}>
//           {row.map((sqState, columnIndex) => 
//             <Cell 
//             gridSize={gridSize}
//             sqState={sqState}
//             rowIndex={rowIndex}
//             columnIndex={columnIndex}
//             clicked={clicked}
//             key={`cell-${rowIndex}-${columnIndex}`} 
//             />
//           )}
//         </div>
//       )}
//     </div>
//   )
// }


class Grid extends PureComponent {
  render() {
    const placingShape = this.props.placingShape !== null;
    return (
      <div style={{width: this.props.gridSize[1] * 12 }} className="GameOfLife-Grid">
        {this.props.grid.map((row, rowIndex) => 
          <div className="GameOfLife-Row" key={rowIndex}>
            {row.map((sqState, columnIndex) => 
              <Cell 
              gridSize={this.props.gridSize}
              sqState={sqState}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              clicked={placingShape ? this.props.placeShape : this.props.clicked}
              key={`cell-${rowIndex}-${columnIndex}`} 
              />
            )}
          </div>
        )}
      </div>
    )
  }
}


export default Grid;