export const config = {
  website: 'https://yorukot.me',
  analytics: {
    googleAnalytics: 'G-SSQL8Y8XE4',
  },
  personal: {
    name: 'Yorukot',
    age: 17,
    location: {
      city: 'Taichung',
      country: 'Taiwan',
      timezone: 'Asia/Taipei',
      utcOffset: '+8',
      mapUrl: 'https://maps.app.goo.gl/d6URazuxoMjo3Ch16',
    },
    avatar: '/avatar.png',
    experienceYears: 6,
    description: {
      intro:
        "Hi! I'm a 17-year-old high school student with about 6 years of development experience. I love building things with code and specialize in full-stack web development and creating CLI/TUI tools that make working in the terminal more enjoyable.",
      hobbies:
        "When I'm not coding or contributing to open-source projects, you'll probably find me watching anime, TV series, or movies. I'm always learning new technologies and sharing what I discover with the community.",
      work: 'I work @Opensource where I spend most of my time building tools and websites.',
    },
  },
  contact: {
    email: 'hi@yorukot.me',
    github: 'yorukot',
    discord: '579544867626024960',
    youtube: '@yorukot',
    kofi: 'yorukot',
  },
  projects: [
    {
      id: 'superfile',
      github: 'yorukot/superfile',
      techStack: ['Go', 'Terminal', 'CLI', 'Bubble Tea'],
      borderColor: 'hsl(200, 100%, 60%)',
      featured: '⚡ GitHub Trending',
    },
    {
      id: 'blog',
      github: 'yorukot/blog',
      techStack: ['Astro', 'TypeScript', 'Tailwind CSS'],
      borderColor: 'hsl(15, 100%, 55%)',
      featured: null,
    },
    {
      id: 'mhcat',
      github: 'yorukot/old-mhcat',
      techStack: ['Node.js', 'Discord.js', 'MongoDB'],
      borderColor: 'hsl(235, 86%, 65%)',
      featured: '🚀 1M+ Users',
    },
    {
      id: 'tmlshock',
      github: 'yorukot/tmlshock',
      techStack: ['Go', 'Terminal', 'CLI'],
      borderColor: 'hsl(45, 100%, 55%)',
      featured: null,
    },
    {
      id: 'random-websites',
      github: null,
      techStack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
      borderColor: 'hsl(270, 60%, 60%)',
      featured: null,
    },
    {
      id: 'juice-jump',
      github: 'yorukot/juicejump',
      techStack: ['Godot', 'GDScript'],
      borderColor: 'hsl(141, 71%, 48%)',
      featured: '🎮 Game Jam',
    },
  ],
  techStack: [
    {
      id: 'go',
      icons: ['skill-icons:golang'],
      borderColor: 'hsl(200, 100%, 60%)',
    },
    {
      id: 'javascript',
      icons: [
        'skill-icons:javascript',
        'skill-icons:typescript',
        'skill-icons:nodejs-dark',
        'skill-icons:nestjs-dark',
        'skill-icons:expressjs-dark',
        'skill-icons:discordjs-dark',
      ],
      borderColor: 'hsl(45, 100%, 55%)',
    },
    {
      id: 'python',
      icons: ['skill-icons:python-dark', 'skill-icons:fastapi', 'skill-icons:flask-dark'],
      borderColor: 'hsl(55, 100%, 65%)',
    },
    {
      id: 'frontend',
      icons: [
        'skill-icons:html',
        'skill-icons:css',
        'skill-icons:react-dark',
        'skill-icons:nextjs-dark',
        'skill-icons:astro',
        'skill-icons:tailwindcss-dark',
      ],
      borderColor: 'hsl(195, 100%, 65%)',
    },
    {
      id: 'database',
      icons: [
        'skill-icons:postgresql-dark',
        'skill-icons:mongodb',
        'skill-icons:redis-dark',
        'skill-icons:cassandra-dark',
      ],
      borderColor: 'hsl(210, 50%, 55%)',
    },
    {
      id: 'devops',
      icons: [
        'skill-icons:docker',
        'skill-icons:nginx',
        'skill-icons:vercel-dark',
        'skill-icons:netlify-dark',
        'skill-icons:cloudflare-dark',
      ],
      borderColor: 'hsl(25, 100%, 60%)',
    },
    {
      id: 'tools',
      icons: [
        'skill-icons:linux-dark',
        'skill-icons:apple-dark',
        'skill-icons:markdown-dark',
        'skill-icons:git',
        'skill-icons:github-dark',
        'skill-icons:postman',
      ],
      borderColor: 'hsl(0, 0%, 40%)',
    },
    {
      id: 'learning',
      icons: [
        'skill-icons:rust',
        'skill-icons:solidjs-dark',
        'skill-icons:cpp',
        'skill-icons:supabase-dark',
        'skill-icons:unity-dark',
        'skill-icons:godot-dark',
      ],
      borderColor: 'hsl(15, 100%, 55%)',
    },
  ],
  experiences: [
    {
      id: 'sitcon-camp-instructor-2025',
      type: 'Teaching',
      date: '2025',
    },
    {
      id: 'sitcon-camp-staff-2025',
      type: 'Volunteer',
      date: '2025',
    },
    {
      id: 'google-devjam-2025',
      type: 'Competition',
      date: '2025',
    },
    {
      id: 'taipei-hackathon-2025',
      type: 'Competition',
      date: '2025',
    },
    {
      id: 'nttu-maker-marathon-2025',
      type: 'Competition',
      date: '2025',
    },
    {
      id: 'japan-ai-koshien-2025',
      type: 'Competition',
      date: '2025',
    },
    {
      id: 'shanghai-hackclub-juice-2025',
      type: 'Event',
      date: '2025',
    },
    {
      id: 'scrapyard-taiwan-2025',
      type: 'Event',
      date: '2025',
    },
    {
      id: 'sitcon-speaker-2025',
      type: 'Conference',
      date: '2025',
    },
    {
      id: 'research-paper-competition-2025',
      type: 'Academic',
      date: '2025',
    },
    {
      id: 'nthu-hpc-winter-camp-2025',
      type: 'Training',
      date: '2025',
    },
    {
      id: 'academic-subject-competition-2024',
      type: 'Competition',
      date: '2024',
    },
    {
      id: 'ais3-training-camp-2024',
      type: 'Training',
      date: '2024',
    },
    {
      id: 'golden-shield-award-2023',
      type: 'Competition',
      date: '2023',
    },
  ],
  experienceTypes: {
    Teaching: { icon: 'tabler:school', color: 'hsl(270, 60%, 60%)' },
    Volunteer: { icon: 'tabler:users', color: 'hsl(141, 71%, 48%)' },
    Competition: { icon: 'tabler:trophy', color: 'hsl(45, 100%, 55%)' },
    Event: { icon: 'tabler:calendar-event-filled', color: 'hsl(171, 90.50%, 71.20%)' },
    Conference: { icon: 'tabler:microphone', color: 'hsl(24, 84.40%, 65%)' },
    Academic: { icon: 'tabler:file-text', color: 'hsl(141, 71%, 48%)' },
    Training: { icon: 'tabler:certificate', color: 'hsl(210, 50%, 55%)' },
  },
};
