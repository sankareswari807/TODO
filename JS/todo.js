//add newtodo
var newTodo=function(id,todoName) {
    this.id=id;
    this.todoName=todoName;
};
var todoItems=[];
var todoData=(localStorage.todos)?JSON.parse(localStorage.todos):todoItems;
function addNewTodo(ele) {
    var Id=(todoItems.length == 0)? 0:todoItems[todoItems.length-1].id+1;
    var todoName=document.getElementById("todo-inputbox").value;
    var newItem=new newTodo(Id,todoName);
    todoItems.push(newItem);

    var container=document.querySelector(".todo-container");
    var HTMLString=  '<div class="todo-item" id="item-%id%"><i class="fa fa-circle-thin circle-icon" id="complete" style="font-size:34px"></i>'+
                     '<div class="todo-item-input">%todoName%</div>'+
                     '<div class="todo-favourite"><i class="fa fa-star-o favourite-icon" style="font-size:34px" id="favourite"></i></div>'+
                     '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div></div>';

    var newHtml=HTMLString.replace("%id%",Id).replace("%todoName%",todoName);
    if(todoName==''){
       newHtml='';
    }
    container.insertAdjacentHTML('beforeend',newHtml);   
    //localStorage.setItem('todos',JSON.stringify(todoData));      
}

//delete the todo
var removed=document.querySelector(".todo-container");
removed.addEventListener("click",function(remove){
    if(remove.target.id=="delete"){
            var removeEle=remove.target.parentNode.parentNode;
            removeEle.parentNode.removeChild(removeEle);   
    }
});

//complete the todo
var completed=document.querySelector(".todo-container");
completed.addEventListener("click",function(complete){
    if(complete.target.id==="complete"){
        var completeId=complete.target.parentNode;  
        completeId.classList.toggle("checked");
        completeId.classList.toggle("completed")       
    }
});

//favourite of the task
var favouriteTodo=document.querySelector(".todo-container");
favouriteTodo.addEventListener("click",function(favour){
    if(favour.target.id==="favourite"){
        var favouriteId=favour.target.parentNode.parentNode; 
        favouriteId.classList.toggle("favourite");
    }
});

//when the enter button was clicked 
document.addEventListener("keypress",function(event){
    if(event.keycode===13 || event.which===13){
        addNewTodo();
        document.querySelector("#todo-inputbox").value='';
        localStorage.setItem('todos',JSON.stringify(todoData));
    }
}); 