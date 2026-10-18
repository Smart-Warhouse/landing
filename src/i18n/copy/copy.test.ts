import { describe, expect, it } from 'vitest';
import { ar } from '@/i18n/copy/ar';
import { en } from '@/i18n/copy/en';

/** Every leaf string with its dotted path. */
function strings(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, i) => strings(item, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      strings(item, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

/** Structural signature: keys, array lengths and leaf types (string/null), not the words. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, shape(item)]),
    );
  }
  return value === null ? 'null' : typeof value;
}

describe('copy dictionaries', () => {
  it('have the same structure in Arabic and English (keys, list lengths, leaf types)', () => {
    expect(shape(en)).toEqual(shape(ar));
  });

  it('have no empty strings', () => {
    for (const [path, text] of [...strings(ar), ...strings(en)]) {
      expect(text.trim(), path).not.toBe('');
    }
  });

  it('keep the same in-page anchors in both languages', () => {
    expect(en.header.nav.map((n) => n.href)).toEqual(ar.header.nav.map((n) => n.href));
  });

  it('spell out bounds in Arabic instead of ≤/≥ (bidi mirroring flips them next to Latin runs)', () => {
    for (const [path, text] of strings(ar)) {
      expect(/[≤≥]/.test(text), `ar.${path}: ${text}`).toBe(false);
    }
  });

  it('keep requirement and test ids identical across languages', () => {
    expect(en.specs.rows.map((r) => r.id)).toEqual(ar.specs.rows.map((r) => r.id));
    expect(en.specs.rows.map((r) => r.test)).toEqual(ar.specs.rows.map((r) => r.test));
    expect(en.plan.phases.map((p) => p.gate)).toEqual(ar.plan.phases.map((p) => p.gate));
  });

  it('write Arabic copy in Arabic (every Arabic sentence-level string has Arabic letters)', () => {
    const technical =
      /^(header\.nav\[\d\]\.href|header\.switchLang|how\.links|how\.figureTags|software\.tiers\[\d\]\.(platform|modules)|software\.protocols\[\d\]\.name|hardware\.points\[\d\]\.title|hero\.facts\[\d\]\.value|stack\.groups|specs\.rows\[\d\]\.(id|test)|plan\.phases\[\d\]\.gate|bom\.groups\[\d\]\.items|how\.layers\[\d\]\.(name|stack)|hardware\.facts\[\d\]\.value|specs\.rows\[\d\]\.target)/;
    for (const [path, text] of strings(ar)) {
      if (technical.test(path)) continue;
      expect(/[؀-ۿ]/.test(text), `ar.${path}: ${text}`).toBe(true);
    }
  });
});

/**
 * HONESTY RULE: the project is in progress. No claim of proven/tested results, no testimonials,
 * partners, customers, awards or certifications, in either language.
 */
const FORBIDDEN: RegExp[] = [
  /\bproven\b/i,
  /\bprove[sd]?\b/i,
  /tested results/i,
  /\btest results show\b/i,
  /\bresults show\b/i,
  /\bguarantee/i,
  /\bcertified\b/i,
  /\baward/i,
  /testimonial/i,
  /trusted by/i,
  /\b(our|happy|satisfied) (customers|clients|users)\b/i,
  /\bpartners?\b/i,
  /world'?s first/i,
  /industry[- ]leading/i,
  /\bwe (achieved|measured)\b/i,
  /\bachiev(ed|es) (a |an )?\d/i,
  /\b100% (safe|reliable|accurate)\b/i,
  /مثبت/,
  /مضمون/,
  /نتائج (مُ?ختبرة|مُ?ثبتة|مؤكدة)/,
  /أثبت/,
  /حقق(نا|ت)/,
  /عملاء|عملاؤنا|زبائن/,
  /شركاء|شركاؤنا/,
  /جائزة/,
  /الأول من نوعه/,
  /آمن(ة)? (100|تماماً|بالكامل)/,
];

describe('forbidden claims', () => {
  it.each([
    ['ar', ar],
    ['en', en],
  ] as const)('%s copy makes no claim of proven or measured results', (_lang, copy) => {
    for (const [path, text] of strings(copy)) {
      for (const pattern of FORBIDDEN) {
        expect(pattern.test(text), `${path}: "${text}" matches ${pattern}`).toBe(false);
      }
    }
  });

  it('presents the target specs as targets in both languages', () => {
    expect(ar.specs.cols.target).toContain('الهدف');
    expect(en.specs.cols.target.toLowerCase()).toContain('target');
    expect(ar.specs.footnote).toContain('أهداف');
    expect(en.specs.footnote.toLowerCase()).toContain('targets, not results');
  });

  it('has no invented people: the team block holds real names or stays empty (TODO)', () => {
    const placeholder = /lorem|ipsum|john|jane|doe|placeholder|example|todo|xxx|فلان|اسم الطالب/i;
    for (const copy of [ar, en]) {
      const { members, supervisor, university, department } = copy.footer.team;
      const people = copy.team.people.flatMap((p) => [p.name, p.role]);
      for (const value of [...members, supervisor, university, department, ...people]) {
        if (value !== null) expect(placeholder.test(value), value).toBe(false);
      }
    }
  });
});
