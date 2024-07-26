import { JSDOM } from 'jsdom'
const normalizeURL = (url) => {

    const link = new URL(url)
    if (!link.protocol) {
        throw Error(`url requires a protocol: ${link}`)
    }
    let normalized = link.hostname + link.pathname
    if (normalized.charAt(normalized.length - 1) === '/') {
        normalized = normalized.substring(0, normalized.length - 1)
    }
    return normalized

}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody, {
        contentType: "text/html"
    })
    const hrefs = dom.window.document.querySelectorAll('a')
    const links = []
    hrefs.forEach((link) => {
        if (link.hasAttribute('href')) {
            if (link.href[0] === '/' && link.href.length > 1) {
                let tempLink = baseURL + link.href
                try {
                    links.push(new URL(tempLink))
                } catch (err) {
                    //throw new Error(`Invalid href: ${err}`)
                    console.log(`Invalid href: ${link.href}`)
                }
            } else if (link.href[0] === '/') { //go back to root
                try {
                    links.push(new URL(baseURL))
                } catch (err) {
                    //throw new Error(`Invalid href: ${err}`)
                    console.log(`Invalid href: ${link.href}`)
                }
            } else {
                try {
                    links.push(new URL(link.href))
                } catch (err) {
                    //throw Error(`Invalid href: ${err}`)
                    console.log(`Invalid href: ${link.href}`)
                }
            }
        }
    })
    return links
}

async function crawlPage(baseURL, currentURL, pages) {
    const base = new URL(baseURL)
    const cur = new URL(currentURL)
    if (base.hostname !== cur.hostname) {
        return pages
    }
    const currentNorm = normalizeURL(currentURL)
    //console.log(currentNorm)
    if (currentNorm in pages) {
        pages[currentNorm]++
        return pages
    } else {
        pages[currentNorm] = 1
    }

    console.log(`Crawling ${currentURL}`)
    let html = ''
    try {
        html = await parseHTML(currentURL)
    } catch (err) {
        console.log(`${err.message}`)
    }
    const links = getURLsFromHTML(html, baseURL)
    for (const link of links) {
        pages = await crawlPage(baseURL, link, pages)
    }
    // links.forEach((link) => {
    //     pages = await crawlPage(baseURL, link, pages)
    //     //const tempDict = crawlPage(baseURL, link, pages)
    //     //pages = mergeDicts(pages, tempDict)
    //     //pages = { ...pages, ...tempDict }
    // })

    return pages
}

const parseHTML = async (URL) => {

    let response
    try {
        response = await fetch(URL)
    } catch (err) {
        throw new Error(`Got Network error: ${err.message}`)
        //console.log(`Got Network error: ${err.message}`)
        //return
    }

    if (!response.ok) {
        throw new Error(`Invalid code: ${response.status}`)
        //console.log(`Invalid code: ${response.status}`)
        //return
    }

    if (!response.headers.get('Content-Type').includes('text/html')) {
        throw Error(`Invalid type: ${response.contentType}`)
        //console.log(`Invalid type: ${response.contentType}`)
        //return
    }

    // const text = await response.text()
    //console.log(text)
    return response.text()

}

function mergeDicts(dict1, dict2) {
    const finalDict = {}
    for (const [key, value] of Object.entries(dict1)) {
        if (key in finalDict) {
            finalDict[key] = value
        } else {
            finalDict[key] += value
        }
    }
    for (const [key, value] of Object.entries(dict2)) {
        if (key in finalDict) {
            finalDict[key] = value
        } else {
            finalDict[key] += value
        }
    }
    return finalDict
}

export { normalizeURL, getURLsFromHTML, crawlPage };