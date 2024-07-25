import { test, expect } from "@jest/globals"
import { normalizeURL, getURLsFromHTML } from "../src/crawl.js"

test('Checks if URLs are properly normalized', () => {

    const links = [
        'https://blog.boot.dev/path/',
        'https://blog.boot.dev/path',
        'http://blog.boot.dev/path/',
        'http://BLOG.boot.dev/path'
    ]
    links.forEach((link) => {
        expect(normalizeURL(link)).toBe('blog.boot.dev/path')
    })

})

test('Checks if relative urls are converted into absolute URLs', () => {

})

test('Checks if all anchor elements are found in a body of html', () => {

})