
const addTask = document.getElementById("addTask")
const inputField = document.getElementById("inputField")
const TasksList = document.getElementById("TasksList")

const Importance = document.getElementById("Importance")
const Priority = document.getElementById("Priority")

let GlobalTasks = []


function createTaskElement(taskName, priority, date, deleteCallback) {

    let group = document.createElement("div")
    let children = {
        "taskName": document.createElement("p"),

        "isCompleteLabel": document.createElement("label"),
        "isComplete": document.createElement("input"),
        
        "Priority": document.createElement("p"),

        "Date": document.createElement("p"),

        "delete": document.createElement("button"),
    }

    // Assign properties
    children.taskName.textContent = taskName
    children.delete.textContent = "Delete"

    children.isCompleteLabel.htmlFor = "isComplete"
    children.isCompleteLabel.textContent = "Done"
    children.isComplete.id = "isComplete"
    children.isComplete.type = "checkbox"

    children.Priority.textContent = `Priority: ${priority}`
    children.Date.textContent = `Date: ${date}`

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


    return {"group": group, "children": children}

}
function onAddTask() {
    let newTask = new Task(
        GlobalTasks.length + 1,
        Priority.value,
        inputField.value,
        Importance.value,
        false,
        Date()
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
            taskContent,
            priority,
            date,
            this.deleteTask() // Returns an inner function that depends on the "this" argument of the outer function (since "this" will transition from the Task instance to the HTML element)
        )

        let isComplete = this.TaskElement.children.isComplete
        isComplete.addEventListener("click", () => {
            this.isCompleted = !this.isCompleted
            console.log(this.isCompleted)
        })
    }
    deleteTask() {
        let taskObject = this
        return function () {
            TasksList.removeChild(taskObject.TaskElement.group)
        }
    }
}

addTask.addEventListener("click", onAddTask)
