import React from "react";
import "./definitionPopup.scss"

export default class DefinitionPopup extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        fetch(`https://tezaurs.lv/api/retrieveEntry?hw=${this.props.word}`)
        .then(res => res.text())
        .then(text => this.setState({ data: text }))
    }
    render() {
        if (this.state.data) {
            return (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.props.close}>&times;</span>
                        <div dangerouslySetInnerHTML={{__html: this.state.data ? this.state.data : null}}></div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}