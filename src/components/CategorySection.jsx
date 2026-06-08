import category1 from "../assets/images/new images/c1.png";
import category2 from "../assets/images/new images/c2.png";
import category3 from "../assets/images/new images/c3.png";
import category4 from "../assets/images/new images/c4.png";
import category5 from "../assets/images/new images/c5.png";
import category6 from "../assets/images/new images/c6.png";

const categories = [
  { title: "Design & Arts", image: category1 },
  { title: "Development", image: category2 },
  { title: "Marketing", image: category3 },
  { title: "Finance", image: category4 },
  { title: "Writing", image: category5 },
  { title: "Management", image: category6 },
];

const CategorySection = () => {
  return (
    <section className="relative px-4 pb-16 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#21b8b2]">
              Category
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Explore top hiring categories
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Discover the most active skills and team roles recruiters are hiring
            for right now.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group rounded-[2rem] border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-[#21b8b2] hover:shadow-[0_20px_60px_rgba(33,184,178,0.15)] dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-[#f8fdfc] p-3 shadow-sm dark:bg-slate-800">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
