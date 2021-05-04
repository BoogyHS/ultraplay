import React, { useState, useEffect } from 'react';

//styles
import styles from './style.module.scss';

//services
import matchesService from '../services/loadMatches';

function FilteredEvents(props) {
    const [eventNames, setEventNames] = useState(null);

    useEffect(() => {

        const takeName = x => x.$.Name.split(', ')[0];

        matchesService.getMatches()
            .then(matches => {
                const filteredEventsNames = [...new Set(matches.XmlSports.Sport[0].Event.map(takeName))];
                setEventNames(filteredEventsNames);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles["events-buttons"]}>
            <button key={'all'} onClick={() => props.filterHandler(null)}>All</button>
            {eventNames
                ? eventNames.map(((event, i) =>
                    <button key={i} onClick={() => props.filterHandler(event)}>{event}</button>
                ))
                : "loading events..."
            }</div>
    );
}

export default FilteredEvents;