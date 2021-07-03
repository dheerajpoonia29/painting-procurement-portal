import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ApiClient from "../ApiManager";

class Bidding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: get current metamask address
      bidder: "0x2",
      bidDate: null,
      bidMonth: null,
      bidYear: null,
      todayDate: null,
      todayMonth: null,
      todayYear: null,
      bidDuration: null,
      bid: false,
      heighest_bid: 0,
    };
    this.bidInput = React.createRef();
  }

  componentDidMount() {
    let bidDate = new Date(this.props.bidDate);
    let todayDate = new Date();

    this.setState({
      bidDate: bidDate.getDate(),
      bidMonth: bidDate.getMonth(),
      bidYear: bidDate.getFullYear(),
      todayDate: todayDate.getDate(),
      todayMonth: todayDate.getMonth(),
      todayYear: todayDate.getFullYear(),
    });

    this.setState({
      bidDuration: this.getTime(),
    });

    this.setState({
      heighest_bid: parseInt(this.props.heighestBid),
    });
  }

  handleSubmit() {
    let input = this.bidInput;
    let currentBid = parseInt(input.current.value);
    if(currentBid>this.state.heighest_bid){
      this.setState(
        {
          heighest_bid: Math.max(currentBid, this.state.heighest_bid),
        },
        this.postBid()
      );
    }    
  }

  postBid() {
    // TODO: get current metamask address
    let params = {
      address: "0x2",
      painting_id: this.props.paintingId,
      heighest_bid: this.state.heighest_bid,
    };
    console.log("post params = ", params);
    // TODO: blockchain.registerPainting(res.data.id, this.state.painter);
    ApiClient.biddingPostBid(params)
      .then((res) => {
        res.data.msg ? alert(res.data.msg) : alert(res); 
      })
      .catch((err) => {
        console.log("**db-error=", err);
        alert("ApiClient.biddingPostBid Error");
      });
  }

  closeBid() {
    let params = {
      painting_id: this.props.paintingId,
    };
    ApiClient.biddingCloseBid(params)
      .then((res) => {
        res.data.msg ? alert(res.data.msg) : alert(res);
      })
      .catch((err) => {
        console.log("**db-error=", err);
        alert("ApiClient.biddingCloseBid Error");
      });
  }

  getTime() {
    let h1 = parseInt(this.props.bidTime.split(",")[0].split(":")[0]);
    let m1 = parseInt(this.props.bidTime.split(",")[0].split(":")[1]);
    let h2 = parseInt(this.props.bidTime.split(",")[1].split(":")[0]);
    let m2 = parseInt(this.props.bidTime.split(",")[1].split(":")[1]);

    if (h2 < h1) {
      h2 += 24;
    }
    let hDiff = h2 - h1;

    if (m2 < m1) {
      hDiff -= 1;
      m2 += 60;
    }
    let mDiff = m2 - m1;

    return hDiff * 3600 + mDiff * 60;
  }

  checkTime() {
    // https://stackoverflow.com/questions/4455282/call-a-javascript-function-at-a-specific-time-of-day
    let flag = false;
    let id = setInterval(() => {
      if (this.props.paintingId === 23)
        console.log(
          `>paintingId=${this.props.paintingId} = ${
            this.props.bidTime.split(",")[0].split(":")[0]
          } === ${new Date().getHours()}`
        );
      if (
        parseInt(this.props.bidTime.split(",")[0].split(":")[0]) ===
        new Date().getHours()
      ) {
        clearInterval(id);
        this.setState({ bid: true });
      }
    }, 1000);
    return;
  }

  checkDate() {
    return this.state.bidDate === this.state.todayDate &&
      this.state.bidMonth === this.state.todayMonth &&
      this.state.bidYear === this.state.todayYear
      ? true
      : false;
  }

  bidDateExpired() {
    if (this.state.bidYear < this.state.todayDate) {
      return true;
    } else if (this.state.bidMonth < this.state.todayDate) {
      return true;
    } else if (this.state.bidDate < this.state.todayDate) {
      return true;
    }
    return false;
  }

  checkAccess() {
    return this.checkDate() && this.props.bidClosed === "false" ? true : false;
  }

  renderBidInfo() {
    return (
      <div>
        <hr className="solid"></hr>
        <p style={{ backgroundColor: "green", color: "white" }}>
          Bid Status:{" "}
          {this.props.bidClosed === "true"
            ? "Closed"
            : this.checkDate() === true
            ? "Today is Bidding Date"
            : this.bidDateExpired() === true
            ? "Expired"
            : "Will Open on Bidding Date"}
        </p>
        <hr className="solid"></hr>
        <p>
          Bidding Date: {this.state.bidDate}/{this.state.bidMonth}/
          {this.state.bidYear}
        </p>
        <p>Time Between(24hr): {this.props.bidTime}</p>
      </div>
    );
  }

  renderBidTimer() {
    // TODO: implement check time perfectly
    if (this.checkDate() && this.props.bidClosed === "false") {
      return (
        <div>
          <hr className="solid"></hr>
          <div
            style={{
              float: "left",
              paddingTop: "5px",
            }}
          >
            <CountdownCircleTimer
              key={this.props.paintingId}
              isPlaying={true}
              duration={this.getTime()}
              colors={"#FE6F6B"}
              strokeWidth={10}
              size={80}
              trailColor="#151932"
              onComplete={() => {
                alert(
                  `Bid completed successfully!\nPainting ID =${this.props.paintingId}`
                );
                this.closeBid();
              }}
            />
          </div>
          <div
            style={{
              float: "right",
            }}
          >
            <p style={{ backgroundColor: "skyblue" }}>
              Heigest Bid: {this.state.heighest_bid}
            </p>
            <p>Bid for: {this.state.bidDuration} Sec</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <hr className="solid"></hr>
          <div style={{ float: "left" }}>
            <CountdownCircleTimer
              key={this.props.paintingId}
              isPlaying={false}
              duration={0}
              colors={"#151932"}
              strokeWidth={10}
              size={80}
              trailColor="#151932"
            />
          </div>
          <div style={{ float: "right" }}>
            <p style={{ backgroundColor: "skyblue" }}>
              Heigest Bid: {this.props.heighestBid}
            </p>
            <p>Bid for: {this.state.bidDuration} Sec</p>
          </div>
        </div>
      );
    }
  }

  renderBidAction() {
    if (this.props.role === "bidder")
      return (
        <div>
          <input
            type="number"
            name="heighest_bid"
            ref={this.bidInput}
            // value={this.state.heighest_bid}
            disabled={!this.checkAccess()}
          />
          <button
            className="form-button"
            type="button"
            onClick={() => this.handleSubmit()}
            disabled={!this.checkAccess()}
          >
            Place Bid
          </button>
        </div>
      );
  }

  render() {
    return (
      <div>
        {this.renderBidInfo()}
        {this.renderBidTimer()}
        {this.renderBidAction()}
      </div>
    );
  }
}

export default Bidding;
