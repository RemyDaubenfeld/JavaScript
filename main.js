function enterKeyPress(event, task, inputEdit) 
{
    if (event.key === 'Enter') 
    {
        event.stopPropagation();
        let newTask = inputEdit.value.trim()
        if (newTask !== '') 
        {
            if (newTask.length > 25) 
            {
                alert("Le texte ne peut pas dépasser 25 caractères.")
                return
            }
            task.querySelector('.task-text').textContent = newTask
            task.removeChild(inputEdit)
            task.addEventListener('click', handleTaskClick)
        }
    }
}

function blur(task, inputEdit) 
{
    let newTask = inputEdit.value.trim()
    if (newTask !== '') 
    {
        if (newTask.length > 25) 
        {
            alert("Le texte ne peut pas dépasser 25 caractères.")
            return
        }
        task.querySelector('.task-text').textContent = newTask
    }
    task.removeChild(inputEdit)
    task.addEventListener('click', handleTaskClick)
}

function editTask(task) 
{   
    let currentText = task.querySelector('.task-text').textContent
    let inputEdit = document.createElement('input')
    inputEdit.type = 'text'
    inputEdit.value = currentText
    //inputEdit.classList.add('edit-input')

    inputEdit.addEventListener('keydown', function(event) 
    {
        enterKeyPress(event, task, inputEdit)
    });

    inputEdit.addEventListener('blur', function(event) 
    {
        blur(task, inputEdit)
    });

    task.insertBefore(inputEdit, task.firstChild)
    inputEdit.focus()
    task.removeEventListener('click', handleTaskClick)
}

function moveTaskUp(task) 
{
    let previousTask = task.previousElementSibling
    if (previousTask && previousTask.tagName !== 'H3') 
    {
        task.parentNode.insertBefore(task, previousTask)
    }
}

function moveTaskDown(task) 
{
    let nextTask = task.nextElementSibling
    if (nextTask && nextTask.tagName !== 'H3') 
    {
        task.parentNode.insertBefore(nextTask, task)
    }
}

function task(event)
{
    if (event.target.classList.contains("delete"))
    {
        // Supprimer la tâche lorsqu'on clique sur l'icône de suppression
        event.target.closest(".task").remove()
    }
    else if (event.target.classList.contains("edit")) 
    {
    // Éditer la tâche lorsqu'on clique sur l'icône d'édition
    editTask(event.target.closest(".task"))
    }
    else if (event.target.classList.contains("up")) 
    {
    // Déplacer la tâche vers le haut lorsqu'on clique sur l'icône de déplacement vers le haut
    moveTaskUp(event.target.closest(".task"))
    }
    else if (event.target.classList.contains("down")) {
    // Déplacer la tâche vers le bas lorsqu'on clique sur l'icône de déplacement vers le bas
    moveTaskDown(event.target.closest(".task"))
    }
}

function addTask()
{   
     //On contrôle si il y a du texte dans l'input
     let newTask = document.querySelector("#task")
     if(!newTask.value)
     {
         newTask.style.background = "orange"
         alert("Veuillez saisir une tâche!")
     }
     else
     {
        // récupération du template
     let taskTemplate = document.querySelector('#task-template')
     // on clone le template
     let taskClone = taskTemplate.content.cloneNode(true)
     
     let taskText = taskClone.querySelector(".task-text")

     taskText.textContent = newTask.value
     document.querySelector("#todo").appendChild(taskClone)
     // vider le input
     newTask.value = ""
     // remettre le fond en blanc
     newTask.style.background = "white"
     }
    
}

// ajouter l'écoute de l'évènement sur mon bouton ou la touche entrer
let myButton = document.querySelector("#add")

myButton.addEventListener('click', function(){
   
    addTask()
    
})
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask()
    }
    
})


// Gestionnaire des évènement de la tâche pour chaque colonne
document.querySelector("#todo").addEventListener('click', function(event) 
{
    task(event)
})

document.querySelector("#in_progress").addEventListener('click', function(event) 
{
    task(event)
})

document.querySelector("#completed").addEventListener('click', function(event) 
{
    task(event)
})



// Gestionnaire des évènements pour déplacer les tâches entre les colonnes

// double-click gauche
document.querySelector("#todo").addEventListener('dblclick', function(event) 
{
    if (event.target.classList.contains("task")) 
    {
        document.querySelector("#in_progress").appendChild(event.target)
    }
});

// double-click gauche
document.querySelector("#in_progress").addEventListener('dblclick', function(event) 
{
    if (event.target.classList.contains("task")) 
    {
        document.querySelector("#completed").appendChild(event.target)
    }
})

let lastRightClickTime = 0

// double-click droit
document.querySelector("#in_progress").addEventListener('contextmenu', function(event) 
{
    event.preventDefault(); // Empêche le menu contextuel par défaut
    let currentTime = new Date().getTime()
    if (currentTime - lastRightClickTime < 300 && event.target.classList.contains("task"))
    {
        document.querySelector("#todo").appendChild(event.target)
    }
    lastRightClickTime = currentTime
})

// double-click droit
document.querySelector("#completed").addEventListener('contextmenu', function(event) 
{
    event.preventDefault(); // Empêche le menu contextuel par défaut
    let currentTime = new Date().getTime()
    if (currentTime - lastRightClickTime < 300 && event.target.classList.contains("task"))
    {
        document.querySelector("#in_progress").appendChild(event.target)
    }
    lastRightClickTime = currentTime
})