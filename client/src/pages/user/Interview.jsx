import { useState } from "react";
import {
  FiArrowRight,
  FiBriefcase,
  FiClock,
  FiCode,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

const Interviews = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    { name: "All", icon: FiTarget },
    { name: "Frontend", icon: FiCode },
    { name: "Backend", icon: FiBriefcase },
    { name: "MERN", icon: FiZap },
    { name: "HR", icon: FiUsers },
  ];

  const interviews = [
    {
      id: 1,
      title: "MERN Stack Developer",
      category: "MERN",
      difficulty: "Intermediate",
      duration: "30 min",
      questions: 15,
    },
    {
      id: 2,
      title: "React Developer",
      category: "Frontend",
      difficulty: "Intermediate",
      duration: "25 min",
      questions: 12,
    },
    {
      id: 3,
      title: "Node.js Developer",
      category: "Backend",
      difficulty: "Advanced",
      duration: "30 min",
      questions: 15,
    },
    {
      id: 4,
      title: "Frontend Fundamentals",
      category: "Frontend",
      difficulty: "Beginner",
      duration: "20 min",
      questions: 10,
    },
    {
      id: 5,
      title: "HR Mock Interview",
      category: "HR",
      difficulty: "Beginner",
      duration: "20 min",
      questions: 8,
    },
    {
      id: 6,
      title: "Full Stack Interview",
      category: "MERN",
      difficulty: "Advanced",
      duration: "40 min",
      questions: 20,
    },
  ];

  const filteredInterviews = interviews.filter((interview) => {
    const categoryMatch =
      activeCategory === "All" || interview.category === activeCategory;

    const searchMatch = interview.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-400">
            Interview Practice
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your interview
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Select an interview based on your skills and start practicing with
            AI-powered feedback.
          </p>
        </div>

        {/* Search */}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search interviews..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/70 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FiTrendingUp />
            Improve your interview skills
          </div>
        </div>

        {/* Categories */}

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const active = activeCategory === category.name;

            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Interviews */}

        {filteredInterviews.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredInterviews.map((interview) => (
              <div
                key={interview.id}
                className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <FiBriefcase size={20} />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                      interview.difficulty === "Advanced"
                        ? "bg-red-500/10 text-red-400"
                        : interview.difficulty === "Intermediate"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {interview.difficulty}
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-semibold">
                  {interview.title}
                </h2>

                <p className="mt-1 text-xs text-indigo-400">
                  {interview.category}
                </p>

                <div className="mt-5 flex items-center gap-4 border-t border-slate-800 pt-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <FiClock />
                    {interview.duration}
                  </span>

                  <span>{interview.questions} Questions</span>
                </div>

                <button
                  type="button"
                  className="group/btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-semibold transition hover:bg-indigo-600"
                >
                  Start Interview
                  <FiArrowRight
                    size={16}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 py-16 text-center">
            <p className="text-sm text-slate-500">No interviews found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Interviews;
