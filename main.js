import { normalizeURL, getURLsFromHTML } from "./src/crawl.js";

const link = normalizeURL('https://BLOG.boot.dev/path')

const href = getURLsFromHTML(`<html><body><p> Hello!</p>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    <a href="/hello"><span>Go to Boot.dev</span></a>
    <a href="hello"><span>Go to Boot.dev</span></a>
    </body</html>`, `https://blog.boot.dev`)


console.log(href)