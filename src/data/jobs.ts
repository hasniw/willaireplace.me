export interface JobResult {
  probability: number;
  timeline: string;
  roast: string;
  survivalTips: string[];
}

const jobs: Record<string, JobResult> = {
  // TECH
  developer: {
    probability: 72,
    timeline: "3-5 years",
    roast:
      "You spent years mastering clean code and now AI writes better functions than you at 3am. Your Stack Overflow rep means nothing when Copilot does it faster. At least you can still fix the AI's bugs... for now.",
    survivalTips: [
      "Learn to review AI-generated code instead of writing it",
      "Specialize in legacy systems nobody wants to touch",
      "Become an AI whisperer (aka prompt engineer)",
    ],
  },
  "web developer": {
    probability: 78,
    timeline: "2-4 years",
    roast:
      "You make websites. AI makes websites. Except AI does it in 30 seconds without arguing about tabs vs spaces. Your div-soup HTML days are numbered and not even flexbox can save you.",
    survivalTips: [
      "Focus on complex full-stack architecture",
      "Learn to manage AI-generated codebases",
      "Pivot to developer experience and tooling",
    ],
  },
  designer: {
    probability: 58,
    timeline: "4-7 years",
    roast:
      'You charge $150/hour to pick colors from a palette that AI can generate in 0.3 seconds. Your "creative vision" is being replaced by a text prompt. But hey, at least someone needs to type "make it pop" into Midjourney.',
    survivalTips: [
      "Focus on design strategy and user research",
      "Learn to art-direct AI tools effectively",
      "Develop a personal style so unique even AI can't replicate it (good luck)",
    ],
  },
  "data scientist": {
    probability: 65,
    timeline: "3-6 years",
    roast:
      'You spent 6 years getting a PhD to do what AutoML does before your morning coffee. Your Jupyter notebooks full of "exploratory analysis" are just fancy procrastination that AI doesn\'t need.',
    survivalTips: [
      "Focus on domain expertise and business strategy",
      "Become the person who asks the right questions, not the one who runs models",
      "Learn to validate and audit AI decisions",
    ],
  },
  "product manager": {
    probability: 62,
    timeline: "4-7 years",
    roast:
      "You organize meetings about meetings and call it strategy. AI can prioritize a backlog, write user stories, and analyze metrics without needing a stand-up. Your main skill is saying 'let\'s circle back' and AI already does that better.",
    survivalTips: [
      "Develop deep domain expertise in a specific industry",
      "Focus on stakeholder management (AI is bad at politics... for now)",
      "Learn to orchestrate AI tools across product workflows",
    ],
  },
  "qa tester": {
    probability: 89,
    timeline: "1-3 years",
    roast:
      "You click buttons for a living and write test cases that AI can generate, execute, and improve faster than you can open Jira. Your bug reports are about to become automated bug detections. Thanks for your service.",
    survivalTips: [
      "Learn AI-powered testing frameworks immediately",
      "Focus on exploratory testing and edge cases",
      "Pivot to test architecture and quality strategy",
    ],
  },
  "devops engineer": {
    probability: 55,
    timeline: "5-8 years",
    roast:
      "You automate things for a living, which means you should have seen this coming. AI is about to automate the automator. Your YAML files are writing themselves and your CI/CD pipelines don't need a babysitter.",
    survivalTips: [
      "Focus on complex infrastructure architecture",
      "Specialize in security and compliance",
      "Become the bridge between AI tools and infrastructure",
    ],
  },
  "it support": {
    probability: 82,
    timeline: "2-4 years",
    roast:
      '"Have you tried turning it off and on again?" Congratulations, a chatbot can now say that with more patience than you ever did. Your troubleshooting flowchart has been replaced by an AI that actually remembers the solution.',
    survivalTips: [
      "Specialize in complex enterprise systems",
      "Focus on hardware and physical infrastructure",
      "Become an AI systems administrator",
    ],
  },
  "system admin": {
    probability: 78,
    timeline: "3-5 years",
    roast:
      "You guard servers like a dragon guards gold, but cloud AI doesn't need a gatekeeper. Your bash scripts are cute, but AI writes them faster and doesn't forget the semicolon. Your server room is becoming a museum.",
    survivalTips: [
      "Specialize in hybrid cloud and edge computing",
      "Focus on security and disaster recovery",
      "Learn AI infrastructure management",
    ],
  },
  "cybersecurity": {
    probability: 38,
    timeline: "8-12 years",
    roast:
      "Good news: hackers will keep hacking. Bad news: AI is getting better at both attacking AND defending. You're basically in an arms race where both sides are getting smarter. At least job security comes from insecurity.",
    survivalTips: [
      "Stay ahead of AI-powered attack vectors",
      "Focus on threat intelligence and strategy",
      "You're actually in decent shape, just don't get complacent",
    ],
  },

  // CREATIVE
  writer: {
    probability: 85,
    timeline: "1-3 years",
    roast:
      "ChatGPT wrote a novel in the time it took you to outline chapter one. Your \"unique voice\" is statistically reproducible and your writer's block doesn't exist in silicon. At least AI can't drink coffee and stare out windows... yet.",
    survivalTips: [
      "Develop an extremely distinctive personal voice",
      "Focus on long-form investigative and opinion pieces",
      "Learn to use AI as a co-writer, not a competitor",
    ],
  },
  artist: {
    probability: 64,
    timeline: "3-6 years",
    roast:
      'Midjourney just created a masterpiece in the time it took you to sharpen your pencil. Your art degree cost $200K and now a teenager with a text prompt makes "better" work. The machines have learned to dream and they dream faster than you.',
    survivalTips: [
      "Focus on physical and installation art",
      "Build a personal brand stronger than any algorithm",
      "Learn to use AI as a creative tool, not fight it",
    ],
  },
  photographer: {
    probability: 71,
    timeline: "3-5 years",
    roast:
      'AI generates photorealistic images of things that never existed, and it doesn\'t need a $3,000 camera or complain about "golden hour." Your Instagram presets are just math, and AI is really good at math.',
    survivalTips: [
      "Focus on documentary and event photography",
      "Build relationships that AI can't replicate",
      "Specialize in niche physical photography (real estate, food, weddings)",
    ],
  },
  influencer: {
    probability: 33,
    timeline: "10-15 years",
    roast:
      "Your job is literally being a human, which is the one thing AI can't fully fake. But let's be honest, your 'content' is just pointing at text on screen and making surprised faces. AI influencers are coming and they never have bad hair days.",
    survivalTips: [
      "Lean hard into authenticity and personal connection",
      "Diversify into businesses beyond content",
      "Your humanity is your moat, for once that's a good thing",
    ],
  },
  musician: {
    probability: 52,
    timeline: "5-10 years",
    roast:
      "AI composed a symphony while you were still tuning your guitar. Suno makes hits in seconds. But hey, people still go to live concerts to watch humans sweat on stage, so you've got that going for you.",
    survivalTips: [
      "Focus on live performance and touring",
      "Use AI tools to enhance your production",
      "Build a fanbase that cares about the human behind the music",
    ],
  },
  "video editor": {
    probability: 73,
    timeline: "2-5 years",
    roast:
      "You spend 8 hours cutting a 10-minute video. AI does it in 8 seconds. Your color grading expertise is just a filter preset waiting to happen. Your timeline is about to get trimmed, and we don't mean the video's.",
    survivalTips: [
      "Focus on storytelling and creative direction",
      "Specialize in complex post-production and VFX",
      "Learn AI-powered editing tools before they learn your job",
    ],
  },

  // TRADITIONAL
  lawyer: {
    probability: 61,
    timeline: "5-8 years",
    roast:
      "You bill $500/hour to read documents that AI scans in milliseconds. Your legal research skills are being outpaced by a model that passed the bar exam on its first try. At least courtroom drama still needs a human to object dramatically.",
    survivalTips: [
      "Focus on courtroom advocacy and negotiation",
      "Specialize in emerging tech law and AI regulation",
      "Become the lawyer who understands AI (they'll need those)",
    ],
  },
  accountant: {
    probability: 88,
    timeline: "2-4 years",
    roast:
      "Your entire job is pattern matching on numbers, which is literally what computers were invented to do. Excel was the warning shot. AI is the kill shot. Your calculator days are calculated to be over.",
    survivalTips: [
      "Pivot to strategic financial advisory",
      "Specialize in complex tax strategy and planning",
      "Focus on client relationships and trust",
    ],
  },
  doctor: {
    probability: 29,
    timeline: "15-25 years",
    roast:
      "AI can diagnose diseases from images better than you can, but it can't hold a patient's hand or deliver bad news with empathy. Your handwriting will always be worse than a printer, though. You're safe because people trust humans with their lives, but maybe not forever.",
    survivalTips: [
      "Embrace AI as a diagnostic tool",
      "Focus on patient relationships and complex care",
      "You're one of the safer jobs here, don't get cocky",
    ],
  },
  nurse: {
    probability: 18,
    timeline: "20-30 years",
    roast:
      "Robots can't change bedpans with compassion or calm down a screaming patient at 3am. Your job requires physical presence, emotional intelligence, and the ability to function on zero sleep. AI can't do any of that, so congratulations on your job security through suffering.",
    survivalTips: [
      "You're actually pretty safe, nice choice",
      "Learn to work with AI monitoring and diagnostic tools",
      "Your empathy is literally irreplaceable",
    ],
  },
  teacher: {
    probability: 42,
    timeline: "7-12 years",
    roast:
      "AI tutors are infinitely patient, available 24/7, and never have tenure disputes. But try getting a robot to supervise 30 screaming kids during lunch. Your job is safe because society needs somewhere to put children during the day.",
    survivalTips: [
      "Focus on mentorship and social-emotional learning",
      "Integrate AI tools into your teaching",
      "Your crowd control skills are irreplaceable by silicon",
    ],
  },

  // PHYSICAL / TRADES
  plumber: {
    probability: 4,
    timeline: "30+ years",
    roast:
      "Congrats, your job requires crawling under houses, dealing with literal crap, and solving 3D puzzles in tight spaces. AI can barely navigate a flat room. Your job security is literally in the toilet, and that's actually great news for you.",
    survivalTips: [
      "You picked the right career, seriously",
      "Charge more, you deserve it",
      "Watch in amusement as your tech friends panic",
    ],
  },
  electrician: {
    probability: 7,
    timeline: "25-30 years",
    roast:
      "Your job requires hands, spatial reasoning, and the ability to not die from 240 volts. Robots can't even open a door reliably, let alone wire a house. You're literally shockproof from the AI revolution.",
    survivalTips: [
      "Kick back and relax, you're fine",
      "Learn smart home and EV charging installation",
      "Your friends with desk jobs wish they were you right now",
    ],
  },
  chef: {
    probability: 35,
    timeline: "10-15 years",
    roast:
      "AI can generate recipes better than your grandma's, but it can't taste-test the soup or yell at the sous chef. Robot kitchens exist, but they can't improvise when the salmon is off and the VIP table wants something special. You survive on chaos.",
    survivalTips: [
      "Focus on creativity and dining experiences",
      "Build a personal brand around your cooking style",
      "Robots can cook, but people want to eat YOUR food",
    ],
  },
  driver: {
    probability: 94,
    timeline: "3-7 years",
    roast:
      "Self-driving cars don't get tired, don't need bathroom breaks, and don't argue about the route. Waymo is already running robotaxis. Your steering wheel is becoming a museum artifact. Buckle up, because this ride is almost over.",
    survivalTips: [
      "Start retraining now, seriously",
      "Look into fleet management and logistics",
      "Learn to maintain and operate autonomous vehicles",
    ],
  },
  "construction worker": {
    probability: 15,
    timeline: "20-30 years",
    roast:
      "You build things with your hands in unpredictable environments. Robots struggle on flat factory floors, let alone on a construction site in the rain. Your back hurts, but your job security doesn't. AI can't swing a hammer in the wind.",
    survivalTips: [
      "You're in a great position, actually",
      "Learn to operate robotic construction tools",
      "Physical skills + AI knowledge = premium pay",
    ],
  },

  // OTHER
  hr: {
    probability: 76,
    timeline: "3-5 years",
    roast:
      'Your job is reading resumes, scheduling meetings, and writing policies nobody reads. AI already does all of that without the passive-aggressive "per my last email." Your sensitivity training PowerPoint is being replaced by an algorithm with actual sensitivity.',
    survivalTips: [
      "Focus on culture building and conflict resolution",
      "Specialize in complex employee relations",
      "Become the human element in an increasingly automated workplace",
    ],
  },
  sales: {
    probability: 65,
    timeline: "4-7 years",
    roast:
      'Your cold calls are colder than AI\'s personality, and that\'s saying something. AI can analyze buyer behavior, draft proposals, and follow up without "just circling back." Your Rolodex is a relic and your charm is quantifiable.',
    survivalTips: [
      "Focus on high-value enterprise relationships",
      "Develop deep industry expertise",
      "Use AI for prospecting, keep closing for yourself",
    ],
  },
  marketer: {
    probability: 79,
    timeline: "2-4 years",
    roast:
      "You A/B test headlines while AI generates 10,000 variations before lunch. Your \"creative campaign\" is just a prompt away from obsolescence. The marketing funnel is being automated from top to bottom, and you're getting funneled out.",
    survivalTips: [
      "Focus on brand strategy and creative direction",
      "Specialize in experiential and community marketing",
      "Learn to orchestrate AI marketing tools",
    ],
  },
  student: {
    probability: 95,
    timeline: "Already happening",
    roast:
      "Your homework is already written by AI. Your essays are AI-generated. Your study notes are AI-summarized. Your degree might be worthless by graduation. You're paying $50K/year to learn things that AI already knows. The only test you're passing is the Turing test.",
    survivalTips: [
      "Focus on skills that AI can't replicate: networking, leadership, creativity",
      "Learn to work WITH AI tools, not pretend they don't exist",
      "Consider trades, seriously, plumbers are laughing right now",
    ],
  },
  ceo: {
    probability: 41,
    timeline: "7-12 years",
    roast:
      "You get paid 300x your average employee to make decisions that AI can simulate in seconds. Your \"vision\" is just pattern recognition that AI does better. But boards still want a human face to blame when things go wrong, so you've got that going for you.",
    survivalTips: [
      "Focus on leadership, culture, and stakeholder management",
      "Learn to leverage AI for decision-making",
      "Your job is safe because someone needs to take the fall",
    ],
  },
  therapist: {
    probability: 22,
    timeline: "15-20 years",
    roast:
      "AI chatbots are already doing therapy at 3am when you're asleep. But there's something about crying to a real human that a chatbot can't replicate. Your job is safe because people need to feel judged by someone with eyes. Your empathy has monetary value, for now.",
    survivalTips: [
      "Your emotional intelligence is genuinely hard to replicate",
      "Use AI tools for research and session notes",
      "Focus on complex cases that need human intuition",
    ],
  },
  translator: {
    probability: 92,
    timeline: "1-3 years",
    roast:
      'You spent years mastering languages that Google Translate butchered. Now DeepL and GPT nail the nuances too. Your bilingual brain is being outpaced by a model that speaks 100 languages. "Lost in translation" used to be your job security; now it\'s your career status.',
    survivalTips: [
      "Focus on literary and creative translation",
      "Specialize in rare language pairs",
      "Pivot to cultural consulting and localization strategy",
    ],
  },
  "real estate agent": {
    probability: 74,
    timeline: "3-6 years",
    roast:
      "You open doors and take 3% for it. AI can match buyers to homes, generate virtual tours, and handle paperwork without the fake smile. Zillow was the appetizer. AI agents (the digital kind) are the main course. Your open house sign is closing.",
    survivalTips: [
      "Focus on luxury and commercial real estate",
      "Build personal relationships that AI can't replicate",
      "Become a neighborhood expert with genuine local knowledge",
    ],
  },
  journalist: {
    probability: 81,
    timeline: "2-4 years",
    roast:
      "AI writes news articles faster than you can type your byline. AP already uses AI for earnings reports. Your investigative skills might survive, but your hot takes are algorithmically reproducible. The press is being depressed.",
    survivalTips: [
      "Focus on investigative and on-the-ground reporting",
      "Build a personal brand and trusted voice",
      "AI can write news, but it can't cultivate sources",
    ],
  },
  "data entry": {
    probability: 97,
    timeline: "Already happening",
    roast:
      "Your entire job is typing numbers from one place to another. OCR has been doing this since the 90s, and now AI does it while understanding context. You are the definition of automatable. Your keyboard is your career's coffin.",
    survivalTips: [
      "Retrain immediately, this is not a drill",
      "Learn data analysis or database management",
      "Literally any other skill will help at this point",
    ],
  },
  pharmacist: {
    probability: 68,
    timeline: "5-8 years",
    roast:
      "You count pills and check for drug interactions, which is exactly what a database query does. Robot pharmacies already exist and they never miscount. Your white coat is becoming a white flag. At least you can still counsel patients who ignore your advice anyway.",
    survivalTips: [
      "Focus on clinical pharmacy and patient consultation",
      "Specialize in complex medication management",
      "Move into pharmaceutical research or regulatory roles",
    ],
  },
  "financial analyst": {
    probability: 83,
    timeline: "2-5 years",
    roast:
      "You stare at spreadsheets and make predictions that are wrong 60% of the time. AI stares at millions of data points and is wrong only 40% of the time. Your Excel skills peaked in 2015 and your financial models are being modeled out of existence.",
    survivalTips: [
      "Develop deep industry expertise and client relationships",
      "Focus on strategic advisory and complex deal structuring",
      "Learn to use AI for analysis and focus on interpretation",
    ],
  },
  "customer service": {
    probability: 91,
    timeline: "1-3 years",
    roast:
      '"Your call is important to us" - said every chatbot ever, and it means it just as much as you did. AI handles 10,000 tickets while you handle 10. Your hold music is now just the sound of your career fading out.',
    survivalTips: [
      "Specialize in complex escalations and VIP support",
      "Move into customer success and relationship management",
      "Learn to train and manage AI support systems",
    ],
  },
  "personal trainer": {
    probability: 26,
    timeline: "15-20 years",
    roast:
      "AI can write workout plans and track form with computer vision, but it can't physically spot you on the bench press or yell motivational insults in your face. Your job survives because people are too lazy to motivate themselves. Your clients' weakness is your strength.",
    survivalTips: [
      "Your physical presence is your biggest advantage",
      "Use AI for personalized program design",
      "Focus on motivation and accountability, your real value",
    ],
  },
  bartender: {
    probability: 19,
    timeline: "20+ years",
    roast:
      "Robot bartenders exist but they can't listen to your sob story, flirt with customers, or decide when to cut someone off based on vibes. Your job is 20% mixing drinks and 80% being a therapist with alcohol. AI can pour, but it can't pour with attitude.",
    survivalTips: [
      "Your social skills are genuinely AI-proof",
      "Focus on craft cocktails and experiences",
      "You're basically a therapist who serves drinks, and both those jobs are safe",
    ],
  },
};

