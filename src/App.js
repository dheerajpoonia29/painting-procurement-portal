import "./css/app.css";

import Header from "./Components/Header";
import HomeScene from "./Components/HomeScene";
import { Component } from "react";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidCatch(){
    
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
