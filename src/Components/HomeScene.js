import "../css/homeScene.css";

import { Component } from "react";
import Card from "./Card";
import Form from "./Form";
import ApiClient from "../ApiManager";

class HomeScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "create",
      paintingJson: null,
    };
  }

  componentDidMount() {
    ApiClient.getAll()
    .then((res) => this.setState({paintingJson: res.data}))
    .catch((err) => console.log("!getAll = ", err)); 
  }

  inlineStyle = (current) => {
    if (this.state.action === current) {
      return {
        backgroundColor: "green",
      };
    } else {
      return {
        backgroundColor: "grey",
      };
    }
  };

  renderAbout() {
    return (
      <div className="about">
        <img
          style={{ width: "100%" }}
          id="image"
          src="https://uploads.toptal.io/blog/image/125792/toptal-blog-image-1522395353253-70fb1c40e9527154c2774507b63eac63.png"
        />
      </div>
    );
  }

  renderPainter() {
    // blockchain.getPainterPaintingsId(msg.sender)
    let myId = [1];
    return (
      <div className="painting">
        {this.state.paintingJson!==null && this.state.paintingJson.map((data, key) => {
          // if (myId.indexOf(data.id) !== -1)
            return <Card data={data} action={"painter"} />;
        })}
        {this.state.paintingJson===null && <h1>Not painting found</h1>}
      </div>
    );
  }

  renderBidder() {
    return (
      <div className="painting">
        {this.state.paintingJson!==null && this.state.paintingJson.map((data, key) => {
          return <Card data={data} action={"bidder"} />;
        })}
        {this.state.paintingJson===null && <h1>Not painting found</h1>}
      </div>
    );
  }

  renderCreate() {
    return (
      <div className="form">
        <Form />
      </div>
    );
  }

  render() {
    return (
      <div className="HomeSceneContainer">
        <div className="action" style={{ float: "left" }}>
          <button
            className="button"
            style={this.inlineStyle("about")}
            onClick={() => this.setState({ action: "about" })}
          >
            About
          </button>
          <button
            className="button"
            style={this.inlineStyle("painter")}
            onClick={() => {this.componentDidMount();this.setState({ action: "painter" })}}
          >
            Painter
          </button>
          <button
            className="button"
            style={this.inlineStyle("bidder")}
            onClick={() => {this.componentDidMount();this.setState({ action: "bidder" })}}
          >
            Bidder
          </button>
          <button
            className="button"
            style={this.inlineStyle("create")}
            onClick={() => this.setState({ action: "create" })}
          >
            Add Painting
          </button>
        </div>
        <div className="detail" style={{ float: "right" }}>
          {this.state.action === "about" && this.renderAbout()}
          {this.state.action === "painter" && this.renderPainter()}
          {this.state.action === "bidder" && this.renderBidder()}
          {this.state.action === "create" && this.renderCreate()}
        </div>
      </div>
    );
  }
}

export default HomeScene;
