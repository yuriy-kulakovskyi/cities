import React from "react";

const Form = props => (
  <form onSubmit={props.weatherMethod}>
    <input type="text" name="city" placeholder="Місто" />
    <button>Отримати погоду</button>
  </form>
)

export default Form;