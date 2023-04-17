import React from "react";
import { TailSpin } from "react-loader-spinner";
const Spinner = () => {
  return (
    <div className="flex absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 flex-col justify-center items-center w-full h-full">
      <TailSpin
        height="50"
        width="50"
        color="#0356fc"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};


export default Spinner;
