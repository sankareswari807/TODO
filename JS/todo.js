function createNewTodo(){
    //get the value
    var inputValue=document.getElementById("todo-inputbox").value;
    var addTodo=document.createTextNode(inputValue);
    var addLi=document.createElement("li");
 
    //add the value 
    addLi.appendChild(addTodo);
    if(inputValue===""){
        alert("You must write something!");
    }else{
        document.querySelector(".todo-ul").appendChild(addLi);
    }
    document.querySelector("#todo-inputbox").value="";
}

var completed=document.querySelector("ul");
completed.addEventListener("click",function(complete){
    if(complete.target.tagName="li"){
        complete.target.classList.toggle("checked");
        complete.target.style.display="block";
        complete.target.classList.toggle("completed");
    }
});


document.addEventListener("keypress",function(event){
    if(event.keycode===13 || event.which===13){
        createNewTodo();
    }
});