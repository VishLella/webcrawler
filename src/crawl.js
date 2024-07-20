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

export { normalizeURL };