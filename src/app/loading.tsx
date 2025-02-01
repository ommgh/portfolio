import Loader from "@/components/loader";
import React from "react";

const Loading = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <Loader state>...Loading</Loader>
    </div>
  );
};

export default Loading;
