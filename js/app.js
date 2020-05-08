//app code

function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}
const store = createStore(app)
store.subscribe(() => {
    console.log("the new state is : ", store.getState());
    const { goals, todos } = store.getState()
    document.getElementById('todos').innerHTML = '';
    document.getElementById('goals').innerHTML = '';
    todos.forEach(addTodoToDom)
    goals.forEach(addGoalToDom)
})


const todoBtn = document.getElementById("todoBtn")
function addTodo() {
    const input = document.getElementById("todo")
    const name = input.value;
    input.value = "";

    todoBtn.disabled = true;
    store.dispatch(addTodoAction({
        id: generateId(),
        name,

        complete: false
    }))
}
function addGoal() {
    const input = document.getElementById("goal")
    const name = input.value;
    input.value = "";

    store.dispatch(addGoalAction({
        id: generateId(),
        name
    }))
}

todoBtn.addEventListener("click", addTodo)

document.getElementById('todo').addEventListener('keydown', () => {
    const value = document.getElementById('todo').value;
    todoBtn.disabled = value.trim() !== '' ? false : true
})
document.getElementById("goalBtn").addEventListener("click", addGoal)
//Dom

function createReomveButton(onClick) {
    const removeBtn = document.createElement("button")
    removeBtn.innerHTML = "X"
    removeBtn.setAttribute("class", "btn btn-danger float-right px-5 py-2")
    removeBtn.addEventListener('click', onClick)

    return removeBtn
}
function createStartAt(start_at) {
    const startSpan = document.createElement("span")
    startSpan.innerHTML = "start at: " + start_at;
    startSpan.style.textDecoration = "none";
    startSpan.setAttribute("class", "text-secondary h6")
    return startSpan;
}
function createStartButton(onClick) {
    const startBtn = document.createElement("button")
    startBtn.innerHTML = "Start"
    startBtn.setAttribute("class", "btn btn-primary m-2")
    startBtn.addEventListener('click', onClick)

    return startBtn
}
function createCompleteBtn(onClick) {
    const completeBtn = document.createElement("button")
    completeBtn.innerHTML = "Toggle"
    completeBtn.setAttribute("class", "btn btn-primary m-2")
    completeBtn.addEventListener('click', onClick)

    return completeBtn
}
function addTodoToDom(todo) {
    const node = document.createElement('li')
    const text = document.createTextNode(todo.name)

    const removeBtn = createReomveButton(() => {
        store.dispatch(removeTodoAction(todo.id))
    })

    const startAt = createStartAt(todo.start_at ? new Date(todo.start_at * 1000) : "On Going")
    const br = document.createElement('br');
    const br2 = document.createElement('br');
    const startBtn = createStartButton(() => {
        store.dispatch(startAtTodoAction(todo.id))
    })
    const completeBtn = createCompleteBtn(() => {
        store.dispatch(toggleTodoAction(todo.id))
    })
    node.appendChild(text)
    node.appendChild(removeBtn)
    const complete = document.createElement("span")
    complete.innerHTML = "<span class='text-success h6'> Completed </span>"
    const incomplete = document.createElement("span")
    incomplete.innerHTML = "<span class='text-secondary h6'> incomplete </span>"
    node.appendChild(todo.complete ? complete : incomplete)
    node.appendChild(br2)
    node.appendChild(startAt)
    node.appendChild(br)
    node.appendChild(startBtn)
    // node.appendChild(br)        
    node.appendChild(completeBtn)
    node.setAttribute('class', "list-group-item text-primary h2")
    document.getElementById('todos').appendChild(node)
}
function addGoalToDom(goal) {
    const node = document.createElement('li')
    const text = document.createTextNode(goal.name)

    const removeBtn = createReomveButton(() => {
        store.dispatch(removeGoalAction(goal.id))
    })

    node.appendChild(text)
    node.appendChild(removeBtn)

    node.setAttribute('class', "list-group-item")
    document.getElementById('goals').appendChild(node)
}
