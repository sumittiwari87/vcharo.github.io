import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { howMentee, howMentor } from '../../data/vicharo';

const StepList = ({ steps, testid }) => (
  <ol className="space-y-8" data-testid={testid}>
    {steps.map((s) => (
      <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 border-b border-black/10 pb-8 last:border-b-0">
        <div className="font-serif text-5xl font-bold text-saffron leading-none">{s.n}</div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-navy sm:text-2xl">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy/70 sm:text-base">{s.body}</p>
        </div>
      </li>
    ))}
  </ol>
);

export const HowItWorks = () => {
  const [tab, setTab] = useState('mentee');
  return (
    <section id="how-it-works" className="border-b border-black/10 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">How it works</div>
          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Three steps. One <span className="italic">real</span> outcome.
          </h2>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-14">
          <TabsList className="inline-flex h-auto gap-0 rounded-none border border-black/15 bg-paper p-0">
            <TabsTrigger
              data-testid="how-tab-mentee"
              value="mentee"
              className="rounded-none border-r border-black/15 px-6 py-3 text-sm font-medium data-[state=active]:bg-navy data-[state=active]:text-paper data-[state=active]:shadow-none"
            >
              For mentees
            </TabsTrigger>
            <TabsTrigger
              data-testid="how-tab-mentor"
              value="mentor"
              className="rounded-none px-6 py-3 text-sm font-medium data-[state=active]:bg-navy data-[state=active]:text-paper data-[state=active]:shadow-none"
            >
              For mentors
            </TabsTrigger>
          </TabsList>

          <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <TabsContent value="mentee" className="mt-0">
                <StepList steps={howMentee} testid="steps-mentee" />
              </TabsContent>
              <TabsContent value="mentor" className="mt-0">
                <StepList steps={howMentor} testid="steps-mentor" />
              </TabsContent>
            </div>

            <div className="relative lg:col-span-5">
              <div className="absolute -left-6 top-6 h-72 w-72 saffron-glow" aria-hidden />
              <img
                src={
                  tab === 'mentee'
                    ? 'https://images.pexels.com/photos/9159272/pexels-photo-9159272.jpeg'
                    : 'https://images.pexels.com/photos/7580761/pexels-photo-7580761.jpeg'
                }
                alt={tab === 'mentee' ? 'Mentee learning' : 'Mentor guiding'}
                className="relative arch-top h-[480px] w-full object-cover border border-black/10"
                key={tab}
              />
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default HowItWorks;
