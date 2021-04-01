import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const Score = ({gameScore}) => {

    const [clickContinue, setclickContinue] = useState(false)

    if(clickContinue){
        return <Redirect to="/" />;
    }

    return (
        <Fragment>
            <div>
                <h1 style={{marginTop: 5, marginBottom: 5}}>Game Over!!</h1>
                <h3 style={{marginTop: 5}}>Your Score is: {gameScore}</h3>
            </div>
            <Button
                onClick={() => setclickContinue(true)}
                variant="outlined" 
                style={{
                    color: 'white',
                    border: '2px solid grey',
                    width: 130,
                    height: 45
                }}
                >Continue</Button>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    gameScore: state.board.score
});

export default connect(mapStateToProps)(Score);