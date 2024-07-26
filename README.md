

# WebCrawler

This project is a javascript CLI WebCrawler built on the node runtime. The program makes HTTP requests and parses HTML to generate reports that can be easily marshaled to standard output or a file. Input a URL to recieve all related links associated with the provided domain. This project was built with **TDD** (Test-Driven Development) by using the [Jest](https://jestjs.io/) framework

## Table of Contents

- [Features](#features)
- [Directory Structure](#directory-structure)
- [Setup and Usage](#setup)

## Features
- **HTTP Requests**: Uses HTTP requests to fetch HTML data from multiple links.
- **HTML Parsing**: Parses HTML data to recieve all hrefs from a webpage.
- **Recursive Web Crawling**: Recursively crawls links from every webpage to thoroughly crawl a domain.

## Directory Structure

```
Project Root
├── src                        # Source files for the project
│   ├── crawl.js               # Contains the main logic of the program
├── test                       # Directory with test cases
│   ├── crawl.test.js
├── .gitignore 
├── .nvmrc                     # Config file if you're using nvm (Not Needed as long as you run latest node)
├── main.js                    # Main script
├── package-lock.json
├── package.json               # node config file 
└── README.md                  # README file
```

## Setup and Usage
- Make sure to have node 21.2.0+ installed
- Clone Repository
- cd into project directory
- Run testing script to make sure project is working smoothly
- Run main script to execute the program 
```
git clone <>
cd webcrawler
nvm use 
node -v
npm test
npm start ${link}
```
