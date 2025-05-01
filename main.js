
const addTask = document.getElementById("addTask")
const inputField = document.getElementById("inputField")
const TasksList = document.getElementById("taskmanager")

const Importance = document.getElementById("Importance")
const Priority = document.getElementById("Priority")

let GlobalTasks = []

// Print Objects to the DOM when the Task Manager is updated
function onUpdateTaskList() {
    let PseudoGlobal = []
    for (task of GlobalTasks) {
        PseudoGlobal.push({
            "id": task.id,
            "name": task.name,
            "isImportant": task.isImportant,
            "isCompleted": task.isCompleted,
            "date": task.date
        })
    }
    console.log(JSON.stringify(PseudoGlobal));
}


// Instances a new task HTML element (not the object) to add to the task manager
function createTaskElement(taskName, priority, today, deleteCallback) {

    // Create the individual HTML elements that compose the Task's div
    let group = document.createElement("div")
    group.className = "TASK"
    let children = {
        "taskName": document.createElement("p"),

        "isCompleteLabel": document.createElement("label"),
        "isComplete": document.createElement("input"),
        
        "Priority": document.createElement("p"),

        "Date": document.createElement("p"),

        "delete": document.createElement("button"),
    }

    // Assign properties for the HTML elements
    children.taskName.textContent = taskName
    children.taskName.className = "TASK-NAME"

    children.delete.textContent = "Delete"

    children.isCompleteLabel.htmlFor = "isComplete"
    children.isCompleteLabel.textContent = "Done?"
    children.isComplete.id = "isComplete"
    children.isComplete.type = "checkbox"

    children.Priority.textContent = `Priority: ${priority}`

    children.Date.textContent = `Date: ${today}`

    // Add priority-based styling
    if (priority == "High") {
        group.classList.add("TASK-HIGH")
    } else if (priority == "Medium") {
        group.classList.add("TASK-MEDIUM")
    }

    // Assign delete event
    children.delete.addEventListener("click", () => {
        deleteCallback()
        onUpdateTaskList()
    })

    // Add children into the div
    for (child in children) {
        group.appendChild(children[child])
    }

    // Parent the div into the HTML task list div
    TasksList.appendChild(group)

    return {"group": group, "children": children}

}

// Executes when the user adds a new task
function onAddTask() {

    // Format the date
    let today = new Date();
    today = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    // Instance a new Task
    let newTask = new Task(
        GlobalTasks.length + 1,
        Priority.value,
        inputField.value,
        Importance.checked,
        false,
        today
    )

    GlobalTasks.push(newTask)
    onUpdateTaskList()
}

class Task {
    constructor(id, priority, taskContent, isImportant, isCompleted, date) {
        this.id = id
        this.priority = priority
        this.name = taskContent
        this.isImportant = isImportant
        this.isCompleted = isCompleted 
        this.date = date
        this.TaskElement = createTaskElement( // Create the Task's HTML element / frontend
            taskContent,
            priority,
            date,
            this.deleteTask() // Returns an inner function that depends on the "this" argument of the outer function (since "this" will transition from the Task instance to the HTML element)
        )

        if (this.isImportant) {
            this.TaskElement.group.classList.toggle('highlight');
        }

        let isComplete = this.TaskElement.children.isComplete
        isComplete.addEventListener("click", () => {
            this.TaskElement.group.classList.toggle('strikethrough');
            this.isCompleted = !this.isCompleted
            onUpdateTaskList()
        })
    }

    // Deletes a task from the manager
    deleteTask() {
        // Removes the task by creating a new list and adding every element to it except the index we want to get rid.
        let taskObject = this
        return function () {
            TasksList.removeChild(taskObject.TaskElement.group)
            let index = GlobalTasks.findIndex((element) => {
                return element == taskObject
            })

            if (!(index == -1)) {
                let Tasks = []
                for (let taskIndex in GlobalTasks) {
                    if (taskIndex == index) {
                        continue
                    }
                    Tasks.push(GlobalTasks[taskIndex])
                }
                GlobalTasks = Tasks
            }
        }
    }
} 

addTask.addEventListener("click", onAddTask)
