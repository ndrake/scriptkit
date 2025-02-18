// Name: Switch Audio
// Description: Switch audio output device (Mac only)
// Author: Nate Drake

// Install SwitchAudioSource with `brew install switchaudio-osx`

import "@johnlindquist/kit"

if (!isMac) {
    await div(md('## Sorry.  I only work on Mac at the moment.'))
    exit()
}

const SwitchAudioSourcePath = '/opt/homebrew/bin/SwitchAudioSource'

const sasExists = await pathExists(SwitchAudioSourcePath)

if (sasExists) {

    const currentOutput = await $`${SwitchAudioSourcePath} -c`
    const items = await $`${SwitchAudioSourcePath} -a -t output`

    const choices = items.stdout.trim().split(/\r?\n/).filter(o => o !== currentOutput.stdout.trim())

    let output = await arg(
        {
            placeholder: 'Pick ouput device'
        },
        choices
    )

    await $`${SwitchAudioSourcePath} -s ${output} -t output`
} else {
    await div(md(`ERROR: Please install SwitchAudioSource`))
}
