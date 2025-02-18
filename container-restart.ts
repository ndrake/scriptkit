// Name: Container restart
// Description: Restart selected Docker container
// Author: Nate Drake

import "@johnlindquist/kit"


const containers = await $`docker ps --format "{{.Names}}"`

const namesList = containers.stdout.split('\n').filter(c=>!!c);
// console.log(containers);

let container = await arg(
    {
        placeholder: 'Pick Container to restart'
    },
    namesList
);
console.log('you chose ', container);

await $`docker restart ${container}`