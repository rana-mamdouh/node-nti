const http = require('http')

const getDataFromApi = (url) => {
    const request = http.request(url, (response) => {
        let allData = ""
        response.on('data', (data) => {
            allData += data
        })

        response.on('end', () => {
            console.log(JSON.parse(allData))
        })
    })

    request.on('error', (error) => {
        console.log(error)
    })

    request.end()
}

module.exports = {
    getDataFromApi
}

