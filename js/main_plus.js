let date = new Date();
let day = date.toString().split(' ')[2]
let month = date.toString().split(' ')[1]
let year = date.toString().split(' ')[3]
let time = date.toString().split(' ')[4]
let currDate = `${day}/${month}/${year}`

/* ******************* Start Loading ****************** */
$(document).ready(function(){
    $('.my-logo').fadeOut(2500, () => {
        $('.my-logo').parent().fadeOut(3500 , () => {
            $('.loading').remove();
            $('body').css("overflow-y" , "auto");
        })
    });
})
/* ******************* End Loading ****************** */
/****************************** Start ToDoList ******************************/
/*
    Students Tasks:
    [1] Use Sweet Alert Tf Input Is Empty
    [2] Check If Tasks Exist
    [3] Create Delete All Tasks Btn
    [4] Create Finish All Tasks Btn
    [5] Add To Tasks To The Local Storage
*/
// Container For Tasks
let NewTasksContainer = [];
// Setting Up Variables
let theInput = document.querySelector('.add-task input'),
    theAddButton = document.querySelector('.add-task .plus'),
    tasksContainer = document.querySelector('.tasks-content'),
    taskCount = document.querySelector('.tasks-count span'),
    taskCompleted = document.querySelector('.tasks-completed span'),
    btnFinished = document.querySelector('.tasks-buttons .btn-finished'),
    btnDelete = document.querySelector('.tasks-buttons .btn-delete')
;

// Focus On Input Field
window.onload = function(){
    if(localStorage.getItem('OurTasks')){
        NewTasksContainer = JSON.parse(localStorage.getItem('OurTasks'));
        displayTasks();   
        // Calc All Tasks
        CalcTotalTasks();
    }
    theInput.focus();
};
// Function to setData In Local Storage
function setToLocal(){
    localStorage.setItem('OurTasks' , JSON.stringify( NewTasksContainer ));
}
// Task Content
function taskVal(){
    // If Input is Empty
    if(theInput.value === ''){
        Swal.fire({
            icon: 'error',
            title: 'No Value To Add!',
            text: 'please, add text to input.'
        });
    }
    else{
        // Function To Check About Task Value Before Add It
        CheckValue();
        // Calc All Tasks
        CalcTotalTasks();
        // Focus On Field
        theInput.focus();
    }
}
// Adding The Task
theAddButton.onclick = function(){
    taskVal(); 
} 
// Using e.key form Keyboard
document.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter'){
        taskVal();        
    }
})


