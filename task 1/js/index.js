const addForm = document.querySelector("#addForm")
const table = document.querySelector("#table")
const showSingleTable = document.querySelector("#showSingleTable")
const editForm = document.querySelector("#editForm")
const modalBody = document.querySelector("#modal-body")

const heads = ["name", "age", "status"]
// **************read from storage**************
const readFromStorage = (key) => {
    let data
    try {
        data = JSON.parse(localStorage.getItem(key))
        if (!Array.isArray(data)) throw new Error("It is not an array")
    }
    catch (e) {
        data = []
    }
    return data
}

// **************write to storage**************
const writeDataToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    }
    catch (e) {
        localStorage.setItem(key, "[]")
    }
}

// **************add (create)**************
(function () {
    if (addForm) {
        addForm.addEventListener("submit", function (e) {
            e.preventDefault()

            const user = { id: Date.now() }

            heads.forEach(head => user[head] = addForm.elements[head].value)

            const allUsers = readFromStorage("users")
            allUsers.push(user)

            writeDataToStorage("users", allUsers)

            addForm.reset()
            window.location.href = "index.html"
        })
    }
})();


// **************edit (update)**************
(function () {
    if (editForm) {
        const allUsers = readFromStorage("users")
        const editUserIndex = localStorage.getItem("edit-user")

        const user = allUsers[editUserIndex]

        heads.forEach(head => editForm.elements[head].value = user[head])


        editForm.addEventListener("submit", function (e) {
            e.preventDefault()

            heads.forEach(head => user[head] = editForm.elements[head].value)

            allUsers[editUserIndex] = user

            writeDataToStorage("users", allUsers)

            editForm.reset()
            window.location.href = "index.html"
        })
    }
})();

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

const writeToStorageAndShow = (key, all) => {
    writeDataToStorage(key, all)
    showAll(table, all)
}

const showAll = (table, allUsers) => {
    table.innerHTML = ""

    allUsers.forEach((user, i) => {

        const tr = createElement('tr', table, null, null)

        let td = createElement('td', tr, user.id, null)

        td = createElement('td', tr, user.name, null)

        td = createElement('td', tr, user.age, null)

        td = createElement('td', tr, null, null)

        const status = createElement('select', td, 'edit', 'bg-dark text-light')
        status.setAttribute('id', `status${i}`)
        createElement('option', status, user.status, null)
        createElement('option', status, user.status == 'Active' ? 'Inactive' : 'Active', null)

        td = createElement('td', tr, null, null)

        const showButton = createElement('button', td, 'Show 👁', 'btn btn-primary mx-3')
        showButton.setAttribute("data-toggle", "modal")
        showButton.setAttribute("data-target", "#exampleModal")

        const editButton = createElement('button', td, 'Edit ✎', 'btn btn-success mx-3')

        const deleteButton = createElement('button', td, 'Delete 🗑', 'btn btn-danger mx-3')

        const saveStatusButton = createElement('button', td, 'Save Status 📁', 'btn btn-warning mx-3')

        showButton.addEventListener("click", function (e) {
            // showSingle("show-user", i)
            showSingleModal(user, i)
        })

        saveStatusButton.addEventListener("click", function (e) {
            allUsers[i]['status'] = document.getElementById(`status${i}`).value
            writeToStorageAndShow('users', allUsers)
        })

        editButton.addEventListener("click", function (e) {
            editUser('edit-user', i)
        })

        deleteButton.addEventListener("click", (e) => {
            deleteUser(i, 'users', allUsers)
        })
    })
}

// **************show single (read single)**************
const showSingleModal = (user) => {
    modalBody.innerHTML = ""
    const div = createElement('div', modalBody, null, null)

    for (const prop in user) {
        const str = `${capitalizeFirstLetter(prop)} : ${user[prop]}`

        createElement('span', div, str, null)
        createElement('br', div, str, null)
    }
}

// const showSingle = (key, userId) => {            
//     writeDataToStorage(key, userId)
//     window.location.href = "show-user.html"
// }

const editUser = (key, userId) => {
    writeDataToStorage(key, userId)
    window.location.href = "edit-user.html"
}
// **************delete**************

const deleteUser = (index, key, allData) => {
    allData.splice(index, 1)
    writeToStorageAndShow(key, allData)
}

// **************show all (read all)**************
(function () {
    if (table) {
        const allUsers = readFromStorage("users")
        showAll(table, allUsers)
    }
})()




