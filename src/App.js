import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Board from './Board/Board';
import classes from './App.module.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  let spanClasses = [classes.slider,classes.round];
  let mainClasses =[classes.App, classes.themedark];

  if(!darkTheme){
    mainClasses = [classes.App, classes.themelight];
  }

  return (
    <Provider store={store}>
      <Router>
        <div className={mainClasses.join(' ')}>
          <div className={classes.container}>
            <label id="switch" className={classes.switch}>
              <input type="checkbox" onClick={() => setDarkTheme(!darkTheme)}></input>       
              <span className={spanClasses.join(' ')}></span>
            </label>
          </div>
          <Route exact path="/game" component={Board} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
