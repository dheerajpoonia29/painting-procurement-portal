import "../css/form.css";

import { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: new Date().getUTCMilliseconds(),
      name: "",
      artist: null,
      image: null,
      date: null,
      start_time: null,
      end_time: null,
      heighest_bid: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          <input
            type="text"
            className="input-field"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
        </label>
        <label for="start_time">
          <span>
            Start Time <span className="required">*</span>
          </span>
          <input
            type="text"
            className="input-field"
            name="start_time"
            value={this.state.start_time}
            onChange={this.handleChange}
          />
        </label>
        <label for="end_time">
          <span>
            End Time <span className="required">*</span>
          </span>
          <input
            type="text"
            className="input-field"
            name="end_time"
            value={this.state.end_time}
            onChange={this.handleChange}
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
