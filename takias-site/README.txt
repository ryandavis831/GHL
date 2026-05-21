Takia's Cleaning Services — Website Files
==========================================

This is a fully static website (HTML/CSS/JS, no build step) that can be
uploaded directly to GoHighLevel, Netlify, Vercel, GitHub Pages, or any
standard web host.

FOLDER STRUCTURE
----------------
  index.html            Main page (single-page site, all sections)
  /css/style.css        All styles
  /js/main.js           Sliders, gallery, lightbox, form, nav
  /images/              Logo, owner photo, gallery images
  /before-after/        Six before/after image pairs
  /assets/              Reference graphics

HOW TO PUBLISH
--------------
1) GoHighLevel — Upload all files preserving folder structure
   under the site root. index.html should be at the root.
2) Standard hosting — Upload everything in this folder to your
   web root (public_html, www, etc.) preserving subfolders.
3) Local preview — Open index.html in a browser, or run
   `python3 -m http.server` from this folder.

CUSTOMIZATION
-------------
• Phone, email, address — search/replace in index.html
• Colors — edit the CSS variables in css/style.css :root block
• Hooking the form to a backend — see js/main.js form handler;
  point the submit handler at your GHL webhook or form endpoint.

CREDITS
-------
Site built for Takia's Cleaning Services — Clean Spaces. Peace of Mind.
