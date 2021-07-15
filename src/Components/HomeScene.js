import "../css/homeScene.css";
import "../css/helio.css";
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
      paintingId: null,
    };
  }

  componentDidMount() {
    ApiClient.paintingGetAll()
      .then((res) => this.setState({ paintingJson: res.data }))
      .catch((err) => alert(`Api error, ${err.code}`));

    ApiClient.painterGetByAddress("sfds")
      .then((res) => {
        this.setState({ paintingId: res.data });
      })
      .catch((err) => alert(`Api error, ${err}`));
  }

  inLineClass = (current) => {
    if (this.state.action === current) {
      return "button special";
    } else {
      return "button alt";
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
    return (
      <div className="painting">
        <h3>Your paintings</h3>
        {this.state.paintingJson !== null &&
          this.state.paintingJson.map(data => {
            if(String(data.painter).toLowerCase()===String(this.props.account).toLowerCase()) {
              return <Card data={data} action={"painter"} />
            }
          })}
        {this.state.paintingJson === null && <h1>Not painting found</h1>}
      </div>
    );
  }

  renderBidder() {
    return (
      <div className="painting">
        <h3>Paintings available to bid</h3>
        {this.state.paintingJson !== null &&
          this.state.paintingJson.map((data, key) => {
             {
              return <Card data={data} action={"bidder"} />;
            }             
          })}
        {this.state.paintingJson === null && <h1>Not painting found</h1>}
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
      <div className="container" style={{paddingTop: '85px'}}>
        <div className="row 200%">
        <div className="4u 12u$(medium)">
          <button
            className={this.inLineClass("about")}
            onClick={() => this.setState({ action: "about" })}
          >
            About
          </button>
          <button
            className={this.inLineClass("painter")}
            onClick={() => {
              this.componentDidMount();
              this.setState({ action: "painter" });
            }}
          >
            Painter
          </button>
          <button
            className={this.inLineClass("bidder")}
            onClick={() => {
              this.componentDidMount();
              this.setState({ action: "bidder" });
            }}
          >
            Bidder
          </button>
          <button
            className={this.inLineClass("create")}
            onClick={() => this.setState({ action: "create" })}
          >
            Add Painting
          </button>
        </div>
        <div className="8u 12u$(medium)">
          {this.state.action === "about" && this.renderAbout()}
          {this.state.action === "painter" && this.renderPainter()}
          {this.state.action === "bidder" && this.renderBidder()}
          {this.state.action === "create" && this.renderCreate()}
        </div>
      </div>
      </div>
    );
  }
}

export default HomeScene;
