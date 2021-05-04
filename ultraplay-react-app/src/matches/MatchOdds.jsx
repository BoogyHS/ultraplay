import React from 'react';

import styles from './style.module.scss'

function MatchOdds(props) {
    const oddsCount = props.match.Bet.Odd.length;

    if (oddsCount === 2) {

        return (
            <React.Fragment>
                <div className={styles["box"]}>{props.match.Bet.Odd[0].$.Value}</div>
                <div className={styles["box"]}>{'vs'}</div>
                <div className={styles["box"]}>{props.match.Bet.Odd[1].$.Value}</div>
            </React.Fragment>
        );
    } else {

        return (
            <React.Fragment>
                <div className={styles["box"]}>{props.match.Bet.Odd[0].$.Value}</div>
                <div className={styles["box"]}>{props.match.Bet.Odd[1].$.Value}</div>
                <div className={styles["box"]}>{props.match.Bet.Odd[2].$.Value}</div>
            </React.Fragment>
        );
    }
}

export default MatchOdds;