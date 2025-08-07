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
      input: ".",              // root of your project
      includes: "_includes",   // layout & includes folder
      data: "_data",           // global data
      output: "_site"          // build output
    },
    passthroughFileCopy: true
  };
};