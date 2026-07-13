import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  MapPin,
  ArrowUpRight,
  ArrowDownAZ,
} from 'lucide-react';
import Navbar from '../components/vicharo/Navbar';
import Footer from '../components/vicharo/Footer';
import { Toaster } from '../components/ui/sonner';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { mentors, mentorDomains, mentorLanguages } from '../data/vicharo';

const PRICE_BUCKETS = [
  { id: 'all', label: 'Any price', match: () => true },
  { id: 'lt-1500', label: 'Under ₹1,500', match: (v) => v < 1500 },
  { id: '1500-2000', label: '₹1,500 – ₹2,000', match: (v) => v >= 1500 && v <= 2000 },
  { id: 'gt-2000', label: 'Above ₹2,000', match: (v) => v > 2000 },
];

const SORTS = [
  { id: 'rating', label: 'Rating (high → low)' },
  { id: 'price-asc', label: 'Price (low → high)' },
  { id: 'price-desc', label: 'Price (high → low)' },
  { id: 'sessions', label: 'Most sessions' },
];

const toggle = (set, value) => {
  const next = new Set(set);
  next.has(value) ? next.delete(value) : next.add(value);
  return next;
};

export default function MentorDiscoveryPage() {
  const [params, setParams] = useSearchParams();

  const [query, setQuery] = useState(params.get('q') || '');
  const [selectedDomains, setSelectedDomains] = useState(
    new Set((params.get('domain') || '').split(',').filter(Boolean)),
  );
  const [selectedLanguages, setSelectedLanguages] = useState(
    new Set((params.get('lang') || '').split(',').filter(Boolean)),
  );
  const [price, setPrice] = useState(params.get('price') || 'all');
  const [sort, setSort] = useState(params.get('sort') || 'rating');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // sync state → URL for shareable filter links
  useEffect(() => {
    const p = new URLSearchParams();
    if (query) p.set('q', query);
    if (selectedDomains.size) p.set('domain', [...selectedDomains].join(','));
    if (selectedLanguages.size) p.set('lang', [...selectedLanguages].join(','));
    if (price !== 'all') p.set('price', price);
    if (sort !== 'rating') p.set('sort', sort);
    setParams(p, { replace: true });
  }, [query, selectedDomains, selectedLanguages, price, sort, setParams]);

  const filtered = useMemo(() => {
    const bucket = PRICE_BUCKETS.find((b) => b.id === price) || PRICE_BUCKETS[0];
    const q = query.trim().toLowerCase();

    let list = mentors.filter((m) => {
      if (selectedDomains.size && !selectedDomains.has(m.domain)) return false;
      if (selectedLanguages.size && !m.languages.some((l) => selectedLanguages.has(l))) return false;
      if (!bucket.match(m.priceValue)) return false;
      if (
        q &&
        !`${m.name} ${m.title} ${m.domain} ${m.tag}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'sessions':
        list = [...list].sort((a, b) => b.sessions - a.sessions);
        break;
      case 'rating':
      default:
        list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [query, selectedDomains, selectedLanguages, price, sort]);

  const clearAll = () => {
    setQuery('');
    setSelectedDomains(new Set());
    setSelectedLanguages(new Set());
    setPrice('all');
    setSort('rating');
  };

  const anyFilter =
    query || selectedDomains.size || selectedLanguages.size || price !== 'all' || sort !== 'rating';

  const FilterPanel = (
    <div className="space-y-8" data-testid="mentor-filters-panel">
      {/* Domain */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-navy/60">Domain</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {mentorDomains.map((d) => {
            const active = selectedDomains.has(d);
            return (
              <button
                key={d}
                data-testid={`filter-domain-${d.toLowerCase().replace(/[&\s]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                onClick={() => setSelectedDomains(toggle(selectedDomains, d))}
                className={`border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'border-navy bg-navy text-paper'
                    : 'border-black/15 text-navy hover:border-navy'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-navy/60">Price</div>
        <div className="mt-4 space-y-2">
          {PRICE_BUCKETS.map((b) => (
            <label
              key={b.id}
              data-testid={`filter-price-${b.id}`}
              className={`flex cursor-pointer items-center gap-3 border px-4 py-2.5 text-sm transition-colors ${
                price === b.id
                  ? 'border-navy bg-navy text-paper'
                  : 'border-black/15 text-navy hover:border-navy'
              }`}
            >
              <input
                type="radio"
                name="price"
                className="sr-only"
                checked={price === b.id}
                onChange={() => setPrice(b.id)}
              />
              <span className={`h-3 w-3 rounded-full border ${price === b.id ? 'border-saffron bg-saffron' : 'border-navy/30'}`} />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-navy/60">Languages</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {mentorLanguages.map((l) => {
            const active = selectedLanguages.has(l);
            return (
              <button
                key={l}
                data-testid={`filter-lang-${l}`}
                onClick={() => setSelectedLanguages(toggle(selectedLanguages, l))}
                className={`border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'border-navy bg-navy text-paper'
                    : 'border-black/15 text-navy hover:border-navy'
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>

      {anyFilter && (
        <button
          data-testid="filter-clear-all"
          onClick={clearAll}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-saffron hover:underline underline-offset-4"
        >
          <X size={14} /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen paper-noise" data-testid="mentor-discovery-page">
      <Navbar />

      {/* Header */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="text-xs uppercase tracking-[0.25em] text-saffron">
            Mentor discovery
          </div>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Find your <span className="italic">विचार</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            {mentors.length} verified mentors across {mentorDomains.length} domains. Filter, compare, and
            book a free 15-minute intro before you commit.
          </p>

          {/* Search + sort bar */}
          <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
              <Input
                data-testid="mentor-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, title or expertise…"
                className="h-14 rounded-none border-2 border-navy bg-paper pl-11 text-base text-navy placeholder:text-navy/40 focus-visible:ring-0"
              />
            </div>
            <div className="flex gap-3">
              <button
                data-testid="mobile-filters-toggle"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex h-14 items-center gap-2 border-2 border-navy bg-paper px-5 text-sm font-semibold uppercase tracking-widest text-navy lg:hidden"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <div className="hidden md:block">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger
                    data-testid="mentor-sort-trigger"
                    className="h-14 min-w-[220px] rounded-none border-2 border-navy bg-paper text-sm text-navy focus:ring-0"
                  >
                    <div className="inline-flex items-center gap-2">
                      <ArrowDownAZ size={16} />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-navy bg-paper">
                    {SORTS.map((s) => (
                      <SelectItem
                        key={s.id}
                        value={s.id}
                        data-testid={`sort-option-${s.id}`}
                        className="rounded-none"
                      >
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main grid: filters + results */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
          {/* Filters (sidebar on desktop) */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">{FilterPanel}</div>
          </aside>

          {/* Mobile filter drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden" data-testid="mobile-filters-drawer">
              <div
                className="absolute inset-0 bg-navy/40"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="relative ml-auto flex h-full w-[86%] max-w-sm flex-col overflow-y-auto border-l-2 border-navy bg-paper p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="font-serif text-2xl font-semibold text-navy">Filters</div>
                  <button
                    data-testid="mobile-filters-close"
                    aria-label="Close filters"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                {FilterPanel}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="lg:col-span-9">
            <div className="mb-8 flex items-center justify-between">
              <div className="text-sm text-navy/70" data-testid="mentor-results-count">
                Showing <span className="font-semibold text-navy">{filtered.length}</span> of{' '}
                {mentors.length} mentors
              </div>
              <div className="md:hidden">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="h-10 w-[160px] rounded-none border border-navy bg-paper text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-navy bg-paper">
                    {SORTS.map((s) => (
                      <SelectItem key={s.id} value={s.id} className="rounded-none">
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div
                data-testid="mentor-empty-state"
                className="border-2 border-dashed border-navy/25 bg-paper p-16 text-center"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center border-2 border-navy bg-paper text-navy">
                  <Search size={20} />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-navy">
                  No mentors match those filters.
                </h3>
                <p className="mt-3 text-sm text-navy/70">
                  Try clearing a filter or broadening the price range.
                </p>
                <button
                  data-testid="empty-clear-btn"
                  onClick={clearAll}
                  className="mt-6 inline-flex items-center gap-2 border-2 border-navy bg-paper px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy hover:bg-navy hover:text-paper"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" data-testid="mentor-grid">
                {filtered.map((m) => (
                  <Link
                    key={m.id}
                    to={`/mentors/${m.id}`}
                    data-testid={`discovery-mentor-card-${m.id}`}
                    className="group flex flex-col border border-black/15 bg-paper transition-colors hover:border-navy"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 border border-black/10 bg-paper/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-navy">
                        {m.domain}
                      </div>
                      <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center border border-navy bg-paper text-navy opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-1 text-sm text-navy">
                        <Star size={14} fill="#F57A00" stroke="#F57A00" />
                        <span className="font-medium">{m.rating}</span>
                        <span className="text-navy/50">· {m.sessions} sessions</span>
                      </div>
                      <h3 className="mt-3 font-serif text-xl font-semibold text-navy transition-colors group-hover:text-saffron">
                        {m.name}
                      </h3>
                      <p className="mt-1 text-sm text-navy/70">{m.title}</p>
                      <p className="mt-3 text-xs uppercase tracking-widest text-saffron">{m.tag}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-navy/60">
                        <MapPin size={12} className="text-saffron" />
                        {m.location}
                      </div>
                      <div className="mt-2 line-clamp-1 text-xs text-navy/55">
                        Speaks: {m.languages.join(' · ')}
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                        <span className="font-serif text-base font-semibold text-navy">{m.price}</span>
                        <span className="inline-flex items-center gap-1 border border-navy bg-navy px-3 py-2 text-xs font-semibold uppercase tracking-widest text-paper transition-colors group-hover:bg-saffron group-hover:text-navy group-hover:border-saffron">
                          View profile
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
