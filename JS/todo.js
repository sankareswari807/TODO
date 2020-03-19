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
    var a=localStorage.setItem('TodoList', JSON.stringify(Todos)); 
    console.log(a);
    container.insertAdjacentHTML('beforeend',newHtml);    
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
        var array = getValues().Arr;
            console.log(array);
        for(var i=0;i<array.length;i++){
				addNewTodo(array[i]);
		}
    }
}); 

