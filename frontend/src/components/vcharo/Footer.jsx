import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const cols = [
  {
    heading: 'Product',
    links: ['How it works', 'Mentors', 'Pricing', 'For companies'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    heading: 'Resources',
    links: ['Blog', 'Guides', 'Success stories', 'Help centre'],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-navy text-paper" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-paper">Vcharo</span>
              <span className="font-devanagari text-xl text-saffron">विचार</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70">
              A thoughtful connector between ambitious mentees and senior domain experts. Built in
              Bengaluru, made for India.
            </p>
            <div className="mt-8 flex gap-3">
              {[Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`footer-social-${i}`}
                  aria-label={`Social link ${i + 1}`}
                  className="grid h-10 w-10 place-items-center border border-paper/20 text-paper transition-colors hover:border-saffron hover:text-saffron"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {cols.map((c) => (
              <div key={c.heading}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-saffron">
                  {c.heading}
                </h4>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        data-testid={`footer-link-${l.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-paper/70 transition-colors hover:text-saffron"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-paper/50">
            © {new Date().getFullYear()} Vcharo Technologies Pvt. Ltd. Made with intention in India.
          </p>
          <div className="flex gap-6 text-xs text-paper/60">
            <a href="#" className="hover:text-saffron">Privacy</a>
            <a href="#" className="hover:text-saffron">Terms</a>
            <a href="#" className="hover:text-saffron">Refunds</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
