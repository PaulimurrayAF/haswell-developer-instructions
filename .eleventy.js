module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("Fonts");

  // Define blog post collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/posts/*.md");
  });

  return {
    dir: {
      input: ".",              // ← use project root
      includes: "_includes",   // for layout files like base.njk
      data: "_data",           // optional global data
      output: "_site"
    },
    passthroughFileCopy: true
  };