/**
 * The shape of every visible string on the site. `ar.ts` and `en.ts` are both typed `SiteCopy`, so a
 * key missing from either language is a compile error. Counted lists are fixed-length tuples, so the
 * two languages cannot drift on how many items a section shows (and the icon/data tuples in the
 * sections zip with them by index). Variable-length lists are length-checked by `copy.test.ts`.
 *
 * HONESTY RULE: this is a project in progress. Every number is a design target, never a measured
 * result. No testimonials, partners, invented stats or invented people (`copy.test.ts` enforces a
 * forbidden-claims list).
 */

export type Lang = 'ar' | 'en';

type T3<T> = readonly [T, T, T];
type T4<T> = readonly [T, T, T, T];
type T5<T> = readonly [T, T, T, T, T];
type T6<T> = readonly [T, T, T, T, T, T];
type T7<T> = readonly [T, T, T, T, T, T, T];
type T8<T> = readonly [T, T, T, T, T, T, T, T];

export type NavLink = { label: string; href: `#${string}` };
export type TitledText = { title: string; body: string };
export type NamedDesc = { name: string; desc: string };

export type SiteCopy = {
  meta: { title: string; description: string };
  common: { skipLink: string; newTab: string; target: string };
  header: {
    brand: string;
    homeLabel: string;
    nav: T6<NavLink>;
    navLabel: string;
    menuOpen: string;
    menuClose: string;
    openDashboard: string;
    themeToDark: string;
    themeToLight: string;
    /** Name of the OTHER language, shown on the switch ("English" on the Arabic page). */
    switchLang: string;
    switchLangAria: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    pitch: string;
    ctaDashboard: string;
    ctaHow: string;
    facts: T3<{ value: string; label: string }>;
    note: string;
    figureLabel: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    intro: string;
    pains: T3<TitledText>;
    ideaLabel: string;
    idea: string;
    ideaPoints: T3<string>;
  };
  how: {
    eyebrow: string;
    title: string;
    intro: string;
    /** Top to bottom: server, Jetson, ESP32, sensors and motors. */
    layers: T4<{ name: string; nickname: string; stack: string; body: string }>;
    /** The links between consecutive layers (server-Jetson, Jetson-ESP32, ESP32-hardware). */
    links: T3<string>;
    estop: TitledText;
    figureLabel: string;
    figureCaption: string;
    figureTags: { lidar: string; camera: string; tof: string; estop: string };
  };
  hardware: {
    eyebrow: string;
    title: string;
    intro: string;
    /** Mount points 1 to 8, in the overview's numbering. */
    points: T8<{ title: string; place: string; why: string }>;
    facts: T3<{ label: string; value: string }>;
    figureLabel: string;
  };
  software: {
    eyebrow: string;
    title: string;
    intro: string;
    /** Server, Jetson, ESP32. */
    tiers: T3<{ name: string; platform: string; rate: string; modules: readonly NamedDesc[] }>;
    protocolsTitle: string;
    protocols: T3<NamedDesc>;
  };
  ai: {
    eyebrow: string;
    title: string;
    intro: string;
    principle: string;
    principleNote: string;
    cards: T3<{ tag: string; title: string; body: string; targets: readonly string[] }>;
    journeyTitle: string;
    journey: T6<TitledText>;
  };
  safety: {
    eyebrow: string;
    title: string;
    intro: string;
    headline: string;
    /** Bottom-up: hardware E-Stop, ESP32, Jetson, server. */
    layers: T4<{ level: string; title: string; body: string; rules: readonly string[] }>;
    ledsTitle: string;
    leds: T3<{ colour: string; meaning: string }>;
    footnote: string;
  };
  fleet: {
    eyebrow: string;
    title: string;
    intro: string;
    managerTitle: string;
    manager: readonly string[];
    dashboardTitle: string;
    dashboard: readonly string[];
    mapLabel: string;
    legend: { free: string; locked: string; waiting: string; robot: string };
    cta: string;
  };
  specs: {
    eyebrow: string;
    title: string;
    intro: string;
    cols: { metric: string; target: string; test: string };
    /** `test`: acceptance-test or requirement ids (language-neutral, rendered LTR); `method`: how. */
    rows: T7<{ id: string; metric: string; target: string; test: string; method: string }>;
    footnote: string;
  };
  plan: {
    eyebrow: string;
    title: string;
    intro: string;
    phaseLabel: string;
    gateLabel: string;
    /** `gate`: acceptance-test ids, language-neutral and rendered LTR (e.g. `T-01 – T-04`). */
    phases: T6<{ title: string; body: string; gate: string }>;
    parallelNote: string;
  };
  bom: {
    eyebrow: string;
    title: string;
    intro: string;
    /** Names for the groups in src/content/bom.ts, same order. */
    groups: T5<{ name: string; items: string }>;
    currency: string;
    totalLabel: string;
    fleetLabel: string;
    fleetNote: string;
    shareNote: string;
    excluded: string;
    chartLabel: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    /** Labels for the groups in src/content/stack.ts, same order. */
    groups: T6<string>;
  };
  faq: { eyebrow: string; title: string; items: T7<{ q: string; a: string }> };
  /**
   * Team section. `people` follows src/content/team.ts (TEAM_PHOTOS) in order. A null name shows `namePending`;
   * never put a placeholder or invented name here (copy.test.ts checks it).
   */
  team: {
    eyebrow: string;
    title: string;
    intro: string;
    namePending: string;
    people: T3<{ name: string | null; role: string | null }>;
  };
  cta: { title: string; body: string; primary: string; secondary: string };
  footer: {
    tagline: string;
    honesty: string;
    sectionsTitle: string;
    teamTitle: string;
    /**
     * TODO(team): fill in real names before publishing. Leave the list empty and the fields null
     * until then: the footer shows `teamPending` instead. Never put placeholder people here.
     */
    team: {
      members: readonly string[];
      supervisor: string | null;
      university: string | null;
      department: string | null;
    };
    supervisorLabel: string;
    teamPending: string;
    rights: string;
  };
  notFound: { title: string; body: string; back: string };
};
