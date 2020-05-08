//constants
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const START_AT = 'START_AT';
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";


//action creator
const addTodoAction = (todo) => ({
    type: ADD_TODO,
    todo,
})
const toggleTodoAction = (id) => ({
    type: TOGGLE_TODO,
    id,
})
const removeTodoAction = (id) => ({
    type: REMOVE_TODO,
    id,
})
const startAtTodoAction = (id) => ({
    type: START_AT,
    id
})
const addGoalAction = (goal) => ({
    type: ADD_GOAL,
    goal,
})
const removeGoalAction = (id) => ({
    type: REMOVE_GOAL,
    id
})