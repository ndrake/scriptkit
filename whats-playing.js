// Name: What's Playing
// Description: Display currently playing track from Music.app
// Author: Nate Drake

import "@johnlindquist/kit"

if (!isMac) {
    await div(md('## Sorry.  I only work on Mac at the moment.'))
    exit()
}

const pauseScript = `
tell application "Music"
	get {name, artist, album} of current track
end tell
`;

// TODO: Error handling
//let { stdout } = await $`osascript <<<${pauseScript}`
let asOut = await applescript(pauseScript)
const trackInfo = asOut.trim().split(',')

const info = 
`**Title:** ${trackInfo[0]}

**Artist:** ${trackInfo[1]}

**Album:** ${trackInfo[2]}`

await div(md(info))