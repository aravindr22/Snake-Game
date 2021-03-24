import React from 'react';

import Board from './Board/Board';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <Board></Board>
    </div>
  );
}

export default App;
