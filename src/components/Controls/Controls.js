import React from 'react';
import { Button } from 'reactstrap';
import './Controls.css';
import GridDropDown from '../Buttons/GridDropdown';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import ShapesDropdown from '../Buttons/ShapesDropdown';


const controls = ({startGame, clearGrid, speed, gridSizeHandler, speedChangeHandler, randomGrid, pauseGame, placeShape}) => {
  return (
    <div className='GameOfLife-Controls'>
      <Button size="sm" onClick={startGame} color="success">Start Game</Button>
      <Button size="sm" onClick={pauseGame} color="warning">Stop Game</Button>
      <Button size="sm" onClick={clearGrid} color="danger">Clear Grid</Button>
      <Button size="sm" onClick={randomGrid} color="info">Random Grid</Button>
      <GridDropDown clicked={gridSizeHandler} />
      <ShapesDropdown clicked={placeShape} />
      <div className="Speed-Slider">
        <Slider
          min={10}
          max={500}
          step={2}
          value={speed}
          orientation='horizontal'
          labels={{
            10: 'Fast',
            1000: 'Slow'
          }}
          onChange={speedChangeHandler}
        />
      </div>
    </div>
  )
}

export default controls
