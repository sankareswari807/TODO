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
    var HTMLString=  '<div class="todo-item" id="item-%id%">'+
                     '<input type="checkbox" class="circle-icon" id="complete"d>'+
                     '<div class="todo-item-input">%todoName%</div>'+
                     '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div></div>'+
                     '<i class="fa fa-star-o " style="font-size:34px"; id="favourite"></i>'+
                     '<i class="fas fa-star favour-icon" style="font-size:34px;" id="favour"></i>';
                     

    var newHtml=HTMLString.replace("%id%",Id).replace("%todoName%",todoName);
    if(todoName==''){
       newHtml='';
    }
    container.insertAdjacentHTML('beforeend',newHtml);   
    localStorage.setItem('todos',JSON.stringify(todoData));      
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
    }
});

//favourite of the task
var favouriteTodo=document.querySelector(".todo-container");
favouriteTodo.addEventListener("click",function(favour){
    
    if(favour.target.id==="favourite"){
        var count=0;    
        var favouriteId=favour.target.parentNode.lastElementChild;
        console.log(favouriteId);
        if(count%2==0){
            favouriteId.classList.remove(".fa-star-o");
            favouriteId.classList.add(".fa-star");
        }else{
            favouriteId.classList.add(".fa-star-o");
            favouriteId.classList.remove(".fa-star");
        }
        
            
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

function sorting(){
    var list = document.querySelector(".todo-container");
    console.log(list);

    var switching = true;
    while (switching) {

        switching = false;
        var b = list.querySelector(".todo-item");
        console.log(b);
        console.log(b.length);
        for (var i = 0; i > (b.length - 1); i++) {
          var shouldSwitch = false;
          console.log("hiiiii");
          console.log(b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase());
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }    
        if (shouldSwitch) {
            console.log("papa");
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
          }
    }
  };