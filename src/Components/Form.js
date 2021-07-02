import "../css/form.css";

import { Component } from "react";
import DatePicker from "react-date-picker";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

import ApiClient from "../ApiManager";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      artist: "",
      owner: "",
      image: "",
      date: new Date(),
      time: ["11:05", "03:10"],
      heighest_bid: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    console.log("submit form = ", this.state);
    let params = {
      name: this.state.name,
      artist: this.state.artist,
      owner: this.state.owner,
      image: this.state.image,
      date: this.state.date.toString(),
      time: this.state.time.join(','),
      heighest_bid: this.state.heighest_bid,
    };
    // TODO: blockchain.registerPainting(res.data.id, this.state.owner)
    ApiClient.createNew(params)
      .then((res) => {alert(`${res.data.msg}, id=${res.data.id}`)})
      .catch((err) => console.log("!getAll = ", err));
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
            placeholder="Your painting name"
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
            placeholder="Your name"
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
            placeholder="Your image url"
          />
        </label>
        <label for="date">
          <span>
            Bid Date <span className="required">*</span>
          </span>
          <DatePicker
            onChange={(dp) => this.setState({ date: dp })}
            value={this.state.date}
          />
          className
        </label>
        <label for="time">
          <span>
            Start Time <span className="required">*</span>
          </span>
          <TimeRangePicker
            onChange={(tp) => this.setState({ time: tp })}
            value={this.state.time}
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
