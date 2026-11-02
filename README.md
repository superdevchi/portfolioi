# Chibuike Henry — portfolio

Plain HTML, CSS and JavaScript. No build step. Works on GitHub Pages as-is.

```
index.html            homepage
blog.html             all posts, with tag filters
assets/site.css       styles for every page (light + dark)
assets/site.js        theme toggle, scroll reveal, post lists
posts/posts.js        the list of posts — edit this to publish
posts/_template.html  copy this to write a new post
posts/*.html          one file per post
img/                  screenshots (add img/silistudio.png)
```

## Publish a post

1. Copy `posts/_template.html` to `posts/my-new-post.html`.
2. Replace everything marked `EDIT`, then write the post inside `<div class="prose">`.
3. Add an entry to `posts/posts.js`:
   ```js
   { slug: "my-new-post", title: "My new post", date: "2026-11-05",
     read: 4, summary: "One sentence.", tags: ["AI", "Java"] },
   ```
4. Commit and push. The homepage shows the newest three; `blog.html` shows all.

Images for posts go in `posts/img/`.

## Still to fill in

- `img/silistudio.png` — a screenshot of the live app (16:10 works best).
- Each project's **GitHub** link should point at its own repo, not your profile.
- The stats strip in `index.html` — swap in real usage numbers when you have them.

## Preview locally

```
python3 -m http.server 8000
```
Then open http://localhost:8000.
