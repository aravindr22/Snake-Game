import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import classes from './Score.module.css';

const Score = ({gameScore, scores}) => {

    const [clickContinue, setclickContinue] = useState(false)

    if(clickContinue){
        return <Redirect to="/" />;
    }

    let dataDisplay = scores.map((element, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.name}</td>
                <td>{element.score}</td>
            </tr>
        )
    });

    return (
        <Fragment>
            <div>
                <h2 style={{marginTop: 5, marginBottom: 5, fontSize: 45}}>Game Over!!</h2>
                <h4 style={{marginTop: 8, marginBottom: 15}}>Your Score is: {gameScore}</h4>
                <h5 style={{marginTop: 55, marginBottom: 15, fontSize: 20}}>Best 5 Score of All Time</h5>
            </div>
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

export default connect(mapStateToProps)(Score);