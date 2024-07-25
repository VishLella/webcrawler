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
        expect(normalizeURL(link)).toEqual('blog.boot.dev/path')
    })

})

test('Checks if all anchor elements are found and all relative urls -> absolute urls', () => {
    const html = (`<html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="/test"><span>Go to Boot.dev</span></a>
            <a href="/hello"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <p>
                <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            </p>
        </body>
        </html>`)

    const links = [
        new URL('https://blog.boot.dev/'),
        new URL('https://blog.boot.dev/test'),
        new URL('https://blog.boot.dev/hello'),
        new URL('https://blog.boot.dev/'),
        new URL('https://blog.boot.dev/')
    ]

    expect(getURLsFromHTML(html, 'https://blog.boot.dev')).toStrictEqual(links)
})