import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { faqs } from '../../data/vcharo';

export const FAQ = () => {
  return (
    <section className="border-b border-black/10 bg-sand/40 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">FAQ</div>
          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Questions,
            <br /> <span className="italic">answered</span>.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-navy/70">
            Still curious? Reach us at{' '}
            <a href="mailto:hello@vcharo.in" className="underline decoration-saffron underline-offset-4 hover:text-saffron">
              hello@vcharo.in
            </a>
            .
          </p>
        </div>

        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-black/15"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="text-left font-serif text-lg text-navy hover:text-saffron hover:no-underline sm:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-navy/75 sm:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
