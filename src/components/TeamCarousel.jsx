import React, { useState } from "react";

import member1 from "../assets/images/team/member1.jpg";
import member2 from "../assets/images/team/member2.jpg";
import member3 from "../assets/images/team/member3.jpg";

const teamMembers = [
  {
    name: "Alice Johnson",
    position: "Frontend Developer",
    image: member1,
    story:
      "Alice is passionate about building beautiful and accessible UIs. She loves React and has 5+ years of experience in web development.",
  },
  {
    name: "Bob Smith",
    position: "Backend Engineer",
    image: member2,
    story:
      "Bob specializes in scalable backend systems and cloud infrastructure. He ensures our platform is fast and reliable.",
  },
  {
    name: "Carol Lee",
    position: "Product Designer",
    image: member3,
    story:
      "Carol crafts user experiences that delight. She bridges the gap between design and development with a keen eye for detail.",
  },
];

const TeamCarousel = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % teamMembers.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  const member = teamMembers[current];

  return (
    <div className="w-full max-w-md mx-auto text-center py-8">
      <div
        key={member.name}
        className="flex flex-col items-center gap-4 transition-all duration-200">
        <img
          src={member.image}
          alt={member.name}
          className="w-50 h-50 rounded-full object-cover border-2 border-indigo-400 shadow-lg"
        />
        <h3 className="text-xl font-bold mt-2">{member.name}</h3>
        <p className="text-blue-600 font-semibold">{member.position}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          {member.story}
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={prev}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
            &#8592;
          </button>
          <button
            onClick={next}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
            &#8594;
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {teamMembers.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-2 h-2 rounded-full ${idx === current ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}></span>
        ))}
      </div>
    </div>
  );
};

export default TeamCarousel;
