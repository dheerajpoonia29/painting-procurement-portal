import React, { Component } from "react";
import "../css/helio.css";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header id="header">
        <div style={{ float: "left" }}>
          <h1 className="logo" style={{color: "white", fontSize: '22px', marginTop:'7px', marginLeft: '10px'}}>Painting Procurement</h1>
        </div>
        <div style={{ float: "right" }}>
          <h1 style={{color: "white", fontSize: '22px', marginTop:'7px', marginRight: '10px'}}>{this.props.account} | <span style={{
    border: "2px dashed #f69c55"}}>{this.props.balance} Eth</span> </h1>
        </div>
      </header>
    );
    }
}

export default Header;
