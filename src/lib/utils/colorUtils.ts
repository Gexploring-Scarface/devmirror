export function getCodeforcesRankColor(rating: number): string {
  if (rating < 1200) return '#CCCCCC'; // Newbie (gray)
  if (rating < 1400) return '#77FF77'; // Pupil (green)
  if (rating < 1600) return '#77DDBB'; // Specialist (cyan)
  if (rating < 1900) return 'var(--dm-info)'; // Expert (blue)
  if (rating < 2100) return '#FF88FF'; // Candidate Master (purple)
  if (rating < 2300) return '#FFCC88'; // Master (orange)
  if (rating < 2400) return '#FFBB55'; // International Master (orange)
  if (rating < 2600) return '#FF7777'; // Grandmaster (red)
  if (rating < 3000) return '#FF3333'; // International Grandmaster (red)
  return '#AA0000'; // Legendary Grandmaster (red)
}
