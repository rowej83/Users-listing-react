import React from "react";

const TextBoxWithButton = props => {
  const [input, setInput] = React.useState("initial state");
  return (
    <div>
      <p>
        Input Here {props.name}:
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </p>
      <p>input state: {input}</p>
      <p className="inputcheck">{props.name}</p>
    </div>
  );
};

export default TextBoxWithButton;
