# EduMoon Chapters

EduMoon's student-led chapters across colleges: meet the Student Leads, verify an EduMoon ID, and apply to become a Student Lead.

**Live:** https://edumoonprojects.github.io/edumoon-chapters/

## Pages

- `index.html` – home: headline, numbers, college logos, chapters, games, benefits, verify
- `chapters.html` – all chapters by city
- `chapter.html?c=auce` – one chapter and its Student Leads
- `lead.html` – benefits, pathway (Student Lead → Chapter Lead → EduMoon Fellow) and Apply
- `verify.html?id=EM-VZG-AUCE-001` – verify an EduMoon ID

## Updating

Everything is in `assets/data.js`:

- **Add a Student Lead:** copy one line in `LEADS`, change the details, and give the next number in that chapter (e.g. `EM-VZG-AUCE-004`). Put a square photo in `photos/` with the same file name as `photo`. Leave `photo` empty to show initials.
- **Add a chapter:** add a line to `CHAPTERS` and a square logo PNG in `logos/`.
- **Demo video:** paste the YouTube video ID into `demoVideo`.
- **Numbers and links:** change them at the top of the file.

Only add a Student Lead's photo and details with their permission.

## Built with

HTML, CSS and JavaScript. No frameworks. Hosted free on GitHub Pages.

---

Built by Vikas Kapuganti for EduMoon

## Events and photos
- Event photos live in the `moments` folder.
- To add an event to "Recent highlights", add a block to `EVENTS` in `assets/data.js`.
- To add a photo to the "Moments" gallery, add a line to `MOMENTS` in `assets/data.js`.
