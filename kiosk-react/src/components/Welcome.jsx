import React from "react";
import Button from "./Button";

const Welcome = ({ setStatus }) => {
  return (
    <div className="flex flex-col items-center justify-around m-auto h-[80%] w-[80%] md:h-[70%] md:w-[70%] lg:min-h-[60%] lg:w-[60%]">
      <p className="my-15 text-5xl text-red-600 text-center">Welcome</p>

      <Button className="" onClick={() => setStatus("STARTED")}>
        Start
      </Button>
    </div>
  );
};

export default Welcome;
