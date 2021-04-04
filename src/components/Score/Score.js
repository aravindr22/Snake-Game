import React, { Fragment, useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {saveTop5Scores} from '../../actions/index';
import classes from './Score.module.css';

const Score = ({gameScore, scores, saveTop5Scores}) => {

    const [clickContinue, setclickContinue] = useState(false);
    const [open, setopen] = useState(false);
    const [name, setname] = useState("");

    useEffect(() => {
        if(scores[scores.length - 1].score < gameScore){
            dialogOpenHandler();
        }
    }, []);

    if(clickContinue){
        return <Redirect to="/" />;
    }

    const dialogOpenHandler = () => {
        setopen(() => true);
    }
    
    const dialogCloseHandler = () => {
        setopen(() => false);
    }
    
    const onSumbitDialog = () => {
        scores.pop();
        scores.push({name: name, score: gameScore});
        scores.sort(compare)
        saveTop5Scores(scores);
        dialogCloseHandler();
    }
    
    //function to sort arry of objects
    const compare = ( a, b ) => {
        if ( a.score < b.score ){
            return 1;
        }
        if ( a.score > b.score ){
            return -1;
        }
        return 0;
    }

    scores.sort(compare);
    let dataDisplay = scores.map((element, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.name}</td>
                <td>{element.score}</td>
            </tr>
        )
    });

    let dialogBox = (
        <Fragment>
            <Dialog open={open} onClose={dialogCloseHandler} aria-labelledby='form-dialog-title'>
                <div style={{backgroundColor: '#2a2c2d'}}>
                    <DialogTitle id="dorm-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{color: 'white'}}>
                            Congrats!! You've Featured Yourself in Top 5
                        </DialogContentText>
                        <TextField 
                            value={name}
                            onChange={(event) => setname(event.target.value)}
                            autoFocus
                            color="primary"
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={dialogCloseHandler} style={{color: 'white'}}>
                            Cancel
                        </Button>
                        <Button onClick={onSumbitDialog} style={{color: 'white'}}>
                            Continue
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </Fragment>
    );

    return (
        <Fragment>
            <div>
                <h2 style={{marginTop: 5, marginBottom: 5, fontSize: 45}}>Game Over!!</h2>
                <h4 style={{marginTop: 8, marginBottom: 15}}>Your Score is: {gameScore}</h4>
                <h5 style={{marginTop: 55, marginBottom: 15, fontSize: 20}}>Best 5 Score of All Time</h5>
            </div>
            <button onClick={dialogOpenHandler}>Open</button>
            {dialogBox}
            <table className={classes.customers}>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {dataDisplay}
                </tbody>
            </table>
            <Button
                onClick={() => setclickContinue(true)}
                variant="outlined" 
                style={{
                    color: 'white',
                    border: '2px solid grey',
                    width: 130,
                    height: 45,
                    marginTop: 20,
                    marginLeft: 40
                }}
                >Continue</Button>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    gameScore: state.board.score,
    scores: state.board.top5scores
});

export default connect(mapStateToProps, {saveTop5Scores})(Score);