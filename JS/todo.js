//add newtodo
var newTodo=function(id,todoName) {
    this.id=id;
    this.todoName=todoName;
};
var todoItems=[];
//store the value in local storage
var Todos=(localStorage.TodoList)?(JSON.parse(localStorage.TodoList)):todoItems;
console.log(Todos);

//Add the item
function addNewTodo(ele) {
    var Id=(Todos.length == 0)? 0:Todos[Todos.length-1].id+1;
    var todoName=document.getElementById("todo-inputbox").value;
    var newItem=new newTodo(Id,todoName);
    Todos.push(newItem);

    var container=document.querySelector(".todo-container");
    var HTMLString=  '<div class="todo-item" id="item-%id%">'+
                     '<input type="checkbox" class="circle-icon" id="complete">'+
                     '<div class="todo-item-input" id="inputbox">%todoName%</div>'+
                     '<input type="text" id="editing" style="display: none;" class="edit-inputbox"></input>'+
                     '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div>'+
                     '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i></div>';
                     

    var newHtml=HTMLString.replace("%id%",Id).replace("%todoName%",todoName);
    if(todoName==''){
       newHtml='';
    }
    // var a=localStorage.getItem('TodoList', JSON.stringify(Todos)); 
    // console.log(a);
    // var b=localStorage.setItem('a',newHtml); 
    // console.log(b);
    container.insertAdjacentHTML('beforeend',newHtml);    
    localStorage.setItem('TodoList', JSON.stringify(Todos));     
}

// function to return the values in local storage array
function getValues() {
    return{
        Arr : Todos
    }
}
//delete the todo
var removed=document.querySelector(".todo-container");
removed.addEventListener("click",function(remove){
    if(remove.target.id=="delete"){
            var removeEle=remove.target.parentNode.parentNode;
            var removedItem=removeEle.parentNode.removeChild(removeEle);
            console.log(removedItem);
            var a=localStorage.setItem('Todos',JSON.stringify(Todos));  
            console.log(a);
    }
});

//complete the todo
var completed=document.querySelector(".todo-container");
completed.addEventListener("click",function(complete){
    if(complete.target.id==="complete"){
        var completeId=complete.target.parentNode;
        completeId.classList.toggle("checked");
    }
});

//favourite of the task
var favouriteTodo=document.querySelector(".todo-container");
favouriteTodo.addEventListener("click",function(favour){
    if(favour.target.id==="favourite"){   
        var favouriteId=favour.target.parentNode.lastElementChild;
        favouriteId.classList.toggle("favourite");  
        var favourId=favour.target.parentNode;
        favourId.classList.toggle("favourite");
    }
});

//when the enter button was clicked 
document.addEventListener("keypress",function(event){
    if(event.keycode===13 || event.which===13){
        addNewTodo();
        document.querySelector("#todo-inputbox").value='';

        var Todos=(localStorage.TodoList)?(JSON.parse(localStorage.TodoList)):Todos;
        console.log(Todos);

        var Array = getValues().Arr;
            console.log(Array);
    }
}); 

// function sorting(){
//     var list = document.querySelector(".todo-container");
//     console.log(list);
//     var shouldSwitch=false;
//     var switching = true;
//     while (switching) {

//         switching = false;
//         var b = todoItems;
//         console.log(b);
//         console.log(b.length-1);
//         for (var i = 0; i < (b.length - 1); i++) {
//             var b = todoItems[i].todoName;
//             console.log(b);
//                 var shouldSwitch = false;
//                 console.log("hiiiii");
//                 // var s=b.sort();
//                 // console.log(s);
//                 var papa= document.querySelector(".todo-item").innerHTML=s;
//                 console.log(papa);
//         }   
//     }
//   };

var editTask=function(event){
    var editInput=event.target;
    console.log(editInput);
    if(event.target.id=="inputbox"){
        console.log(event.target.id);
        var input = document.createElement("INPUT");
        var a=input.setAttribute("type", "text");
        var b=input.className="inputbox"; 
        input.style.width="200px";
        input.style.border="2px solid black";
        event.target.classList.add("input");
        event.target.classList.remove("todo-item-input");
    }
    // var label=listItem.querySelector("label");
    // var containsClass=listItem.classList.contains("editMode");
    //         //If class of the parent is .editmode
    //         if(containsClass){
    
    //         //switch to .editmode
    //         //label becomes the inputs value.
    //             label.innerText=editInput.value;
    //         }else{
    //             editInput.value=label.innerText;
    //         }
    
    //         //toggle .editmode on the parent.
    //         listItem.classList.toggle("editMode");
    }

document.querySelector(".todo-container").addEventListener("click",editTask);