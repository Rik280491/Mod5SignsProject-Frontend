import React from 'react';


import API from './API/API'
import HomePageContainer from './homePage/HomePageContainer';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      signs: []
    }
  }
  
  componentDidMount(){
    API.get().then(signData => this.setState({
      signs: signData
    }))
  }
  
  render(){
    return (
      <div >
        <HomePageContainer signs={this.state.signs} />
      </div>
    );
  }
  
}

export default App;
