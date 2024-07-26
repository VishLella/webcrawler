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
            if (link.href[0] === '/') {
                let tempLink = baseURL + link.href
                try {
                    links.push(new URL(tempLink))
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
    if (normalizeURL(baseURL) !== normalizeURL(currentURL)) {
        return pages
    }
    const currentNorm = normalizeURL(currentURL)
    if (currentNorm in pages) {
        pages[currentNorm]++
    } else {
        pages[currentNorm] = 1
    }
    const html = await parseHTML(currentURL)
    const links = getURLsFromHTML(html, currentURL)
    links.forEach((link) => {
        const tempDict = crawlPage(baseURL, link, pages)
        pages = { ...pages, ...tempDict }
    })

    return pages
}

const parseHTML = async (URL) => {

    let response
    try {
        response = await fetch(URL)
    } catch (err) {
        throw new Error(`Got Network error: ${err.message}`)
    }

    if (!response.ok) {
        console.log(`Invalid code: ${response.status}`)
        return
    }

    if (!response.headers.get('Content-Type').includes('text/html')) {
        //throw Error(`Invalid type: ${response.contentType}`)
        console.log(`Invalid type: ${response.contentType}`)
        return
    }

    // const text = await response.text()
    //console.log(text)
    return response.text()

}

export { normalizeURL, getURLsFromHTML, crawlPage };