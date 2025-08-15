module.exports = function (eleventyConfig) {
  // NEW — make a no-op 'safe' filter so Liquid doesn't crash
  // Works for Liquid (and universal filters)
  eleventyConfig.addFilter('safe', (value) => value);
  // Extra safety specifically for Liquid engines
  if (eleventyConfig.addLiquidFilter) {
    eleventyConfig.addLiquidFilter('safe', (value) => value);
  }

  // (keep your existing passthroughs/config here)
  // Example:
  // eleventyConfig.addPassthroughCopy("css");
  // eleventyConfig.addPassthroughCopy("js");
  // eleventyConfig.addPassthroughCopy("images");

  return {
    // keep your existing dir settings if you have them
    // dir: { input: ".", includes: "_includes", data: "_data", output: "_site" }
  };
};