/**
 * Team photos (public/team/, square 480 px, metadata stripped). The ORDER is the display order and is the same in
 * Arabic and English, so Ahmed — index 1 — stays in the middle in both directions. Names and roles live in the
 * copy files (`team.people`, same order); a null name renders `team.namePending`, never an invented name.
 */
export const TEAM_PHOTOS = ['/team/member-2.jpg', '/team/ahmed.jpg', '/team/member-3.jpg'] as const;
