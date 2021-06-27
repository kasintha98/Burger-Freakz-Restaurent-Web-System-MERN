import React from "react";

export default function CartNum(props) {
  return (
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          background: "red",
          width: "15px",
          height: "15px",
          borderRadius: "5px",
          fontSize: "10px",
          textAlign: "center",
          alignSelf: "center",
          color: "#fff",
          left: "-7px",
          top: "-6px",
        }}
      >
        {props.count}
      </span>
    </div>
  );
}
