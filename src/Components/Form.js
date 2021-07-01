import "../css/form.css";

import { Component } from "react";
import DatePicker from "react-date-picker";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

import { ApiClient } from '../ApiManager'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: new Date().getUTCMilliseconds(),
      name: "",
      artist: null,
      image: null,
      date: new Date("2021", "01", "01"),
      timeRange: ["09:05", "12:00"],
      heighest_bid: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getAll(){
    ApiClient.filterProfile(
      // TODO: how to get user from all user initially
      { gender: oppositeGender, permanent_city: "jaipur"  },
      token
    )
      .then((res) => {
        this.showSpinner(false);
        this.setState({allUser: res.data.data})
        this.props.navigation.navigate("TabbarScene");
      })
      .catch((err) => {
        this.showSpinner(false);
        console.log("!! getAllUser error = ", err);
        this.showOkAlert(
          this.ls("errorAlertTitle"),
          this.ls("errorResponseTitle")
        );
      });
  }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    console.log("submit form = ", this.state);
  }

  render() {
    return (
      <div className="form-style-2">
        <div className="form-style-2-heading">Register your new painting</div>
        {/* <form action="" method="post"> */}
        <label for="name">
          <span>
            Painting Name <span className="required">*</span>
          </span>
          <input
            type="text"
            className="input-field"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label for="artist">
          <span>
            Artist Name <span className="required">*</span>
          </span>
          <input
            type="text"
            className="input-field"
            name="artist"
            value={this.state.artist}
            onChange={this.handleChange}
          />
        </label>
        <label for="image">
          <span>
            Painting Url <span className="required">*</span>
          </span>
          <input
            type="text"
            className="input-field"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
        </label>
        <label for="date">
          <span>
            Bid Date <span className="required">*</span>
          </span>
          <DatePicker
            onChange={(dp) => this.setState({ date: dp })}
            value={this.state.date}
          />className
        </label>
        <label for="timeRange">
          <span>
            Start Time <span className="required">*</span>
          </span>
          <TimeRangePicker 
          onChange={(tp) => this.setState({timeRange: tp})}
          value={this.state.timeRange}
            />
        </label>

        <label>
          <span> </span>
          <input
            type="submit"
            onClick={() => this.handleSubmit()}
            value="Submit"
          />
        </label>
        {/* </form> */}
      </div>
    );
  }
}

export default Form;
