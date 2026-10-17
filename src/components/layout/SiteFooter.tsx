import { InfoIcon } from '@phosphor-icons/react';
import { BrandMark } from '@/components/layout/BrandMark';
import { Container } from '@/components/ui/Container';
import { useCopy } from '@/i18n/copy';

export function SiteFooter() {
  const copy = useCopy();
  const { team } = copy.footer;
  const hasTeam = team.members.length > 0;
  const affiliation = [team.department, team.university].filter(Boolean).join(' · ');

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-bold text-ink">{copy.header.brand}</span>
          </div>
          <p className="mt-4 text-sm text-ink-2">{copy.footer.tagline}</p>
          <p className="mt-3 flex items-start gap-2 text-sm text-ink-2">
            <InfoIcon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <span>{copy.footer.honesty}</span>
          </p>
        </div>

        <nav aria-label={copy.footer.sectionsTitle}>
          <h2 className="text-sm font-bold text-ink">{copy.footer.sectionsTitle}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {copy.header.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink-2 hover:text-ink hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold text-ink">{copy.footer.teamTitle}</h2>
          {hasTeam ? (
            <div className="mt-3 text-sm text-ink-2">
              <ul className="grid gap-1">
                {team.members.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
              {team.supervisor ? (
                <p className="mt-3">
                  {copy.footer.supervisorLabel} {team.supervisor}
                </p>
              ) : null}
              {affiliation ? <p className="mt-1">{affiliation}</p> : null}
            </div>
          ) : (
            <p className="mt-3 text-sm text-ink-3">{copy.footer.teamPending}</p>
          )}
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="py-5">
          <p className="text-caption">{copy.footer.rights}</p>
        </Container>
      </div>
    </footer>
  );
}
