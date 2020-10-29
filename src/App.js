import React from 'react';
import axios from 'axios';
import 'normalize.css';
import './App.scss';

import ScrabbleWordFinder from './utilities/scrabbleWordFinder'
import DefinitionPopup from "./definitionPopup";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      scrabbleWordFinder: null,
      searchResults: [],
      letterInput: '',
      selectedWord: '',
      showModal: false
    }
  }
  componentDidMount() {
    axios('https://raw.githubusercontent.com/peteriscaurs/latvian-scrabble-word-list/main/wordList.json')
      .then(res => this.setState({ scrabbleWordFinder: new ScrabbleWordFinder(res.data.words) }));
  }
  findWords = () => {
    const results = this.state.scrabbleWordFinder.find(this.state.letterInput);
    this.setState({ searchResults: results })
  }
  showDefinitionModal = word => {
    this.setState({ selectedWord: word });
    this.setState({ showModal: true });
  }
  closeDefinitionModal = () => {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div className="app">
        <input type="text" placeholder="raksti savus burtus šeit" onChange={e => this.setState({ letterInput: e.target.value })} />
        <button onClick={this.findWords}>meklēt</button>
        <table style={{ margin: '2em auto 2em auto' }}>
          <thead>
            <th>vārds</th>
            <th>nozīme</th>
            <th>vērtība</th>
          </thead>
          <tbody>
            {this.state.searchResults.length ? this.state.searchResults.map(e => {
              return (
                <tr>
                  <td>{e.letters}</td>
                  <td onClick={() => this.showDefinitionModal(e.letters)}>info</td>
                  <td>{e.value}</td>
                </tr>
              )
            }) : null}
          </tbody>
        </table>
        {this.state.showModal === true ? <DefinitionPopup close={this.closeDefinitionModal} word={this.state.selectedWord} /> : null}
      </div>
    );
  }
}

export default App;
