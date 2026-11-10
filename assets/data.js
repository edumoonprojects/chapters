// EduMoon Chapters data.
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
  { id: "EM-VZG-AUCE-001", chapter: "auce", name: "Pothula Harshita", course: "B.Tech CSE", year: "3rd year", role: "Student Lead", photo: "pothula-harshita.jpg" },
  { id: "EM-VZG-AUCE-002", chapter: "auce", name: "Raga Harshitha Nemalapuri", course: "B.Tech CSE", year: "3rd year", role: "Student Lead", photo: "raga-harshitha.jpg" },
  { id: "EM-VZG-AUCE-003", chapter: "auce", name: "Sultana", course: "", year: "", role: "Student Lead", photo: "" },
  { id: "EM-VZG-AUW-001", chapter: "auw", name: "Spandana Goppa", course: "", year: "", role: "Student Lead", photo: "" },
  { id: "EM-VZG-AUW-002", chapter: "auw", name: "Chetana", course: "", year: "", role: "Student Lead", photo: "" },
  { id: "EM-VZG-ADG-001", chapter: "adg", name: "Bade Srivalli", course: "B.Sc Computer Science", year: "3rd year", role: "Student Lead", photo: "srivalli.jpg" },
  { id: "EM-VZG-ADG-002", chapter: "adg", name: "Pinnamaraju Hasini", course: "B.Sc Computer Science", year: "3rd year", role: "Student Lead", photo: "hasini.jpg" },
  { id: "EM-VZG-SJC-001", chapter: "sjc", name: "Reddi Maheswari", course: "B.Sc Computer Science", year: "3rd year", role: "Student Lead", photo: "maheswari.jpg" },
  { id: "EM-VZG-SVP-001", chapter: "svp", name: "G. Venkata Ramana Rao", course: "B.Tech CSE", year: "2nd year", role: "Student Lead", photo: "venkata-ramana-rao.jpg" },
  { id: "EM-HYD-MRU-001", chapter: "mru", name: "Karam Karuna Sundar Dora", course: "B.Tech CSE (IoT)", year: "1st year", role: "Student Lead", photo: "sundar.jpg", note: "3rd place, EduMoon Innovation Challenge Season 2" }
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
