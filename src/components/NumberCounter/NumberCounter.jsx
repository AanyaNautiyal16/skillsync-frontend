import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

const NumberCounter = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  useEffect(() => {
    setStart(0);
    setEnd(900);
  }, []);

  return (
    <div className="bg-secondary text-white">
      <div className="container grid grid-cols-2 md:grid-cols-4 py-5">

        {/* 1 */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={start} end={end} duration={3} />
          </p>
          <p>Expert tutors</p>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp end={20000} duration={3} separator="," suffix="+" />
          </p>
          <p>Hours content</p>
        </div>

        {/* 3 */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp end={300} duration={3} />
          </p>
          <p>Subjects & courses</p>
        </div>

        {/* 4 */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp end={170000} duration={3} separator="," suffix="+" />
          </p>
          <p>Active students</p>
        </div>

      </div>
    </div>
  );
};

export default NumberCounter;