export const ProblemSolution = () => {
  return (
    <section id="about" className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">
            Why we exist
          </div>
          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Talent isn&apos;t the bottleneck. <span className="italic">Access</span> is.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:col-span-7 md:grid-cols-2">
          <div className="border border-black/10 bg-paper p-8" data-testid="problem-card">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-navy/50">
              The problem
            </div>
            <p className="font-serif text-xl leading-snug text-navy sm:text-2xl">
              A student in Nagpur or Coimbatore has the same ambition as one in Bengaluru — but no
              network, no honest feedback, no one to answer, <em>&quot;what do I do next?&quot;</em>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy/70">
              LinkedIn DMs go unanswered. Coaching costs a semester&apos;s fee. Free forums give generic advice.
            </p>
          </div>

          <div className="border border-navy bg-navy p-8 text-paper" data-testid="solution-card">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-saffron">
              The VICHARO answer
            </div>
            <p className="font-serif text-xl leading-snug text-paper sm:text-2xl">
              A <span className="font-devanagari text-saffron">विचार</span> — a thoughtful connector — between
              an ambitious mentee and a senior expert, paid for, structured, and accountable.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/70">
              ₹1,299 a session. Verified mentors. Written action items. A journey doc that outlasts any single call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
