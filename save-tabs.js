// Name: Save Tabs
// Description: Generate Markdown list of open Tab URLs and save as a new note in Obsidian
// Author: Nate Drake

import "@johnlindquist/kit"

// TODO: Properly escape special characters so this works all the time

const dayjs = await npm("dayjs");

const vaultName = 'work';

const currDate = dayjs().format('YYYYMMDDTHHmmss')
const noteName = `Chrome Tabs - ${currDate}`
let tabs = await getTabs()

let tabsMd = tabs
  .map(tab => `* [${tab.title || tab.url}](${tab.url})`)
  .join("\n")

let notes = await editor(tabsMd)


await exec(`open 'obsidian://new?vault=${vaultName}&name=${encodeURIComponent(noteName)}&content=${encodeURIComponent(notes)}'`)