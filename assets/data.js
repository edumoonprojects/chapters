// EduMoon Chapters data.
// IDs: EM-<year>-<city>-<college>-<number> for Student Leads, EM-<year>-<city>-<college>-<club>-<number> for club members.
// <year> is the academic year it started: 26 = 2026-27. Each new academic year starts again from 001.
// Club codes: CD Coding, EN English, CS Career & Skills, SM Social Media, PC Project Club.
// To add a Student Lead: copy one line in LEADS, change the details, and give them the next number in their chapter.
// To add a chapter: add it to CHAPTERS, and its logo (a square PNG) to the logos folder.
// Photos: square JPG in the photos folder, named like the "photo" field. Leave photo empty to show initials.

window.SITE = {
  students: "20,000+",
  colleges: "20+",
  games: 67,
  gamesUrl: "https://edumoonprojects.github.io/event/",
  applyUrl: "https://forms.gle/UU6AkKJrDk4mejYc8",
  communityUrl: "https://chat.whatsapp.com/EqrtHVWwh3OI2aFhg6Zz6s",
  instagramUrl: "https://instagram.com/edumoon_global",
  youtubeUrl: "https://youtube.com/@EduMoon",
  websiteUrl: "https://theedumoon.com",
  appUrl: "https://edumoonprojects.github.io/edumoonapp",
  year: 26, // current academic year (26 = 2026-27). Change to 27 in June 2027.
  demoVideo: "" // Paste a YouTube video ID here when the demo video is ready, e.g. "dQw4w9WgXcQ"
};

window.CHAPTERS = [
  { id: "auce", name: "Andhra University College of Engineering", short: "AUCE", city: "Visakhapatnam", cityCode: "VZG", logo: "andhra-university.png" },
  { id: "auw", name: "AU College for Women", short: "AUW", city: "Visakhapatnam", cityCode: "VZG", logo: "andhra-university.png" },
  { id: "adg", name: "Aditya Degree College, Gajuwaka Women’s Campus", short: "ADG", city: "Visakhapatnam", cityCode: "VZG", logo: "aditya.png" },
  { id: "sjc", name: "St. Joseph’s College for Women (A)", short: "SJC", city: "Visakhapatnam", cityCode: "VZG", logo: "st-josephs.png" },
  { id: "svp", name: "Sanketika Vidya Parishad Engineering College", short: "SVP", city: "Visakhapatnam", cityCode: "VZG", logo: "sanketika.png" },
  { id: "mru", name: "Malla Reddy University x NIAT", short: "MRU", city: "Hyderabad", cityCode: "HYD", logo: "malla-reddy.png" }
];

window.LEADS = [
  { id: "EM-26-VZG-AUCE-001", chapter: "auce", name: "Pothula Harshita", course: "B.Tech CSE", year: "3rd year", role: "Student Lead", photo: "pothula-harshita.jpg" },
  { id: "EM-26-VZG-AUCE-002", chapter: "auce", name: "Raga Harshitha Nemalapuri", course: "B.Tech CSE", year: "3rd year", role: "Student Lead", photo: "raga-harshitha.jpg" },
  { id: "EM-26-VZG-AUCE-003", chapter: "auce", name: "Sultana", course: "", year: "", role: "Student Lead", photo: "" },
  { id: "EM-26-VZG-AUW-001", chapter: "auw", name: "Spandana Goppa", course: "", year: "", role: "Student Lead", photo: "" },
  { id: "EM-26-VZG-AUW-002", chapter: "auw", name: "Chetana", course: "", year: "", role: "Student Lead", photo: "" },
  { id: "EM-26-VZG-ADG-001", chapter: "adg", name: "Bade Srivalli", course: "B.Sc Computer Science", year: "3rd year", role: "Student Lead", photo: "srivalli.jpg" },
  { id: "EM-26-VZG-ADG-002", chapter: "adg", name: "Pinnamaraju Hasini", course: "B.Sc Computer Science", year: "3rd year", role: "Student Lead", photo: "hasini.jpg" },
  { id: "EM-26-VZG-SJC-001", chapter: "sjc", name: "Reddi Maheswari", course: "B.Sc Computer Science", year: "3rd year", role: "Student Lead", photo: "maheswari.jpg" },
  { id: "EM-26-VZG-SVP-001", chapter: "svp", name: "G. Venkata Ramana Rao", course: "B.Tech CSE", year: "2nd year", role: "Student Lead", photo: "venkata-ramana-rao.jpg" },
  { id: "EM-26-HYD-MRU-001", chapter: "mru", name: "Karam Karuna Sundar Dora", course: "B.Tech CSE (IoT)", year: "1st year", role: "Student Lead", photo: "sundar.jpg", note: "3rd place, EduMoon Innovation Challenge Season 2" }
];