// Function Check if there is Tasks or Not
function noTasksMsg(){
    let  noTasksMsg = document.querySelector('.no-tasks-message'); 
    // Check If Span with No Tasks Message IS Exist 
    if(document.body.contains(noTasksMsg)){
        // Remove No Tasks Message
        noTasksMsg.remove();
    }
}
// Function To Add Task
function createTask(taskInfo){
    // Create Main Span Element
    let mainSpan = document.createElement('span');
    
    let mainSpanIn = document.createElement('div');
    mainSpanIn.className = 'task-in';
    let mainSpanOut = document.createElement('span');
    mainSpanOut.className = 'task-out';

    let inpCheckboxEle = document.createElement('input');
    let inpCheckboxEleType = document.createAttribute('type')
    inpCheckboxEleType.value = `checkbox`;
    inpCheckboxEle.setAttributeNode(inpCheckboxEleType)
    let inpCheckboxChecked = document.createAttribute('checked')
    if(taskInfo.finished){
        inpCheckboxEle.setAttributeNode(inpCheckboxChecked)
    }

    let div1 = document.createElement('div');
    let div2 = document.createElement('div');

    // Create Input
        let inputElement = document.createElement('input');
        // Create The Main Span > input value
        inputElement.value = taskInfo.content;
        // Add attribute To Main Span > input
        let inputAtt = document.createAttribute('type')
        let inputAtt2 = document.createAttribute('readonly')
        inputAtt.value = `text`
        inputElement.setAttributeNode(inputAtt)
        inputElement.setAttributeNode(inputAtt2)

        // Add class to input
        inputElement.className = `${taskInfo.finished ? 'finished':''}`
        // Add input to div has class called .input
        div1.className = 'input';
        div1.appendChild(inputElement);
    // End Input

    // Create Edit Btn
    let editElement = document.createElement('span');

    // Create Delete Btn
    let delElement = document.createElement('span');

    // Create The Edit Btn Text
    let editText = document.createTextNode('Edit');

    // Create The Delete Btn Text
    let delText = document.createTextNode('Delete');

    // Add Text To Delete Btn
    editElement.appendChild(editText);

    // Add Text To Delete Btn
    delElement.appendChild(delText);

    // Add Class To Edit Btn
    editElement.className = 'edit';

    // Add Class To Delete Btn
    delElement.className = 'delete';

    // Add edit and delete in div2
    div2.className = 'tools';
    div2.appendChild(delElement);
    div2.appendChild(editElement);
    

    // Add checkbox, div1 and div2 To task-in
    mainSpanIn.appendChild(inpCheckboxEle);
    mainSpanIn.appendChild(div1);
    mainSpanIn.appendChild(div2);

    // Create date and Time Spans
    let dateElement = document.createElement('span');
    let timeElement = document.createElement('span');

    // Create The Date and Time Text
    let dateText = document.createTextNode(`Date:- ${taskInfo.date}`);
    let timeText = document.createTextNode(`Time:- ${taskInfo.time}`);

    // Add Text To date and time spans
    dateElement.appendChild(dateText);
    timeElement.appendChild(timeText);

    // Add Class To date and time spans
    dateElement.className = 'date';
    timeElement.className = 'time';

    // Add date and time spans To task-out
    mainSpanOut.appendChild(dateElement);
    mainSpanOut.appendChild(timeElement);

    // Add task-in and task-out to MainSpan
    mainSpan.appendChild(mainSpanIn)
    mainSpan.appendChild(mainSpanOut)

    // Add Class To Main Span
    mainSpan.className = `task`;

    // Add attribute To Main Span
    let attribute = document.createAttribute('task-id')
    attribute.value = `${taskInfo.id}`
    mainSpan.setAttributeNode(attribute)

    
    // Add The Task To The Container
    tasksContainer.appendChild(mainSpan);

    // Function Check if there is Tasks or Not
    noTasksMsg()
}

// Function To Add Tasks to Page
function addTaskToPage(data){
    data.forEach((task)=>{
        if(task.content){
            createTask(task);
        }
    })

}

// Function Check If Tasks Exist
function CheckValue() {
    
    let taskInfo = {
        id: Math.random(),
        content: theInput.value,
        finished: false,
        date: currDate,
        time:time
    }
    NewTasksContainer.forEach(todo => {
        if (todo.content === taskInfo.content) {
            // Sweet Alert Express That Task Already Exist In Array
            swal.fire({
                icon:'error',
                title:'Task Already Exist!',
                text:'Please, Enter Another Task.'
            });
            theInput.value = "";
            return;
        }
    });

    if(theInput.value != ''){
        // Add Tasks
        createTask(taskInfo);
        NewTasksContainer.push(taskInfo);
        // To Add Task To LocalStorage
        setToLocal();
        // Sweet Alert Express About Adding New Task
        Swal.fire({
            icon: 'success',
            title: 'You Added New Task!'
        })
        // Empty Field
        theInput.value = "";
    }
    
}

// Function To Display Tasks
function displayTasks(){
    addTaskToPage(NewTasksContainer);
    // Calc All Tasks
    CalcTotalTasks();
    // Calc Finished Tasks
    CalcTotalFinishedTasks();
}

// Function Delete Task
function deleteTask(id){
    NewTasksContainer = NewTasksContainer.filter((task)=> task.id != id)
    setToLocal()
}

