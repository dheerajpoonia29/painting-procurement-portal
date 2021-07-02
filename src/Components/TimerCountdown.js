import { Component } from "react";

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
      secondDuration: null
    };
  }

  componentDidMount() {
    let time = this.props.bidTime;
    let time_array = time.split(",");
    let s_time = time_array[0].split(":");
    let e_time = time_array[1].split(":");

    this.setState({
      sTH: parseInt(s_time[0]) % 12,
      sTM: parseInt(s_time[1]),
      eTH: parseInt(e_time[0]) % 12,
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

    let second = Math.abs(parseInt(s_time[0]) % 12 - parseInt(e_time[0]) % 12)*3600+Math.abs(parseInt(s_time[1])-parseInt(e_time[1]))*60;
    
    this.setState({
        secondDuration: second
    })
  }

  render() {
    return (
      <div>
        <p>Bid TimeStamp</p>
        <p>bidDate = {this.state.bidDate}/{this.state.bidMonth}/{this.state.bidYear}-{this.state.todayDate}/{this.state.todayMonth}/{this.state.todayYear}</p>
        <p>bidTimeRange = {this.state.sTH}:{this.state.eTM}, {this.state.eTH}:{this.state.eTM}</p>
        <p>bidSecond = {this.state.secondDuration}</p>
        
      </div>
    );
  }
}

export default TimerCountDown;
