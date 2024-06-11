"use client";

import { Fragment, useEffect, useState } from "react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { Homecard, TestimonalCard } from "@/constants";


const slides = [
  {
    url: "/assets/first-banner.svg",
  },
  {
    url: "/assets/second-banner.png",
  },
  {
    url: "/assets/third-banner.png"
  }
];

const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoslideInterval = 3000;

  const prevSlide = () => {
    const isFirstIndex = currentIndex === 0;
    const newIndex = isFirstIndex ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const slideInterval = setInterval(nextSlide, autoslideInterval);
    return () => clearInterval(slideInterval);
  }, [autoPlay, currentIndex]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <Fragment>
      <div className={`sm:w-[50%] md:w-[100%] lg:w-[95%] md:h-[600px] lg:h-[500px] m-auto px-4 relative group`}>
        <div
          className="w-full h-full rounded-2xl bg-center bg-cover duration-700 cursor-pointer"
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        ></div>

        {/* Left arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>

        {/*  right arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>

        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>

      <div className="w-[90%] m-auto mt-10 h-[80%]">
        <div className="flex justify-between">
          <div className="flex flex-col gap-32 h-full">
            <div className="bg-olive-1 w-[500px] rounded-3xl p-7 mt-14 flex flex-col gap-2">
              <h5 className="text-2xl font-extrabold">About Us</h5>
              <p className="text-sm font-semibold w-[27rem] leading-6">
                We deliver authentic, delicious Indian thalis straight to your
                door. Forger expensive restaurants or grocery shopping enjoy
                alfordable weekly/monthly plans with diverse menus curated by
                experts. Let us simplify your life, one delicious meal at a
                time.Forger expensive restaurants or grocery shopping{" "}
              </p>
              <button className="mt-1 text-white rounded-md text-sm bg-green-4 p-2 w-24 font-semibold">
                Read More
              </button>
            </div>

            <div>
              <img
                src="/assets/missionimage.svg"
                alt="image-about"
                width={400}
              />
            </div>
          </div>

          <div className="w-7">
            <img src="/assets/home-ellipse.svg" alt="home-elipse" />
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex justify-end">
              <img src="/assets/aboutimage.svg" alt="image-about" width={400} />
            </div>
            <div className="bg-olive-1 w-[500px] rounded-3xl p-7 mt-24 flex flex-col gap-2 ">
              <h5 className="text-2xl font-extrabold">Our Mission</h5>
              <p className="text-sm font-semibold w-[27rem] leading-6">
                We deliver authentic, delicious Indian thalis straight to your
                door. Forger expensive restaurants or grocery shopping enjoy
                alfordable weekly/monthly plans with diverse menus curated by
                experts. Let us simplify your life, one delicious meal at a
                time.Forger expensive restaurants or grocery shopping{" "}
              </p>
              <button className="mt-1 text-white rounded-md text-sm bg-green-4 p-2 w-24 font-semibold">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40 h-[500px]">
        <h1 className="text-center text-5xl font-medium text-green-5">
          Customised Menu
        </h1>
        <div className="w-[90%] m-auto flex justify-between gap-4 mt-10">
          <div className="w-[80%] h-[350px] bg-gray-4 rounded-xl"></div>
          <div className="h-[350px] flex flex-col gap-5 bg-olive-1 p-5 w-[340px] rounded-xl">
            <p className="text-sm font-semibold w-72">
              We deliver authentic, delicious Indian thalis straight to your
              door. Forget expensive restaurants or grocery shopping enjoy
              alfordable weekly/monthly plans with diverse menus curated by
              experts. Let us simplify your life, one delicious meal at a
              time.We deliver authentic, delicious Indian thalis straight to
              your door. Forger expensive restaurants or grocery shopping enjoy
              alfordable weekly/monthly plans with diverse menus curated by
              experts.{" "}
            </p>
            <button className="p-2 text-white rounded-md text-sm bg-green-4 w-24 font-semibold">
              See how?
            </button>
          </div>
        </div>
      </div>

      <div className="w-[90%] m-auto mt-5 flex justify-between">
        {Homecard.map((data) => (
          <div
            key={data.title}
            className="w-[250px] h-full flex flex-col gap-3"
          >
            <img
              src={data.img}
              className="rounded-xl cursor-pointer"
              alt="home-card"
              height={300}
              width={250}
            />
            <h3 className="text-3xl text-green-5 font-semibold text-center">
              {data.title}
            </h3>
          </div>
        ))}
      </div>

      <div class="mt-20 w-[80%] m-auto">
        <img src="/assets/ellipse.svg" alt="ellipse" />
      </div>

      <div className="mt-20 flex flex-col gap-5">
        <h1 className="text-5xl font-medium text-center text-green-5">
          Testimonials
        </h1>
        <Swiper
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={10}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {TestimonalCard.map((data) => (
            <SwiperSlide key={data.name}>
              <div className="w-[330px] h-[230px] rounded-xl bg-olive-1 p-5 mr-5">
                <p className="text-sm font-medium">"{data.description}"</p>
                <div className="flex gap-3 w-36 justify-between items-center mt-4">
                  <img
                    src={data.img}
                    alt={data.name}
                    width={25}
                    height={30}
                    className="rounded-3xl"
                  />{" "}
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <h6 className="text-sm font-medium">{data.name}</h6>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>

      <div className="w-[90%] m-auto rounded-xl h-full p-5 flex flex-col gap-10 bg-olive-1 mt-20">
        <h3 className="font-semibold text-2xl">
          Breaking the Budget, Not the Flavor:{" "}
        </h3>
        <div className="mt-5 flex flex-col gap-2">
          <h3 className="font-medium text-2xl">
            HelloThali Mission to Bring Affordable Thali to every Customer.
          </h3>
          <h3 className="font-medium text-2xl">
            Good Food is like a warm hug, it nourishes the soul.
          </h3>
          <button className="bg-green-4 text-white rounded-md p-2 text-sm w-28 font-medium mt-3">
            Contact Us
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Homepage;
