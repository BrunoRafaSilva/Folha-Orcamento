$(function () {
    $('#preco').mask('000.000.000.000.000,00', { reverse: true });
})

// Trecho do código referente ao LocalStorage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_orcamentos')) ?? []

const setLocalStorage = (dbBudget) => localStorage.setItem("db_orcamentos", JSON.stringify(dbBudget))

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
    document.getElementById('produto').dataset.index = 'new'
}

const saveBudget = () => {
    
    if (isValidFields()) {
        const budgetnew = {
            produto: document.getElementById('produto').value,
            quantidade: document.getElementById('quantidade').value,
            preco: document.getElementById('preco').value
        }
        const index = document.getElementById('produto').dataset.index
        if (index == 'new') {
            createBudget(budgetnew)
            updateTable()
        } else {
            updateBudget(index, budgetnew)
            updateTable()
        }
    }
}

const createRow = (budgetnew, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
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
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbBudget = readBudget()
    clearTable()
    dbBudget.forEach(createRow)
}

const fillFields = (budgetnew) => {
    document.getElementById('produto').value = budgetnew.nome
    document.getElementById('quantidade').value = budgetnew.quantidade
    document.getElementById('preco').value = budgetnew.preco
}

const editBudget = (index) => {
    const budgetnew = readBudget()[index]
    budgetnew.index = index
    fillFields(budgetnew)
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editBudget(index)
        } else {
            const budgetnew = readBudget()[index]
            let avisoDelete = document.querySelector('#avisoDelete')

            avisoDelete.textContent = `Deseja realmente excluir o produto ${budgetnew.produto}`

            //apagar
            document.getElementById('apagar').addEventListener('click', () => {
                deletBudget(index)
                updateTable()
            })
        }
    }
}

updateTable()


document.getElementById('salvar').addEventListener('click', saveBudget)