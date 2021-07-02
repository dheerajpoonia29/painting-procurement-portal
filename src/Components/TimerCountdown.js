import { Component } from "react";
import Timer from "./Timer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

class TimerCountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sTH: null,
      sTM: null,
      eTH: null,
      eTM: null,
      bidDate: null,
      bidMonth: null,
      bidYear: null,
      todayDate: null,
      todayMonth: null,
      todayYear: null,
      bidDuration: null,
      bid: false,
    };
  }

  componentDidMount() {
    let time = this.props.bidTime;
    let time_array = time.split(",");
    let s_time = time_array[0].split(":");
    let e_time = time_array[1].split(":");

    this.setState({
      sTH: parseInt(s_time[0]),
      sTM: parseInt(s_time[1]),
      eTH: parseInt(e_time[0]),
      eTM: parseInt(e_time[1]),
    });

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

    let second =
      Math.abs((parseInt(s_time[0]) % 12) - (parseInt(e_time[0]) % 12)) * 3600 +
      Math.abs(parseInt(s_time[1]) - parseInt(e_time[1])) * 60;

    this.setState({
      bidDuration: second,
    });

    this.checkTime();
  }

  getTime() {
    return (
      Math.abs(
        (parseInt(this.props.bidTime.split(",")[0].split(":")[0]) % 12) -
          (parseInt(this.props.bidTime.split(",")[1].split(":")[0]) % 12)
      ) *
        3600 +
      Math.abs(
        parseInt(this.props.bidTime.split(",")[0].split(":")[1]) -
          parseInt(this.props.bidTime.split(",")[1].split(":")[1])
      ) *
        60
    );
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

  startBid() {
    // TODO: implement check time perfectly
    if (this.checkDate()) {
      return (
        <div>
          <div style={{ float: "left" }}>
            <CountdownCircleTimer
              key={this.props.paintingId}
              isPlaying={true}
              duration={this.getTime()}
              colors={"#FE6F6B"}
              strokeWidth={10}
              size={60}
              trailColor="#151932"
              onComplete={() => {
                alert(
                  `Bid completed successfully!\nPainting ID =${this.props.paintingId}`
                );
              }}
            />
          </div>
          <div style={{ float: "right" }}>
            Bid started, {this.state.bidDuration} Sec
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ float: "left" }}>
            <CountdownCircleTimer
              key={this.props.paintingId}
              isPlaying={false}
              duration={0}
              colors={"#151932"}
              strokeWidth={10}
              size={60}
              trailColor="#151932"
            />
          </div>
          <div style={{ float: "right" }}>
            {this.state.bidDate < this.state.todayDate
              ? "Bid Expired"
              : "Bid not started"}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <p>Bid TimeStamp</p>
        <p>
          bidDate = {this.state.bidDate}/{this.state.bidMonth}/
          {this.state.bidYear}-{this.state.todayDate}/{this.state.todayMonth}/
          {this.state.todayYear}
        </p>
        <p>
          bidTimeRange = {this.state.sTH % 12}:{this.state.sTM},{" "}
          {this.state.eTH % 12}:{this.state.eTM}
        </p>
        {this.startBid()}
        <hr className="solid"></hr>
        {this.props.role==='bidder' && <div>
          <input
            type="number"
            disabled={!this.checkDate()}
          />
          <button
          className="form-button"
            type="button"
            disabled={!this.checkDate()}
          >
            Place Bid
          </button>
        </div>}
      </div>
    );
  }
}

export default TimerCountDown;
