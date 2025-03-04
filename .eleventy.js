const { DateTime } = require("luxon");
const fs = require("fs");
const path = require("path");
const sass = require("sass"); // ✅ Dart Sass
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const moment = require("moment");
const en = require("./src/_data/en");
const es = require("./src/_data/es");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const imageProcess = require('./build/image-process');

module.exports = function (eleventyConfig) {
  const langContent = { ...en, ...es };

  // ✅ Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h3", "h4"],
    wrapper: "nav",
    wrapperClass: "toc",
    ul: true,
    flat: false,
  });

  // ✅ Enable deep merge for data files
  eleventyConfig.setDataDeepMerge(true);

  // ✅ Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addNunjucksFilter("date", function (date, format, locale = "en") {
    moment.locale(locale);
    return moment(date).format(format);
  });

  eleventyConfig.addFilter("head", (array, n) => {
    return n < 0 ? array.slice(n) : array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min(...numbers);
  });

  eleventyConfig.addFilter("removeFirstElem", (arr) => {
    return arr.slice(1);
  });

  // ✅ Collections
  eleventyConfig.addCollection("contentForSearch", function (collection) {
    return collection.getFilteredByGlob(["src/en/**/*.md", "src/es/**/*.md"]);
  });

  eleventyConfig.addCollection("posts_en", function (collection) {
    return collection.getFilteredByGlob("src/en/posts/*.md");
  });

  eleventyConfig.addCollection("posts_es", function (collection) {
    return collection.getFilteredByGlob("src/es/posts/*.md");
  });

  eleventyConfig.addCollection("t", function () {
    return langContent;
  });

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      if ("tags" in item.data) {
        let tags = item.data.tags.filter((tag) => !["all", "nav", "post", "posts"].includes(tag));
        tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return [...tagSet];
  });

  // ✅ Copy assets
  eleventyConfig.addPassthroughCopy({
    "vendor/css": "assets/vendor/css",
    "src/assets/css": "assets/css",
    "vendor/fonts": "assets/vendor/fonts",
    "src/assets/images": "assets/images",
    "vendor/js": "assets/vendor/js",
    "node_modules/fuse.js/dist/fuse.min.js": "assets/vendor/js/fuse.min.js",
  });

  // ✅ Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('img', imageProcess);

  // ✅ Sass Processing (Dart Sass)
  eleventyConfig.on("beforeBuild", () => {
    console.log("🚀 Compiling Sass...");
    const outputPath = "./public/assets/vendor/css/style.css";
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const sassResult = sass.renderSync({ file: "./vendor/scss/style.scss" });
    fs.writeFileSync(outputPath, sassResult.css);

    console.log("✅ Sass compiled successfully!");
  });

  // ✅ Markdown Overrides
  let markdownLibrary = markdownIt({ html: true, breaks: true, linkify: true }).use(markdownItAnchor, {
    permalink: false,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    permalinkBefore: true,
  });

  eleventyConfig.setLibrary("md", markdownLibrary);
  eleventyConfig.addPairedShortcode("markdown", (content) => markdownLibrary.render(content));

  // ✅ Transform
  eleventyConfig.addTransform("minify", require("./build/transforms/minify"));

  // ✅ Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.existsSync("public/404.html") ? fs.readFileSync("public/404.html") : "404 Not Found";
        browserSync.addMiddleware("*", (req, res) => {
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "public",
    },
  };
};
