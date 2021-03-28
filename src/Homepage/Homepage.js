import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import * as actions from '../actions/index';
import classes from '../App.module.css';
import classes2 from './Homepage.module.css';

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
            <div>
                <Card className={classes.root} variant='outlined'>
                    <CardContent>

                    </CardContent>
                </Card>
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeTheme: () => dispatch(actions.changeTheme())
    }
}

export default connect(null, mapDispatchToProps)(Homepage);
