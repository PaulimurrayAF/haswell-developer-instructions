module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("Fonts");

  return {
    dir: {
      input: "content/posts",       // where your markdown lives
      includes: "../_includes", // optional if you want shared layouts
      data: "../_data",         // optional for global data
      output: "_site"         // final site output
    },
    passthroughFileCopy: true
  };
};
