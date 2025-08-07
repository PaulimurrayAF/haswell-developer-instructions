const postsContainer = document.getElementById('posts-container');

// Load the index of posts (optional: you can hardcode paths if no index exists)
async function fetchPostsList() {
  const posts = [
    // Manually list your blog post markdown files here:
    'content/posts/first-post.md',
    'content/posts/second-post.md',
    // Add more as needed
  ];
  return posts;
}

// Convert Markdown to HTML
async function convertMarkdownToHTML(mdText) {
  const converter = new showdown.Converter();
  return converter.makeHtml(mdText);
}

// Fetch and render each post
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

renderPosts();
