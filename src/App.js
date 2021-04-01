import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import Board from './components/Board/Board';
import Homepage from './components/Homepage/Homepage';
import Score from './components/Score/Score';
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
        <Route exact path="/score" component={Score} />
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  darkTheme: state.board.darkTheme
});

export default connect(mapStateToProps)(App);
