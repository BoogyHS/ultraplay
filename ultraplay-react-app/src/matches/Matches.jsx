import React, { useState, useEffect } from 'react';

//styles
import styles from './style.module.scss';

//services
import matchesService from '../services/loadMatches';

//components
import MatchOdds from './MatchOdds';

import { dateFormatter, getTeamName } from '../utils/dateFormatter.js';


function Matches(props) {
  const [eventNames, setEventNames] = useState(null);
  const [sortedMatches, setSortedMatches] = useState(null);

  useEffect(() => {

    matchesService.getMatches()
      .then(data => {
        const matches = [];
        const myMap = new Map();

        data.XmlSports.Sport[0].Event.forEach(event => {
          const eventName = event.$.Name.split(', ')[0];
          myMap.set(event.$.CategoryID, eventName);

          if (eventName === props.toFilter || props.toFilter === null) {
            event.Match
              .forEach(match => {
                if (match.Bet && match.$.MatchType !== 'OutRight') {
                  match.Bet = match.Bet[0];
                  const currentMatch = {
                    ...match,
                    EventID: event.$.ID,
                    EventName: event.$.Name,
                    CategoryID: event.$.CategoryID
                  };
                  matches.push(currentMatch);
                }
              })
          }
        })
        setEventNames(myMap);

        const sortByDate = (a, b) => a.$.StartDate.localeCompare(b.$.StartDate);
        setSortedMatches(matches.sort(sortByDate));
      })
      .catch(err => console.log(err));

  }, [props.toFilter]);

  return (
    <div className={styles["all-content-container"]}>
      {sortedMatches
        ? sortedMatches.map(((match, i) =>
          <div className={styles["content-row"]} key={match.$.ID}>
            <div className={styles["box"]}>{i + 1}</div>
            <div className={styles["box"]}>{eventNames.get(match.CategoryID)}</div>
            <div className={styles["box"]}>{dateFormatter(match.$.StartDate)}</div>
            <div className={styles["box"]}>{match.Bet.$.Name}</div>
            <div className={styles["box"]}>{getTeamName(match.$.Name)[0]}</div>
            <MatchOdds match={match} />
            <div className={styles["box"]}>{getTeamName(match.$.Name)[1]}</div>
          </div>
        ))
        : <div className={styles["content-row"]}>loading matches...</div>
      }
    </div>
  );
}

export default Matches;