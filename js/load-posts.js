const postsContainer = document.getElementById('posts-container');

// Load the list of posts
async function fetchPostsList() {
  const posts = [
  'content/posts/building-the-future-with-vision-and-integrity.md',
  'content/posts/legacy-in-progress.md',
  'content/posts/pauli-murray-was-always-there—we-just-weren’t-looking.md',
  'content/posts/feast-day-of-rev-dr-pauli-murray-esq-honoring-the-saint-who-defied-every-box.md'
  ];
  return posts;
}

// Convert Markdown to HTML
async function convertMarkdownToHTML(mdText) {
  const converter = new showdown.Converter();
  return converter.makeHtml(mdText);
}

// Render each post
async function renderPosts() {
  const postPaths = await fetchPostsList();

  for (let path of postPaths) {
    const res = await fetch(path);
    const markdown = await res.text();
    const html = await convertMarkdownToHTML(markdown);

    const postDiv = document.createElement('div');
    postDiv.classList.add('col-md-6', 'mb-30');
    postDiv.innerHTML = `
      <div class="blog-post">
        ${html}
      </div>
    `;

    postsContainer.appendChild(postDiv);
  }
}

// Expose the function expected by your HTML
function loadFeaturedPosts() {
  renderPosts();
}
window.loadFeaturedPosts = loadFeaturedPosts;
