
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

if(localStorage.getItem('OurTasks') != null){
    NewTasksContainer = JSON.parse(localStorage.getItem('OurTasks'));
    displayTasks();   
    // Calc All Tasks
    CalcTotalTasks();
}


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
    theInput.focus();
};

// Adding The Task
theAddButton.onclick = function(){

    // If Input is Empty
    if(theInput.value === ''){
        Swal.fire({
            icon: 'error',
            title: 'No Value To Add!',
            text: 'please, add text to input.'
        });
    }
    else{
        
            let  noTasksMsg = document.querySelector('.no-tasks-message'); 
                
            // Check If Span with No Tasks Message IS Exist 
            if(document.body.contains(document.querySelector('.no-tasks-message'))){

                // Remove No Tasks Message
                noTasksMsg.remove();
            }

            // Function To Check About Task Value Before Add It
            CheckValue();

            // Calc All Tasks
            CalcTotalTasks();
            
            // Focus On Field
            theInput.focus();
        
    }
} 
// Function To Add Tasks
function addTask(){
    
            // Create Main Span Element
            let mainSpan = document.createElement('span');

            // Create Delete Btn
            let delElement = document.createElement('span');

            // Create The Main Span Text
            let text = document.createTextNode(theInput.value);

            // Create The Delete Btn Text
            let delText = document.createTextNode('Delete');

            // Add Text To Main Span
            mainSpan.appendChild(text);

            // Add Class To Main Span
            mainSpan.className = 'task-box';

            // Add Text To Delete Btn
            delElement.appendChild(delText);

            // Add Class To Delete Btn
            delElement.className = 'delete';

            // Add Delete Btn To Main Span
            mainSpan.appendChild(delElement);

            // Add The Task To The Container
            tasksContainer.appendChild(mainSpan);
}

// Function Check If Tasks Exist
function CheckValue() {
    
    const term = theInput.value;
    
    NewTasksContainer.forEach(todo => {

        if (todo === term) {

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
        addTask();
        NewTasksContainer.push(term);

        // To Add Task To LocalStorage
        localStorage.setItem('OurTasks',JSON.stringify(NewTasksContainer));
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
    let tasksContainer = document.querySelector('.tasks-content');
    let tasks = ``;

    for (let i = 0; i < NewTasksContainer.length; i++) {
        
        tasks += `
                <span class="task-box">
                    ${NewTasksContainer[i]}
                    <span class="delete" data-id = ${i} >Delete</span>
                </span>
        `;
        
    }
    if(tasks == ''){
        tasksContainer.innerHTML =` <span class="no-tasks-message">No Tasks To Show</span> ` + tasks
    }
    else{

        tasksContainer.innerHTML = tasks ;
    }
    
}

// Function Delete Task
function deleteTask(index,count){
    NewTasksContainer.splice(index,count);
    localStorage.setItem('OurTasks' , JSON.stringify( NewTasksContainer ));
    displayTasks();
}

// Delete Tasks
document.addEventListener('click',function(e){
    // Delete Task
    if(e.target.className == 'delete'){

        let taskIndex = e.target.getAttribute('data-id')
        deleteTask(taskIndex,1);

        //Another Solution to Remove Current Task But from Html Not LocalStorage
        // e.target.parentNode.remove();

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

    // Finish Task
    if(e.target.classList.contains('task-box')){

        if(e.target.classList.contains('finished')){
            // Remove Class Finished
            e.target.classList.remove('finished');
            Swal.fire({
                icon: 'success',
                title: 'You unfinished This Task!'
            });
        }
        else{
            // add Class Finished
            e.target.classList.add('finished');
            Swal.fire({
                icon: 'success',
                title: 'You Finished This Task!'
            })
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
    taskCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length
}

// Function To Calc Finished Tasks
function CalcTotalFinishedTasks() {
    taskCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length  
}

// Delete All Tasks
btnDelete.addEventListener('click',function(){
    
    for (let i = 0; i < NewTasksContainer.length; i++) {
        
        deleteTask(i , NewTasksContainer.length);

        Swal.fire({
            icon: 'success',
            title: 'You Deleted All Tasks!'
        });

    }

        // Another Solution To Delete All Tasks But From Html Not LocalStorage 
        // //let Tasks = document.querySelectorAll('.tasks-content .task-box');
        // // task.remove();
        

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
    let Tasks = document.querySelectorAll('.tasks-content .task-box');
    Tasks.forEach(task => {
        task.classList.add('finished');
        Swal.fire({
            icon: 'success',
            title: 'You Finished All Tasks!'
        })
    });
    CalcTotalFinishedTasks();
});
/****************************** End ToDoList  ******************************/

/****************************** Start input ******************************/
let input = document.querySelector('.input');
let count = document.querySelector('.count');
let prog = document.querySelector('.prog');
let MaxLength = input.getAttribute("maxlength");

count.innerHTML = MaxLength;
input.addEventListener('input',function(){
    count.innerHTML = MaxLength - this.value.length;
    count.innerHTML == 0 ? count.classList.add('zero') : count.classList.remove('zero');
    // progress
    prog.style.width = `${(this.value.length * 100) / MaxLength}%`;
})
/****************************** End input ******************************/

