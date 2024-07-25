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
    })
    return links
}

export { normalizeURL, getURLsFromHTML };