// Delete and Finish Tasks
document.addEventListener('click',function(e){
    // Finish Task
    if(e.target.getAttribute('type') == 'checkbox'){
        let inpCheckbox = e.target;
        let inp = e.target.nextElementSibling.firstElementChild;
        NewTasksContainer.forEach((task)=>{
            if(task.id == e.target.parentNode.parentNode.getAttribute('task-id')){
                if(inp.classList.contains('finished')){
                    // Remove Class Finished
                    inpCheckbox.removeAttribute('checked')
                    inp.classList.remove('finished');
                    task.finished = false
                    Swal.fire({
                        icon: 'success',
                        title: 'You unfinished This Task!'
                    });
                    
                }
                else{
                    // add Class Finished
                    inpCheckbox.setAttribute('checked','')
                    inp.classList.add('finished');
                    task.finished = true
                    Swal.fire({
                        icon: 'success',
                        title: 'You Finished This Task!'
                    })
                }
            }
        })
        setToLocal()
        // Calc All Tasks
        CalcTotalTasks();
        // Calc Finished Tasks
        CalcTotalFinishedTasks();
    }
    // Edit Task
    else if(e.target.className == 'edit'){
        let input = e.target.parentNode.parentNode.parentNode.children[0].children[1].firstElementChild;
        input.removeAttribute('readonly');
        input.focus();
        input.onmouseleave = function(){
            NewTasksContainer.forEach((task)=>{ 
                if(task.id == e.target.parentNode.parentNode.parentNode.getAttribute('task-id')){
                    task.content = input.value;
                }
            })
            setToLocal()
            input.setAttribute('readonly','');
        }
    }
    // Delete Task
    else if(e.target.className == 'delete'){
        let taskID = e.target.parentNode.parentNode.parentNode.getAttribute('task-id');
        e.target.parentNode.parentNode.parentNode.remove();
        deleteTask(taskID);
        Swal.fire({
            icon: 'success',
            title: 'You Delete This Task!'
        })

        // Check Number Of Tasks Inside The Container
        if(tasksContainer.childElementCount == 0){
            CreateNoTasks();
        }
        // Calc All Tasks
        CalcTotalTasks();
        // Calc Finished Tasks
        CalcTotalFinishedTasks();
    }
});

// Function To Create No Tasks
function CreateNoTasks() {

    // Create Message Span Element
    let msgSpan = document.createElement('span');

    // Create The Text Message
    let msgText = document.createTextNode('No Tasks To Show');

    // Add Text To Message Span Element
    msgSpan.appendChild(msgText);

    // Add Class To Message Span Element
    msgSpan.className = 'no-tasks-message';

    // Append The Message Span Element To The container
    tasksContainer.appendChild(msgSpan);
}

// Function To Calc All Tasks
function CalcTotalTasks() {
    let taskCount = document.querySelector('.tasks-count span')
    taskCount.innerHTML = document.querySelectorAll('.tasks-content .task').length
}

// Function To Calc Finished Tasks
function CalcTotalFinishedTasks() {
    taskCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length  
}

// Delete All Tasks
btnDelete.addEventListener('click',function(){
    NewTasksContainer = []
    setToLocal()
    // Another Solution To Delete All Tasks But From Html Not LocalStorage 
    let Tasks = document.querySelectorAll('.tasks-content .task');
    Tasks.forEach((task) => task.parentNode.removeChild(task));
    displayTasks();
    Swal.fire({
        icon: 'success',
        title: 'You Deleted All Tasks!'
    });

    // Check Number Of Tasks Inside The Container
    if(tasksContainer.childElementCount == 0){
        CreateNoTasks();
    }
    // Calc All Tasks
    CalcTotalTasks();
    // Calc Finished Tasks
    CalcTotalFinishedTasks();
});

// Finished All Tasks
btnFinished.addEventListener('click',function(){
    let Tasks = document.querySelectorAll('.tasks-content .task');
    Tasks.forEach(task => {
        console.log(task.firstElementChild)
        task.firstElementChild.children[0].setAttribute('checked','')
        task.firstElementChild.children[1].firstElementChild.classList.add('finished');
    });
    NewTasksContainer.forEach( task => {
        task.finished = true;
    });
    setToLocal();
    Swal.fire({
        icon: 'success',
        title: 'You Finished All Tasks!'
    })
    CalcTotalFinishedTasks();
});
/****************************** End ToDoList  ******************************/


