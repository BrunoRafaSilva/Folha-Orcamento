$(function () {
    $('#price').mask('000.000.000.000.000,00', { reverse: true });
})

// Trecho do código referente ao LocalStorage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_orcamentos')) ?? []

const setLocalStorage = () => JSON.parse(localStorage.setItem('db_orcamentos', JSON.stringify(db_orcamentos)))

// Trecho referente ao CRUD - Create Read Update Delete
const deletBudget = (index) => {
    const dbBudget = readBudget()
    dbBudget.splice(index, 1)
    setLocalStorage(dbBudget)
}

const updateBudget = (index, budget) => {
    const dbBudget = readBudget()
    dbBudget[index] = budget
    setLocalStorage(dbBudget)
}

const readBudget = () => getLocalStorage()

const createBudget = (budget) => {
    const dbBudget = getLocalStorage()
    dbBudget.push(budget)
    setLocalStorage(dbBudget)
}

const isValidFields = () => {
    return document.getElementById('formulario').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementsById('formControl').dataset.index = 'new'
}

const saveBudget = () => {
    debugger
    if ((isValidFields)) {
        const budget = {
            produto: document.getElementById('produto').value,
            quantidade: document.getElementById('quantidade').value,
            preco: document.getElementById('preco').value
        }
        const index = document.getElementById('produto').dataset.index
        if (index == 'new') {
            createBudget(budget)
            updateBudget()
        } else {
            updateBudget(index, client)
            updateBudget()
        }
    }
}

const createRow = (budgetnew, index) => {
    newRow.innetHTML = `
    <td>${budgetnew.produto}</td>
    <td>${budgetnew.quantidade}</td>
    <td>${budgetnew.preco}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}" >Excluir</button>
    </td>
    `
    document.querySelector('#tableBudget>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableBudget>tbody tr')
    rows.forEacg(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbBudget = readBudget()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('produto').value = budgetnew.nome
    document.getElementById('quantidade').value = budgetnew.quantidade
    document.getElementById('preco').value = budgetnew.preco
}