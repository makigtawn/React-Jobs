import { useState } from "react";
import member1 from "../assets/images/team/member1.jpg";
import member2 from "../assets/images/team/member2.jpg";
import member3 from "../assets/images/team/member3.jpg";
import member4 from "../assets/images/team/member4.jpg";
import Button from "./Button";

const teamMembers = [
  {
    name: "Meklit Girmaw",
    position: "C.E.O",
    image: member4,
    story:
      "As a leader, Meklit builds from the ground up, ensuring every layer supports the whole structure.",
  },
  {
    name: "Fikirte Yalew",
    position: "Frontend Developer",
    image: member1,
    story:
      "Fikirte is passionate about building beautiful and accessible UIs. She loves React and has 5+ years of experience in web development.",
  },
  {
    name: "Bob Smith",
    position: "Backend Engineer",
    image: member2,
    story:
      "Bob specializes in scalable backend systems and cloud infrastructure. He ensures our platform is fast and reliable.",
  },
  {
    name: "Muna Jemal",
    position: "Product Designer",
    image: member3,
    story:
      "Muna crafts user experiences that delight. She bridges the gap between design and development with a keen eye for detail.",
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
      <div
        key={member.name}
        className="bg-white/30 dark:bg-white-100 flex flex-col items-center gap-6 rounded-2xl border border-border  p-8 md:p-10 shadow-2xl text-text-primary transition-all duration-200">
        <div className="relative">
          <img
            src={member.image}
            alt={member.name}
            className="w-64 h-77 rounded-3xl object-cover border-2 border-border/40 p-1"
          />
        </div>
        <div>
          <h3 className="text-2xl tracking-tight ">{member.name}</h3>
          <p className="text-sm uppercase tracking-[0.15em] text-accent font-bold mt-2">
            {member.position}
          </p>
        </div>

        <p className="text-base leading-relaxed min-h-[84px] max-w-sm px-2">
          {member.story}
        </p>

        <div className="flex gap-5 mt-2">
          <Button
            onClick={prev}
            type="button"
            className="rounded-xl border border-border dark:border-border/50 text-lg text-text-primary hover:bg-accent transition-all duration-200 font-bold"
            style={{ padding: "12px 20px" }}>
            &#8592;
          </Button>

          <Button
            onClick={next}
            type="button"
            className="rounded-xl border border-border dark:border-border/50 text-lg text-text-primary hover:bg-accent transition-all duration-200 font-bold"
            style={{ padding: "12px 20px" }}>
            &#8594;
          </Button>
        </div>
      </div>

      <div className="flex justify-center gap-2.5 mt-6">
        {teamMembers.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block h-2.5 rounded-full transition-all duration-200 ${
              idx === current ? "w-8 bg-accent" : "w-2.5 bg-surface/40"
            }`}></span>
        ))}
      </div>
    </div>
  );
};

export default TeamCarousel;
