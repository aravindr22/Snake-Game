import React, {useState} from 'react';

import Board from './Board/Board';
import classes from './App.module.css';

function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  let spanClasses = [classes.slider,classes.round];
  let mainClasses =[classes.App, classes.themedark];

  if(!darkTheme){
    mainClasses = [classes.App, classes.themelight];
  }
  console.log("asd")
  return (
    <div className={mainClasses.join(' ')}>
      <div className={classes.container}>
        <label id="switch" className={classes.switch}>
          <input type="checkbox" onClick={() => setDarkTheme(!darkTheme)}></input>       
          <span className={spanClasses.join(' ')}></span>
        </label>
      </div>
      <Board></Board>
    </div>
  );
}

export default App;