// Club members (anyone with an EduMoon member number). Name and club are shown on the Verify page.
// Example: { id: "EM-26-VZG-AUCE-CD-001", name: "Student Name" },
window.MEMBERS = [
];

// Clubs. Seats = seats per college chapter.
window.CLUBS = [
  { code: "CD", name: "Coding", icon: "code", seats: 30, open: true, focus: "From zero to your first project",
    who: "Beginners welcome, mostly 1st and 2nd years",
    does: ["Build and publish your first website on GitHub", "Solve your first DSA problem on LeetCode", "Weekly DSA practice and coding contests", "EduMoon VibeHack, our monthly hackathon"] },
  { code: "EN", name: "English", icon: "chat", seats: 30, open: true, focus: "Everyone speaks English with confidence",
    who: "All years, any level",
    does: ["Story games and word games", "Talk in English every week without fear", "Group conversations and quick speaking rounds", "Learn new words through movies and stories"] },
  { code: "CS", name: "Career & Skills", icon: "briefcase", seats: 30, open: true, focus: "Careers, skills and entrepreneurship",
    who: "All years, all branches",
    does: ["Careers after B.Tech and degree", "Resume, interview and LinkedIn practice", "Start and pitch your own startup idea", "EduMoon Innovation Challenge"] },
  { code: "SM", name: "Social Media", icon: "camera", seats: 20, open: false, focus: "Content creation for real events",
    who: "Anyone who loves reels, design or photos",
    does: ["Cover every club event in your college", "Make reels and posts that people share", "Learn editing, design and storytelling", "Your work goes on EduMoon’s pages"] },
  { code: "PC", name: "Project Club", icon: "wrench", seats: 10, open: false, focus: "Real projects for your CV",
    who: "10 handpicked students per college",
    does: ["Work on real problem statements", "Guided by EduMoon mentors", "Client projects with a chance to earn a stipend", "Build a portfolio of real work"] }
];

// "What's happening next". Add dated events here as soon as they are fixed.
window.UPCOMING = [
  { title: "Coding Club live session", when: "Every week", where: "Online, on Zoom", text: "Learn one topic, play a game, solve together. Beginners welcome." },
  { title: "English Club live session", when: "Every week", where: "Online, on Zoom", text: "Games and stories that get everyone speaking in English." },
  { title: "Career & Skills live session", when: "Every week", where: "Online, on Zoom", text: "Careers, skills and startup ideas, one session at a time." }
];

// Hall of fame.
window.FAME = [
  { title: "Innovation Challenge Season 2", photo: "innovation-s2.jpg",
    people: ["1st place: Joydrot Banerjee and Vagish Reddy", "2nd place: V.S.V.N.V.S. Surya", "3rd place: Karam Karuna Sundar Dora"], text: "50+ ideas submitted. 15 finalists pitched." },
  { title: "Innovation Challenge Season 3", photo: "innovation-s3.jpg", people: [], text: "Winners took home trophies and certificates of appreciation." }
];

// Newspapers. Each card opens the article.
window.PRESS = [
  { paper: "The Hindu", logo: "the-hindu.png", year: "2022", title: "Visakhapatnam startup from Andhra University selected for TiE University Global Pitch competition",
    url: "https://www.thehindu.com/news/cities/Visakhapatnam/visakhapatnam-startup-from-andhra-university-selected-for-tie-university-global-pitch-competition/article65312064.ece" },
  { paper: "The Times of India", logo: "times-of-india.png", year: "2022", title: "How AU student’s startup helps others to start a startup",
    url: "https://timesofindia.indiatimes.com/home/education/news/how-au-students-startup-helps-other-to-start-a-startup/articleshow/89042737.cms" },
  { paper: "Andhra Jyothi", logo: "andhra-jyothi.png", year: "15 April 2022", title: "EduMoon in the Andhra Jyothi e-paper",
    url: "https://epaper.andhrajyothy.com/Home/FullPage?eid=7&edate=15/04/2022&pgid=115805" }
];

