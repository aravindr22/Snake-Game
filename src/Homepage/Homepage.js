import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';

import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


import * as actions from '../actions/index';
import classes2 from '../App.module.css';
import hclasses from './Homepage.module.css';
import board from '../reducers/board';

const useStyles = makeStyles({
    root: {
      minWidth: 400,
      backgroundColor: "#2a2c2d",
      border: '2px solid grey',
      color: '#ffffff'
    },
    title: {
      fontSize: 14,
      color: "white"
    },
    buttonRoot: {
        color: 'white',
        border: '2px solid grey',
        margin: 10,
        marginLeft: 30
    },
    buttonRoot2: {
        color: 'white',
        border: '2px solid grey',
        margin: 10,
        marginLeft: 30
    },
    buttonHover:{
        backgroundColor: '#a39f93'
    }
});

const Homepage = props => {
    const [boardSize12, setboardSize12] = useState(false);
    const [boardSize15, setboardSize15] = useState(true);
    const [boardSize18, setboardSize18] = useState(false);
    const [slow, setslow] = useState(false);
    const [medium, setmedium] = useState(true);
    const [high, sethigh] = useState(false);
    const [startgame, setstartgame] = useState(false)
    const classes = useStyles();

    let b1 = [], b2 = [], b3 = [],bs;
    if(boardSize12){
        b1 = [classes.buttonHover];
        bs = 12;
        b2 = b3 = [];
    } else if(boardSize15) {
        b2 = [classes.buttonHover];
        bs = 15;
        b1 = b3 = [];
    } else if(boardSize18) {
        b3 = [classes.buttonHover];
        bs = 18;
        b2 = b1 = [];
    }

    const SizeChanger = (bt) => {
        if(bt === 'b1'){
            setboardSize12(true);
            setboardSize15(false);
            setboardSize18(false);
        } else if(bt === 'b2'){
            setboardSize12(false);
            setboardSize15(true);
            setboardSize18(false);
        } else if(bt === 'b3'){
            setboardSize12(false);
            setboardSize15(false);
            setboardSize18(true);
        }
    }

    let s=[],m=[],h=[],gs;
    if(slow){
        s = [classes.buttonHover];
        gs = 200;
        m = h = [];
    } else if(medium) {
        m = [classes.buttonHover];
        gs = 150
        s = h = [];
    } else if(high) {
        h = [classes.buttonHover];
        gs = 100;
        s = m = [];
    }

    const speedChanger = (speed) => {
        if(speed === 's'){
            setslow(true);
            setmedium(false);
            sethigh(false);
        } else if (speed === 'm'){
            setslow(false);
            setmedium(true);
            sethigh(false);
        } else if (speed === 'h'){
            setslow(false);
            setmedium(false);
            sethigh(true);
        }
    }

    const startButton = () => {
        setstartgame(true);
        props.startGame(bs,gs);
    }

    if(startgame){
        return <Redirect to="/game/" />
    }

    return (
        <Fragment>       
            <div className={hclasses.float}>
                <Card className={classes.root}  variant='outlined'>
                    <CardContent>
                        <Typography variant='h5' component='h2'>
                            Welcome To Snake Game!!
                        </Typography>
                        <div className={hclasses.boardsize}>
                            <span>Select Board Size: </span>
                            <ButtonGroup className={classes.buttonRoot} size="large"  aria-label="large outlined primary button group">
                                <Button style={{color: 'white'}} onClick={() => SizeChanger("b1")} className={b1.join(' ')}>12 x 12</Button>
                                <Button style={{color: 'white'}} onClick={() => SizeChanger("b2")} className={b2.join(' ')}>15 x 15</Button>
                                <Button style={{color: 'white'}} onClick={() => SizeChanger("b3")} className={b3.join(' ')}>18 x 18</Button>
                            </ButtonGroup>
                        </div>
                        <div className={hclasses.boardsize}>
                            <span>Select Game Speed: </span>
                            <ButtonGroup className={classes.buttonRoot2} size="large"  aria-label="large outlined primary button group">
                                <Button style={{color: 'white'}} onClick={() => speedChanger("s")} className={s.join(' ')}>Slow</Button>
                                <Button style={{color: 'white'}} onClick={() => speedChanger("m")} className={m.join(' ')}>Medium</Button>
                                <Button style={{color: 'white'}} onClick={() => speedChanger("h")} className={h.join(' ')}>High</Button>
                            </ButtonGroup>
                        </div>
                        <div className={hclasses.boardsize}>
                            <Button 
                                onClick={() => startButton()}
                                variant="outlined" 
                                style={{
                                    color: 'white',
                                    border: '2px solid grey',
                                    width: 130,
                                    height: 45
                                }}
                            >Start</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeTheme: () => dispatch(actions.changeTheme()),
        startGame: (bs, gs) => dispatch(actions.startGame(bs,gs))
    }
}

export default connect(null, mapDispatchToProps)(Homepage);

    // let spanClasses = [classes2.slider,classes2.round];

    // let sliderButton = (
    //         <div className={classes2.container}>
    //             <label id="switch" className={classes2.switch}>
    //                 <input type="checkbox" onClick={() => props.changeTheme()}></input>       
    //                 <span className={spanClasses.join(' ')}></span>
    //             </label>
    //         </div>
    // );

    // let theme = [classes2.themedark]
    // if(localStorage.getItem('theme') === 'true'){
    //     theme = [classes2.themelight]
    // }
