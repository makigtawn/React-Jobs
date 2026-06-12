// import React, { useState } from "react";

// import member1 from "../assets/images/team/member1.jpg";
// import member2 from "../assets/images/team/member2.jpg";
// import member3 from "../assets/images/team/member3.jpg";

// const teamMembers = [
//   {
//     name: "Alice Johnson",
//     position: "Frontend Developer",
//     image: member1,
//     story:
//       "Alice is passionate about building beautiful and accessible UIs. She loves React and has 5+ years of experience in web development.",
//   },
//   {
//     name: "Bob Smith",
//     position: "Backend Engineer",
//     image: member2,
//     story:
//       "Bob specializes in scalable backend systems and cloud infrastructure. He ensures our platform is fast and reliable.",
//   },
//   {
//     name: "Carol Lee",
//     position: "Product Designer",
//     image: member3,
//     story:
//       "Carol crafts user experiences that delight. She bridges the gap between design and development with a keen eye for detail.",
//   },
// ];

// const TeamCarousel = () => {
//   const [current, setCurrent] = useState(0);
//   const next = () => setCurrent((prev) => (prev + 1) % teamMembers.length);
//   const prev = () =>
//     setCurrent((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

//   const member = teamMembers[current];

//   return (
//     <div className="w-full max-w-md mx-auto text-center py-8">
//       {/* Card Container */}
//       <div
//         key={member.name}
//         className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1f25] p-6 shadow-xl text-white transition-all duration-200">
        
//         {/* Profile Image with Teal Border */}
//         <div className="relative">
//           <img
//             src={member.image}
//             alt={member.name}
//             className="w-32 h-32 rounded-full object-cover border-2 border-[#21b8b2]/40 p-1 shadow-lg group-hover:border-[#21b8b2] transition-colors duration-200"
//           />
//         </div>

//         {/* Name and Position */}
//         <div>
//           <h3 className="text-xl font-bold tracking-tight text-white">{member.name}</h3>
//           <p className="text-xs uppercase tracking-wider text-[#21b8b2] font-semibold mt-1">
//             {member.position}
//           </p>
//         </div>

//         {/* Bio Story */}
//         <p className="text-sm leading-relaxed text-white/70 min-h-[72px]">
//           {member.story}
//         </p>

//         {/* Navigation Buttons */}
//         <div className="flex gap-4 mt-2">
//           <button
//             onClick={prev}
//             type="button"
//             className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white hover:bg-[#21b8b2] hover:text-slate-950 transition-all duration-200">
//             &#8592;
//           </button>
//           <button
//             onClick={next}
//             type="button"
//             className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white hover:bg-[#21b8b2] hover:text-slate-950 transition-all duration-200">
//             &#8594;
//           </button>
//         </div>
//       </div>

//       {/* Pagination Indicator Dots */}
//       <div className="flex justify-center gap-2 mt-5">
//         {teamMembers.map((_, idx) => (
//           <span
//             key={idx}
//             className={`inline-block h-2 rounded-full transition-all duration-200 ${
//               idx === current ? "w-6 bg-[#21b8b2]" : "w-2 bg-white/20"
//             }`}></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeamCarousel;

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
    <div className="w-full max-w-lg mx-auto text-center py-10 px-4">
      {/* Expanded Card Container */}
      <div
        key={member.name}
        className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-[#0d1f25] p-8 md:p-10 shadow-2xl text-white transition-all duration-200">
        
        {/* Upsized Profile Image Container */}
        <div className="relative">
          <img
            src={member.image}
            alt={member.name}
            className="w-40 h-40 rounded-full object-cover border-2 border-[#21b8b2]/40 p-1.5 shadow-xl transition-colors duration-200"
          />
        </div>

        {/* Text Area */}
        <div>
          <h3 className="text-2xl font-black tracking-tight text-white">{member.name}</h3>
          <p className="text-sm uppercase tracking-[0.15em] text-[#21b8b2] font-bold mt-2">
            {member.position}
          </p>
        </div>

        {/* Bigger, more readable bio block */}
        <p className="text-base leading-relaxed text-white/80 min-h-[84px] max-w-sm px-2">
          {member.story}
        </p>

        {/* Enlarged Button Elements */}
        <div className="flex gap-5 mt-2">
          <button
            onClick={prev}
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-lg text-white hover:bg-[#21b8b2] hover:text-slate-950 transition-all duration-200 font-bold">
            &#8592;
          </button>
          <button
            onClick={next}
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-lg text-white hover:bg-[#21b8b2] hover:text-slate-950 transition-all duration-200 font-bold">
            &#8594;
          </button>
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex justify-center gap-2.5 mt-6">
        {teamMembers.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block h-2.5 rounded-full transition-all duration-200 ${
              idx === current ? "w-8 bg-[#21b8b2]" : "w-2.5 bg-white/20"
            }`}></span>
        ))}
      </div>
    </div>
  );
};

export default TeamCarousel;
