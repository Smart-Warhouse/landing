import { UserIcon } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TEAM_PHOTOS } from '@/content/team';
import { useCopy } from '@/i18n/copy';

/** Team photos with names; the middle card is Ahmed in both languages (order fixed in content/team.ts). */
export function Team() {
  const { team } = useCopy();
  return (
    <section id="team" aria-labelledby="team-title" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          id="team-title"
          eyebrow={team.eyebrow}
          title={team.title}
          intro={team.intro}
        />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {TEAM_PHOTOS.map((src, i) => {
            const person = team.people[i];
            return (
              <Reveal as="li" key={src} delay={i * 70}>
                <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <img
                    src={src}
                    alt={person.name ?? ''}
                    width={480}
                    height={480}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                  <figcaption className="px-4 py-4 text-center">
                    {person.name ? (
                      <span className="block font-bold text-ink">{person.name}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-ink-3">
                        <UserIcon size={16} aria-hidden />
                        {team.namePending}
                      </span>
                    )}
                    {person.role ? (
                      <span className="mt-1 block text-sm text-ink-2">{person.role}</span>
                    ) : null}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
