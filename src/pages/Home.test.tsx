import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { ar } from '@/i18n/copy/ar';
import { en } from '@/i18n/copy/en';
import { formatIqd, BOM_TOTAL_IQD } from '@/content/bom';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Home', () => {
  it.each([
    ['/', ar, 'ar', 'rtl'],
    ['/en', en, 'en', 'ltr'],
  ] as const)('renders %s in its language and direction', (path, copy, lang, dir) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1, name: copy.hero.title })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe(lang);
    expect(document.documentElement.dir).toBe(dir);
    expect(document.title).toBe(copy.meta.title);
  });

  it.each([
    ['/', ar],
    ['/en', en],
  ] as const)(
    '%s: every section heading renders and every nav anchor has a target',
    (path, copy) => {
      const { container } = renderAt(path);
      for (const title of [
        copy.problem.title,
        copy.how.title,
        copy.hardware.title,
        copy.software.title,
        copy.ai.title,
        copy.safety.title,
        copy.fleet.title,
        copy.specs.title,
        copy.plan.title,
        copy.bom.title,
        copy.stack.title,
        copy.faq.title,
        copy.cta.title,
      ]) {
        expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
      }
      for (const item of copy.header.nav) {
        expect(container.querySelector(item.href)).not.toBeNull();
      }
    },
  );

  it('points every "Open dashboard" link at the dashboard URL in a new tab', () => {
    renderAt('/');
    const links = screen.getAllByRole('link', { name: new RegExp(ar.hero.ctaDashboard) });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', 'http://localhost:5173/');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('labels the spec table column as a design target and shows the honesty note', () => {
    renderAt('/en');
    const table = screen.getByRole('table');
    expect(
      within(table).getByRole('columnheader', { name: en.specs.cols.target }),
    ).toBeInTheDocument();
    expect(within(table).getAllByRole('row')).toHaveLength(en.specs.rows.length + 1);
    expect(screen.getByText(en.hero.note)).toBeInTheDocument();
    expect(screen.getByText(en.specs.footnote)).toBeInTheDocument();
  });

  it('shows the parts total and the real team names in the footer', () => {
    renderAt('/');
    expect(screen.getByText(new RegExp(formatIqd(BOM_TOTAL_IQD)))).toBeInTheDocument();
    for (const name of ar.footer.team.members)
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
  });

  it('switches language through the header link', () => {
    renderAt('/');
    const switches = screen.getAllByRole('link', { name: ar.header.switchLangAria });
    expect(switches[0]).toHaveAttribute('href', '/en');
  });

  it('renders the 404 page for unknown paths, marked noindex', () => {
    renderAt('/en/nope');
    expect(screen.getByRole('heading', { level: 1, name: en.notFound.title })).toBeInTheDocument();
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
  });
});
