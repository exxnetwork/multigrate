import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CountDown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date(`4/20/2022 21:00 est`) - +new Date();

    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: any = [];
  // console.log(timeLeft, "timeLeft")

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={index}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <section className="h-screen pb-20 bg-hero ">
      <div className="w-11/12 mx-auto ">
        <div className="h-full min-h-screen sm:px-8 lg:px-32">
          <div className="flex items-center text-white ">
            <Image
              src={`/images/logo.svg`}
              width={"100"}
              height={"120"}
              alt=""
              className=""
            />
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            {" "}
            <div className="w-11/12 mx-auto text-white ">
              <p className="pt-8 text-3xl text-center">
                We’re launching ART MOB in
              </p>

              <div className="flex flex-col items-center justify-center pt-8 text-center text-7xl lg:text-8xl lg:flex-row ">
                <div className="flex ">
                  <div className="text-center sm:ml-0">
                    <p> {JSON.stringify(timeLeft.d).padStart(2, "0")}</p>
                    <p className="text-2xl font-thin">Days</p>
                  </div>{" "}
                  <span className="mx-8 space_yellow">:</span>{" "}
                  <div className="">
                    <p>{JSON.stringify(timeLeft.h).padStart(2, "0")}</p>
                    <p className="text-2xl font-thin ">Hours</p>
                  </div>{" "}
                </div>
                <div className="self-center h-full">
                  <span className="hidden mx-8 mb-8 lg:block space_yellow">
                    :
                  </span>{" "}
                </div>
                <div className="flex ">
                  <div className="mt-8 sm:mt-0">
                    <p>{JSON.stringify(timeLeft.m).padStart(2, "0")}</p>
                    <p className="text-2xl font-thin">Minutes</p>
                  </div>{" "}
                  <span className="mx-8 mt-8 sm:mt-0 space_yellow">:</span>{" "}
                  <div className="mt-8 sm:mt-0">
                    <p>{JSON.stringify(timeLeft.s).padStart(2, "0")}</p>
                    <p className="text-2xl font-thin">Seconds</p>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountDown;
