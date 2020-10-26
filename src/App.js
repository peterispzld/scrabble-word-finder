import React, {useState} from 'react';
import 'normalize.css';
import './App.css';

import scrabbleWordFinder from './utilities/scrabbleWordFinder'

function App() {
  const [letterInput, setLetterInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  findWords = () => {
    const results = scrabbleWordFinder.find(letterInput);
    setSearchResults(results);
  }
  return (
    <div className="app">
      <h1>SCRABBLE</h1>
      <p>vārdu meklētājs</p>
      <input type="text" placeholder="raksti savus burtus šeit" onChange={e => setLetterInput(e.event.target)} />
      <button onClick={findWords}>meklēt</button>
      <table style={{ margin: '2em auto 2em auto' }}>
        <thead>
          <th>vārds</th>
          <th>nozīme</th>
          <th>vērtība</th>
        </thead>
        <tbody>
          <tr>
            <td>HLOROGĻŪDEŅRAŽI</td>
            <td>info</td>
            <td>83</td>
          </tr>
          <tr>
            <td>FILOLOGS</td>
            <td>info</td>
            <td>42</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
