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
    console.log(newItem);
    todoItems.push(newItem);

    var container=document.querySelector(".todo-container");
    var HTMLString='<div class="todo-item" id="item-%id%"><i class="fa fa-circle-thin circle-icon" id="complete" style="font-size:34px"></i>'+
                     '<div class="todo-item-input">%todoName%</div>'+
                     '<div class="todo-edit"><i class="far fa-edit edit-icon" style="font-size:28px;" id="edit"></i></i></div>'+
                     '<div class="todo-favourite"><i class="fa fa-star-o favourite-icon" style="font-size:34px" id="favourite"></i></div>'+
                     '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div></div>';

    var newHtml=HTMLString.replace("%id%",Id).replace("%todoName%",todoName);

    container.insertAdjacentHTML('beforeend',newHtml);   

    localStorage.setItem('todos',JSON.stringify(todoData));      
    
}

//delete the todo
var removed=document.querySelector(".todo-container");
removed.addEventListener("click",function(remove){
    if(remove.target.id=="delete"){
            var itemid,splitid,type;
            itemid=remove.target.parentNode.parentNode.id;
            splitid=itemid.split("-");
            type=splitid[0];
            ID=parseInt(splitid[1]);
            var removeEle=remove.target.parentNode.parentNode;
            removeEle.parentNode.removeChild(removeEle);            
    }
    localStorage.setItem('todos',JSON.stringify(todoData)); 
});

//complete the todo
var completed=document.querySelector(".todo-container");
completed.addEventListener("click",function(complete){
    if(complete.target.id==="complete"){
        var completeId=complete.target.parentNode;    
        completeId.classList.toggle("checked"); 
        completeId.classList.toggle("completed")       
    }
    localStorage.setItem('todos',JSON.stringify(todoData)); 
});

//when the enter button was clicked 
document.addEventListener("keypress",function(event){
    if(event.keycode===13 || event.which===13){
        addNewTodo();
    }
}); 

//edit the todo

var edited=document.querySelector(".todo-container");
edited.addEventListener("click",function(editing){
    if(editing.target.id==="edit"){
        var listItem=editing.target.parentNode;
        console.log(listItem);
        
    }   
});