// More colleges whose students are part of EduMoon (logo strip). Logos in the logos folder.
window.MORE_COLLEGES = [
  { name: "GITAM", logo: "gitam.png" }, { name: "ANITS", logo: "anits.png" }, { name: "BITS Vizag", logo: "bits-vizag.png" },
  { name: "Centurion University", logo: "centurion.png" }, { name: "Chaitanya Engineering College", logo: "chaitanya.png" },
  { name: "Pydah", logo: "pydah.png" }, { name: "Dr. Lankapalli Bullayya College", logo: "lankapalli.png" }
];

// Community partners we have worked with.
window.PARTNERS = ["Logos Circle Vizag", "Aegion Community", "DreamBot"];

window.FAQ = [
  ["Is EduMoon free?", "Yes. The EduMoon Global Community, its clubs, weekly sessions and games are free for every student."],
  ["Who can join?", "Any college student from any year, branch or college. You don’t need any experience."],
  ["What is the difference between the community and a chapter club?", "The global community is open to everyone, online. Chapter clubs are inside your college, with limited seats, members-only campus events and an EduMoon member number."],
  ["How do I get a seat in a chapter club?", "Recruitment for chapter clubs is opening soon. Join the community to hear first."],
  ["Do I need to know coding?", "No. Most of our members start from zero. The Coding Club is built for beginners."],
  ["My college isn’t listed. Can I start a chapter?", "Yes. Apply to become a Student Lead and bring EduMoon to your college."],
  ["What is an EduMoon ID?", "Every Student Lead and club member gets a unique number, like EM-26-VZG-AUCE-001. Anyone can check it on the Verify page."]
];

// Recent highlights on the home page. Newest first. Photos go in the moments folder.
// To add an event: copy one block, change the details, and add its photo to the moments folder.
window.EVENTS = [
  { title: "EduMoon Innovation Challenge", when: "Season 3 · Nov 2026", tag: "Innovation", photo: "innovation-s3.jpg",
    text: "Students pitch their own ideas to solve real problems. Winners take home trophies and certificates. Season 2 had 50+ ideas and 15 finalists." },
  { title: "Welcoming the first years at AUCEW", when: "Sep 2026", tag: "Orientation", photo: "aucew-orientation.jpg",
    text: "Fun games, crazy energy and new friends for the first years at AU College of Engineering for Women." },
  { title: "Community meet-up at RTIH", when: "Sep 2026", tag: "Meet-up", photo: "meetup-talk.jpg",
    text: "Students from different colleges talked entrepreneurship, AI and community building, with Logos Circle Vizag and Aegion Community." },
  { title: "3-day Robotics Workshop", when: "Sep 2026", tag: "Workshop", photo: "robotics-ahub.jpg",
    text: "Hands-on robotics by DreamBot at A-Hub, with EduMoon as community partner. Learn, build and experiment beyond the classroom." },
  { title: "Ganesh idol making", when: "Sep 2026", tag: "Community", photo: "ganesh-group.jpg",
    text: "Our first community event of the year. Every clay idol was unique, and so was every memory made that evening." }
];

// Photo gallery ("Moments"). Add a line here for every new photo in the moments folder.
window.MOMENTS = [
  { photo: "innovation-s2.jpg", caption: "Innovation Challenge Season 2 winners" },
  { photo: "ganesh-girls.jpg", caption: "Ganesh idol making" },
  { photo: "meetup-group.jpg", caption: "Community meet-up with Logos Circle" },
  { photo: "robotics-ahub.jpg", caption: "Robotics Workshop at A-Hub" },
  { photo: "ganesh-duo.jpg", caption: "Clay idols, made by hand" },
  { photo: "innovation-s3.jpg", caption: "Innovation Challenge Season 3" },
  { photo: "ganesh-idol.jpg", caption: "Every idol was unique" },
  { photo: "meetup-talk.jpg", caption: "Talks on AI and entrepreneurship" },
  { photo: "aucew-orientation.jpg", caption: "AUCEW orientation games" },
  { photo: "ganesh-group.jpg", caption: "Friends from the community" }
];