const aliases: Record<string, string> = {
  "software engineer": "developer",
  "software developer": "developer",
  programmer: "developer",
  coder: "developer",
  "frontend developer": "web developer",
  "front-end developer": "web developer",
  "backend developer": "developer",
  "back-end developer": "developer",
  "full-stack developer": "developer",
  "fullstack developer": "developer",
  "mobile developer": "developer",
  "ios developer": "developer",
  "android developer": "developer",
  "ui designer": "designer",
  "ux designer": "designer",
  "ui/ux designer": "designer",
  "graphic designer": "designer",
  "product designer": "designer",
  "data analyst": "data scientist",
  "machine learning engineer": "data scientist",
  "ml engineer": "data scientist",
  "ai engineer": "data scientist",
  pm: "product manager",
  "project manager": "product manager",
  tester: "qa tester",
  "quality assurance": "qa tester",
  sre: "devops engineer",
  "site reliability engineer": "devops engineer",
  sysadmin: "system admin",
  "system administrator": "system admin",
  "security engineer": "cybersecurity",
  "security analyst": "cybersecurity",
  infosec: "cybersecurity",
  "content writer": "writer",
  copywriter: "writer",
  author: "writer",
  blogger: "writer",
  "technical writer": "writer",
  painter: "artist",
  illustrator: "artist",
  animator: "artist",
  "graphic artist": "artist",
  "content creator": "influencer",
  youtuber: "influencer",
  streamer: "influencer",
  tiktoker: "influencer",
  singer: "musician",
  "music producer": "musician",
  dj: "musician",
  "film editor": "video editor",
  attorney: "lawyer",
  "tax accountant": "accountant",
  bookkeeper: "accountant",
  cpa: "accountant",
  physician: "doctor",
  surgeon: "doctor",
  dentist: "doctor",
  professor: "teacher",
  tutor: "teacher",
  instructor: "teacher",
  educator: "teacher",
  "uber driver": "driver",
  "truck driver": "driver",
  "taxi driver": "driver",
  "delivery driver": "driver",
  "lyft driver": "driver",
  cook: "chef",
  "line cook": "chef",
  "human resources": "hr",
  "hr manager": "hr",
  recruiter: "hr",
  "talent acquisition": "hr",
  salesperson: "sales",
  "sales rep": "sales",
  "sales representative": "sales",
  "account executive": "sales",
  "digital marketer": "marketer",
  "marketing manager": "marketer",
  "social media manager": "marketer",
  seo: "marketer",
  "content marketer": "marketer",
  "college student": "student",
  "university student": "student",
  intern: "student",
  founder: "ceo",
  entrepreneur: "ceo",
  "business owner": "ceo",
  psychologist: "therapist",
  counselor: "therapist",
  psychiatrist: "therapist",
  interpreter: "translator",
  realtor: "real estate agent",
  "real estate": "real estate agent",
  reporter: "journalist",
  "news anchor": "journalist",
  correspondent: "journalist",
  clerk: "data entry",
  "administrative assistant": "data entry",
  "data entry clerk": "data entry",
  "call center": "customer service",
  "support agent": "customer service",
  "customer support": "customer service",
  "help desk": "it support",
  "tech support": "it support",
  "fitness coach": "personal trainer",
  "gym trainer": "personal trainer",
  builder: "construction worker",
  carpenter: "construction worker",
  welder: "construction worker",
  mixologist: "bartender",
  server: "bartender",
  waiter: "bartender",
  waitress: "bartender",
};

