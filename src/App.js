import "./css/app.css";

import Header from "./Components/Header";
import HomeScene from "./Components/HomeScene";
import Footer from "./Components/Footer";
import { Component } from "react";
const Web3 = require('web3');
const {ethereum} = window;


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentAccount: null,
      currentAccountBalance: null,
    }
  }

  componentWillMount() {
    ethereum.request({method: 'eth_requestAccounts'}).then(account => {
       this.storeAccountAndBalance(account)
    })
  }

  async storeAccountAndBalance(account) {
    var balance = null;
    let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
    await web3.eth.getBalance(account[0], function(err, result) {
      if (err) {
        console.log(err)
      } else {
        balance = web3.utils.fromWei(result)
      }
    })
    this.setState({
      currentAccount: account[0],
      currentAccountBalance: balance
    })
  }

  render() {
    return (
      <div className="App">
        <Header account={this.state.currentAccount} balance={this.state.currentAccountBalance}/>
        <HomeScene />
        <Footer />
      </div>
    );
  }
}

export default App;
