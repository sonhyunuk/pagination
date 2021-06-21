import 'bootstrap/dist/css/bootstrap.min.css';
import '@grapecity/wijmo.styles/wijmo.css';
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { httpRequest } from '@grapecity/wijmo';
import Search from './components/Serach';
import Pagination from './components/Pagination';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $offset: 0,
      $limit: 10,
      $search: '',
      totalCount: 0,
    };
  }
  componentDidMount() {
    this.getData();
  }
  onSearch = async (value) => {
    let searchDataChange = await this.setSearchData(value);
    console.log(searchDataChange);
    this.getData();
  }

  setSearchData = (value) => {
    return new Promise((resolve, reject) => {
      this.setState({ $search: value },
        () => {
          resolve(true)
        });
    });
  };

  onChange = (offset, limit) => {
    this.setState({ $offset: offset, $limit: limit })
    this.getData();
  }

  getData() {
    httpRequest("http://localhost:3005/", {
      data: {
        $limit: this.state.$limit,
        $offset: this.state.$offset,
        $search: this.state.$search
      },
      success: async (xhr) => {
        let item = JSON.parse(xhr.responseText);
        this.setState({ ...this.state, items: item[0], totalCount: item[1][0].totalCount })
      }
    });

  }

  render() {
    return (
      <div>
        <Search onChange={this.onSearch} />
        <FlexGrid itemsSource={this.state.items} headersVisibility="Column" />
        <Pagination totalCount={this.state.totalCount}
          onChange={this.onChange} />
      </div>
    );
  }
}


export default App;
