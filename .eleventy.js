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
const crypto = require("crypto");

function getJpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return undefined;
  }

  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (
      marker === 0xc0 ||
      marker === 0xc1 ||
      marker === 0xc2 ||
      marker === 0xc3 ||
      marker === 0xc5 ||
      marker === 0xc6 ||
      marker === 0xc7 ||
      marker === 0xc9 ||
      marker === 0xca ||
      marker === 0xcb ||
      marker === 0xcd ||
      marker === 0xce ||
      marker === 0xcf
    ) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
        type: "image/jpeg",
      };
    }

    offset += 2 + length;
  }

  return undefined;
}

function getPngDimensions(buffer) {
  const isPng =
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47;

  if (!isPng) {
    return undefined;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    type: "image/png",
  };
}

function getSocialImageMetadata(imagePath) {
  if (!imagePath || /^https?:\/\//i.test(imagePath)) {
    return undefined;
  }

  const localPath = path.join(__dirname, "src", imagePath.replace(/^\//, ""));
  if (!fs.existsSync(localPath)) {
    return undefined;
  }

  const buffer = fs.readFileSync(localPath);
  return getJpegDimensions(buffer) || getPngDimensions(buffer);
}

module.exports = function (eleventyConfig) {
  const langContent = { ...en, ...es };

  // ✅ Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    // Use real newlines between lines (default is "<br>"). Required for the
    // addCodeLineSpans transform below to split lines correctly.
    lineSeparator: "\n",
  });
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

    // Ensure arr is an array and has at least one element
    if (!Array.isArray(arr) || arr.length === 0) {
        return arr; // Return the original value if it's null, undefined, or not an array
    }

    return arr.slice(1);
  });

  eleventyConfig.addFilter("byLocale", (collection = [], localeCode) => {
    if (!localeCode) {
      return collection;
    }

    return (collection || []).filter((item) => item?.data?.locale === localeCode);
  });

  eleventyConfig.addFilter("socialImageMetadata", getSocialImageMetadata);

  // ✅ File Hashing Filter
  eleventyConfig.addFilter("hash", function (filepath) {
    const fullPath = path.join(__dirname, "public", filepath);

    if (fs.existsSync(fullPath)) {
      const fileContent = fs.readFileSync(fullPath);
      const hash = crypto.createHash("md5").update(fileContent).digest("hex").slice(0, 10);
      return `${filepath}?v=${hash}`;
    }

    return filepath;
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
    "src/assets/css": "assets/css",
    "src/assets/images": "assets/images",
    "src/assets/js/app.js": "assets/js/app.js",
    "src/assets/js/contact.js": "assets/js/contact.js",
    "src/assets/js/tiny-agent.js": "assets/js/tiny-agent.js",
    "src/.htaccess": ".htaccess",
    //vendor
    "vendor/css/bootstrap.min.css": "assets/vendor/css/bootstrap.min.css",
    "vendor/css/materialdesignicons.min.css": "assets/vendor/css/materialdesignicons.min.css",
    "vendor/css/prism-base16-monokai.dark.css": "assets/vendor/css/prism-base16-monokai.dark.css",
    "vendor/fonts": "assets/vendor/fonts",
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

  // Attach Bootstrap's `.blockquote` class to every markdown blockquote so it
  // picks up the site's styling instead of rendering as a bare element.
  markdownLibrary.renderer.rules.blockquote_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrJoin("class", "blockquote");
    return self.renderToken(tokens, idx, options);
  };

  // Open external links in a new tab with safe rel attributes. Internal
  // links (relative paths) are left alone.
  const defaultLinkOpen = markdownLibrary.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };
  markdownLibrary.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex("href");
    if (hrefIndex >= 0) {
      const href = token.attrs[hrefIndex][1];
      if (/^https?:\/\//i.test(href)) {
        token.attrSet("target", "_blank");
        token.attrSet("rel", "noopener noreferrer");
      }
    }
    return defaultLinkOpen(tokens, idx, options, env, self);
  };

  eleventyConfig.setLibrary("md", markdownLibrary);
  eleventyConfig.addPairedShortcode("markdown", (content) => markdownLibrary.render(content));

  // Add per-line spans to syntax-highlighted code blocks so CSS counters
  // can render line numbers without shipping a client-side Prism plugin.
  // Handles prettier's multi-line <pre> tag formatting.
  eleventyConfig.addTransform("addCodeLineSpans", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    return content.replace(
      /(<pre[^>]*?class="language-[^"]+"[^>]*?>)([\s\S]*?)(<\/pre>)/g,
      (match, preOpen, body, preClose) => {
        const codeMatch = body.match(/^(\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*)$/);
        if (!codeMatch) return match;
        const [, codeOpen, codeContent, codeClose] = codeMatch;

        const lines = codeContent.split("\n");
        if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();
        const numbered = lines
          .map((line) => `<span class="ln-line">${line || " "}</span>`)
          .join("");

        const finalPreOpen = preOpen.replace(
          /class="(language-[^"]+)"/,
          'class="$1 ln-numbered"'
        );

        return `${finalPreOpen}${codeOpen}${numbered}${codeClose}${preClose}`;
      }
    );
  });

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
