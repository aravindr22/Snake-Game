import React, {Fragment} from 'react'
import spinner from '../../../public/Spinner.gif'

const Spinner = () => {
    return (
        <Fragment>
            <img 
                src={spinner}
                style={{width: 200, margin: 'auto', display: 'block'}}
                alt='Loading'
            />
        </Fragment>
    );
}

export default Spinner;
