const fs = require("fs")

class DealWithJson {
    static readDataFromJSON = (fileName) => {
        let data
        try {
            data = JSON.parse(fs.readFileSync(fileName))
            if (!Array.isArray(data)) throw new Error("data not valid")
            console.log("data featched")
        }
        catch (e) {
            data = []
            console.log("data reseted")
        }
        return data
    }
    static writeDataToJSON = (fileName, data) => {
        try {
            if (!Array.isArray(data)) throw new Error("")
            fs.writeFileSync(fileName, JSON.stringify(data))
            console.log("data inserted")
        }
        catch (e) {
            console.log("invalid data")
        }
    }
}
module.exports = DealWithJson