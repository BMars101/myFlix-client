import React from "react";
import axios from "axios";

class MainView extends React.Component {
  constructor() {
    //Call the superclass constructor so 
    //react can initialize it
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {};
    //access later with const { /something /} = this.state;
  }

  //This overrides the render() method of the superclass 
  render() {
    return (
      <div className="main-view"></div>
    );
  }

}