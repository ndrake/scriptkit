// Name: Focus IntelliJ
// Description: Focus a specific IntelliJ Code Window
// Author: Nate Drake
// Cache:

import "@johnlindquist/kit"

if (!isMac) {
    await div(md('## Sorry.  I only work on Mac at the moment.'))
    exit()
}

// TODO: Handle errors (like IntelliJ not running)

const getWindowsScript = `
tell application "System Events"
    tell process "IntelliJ IDEA"
        get the title of every window
    end tell
end tell
`;

//console.time('getWindows')
let w = await applescript(getWindowsScript)
//console.timeEnd('getWindows')

//console.time('genOpts')
const windows = w.split(',')
    .map((win) => win.includes('—') ? win?.trim()?.split('—')[1]?.trim() : win?.trim())
    .sort((a, b) => a.trim()?.localeCompare(b.trim()))
    .map((win, idx) => {
        return {
            name: `[${idx + 1}] ${win}`,
            value: win
        };
    });
//console.timeEnd('genOpts')

//console.time('showOpts')
let window = await arg(
    {
        placeholder: 'Pick IntelliJ Window'
    },
    windows
);
//console.timeEnd('showOpts')

const focusWindowScript = `
tell application "System Events" to tell process "IntelliJ IDEA"
    set frontmost to true
    windows where title contains "${window}"
    if result is not {} then perform action "AXRaise" of item 1 of result
end tell
`;

await applescript(focusWindowScript)
