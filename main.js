//import { normalizeURL, getURLsFromHTML, crawlPage } from "./src/crawl.js";
import { argv, exit } from 'process'

// const link = normalizeURL('https://BLOG.boot.dev/path')

// const href = getURLsFromHTML(`<html><body><p> Hello!</p>
//     <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
//     <a href="/hello"><span>Go to Boot.dev</span></a>
//     <a href="hello"><span>Go to Boot.dev</span></a>
//     </body</html>`, `https://blog.boot.dev`)


// console.log(href)
import { normalizeURL, getURLsFromHTML, crawlPage } from "./src/crawl.js";
import { link } from 'fs';

async function main() {
    const args = process.argv.length
    if (args < 3) {
        console.log('Need a base url')
        process.exit(1)
    } else if (args > 3) {
        console.log('Only one base url argument allowed')
        process.exit(1)
    }
    const baseUrl = process.argv[2]
    console.log(`Base Url: ${baseUrl}`)
    console.log('Starting crawl...\n')

    const result = await crawlPage(baseUrl, baseUrl, {})
    console.log(result)
    //     //console.log(result)
    //     const links = getURLsFromHTML(result, baseUrl)
    //     links.forEach((link) => {
    //         console.log(link.href)
    //     })
}

main()