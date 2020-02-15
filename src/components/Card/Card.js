import React from 'react';
import s from './Card.module.scss';

class Card extends React.Component{
    render(){
        return(
            <>
                <div className={s.container}>{this.props.data}</div>
            </>
        )
    }
}

export default Card;