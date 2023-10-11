const output = document.querySelector('.output')
const form = document.querySelector('form')
const input = document.querySelector('input')
const clearAllTodos = document.querySelector('.clear')


clearAllTodos.textContent = 'delete all'

const doneTodos = []

let todos = []


const createTask = () => {
    if (input.value === '') {
        alert('Название не может быть пустым')
    } else {
        const task = {
            id: new Date().toISOString(),
            message: input.value,
            status: false,
            date: new Date()
        }
        
        todos = [task, ...todos]
        // todos.unshift(task)
        renderTodos()
        input.value = ''
    }

}


const clearAll = (array) => {
    newArray = [...array]
    newArray.splice(0, array.lenght)
    todos = newArray
    renderTodos()
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    createTask()

    console.log(todos);
})

form.addEventListener('button', (e) => {
    e.preventDefault()
    clearAll(todos)
})



const renderTodos = () => {
    output.innerHTML = ''
    todos.forEach((el) => {
        const block = document.createElement('div')
        const message = document.createElement('p')
        const edit = document.createElement('button')
        const deleteTodo = document.createElement('button')
        const taskStatus = document.createElement('button')
        // const checkbox = document.createElement('input')
        const btnGroup = document.createElement('div')
        const todoStatus = document.createElement('p')
        const todoDate = document.createElement('p')
        const indexTodo = document.createElement('p')
        const countOfDoneTodos = document.createElement('p')

        message.textContent = el.message

        todoDate.textContent = newData(el.date)

        edit.textContent = 'edit'
        deleteTodo.textContent = 'delete'
        taskStatus.textContent = 'complete'

        indexTodo.textContent = todos.indexOf(el)


        if (el.status) {
            if(doneTodos.includes(el)) {
                doneTodos.length = todos.length
            }
            doneTodos.push({...el})
            countOfDoneTodos.textContent = `${doneTodos.length} / ${todos.length}`
            console.log(doneTodos)
        } else {
            countOfDoneTodos.textContent = `0 / ${todos.length}`
        }
  

        // checkbox.type = "checkbox"

        message.className = 'message'
        btnGroup.className = 'btnGroup'
        edit.className = 'button'
        deleteTodo.className = 'button'
        taskStatus.className = 'button'
        todoStatus.className = 'todoStatus'

        block.style.background = el.status ? 'bisque' : 'skyblue'
        todoStatus.textContent = el.status ? 'todo is completed' : 'todo is not completed'
        message.style.textDecoration = el.status ? 'line-through' : 'underline'
        


        if (el.status) {
            edit.setAttribute('disabled', '');
        }

        edit.addEventListener('click', () => {
            editTodo(el.id)
        })

        deleteTodo.addEventListener('click', () => {
            deleteTodos(el.id)
        })

        taskStatus.addEventListener('click', () => {
            statusChange(el.id)
        })

        output.append(block)
        btnGroup.append(edit, deleteTodo, taskStatus)
        block.append(countOfDoneTodos, indexTodo, todoStatus, message, todoDate, btnGroup)
    })

}



const editTodo = (id) => {
    const editedMessage = prompt('edit message')
    if (editedMessage === null || editedMessage === '') {
        alert('Вы должны что-то ввести')
    }
    else {
        const newTodos = todos.map(item => {
            if (id === item.id) {
                return { ...item, message: editedMessage }
            }
            return item
        })
        console.log(newTodos)
        todos = newTodos
        renderTodos()
        // console.log(todos)
    }
}


const deleteTodos = (id) => {
    const updatedTodos = todos.filter ((item) => {
        if (id !== item.id) {
            return item
        }
    })
    todos = updatedTodos
    renderTodos()
    console.log(todos)
}


const statusChange = (id) => {
    todos = todos.map(item => {
        if (id === item.id) {
            return { ...item, status: !item.status }
        }
        return item
    })
    // todos = newTodos
    console.log(todos)
    renderTodos()
}

// console.log(todos)

const newData = (data) => {
    const day = data.getDate()
    const month = data.getMonth() + 1
    const year = data.getFullYear()
    const hours = data.getHours()
    const minutes = data.getMinutes()

    const generateZeroToDate = (time) => {
        return time < 10 ? '0' + time : time
    }

    const newHours = generateZeroToDate(hours)
    const newMinutes = generateZeroToDate(minutes)
    const newMonth = generateZeroToDate(month)
    const newDays = generateZeroToDate(day)

    return `Date: ${newDays}-${newMonth}-${year} ${newHours}:${newMinutes}`
}


