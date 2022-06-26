const api = require('./controller/api')

const yargs = require('yargs')

yargs.command({
    command: 'api',
    builder: {
        url: {
            type: String,
            demandOption: true
        }
    },
    handler: function (argv) {
        api.getDataFromApi(argv.url)
    }
})
yargs.argv