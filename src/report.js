import { crawlPage } from "./crawl.js"

function printReport(pages) {
    console.log('\n')
    const dict = sortPages(pages)
    for (const [key, value] of Object.entries(dict)) {
        console.log(`Found ${value} internal links to ${key}`)
    }

}

function sortPages(pages) {
    return Object.keys(pages)
        .sort((a, b) => pages[b] - pages[a])
        .reduce((acc, key) => {
            acc[key] = pages[key]
            return acc
        }, {})
}


export { printReport }