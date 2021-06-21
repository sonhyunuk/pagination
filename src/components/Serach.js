import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@grapecity/wijmo.styles/wijmo.css';
import PropTypes from 'prop-types';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',

        }
    }
    handleInputChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    }
    handleOnKeyPress = (e) => {
        if (e.key == 'Enter') {
            this.handleOnSearch();
            this.setState({
                value: ''
            })

        }
    }
    handleOnSearch = () => {
        this.setState({
            value: ''
        })
        this.props.onChange(this.state.value);
    }


    render() {
        const { value } = this.state;
        return (
            <div>
                <input
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    value={value}
                    onChange={this.handleInputChange}
                    onKeyPress={this.handleOnKeyPress}
                ></input>
                <button type="button" onClick={this.handleOnSearch}>검색</button>
            </div>
        );
    }
}