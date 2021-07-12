import "./css/app.css";

import Header from "./Components/Header";
import HomeScene from "./Components/HomeScene";
import { Component } from "react";
import * as Web3 from "web3";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentWillMount(){
    
  }

  render() {
    return (
      <div className="App">
        <Header />
        <HomeScene />
      </div>
    );
  }
}

export default App;
