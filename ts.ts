// Name: iTerm Tab Selector
// Keyword: ts
// Description: Switch to selected iTerm2 tab
// Author: Nate Drake

import "@johnlindquist/kit"

if (!isMac) {
    await div(md('## Sorry.  I only work on Mac at the moment.'))
    exit()
}

let getTabs = `
tell application "iTerm2"
    set names to ""
    repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
            set profName to name of current session of aTab
            set names to names & profName & ","
        end repeat
    end repeat
    get names
end tell
`

let selectTabs = `
tell application "iTerm2"
    set found to false
    repeat with aWindow in windows
        repeat with aTab in tabs of aWindow
            set profName to name of current session of aTab
            if profName = %%NAME%% then
                set found to true
                tell application "iterm2"
                    activate
                end tell
                tell current session of aTab
                    select
                end tell
                tell aTab
                    select
                end tell
                tell aWindow
                    select
                end tell
                exit repeat
            end if
        end repeat
        if found = true then
            exit repeat
        end if
    end repeat
end tell
`

let tabNames = await applescript(getTabs)
const tabs = tabNames.trim().split(',')

let selectedTab = await arg(
    {
        placeholder: 'Pick tab'
    },
    tabs
)

await applescript(selectTabs.replace('%%NAME%%', `"${selectedTab}"`))