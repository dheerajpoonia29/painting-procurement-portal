import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ApiClient from "../ApiManager";
const {ethereum} = window;

class Bidding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: get current metamask address
      bidder: this.props.bidder,
      bidDate: null,
      bidMonth: null,
      bidYear: null,
      todayDate: null,
      todayMonth: null,
      todayYear: null,
      bidDuration: null,
      heighest_bid: 0,
      is_time_in_range: false,
    };
    this.bidInput = React.createRef();

    // temp area
    // this.checkTime();
  }

  componentWillMount() {
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
      bidDuration: this.getBidDuration(),
    });

    this.setState({
      heighest_bid: parseInt(this.props.heighestBid),
    });
  }

  handleSubmit() {
    let input = this.bidInput;
    let currentBid = parseInt(input.current.value);
    let currentAdd = this.props.account;
    if (currentBid > this.state.heighest_bid) {
      this.setState(
        {
          heighest_bid: currentBid,
          bidder: currentAdd,
        },
        this.postBid(currentBid, currentAdd)
      );
    }
  }

  async postBid(currentBid, currentAdd) {
    alert(currentBid)
    var currentBidGwei = (currentBid/2) * 10e14;
    // Will send immediately for instant demo purposes
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
      gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: this.props.painter, // Required except during contract publications.
      from: this.props.account, // must match user's active address.
      value: '0x' + currentBidGwei.toString(16), // Only required to send ether to the recipient from the initiating external account.
      chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    
    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    alert('Transaction has been initiated!')
    let params = {
      address: currentAdd,
      painting_id: this.props.paintingId,
      heighest_bid: currentBid,
    };
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

  getBidDuration() {
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

    let sec = 5000;

    let h1 = parseInt(this.props.bidTime.split(",")[0].split(":")[0]);
    let m1 = parseInt(this.props.bidTime.split(",")[0].split(":")[1]);
    let h2 = parseInt(this.props.bidTime.split(",")[1].split(":")[0]);
    let m2 = parseInt(this.props.bidTime.split(",")[1].split(":")[1]);

    let ch = new Date().getHours();
    let cm = new Date().getMinutes();

    setInterval(() => {
      ch = new Date().getHours();
      cm = new Date().getMinutes();
      console.log(">> ", ch, " ", cm);
    }, sec);
  }

  checkDate() {
    if (
      this.state.bidDate === this.state.todayDate &&
      this.state.bidMonth === this.state.todayMonth &&
      this.state.bidYear === this.state.todayYear
    )
      return "today";
    else if (
      this.state.bidYear < this.state.todayDate ||
      this.state.bidMonth < this.state.todayDate ||
      this.state.bidDate < this.state.todayDate
    )
      return "expired";
    else return "future";
  }

  checkAccess() {
    return (
      this.checkDate() === "today" &&
      (this.props.bidClosed === "false" ? true : false)
    );
  }

  checkWithinTimeLimit() {
    const time_limits = this.props.bidTime.split(',')
    const start_time = Number(time_limits[0].replace(':', ''))
    const end_time = Number(time_limits[1].replace(':',''))
    const date = new Date();
    const current_time = Number(String(date.getHours()) + String((date.getMinutes()<10?'0':'') + date.getMinutes()));
    if(current_time > end_time) return 'expired'
    else if(current_time >= start_time && current_time <= end_time) return 'ongoing'
    else return 'future';
  }

  renderBidInfo() {
    return (
      <div>
        <hr className="solid"></hr>
        <div className="address">
          <p>Painter: {this.props.painter}</p>
          <p>Bidder: {this.state.bidder}</p>
        </div>
        <hr className="solid"></hr>
        <p style={{ backgroundColor: "green", color: "white" }}>
          Bid Status:{" "}
          {this.props.bidClosed === "true"
            ? "Closed"
            : this.checkDate() === "today"
            ? "Bidding Date Today"
            : this.checkDate() === "expired"
            ? "Expired"
            : "Will Open"}
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
    if (this.checkDate() === 'today' && this.checkWithinTimeLimit() === 'ongoing') {
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
              duration={this.state.bidDuration}
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
    } else if(this.checkDate() === "today" && this.checkWithinTimeLimit() == 'future' || this.checkDate() == 'future') {
      return (
        <div>
          <hr className="solid"></hr>
          <div style={{ float: "left" }}>
            <p style={{ backgroundColor: "red"}}>Bid is upcoming!</p>
          </div>
          <div style={{ float: "right" }}>
            <p style={{ backgroundColor: "skyblue" }}>
              Heigest Bid: {this.props.heighestBid}
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
            <p style={{ backgroundColor: "red"}}>Bid is expired!</p>
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
