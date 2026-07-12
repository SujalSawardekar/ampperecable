import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import { O } from '../assets';

const goalsData = [
  {
    id: 1,
    title: "Innovative Product Development:",
    description: "Continuously investing in research and development to introduce cutting-edge technologies that enhance performance, safety, and efficiency",
    icon: O.goal1,
    anima: "fade-left",
    borders: "border-l-8 border-b-8 border-[#AE1B1B] m-0 p-6 md:p-0 md:border-none"
  },
  {
    id: 2,
    title: "Exceptional Customer Service:",
    description: "Delivering outstanding support and service at every stage of the customer journey, from initial inquiry to post-purchase assistance",
    icon: O.goal2,
    anima: "fade-right",
    borders: "border-r-8 border-b-8 border-[#AE1B1B] m-0 p-6 md:p-0 md:border-none"
  },
  {
    id: 3,
    title: "On-Time Delivery:",
    description: "Ensuring that all orders are delivered promptly and within the promised timeframe to maintain customer satisfaction and trust",
    icon: O.goal3,
    anima: "fade-left",
    borders: "border-l-8 border-b-8 border-[#AE1B1B] m-0 p-6 md:p-0 md:border-none"
  },
  {
    id: 4,
    title: "Customized Orders:",
    description: "Providing tailored solutions to meet the unique requirements of clients, offering a wide range of customizable options for cable length, material, and specifications",
    icon: O.goal4,
    anima: "fade-right",
    borders: "border-r-8 border-[#AE1B1B] m-0 p-6 md:p-0 md:border-none"
  }
];

const Goals = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 500, once: false, mirror: true, offset: 60 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-white p-6 md:px-20 md:py-20">
      {/* Title */}
      <div data-aos="fade-up" className="flex flex-row justify-center items-center mb-20 text-center">
        <p className="text-[#880000] font-bold text-5xl md:text-6xl mr-3 font-inter">OUR</p>
        <p className="text-black font-bold text-5xl md:text-6xl font-inter">GOALS</p>
      </div>

      {/* Goals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto mt-10 relative items-stretch">
        {goalsData.map((goal) => (
          <div
            key={goal.id}
            id={`goal-${goal.id}`}
            className={`${isIntersecting ? 'animate-borderRun' : ''} ${goal.borders} -my-4`}
          >
            <div data-aos={goal.anima} className="h-full">
              <div
                className="relative flex flex-col h-full pb-4 bg-white rounded-md shadow-lg text-center transition-transform duration-500 transform hover:scale-105 hover:shadow-xl"
                style={{ boxShadow: "0 0px 2px rgba(0,0,0,0.1), 0 18px 8px rgba(0,0,0,0.15)" }}
              >
                {/* Badge Header */}
                <div className="bg-[#AE1B19] text-white rounded-t-md py-2 px-4 mb-4 flex-shrink-0">
                  <h3 className="text-xl font-bold">Goal {goal.id}</h3>
                </div>

                {/* Icon Image */}
                <div className="flex justify-center mb-4 flex-shrink-0">
                  <img src={goal.icon} alt={goal.title} className="font-inter w-40 h-40 object-cover" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-1 justify-start">
                  <div className="bg-white text-black rounded-t-lg py-1 px-4">
                    <h3 className="text-xl font-bold font-inter">{goal.title}</h3>
                  </div>
                  <div className="p-2 flex-1 mt-2">
                    <p className="text-black text-base font-inter">{goal.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
