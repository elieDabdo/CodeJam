import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Innovating the fitness industry",
          "Bringing a healthier lifestyle to you",
          "Yoga",
          "Tai Chi",
          "Dancing",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
