
const addTask = document.getElementById("addTask")
const inputField = document.getElementById("inputField")
const TasksList = document.getElementById("TasksList")

let GlobalTasks = [

]


function createTaskElement(taskName, deleteCallback) {

    let group = document.createElement("div")
    let children = {
        "taskName": document.createElement("p"),
        "delete": document.createElement("button"),

    }

    // Assign properties
    children.taskName.textContent = taskName
    children.delete.textContent = "Delete"

    // Assign delete event
    children.delete.addEventListener("click", () => {
        deleteCallback()
    })

    // Add children into the div
    for (child in children) {
        group.appendChild(children[child])
    }

    // Parent the div into the HTML task list div
    TasksList.appendChild(group)


    return group

}
function onAddTask() {
    console.log('wassup bruh')

    console.log(inputField.value)
    let newTask = new Task(
        GlobalTasks.length + 1,
        "High",
        inputField.value,
        false,
        false,
        Date.now()
    )

    GlobalTasks.push(newTask)
    console.log(GlobalTasks)
}


class Task {
    constructor(id, priority, taskContent, isImportant, isCompleted, date) {
        this.id = id
        this.priority = priority
        this.task = taskContent
        this.isImportant = isImportant
        this.isCompleted = isCompleted 
        this.date = date
        this.TaskElement = createTaskElement(
            this.task, 
            this.deleteTask() // Returns an inner function that depends on the "this" argument of the outer function (since "this" will transition from the Task instance to the HTML element)
        )

        console.log(this.TaskElement)
    }

    deleteTask() {
        let taskObject = this 
        return function () {
            console.log(`delete ${taskObject.task}`)
        }
    }
}

addTask.addEventListener("click", onAddTask)