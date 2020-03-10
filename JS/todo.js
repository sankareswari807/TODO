// var completed=document.querySelector(".todo-item");
//      completed.addEventListener("click",function(complete){
//      if(complete.target.tagName==="DIV"){
//          complete.target.classList.toggle("checked");
//         //  complete.target.classList.toggle("completed")
//      }
//  },false);

//add newtodo
var newTodo=function(id,todoName) {
    this.id=id;
    this.todoName=todoName;
};
var todoItems=[];
function addNewTodo(ele) {
    //create the new id
    var Id=(todoItems.length == 0)? 0:todoItems[todoItems.length-1].id+1;
    //get the value
    var todoName=document.getElementById("todo-inputbox").value;
    //create the newitem
    var newItem=new newTodo(Id,todoName);
    console.log(newItem);
    //push
    todoItems.push(newItem);

    var container=document.querySelector(".todo-container");
    var HTMLString='<div class="todo-item" id="item-%id%"><i class="fa fa-circle-thin circle-icon" id="complete" style="font-size:34px"></i>'+
                     '<div class="todo-item-input">%todoName%</div>'+
                     '<div class="todo-edit"><i class="far fa-edit edit-icon" style="font-size:28px;" id="edit"></i></i></div>'+
                     '<div class="todo-favourite"><i class="fa fa-star-o favourite-icon" style="font-size:34px" id="favourite"></i></div>'+
                     '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div></div>';
    //replace
    var newHtml=HTMLString.replace("%id%",Id).replace("%todoName%",todoName);

    //document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
    container.insertAdjacentHTML('beforeend',newHtml);         
    
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
});

//complete the todo
var completed=document.querySelector(".todo-container");
completed.addEventListener("click",function(complete){
    if(complete.target.id==="complete"){
        var a=complete.target.id;    
        console.log(a);
        a.target.classList.toggle("checked");        
    }
});

//when the enter button was clicked 
document.addEventListener("keypress",function(event){
    if(event.keycode===13 || event.which===13){
        addNewTodo();
    }
});