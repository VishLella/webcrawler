import { normalizeURL, getURLsFromHTML } from "./src/crawl.js";

const link = normalizeURL('https://BLOG.boot.dev/path')

const href = getURLsFromHTML(`<html><body><p> Hello!</p><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body</html>`, link)


console.log(href)