import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Input from "./Input";

function PhotoPicker({ onChange }) {

  const component = (
    <Input type="file" hidden accept="image/*" id='photo-picker' onChange={onChange} />
  );

  return ReactDOM.createPortal(component, document.getElementById("photo-picker-element"))
}

export default PhotoPicker;
