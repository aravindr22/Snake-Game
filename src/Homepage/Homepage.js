import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import classes from '../App.module.css';

const Homepage = props => {

    let spanClasses = [classes.slider,classes.round];

    let sliderButton = (
            <div className={classes.container}>
                <label id="switch" className={classes.switch}>
                    <input type="checkbox" onClick={() => props.changeTheme()}></input>       
                    <span className={spanClasses.join(' ')}></span>
                </label>
            </div>
    );

    return (
        <Fragment>
            {sliderButton}
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeTheme: () => dispatch(actions.changeTheme())
    }
}

export default connect(null, mapDispatchToProps)(Homepage);