function generateDynamicResult(jobTitle: string): JobResult {
  const hash = jobTitle
    .toLowerCase()
    .split("")
    .reduce((a, b) => a + b.charCodeAt(0), 0);
  const probability = (hash % 55) + 25;

  const roasts = [
    `We couldn't find "${jobTitle}" in our database, which means either your job is too obscure for AI to bother with, or you just made it up for LinkedIn. Either way, AI is probably already better at explaining what you do than you are.`,
    `"${jobTitle}"? That's a real job? We asked GPT-4 and even it was confused. Your career might be safe simply because AI has better things to do than figure out what your job title means.`,
    `We ran "${jobTitle}" through every AI model we could find and they all returned a shrug emoji. Your career is safe not because you're irreplaceable, but because you're incomprehensible. Wear that as a badge of honor.`,
  ];

  const tipSets = [
    [
      "Keep your job title as confusing as possible",
      "Your obscurity is actually your best defense",
      'Consider pivoting to something AI can actually understand, like "prompt engineer"',
    ],
    [
      "Double down on whatever weird thing you do",
      "AI can't replace what it can't comprehend",
      "Start a YouTube channel explaining your job before AI does",
    ],
    [
      "Make sure your LinkedIn profile stays mysterious",
      "Your niche skills are your moat (probably)",
      "Learn to work WITH AI before it learns to work WITHOUT you",
    ],
  ];

  return {
    probability,
    timeline:
      probability > 70
        ? "3-5 years"
        : probability > 50
          ? "5-10 years"
          : "10-15 years",
    roast: roasts[hash % roasts.length],
    survivalTips: tipSets[hash % tipSets.length],
  };
}

export function getJobResult(input: string): JobResult {
  const normalized = input.trim().toLowerCase();

  // Direct match
  if (jobs[normalized]) {
    return jobs[normalized];
  }

  // Alias match
  if (aliases[normalized]) {
    return jobs[aliases[normalized]];
  }

  // Partial match on keys
  for (const key of Object.keys(jobs)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return jobs[key];
    }
  }

  // Partial match on aliases
  for (const [alias, key] of Object.entries(aliases)) {
    if (normalized.includes(alias) || alias.includes(normalized)) {
      return jobs[key];
    }
  }

  // Dynamic fallback
  return generateDynamicResult(normalized);
}
