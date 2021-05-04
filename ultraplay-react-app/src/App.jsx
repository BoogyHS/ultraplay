import React, { useState } from 'react';

import './App.scss';

import Matches from './matches/Matches.jsx';
import FilteredEvents from './events/FilteredEvents.jsx';

function App() {

  const [toFilter, setToFilter] = useState(null);

  function filterHandler(name) {
    setToFilter(name);
  }

  return (
    <div>
      <FilteredEvents filterHandler={filterHandler} />
      <Matches toFilter={toFilter} />
    </div>
  );
}

export default App;
