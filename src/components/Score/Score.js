import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

const Score = ({gameScore}) => {
    console.log(gameScore)
    return (
        <div>
            <h1>Your Score is: {gameScore}</h1>
            <Link to="/">Back</Link>
        </div>
    );
};

const mapStateToProps = state => ({
    gameScore: state.board.score
});

export default connect(mapStateToProps)(Score);
