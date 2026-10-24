export const clubs = [
  {
    id: 'robotics',
    name: 'Robotics Club',
    image: '/images/robotics.jpg',
    category: 'Technology',
    meets: 'Tuesdays, 6:00 PM · Engineering Lab 204',
    shortDescription: 'Build and code robots with fellow enthusiasts.',
    description:
      'Learn about robotics, compete in competitions, and join hands-on workshops every month! Whether you have never touched a soldering iron or you already write firmware for fun, our teams pair beginners with experienced builders so everyone ships something by the end of the semester.',
    events: [
      { name: 'Intro to Arduino', date: '2026-11-06' },
      { name: 'Line-Follower Build Night', date: '2026-11-20' },
      { name: 'Robotics Expo', date: '2027-01-29' },
    ],
  },
  {
    id: 'photography',
    name: 'Photography Society',
    image: '/images/photography.jpg',
    category: 'Arts',
    meets: 'Thursdays, 5:30 PM · Fine Arts Building, Room 12',
    shortDescription: 'Capture campus life and sharpen your eye behind the lens.',
    description:
      'From smartphone snapshots to full-frame cameras, the Photography Society is a place to learn composition, lighting, and editing. We run weekly photo walks, darkroom sessions, and a juried end-of-term exhibition where members display their best work.',
    events: [
      { name: 'Golden Hour Photo Walk', date: '2026-11-08' },
      { name: 'Lightroom Editing Workshop', date: '2026-11-19' },
      { name: 'Winter Exhibition Opening', date: '2026-12-10' },
    ],
  },
  {
    id: 'debate',
    name: 'Debate Union',
    image: '/images/debate.jpg',
    category: 'Academic',
    meets: 'Mondays, 7:00 PM · Humanities Hall 110',
    shortDescription: 'Argue, persuade, and think on your feet.',
    description:
      'The Debate Union trains students in British Parliamentary and public-forum formats. Practice rounds build confidence in public speaking and critical thinking, and our competitive squad travels to regional and national tournaments throughout the year.',
    events: [
      { name: 'Novice Debate Night', date: '2026-11-02' },
      { name: 'Public Speaking Bootcamp', date: '2026-11-16' },
      { name: 'Inter-Campus Tournament', date: '2027-02-06' },
    ],
  },
  {
    id: 'outdoors',
    name: 'Outdoor Adventure Club',
    image: '/images/outdoors.jpg',
    category: 'Sports & Recreation',
    meets: 'Wednesdays, 6:30 PM · Student Union, Room B',
    shortDescription: 'Hike, climb, and camp beyond the campus gates.',
    description:
      'Get outside with weekend hikes, climbing gym sessions, kayaking trips, and overnight camping. We provide gear for members, teach Leave No Trace principles, and plan trips for every fitness level, so no experience is needed to join.',
    events: [
      { name: 'Sunrise Ridge Hike', date: '2026-11-14' },
      { name: 'Indoor Climbing Social', date: '2026-12-03' },
      { name: 'Winter Camping Trip', date: '2027-01-23' },
    ],
  },
  {
    id: 'film',
    name: 'Film & Media Collective',
    image: '/images/film.jpg',
    category: 'Arts',
    meets: 'Fridays, 7:30 PM · Media Center Screening Room',
    shortDescription: 'Watch, discuss, and make short films together.',
    description:
      'The Film & Media Collective hosts weekly screenings followed by open discussion, and helps members write, shoot, and edit their own short films. Equipment checkout, editing suites, and a spring film festival give everyone a chance to tell their stories on screen.',
    events: [
      { name: 'Cult Classics Screening', date: '2026-11-13' },
      { name: '48-Hour Film Challenge', date: '2026-12-05' },
      { name: 'Spring Film Festival Kickoff', date: '2027-02-19' },
    ],
  },
]

export function getClubById(clubId) {
  return clubs.find((club) => club.id === clubId)
}
