const table = document.querySelector("#table")
const modalBody = document.querySelector("#modal-body")


const apiData = (callback) => {
    const data = fetch('https://jsonplaceholder.typicode.com/users')
    data.then((result) => (result.json())
        .then((result) => callback(result))
        .catch((error) => callback(error))
    )
        .catch((error) => console.log(error))
}

const createElement = (element, parent, textContent, classList) => {
    const createdElement = document.createElement(element)
    parent.append(createdElement)
    if (textContent) createdElement.textContent = textContent
    if (classList) createdElement.classList = classList

    return createdElement
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const showAll = (table, allUsers) => {
    table.innerHTML = ""

    allUsers.forEach((user, i) => {

        const tr = createElement('tr', table, null, null)

        let td = createElement('td', tr, user.id, null)

        td = createElement('td', tr, user.name, null)

        td = createElement('td', tr, user.username, null)

        td = createElement('td', tr, user.email, null)

        td = createElement('td', tr, null, null)

        const showButton = createElement('button', td, 'Show 👁', 'btn btn-primary mx-3')
        showButton.setAttribute("data-toggle", "modal")
        showButton.setAttribute("data-target", "#exampleModal")

        showButton.addEventListener("click", function (e) {
            showSingleModal(user, i)
        })
    })
}

const combineObject = (object) => {
    let str = ""
    
    for (const prop in object) {
        if (typeof object[prop] != "object")
            str += object[prop] + ", "
    }

    return str.slice(0,-2)
}

const showSingleModal = (user) => {
    modalBody.innerHTML = ""
    const div = createElement('div', modalBody, null, null)
    for (const prop in user) {
        if (typeof user[prop] == "object")
            user[prop] = combineObject(user[prop])

        const str = `${capitalizeFirstLetter(prop)} : ${user[prop]}`

        createElement('span', div, str, null)
        createElement('br', div, str, null)

    }
}

(function () {
    if (table) {
        apiData((result) => {
            showAll(table, result)
        })
    }
})()




