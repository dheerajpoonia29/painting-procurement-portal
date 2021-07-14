import React, { Component } from "react";
import "../css/header.css";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="headerContainer">
        <div style={{ float: "left" }}>
          <h1 className="logoTitle">Painting Procurement</h1>
        </div>
        <div style={{ float: "right" }}>
          <h1 className="accInfo">{this.props.account} | <span style={{
    border: "2px dashed #f69c55"}}>{this.props.balance} Eth</span> </h1>
        </div>
      </div>
    );
    }
}

export default Header;
