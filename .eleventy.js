module.exports = function(eleventyConfig) {
  // passthrough assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("Fonts");

  return {
    dir: {
      input: ".",               // build from project root
      includes: "_includes",    // layouts & partials
      data: "_data",            // (optional) global data
      output: "_site"           // output folder
    }
  };
};