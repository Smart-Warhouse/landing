import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { TEAM_PHOTOS } from '@/content/team';
import { ar } from '@/i18n/copy/ar';
import { en } from '@/i18n/copy/en';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { Team } from './Team';

function renderAt(lang: 'ar' | 'en') {
  return render(
    <MemoryRouter>
      <LocaleProvider lang={lang}>
        <Team />
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe('Team section', () => {
  it('keeps Ahmed in the middle in both languages', () => {
    expect(TEAM_PHOTOS[1]).toBe('/team/ahmed.jpg');
    for (const [lang, copy] of [
      ['ar', ar],
      ['en', en],
    ] as const) {
      const { unmount } = renderAt(lang);
      const cards = within(screen.getByRole('list')).getAllByRole('listitem');
      expect(cards).toHaveLength(3);
      expect(within(cards[1]).getByRole('img').getAttribute('src')).toBe('/team/ahmed.jpg');
      expect(within(cards[1]).getByText(copy.team.people[1].name!)).toBeInTheDocument();
      unmount();
    }
  });

  it('shows "name pending" only for members without a name (never an invented name)', () => {
    renderAt('en');
    expect(screen.queryAllByText(en.team.namePending)).toHaveLength(
      en.team.people.filter((p) => !p.name).length,
    );
  });

  it('pairs every photo with its member', () => {
    expect(TEAM_PHOTOS).toEqual(['/team/nabaa.jpg', '/team/ahmed.jpg', '/team/suhib.jpg']);
    expect(en.team.people.map((p) => p.name)).toEqual([
      'Nabaa Ziad Tareq',
      'Ahmed Imad Tareq',
      'Suhib Hassan Ali',
    ]);
  });
});
