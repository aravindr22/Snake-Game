import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import Board from './Board/Board';
import Homepage from './Homepage/Homepage';
import classes from './App.module.css';

function App() {

  let mainClasses =[classes.App, classes.themedark];

  // let dt = localStorage.getItem('darkTheme');
  // if(dt === 'true'){
  //   mainClasses = [classes.App, classes.themelight];
  // }

  return (
    <Router>
      <div className={mainClasses.join(' ')}>          
        <Route exact path="/" component={Homepage} />
        <Route exact path="/game" component={Board}/>
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  darkTheme: state.board.darkTheme
});

export default connect(mapStateToProps)(App);
