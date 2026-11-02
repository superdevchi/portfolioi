/* ============================================================
   posts.js — the list of every post on the site.

   TO PUBLISH A NEW POST
   1. Copy posts/_template.html to posts/your-slug.html and write it.
   2. Add one entry below (newest anywhere — the site sorts by date).
   3. Commit and push. The homepage and blog page update themselves.

   slug    → file name without .html
   date    → YYYY-MM-DD
   read    → minutes to read (roughly words ÷ 230)
   tags    → a few short labels; they become filters on the blog page
   ============================================================ */
window.POSTS = [
  {
    slug: "push-to-production",
    title: "From push to production: Silistudio's CI/CD pipeline",
    date: "2026-11-02",
    read: 5,
    summary: "How every change gets tested, built and deployed automatically, and the deploy bugs that taught me the most.",
    tags: ["DevOps", "CI/CD", "Silistudio"]
  },
  {
    slug: "one-backend-two-clients",
    title: "One backend, two clients: how Silistudio is wired",
    date: "2026-10-30",
    read: 4,
    summary: "Why the iOS app and the web app share a single reactive Java API, and where WebSockets earn their place.",
    tags: ["Silistudio", "Architecture", "Java"]
  },
  {
    slug: "how-i-built-this-portfolio",
    title: "How I built this portfolio",
    date: "2026-10-29",
    read: 3,
    summary: "Plain HTML, CSS and JavaScript, built with AI on purpose, and a blog that needs no build step.",
    tags: ["Meta", "AI", "Web"]
  }
];
