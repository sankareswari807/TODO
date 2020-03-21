// // var list,id;

// // var data=localStorage.getItem("Todo");

// // if(data){
// //     list=JSON.parse(data);
// //     loadData(list);
// //     id=list.length;
// // }else{
// //     list=[];
// //     id=0;
// // }

// // function loadData(array){
// //     array.forEach(function(item){
// //         addNewTodo(item.id,item.todoName);
// //     });
// // };

// // var sorting=function(){
// //     var parent,switching,itemcontainer,shouldSwitch,firstEle,secondEle;

// //      parent=document.querySelector(".todo-container");  
// //      console.log(parent);  
// //      switching=true;
// //      shouldSwitch=true;
// //     while(switching){
// //         switching=false;
// //         itemcontainer=Todos;
// //         console.log(itemcontainer);     

// //         for(var i=0; i<(itemcontainer.length-1); i++){
// //             shouldSwitch = false;
// //             firstEle = itemcontainer[i];
// //             secondEle = itemcontainer[i + 1];
// //             console.log(firstEle,secondEle);
           
// //             if (firstEle > secondEle ) {
// //                 console.log("hi");
// //                 shouldSwitch = true;
// //                 break;
// //               }
// //         };
// //         // if (shouldSwitch==true) {
// //         //     console.log("hi");
// //         //     itemcontainer[i].parentNode.insertBefore(itemcontainer[i + 1], itemcontainer[i]);
// //         //     switching = true;
// //         // }
// //     }
// // };

// // var nonSortedArray = ['hi', 'yo', 'whatup', 'bye', 'lol'];
// // var sortedArray = nonSortedArray.sort(function (a, b) {
// //       if (a < b) return -1;
// //       else if (a > b) return 1;
// //       return 0;
// //     });
// // console.log(sortedArray); 

// var sorting=function(){
//     var x=Todos.todoName;
//     console.log(x);
//     var a=x.sort()
//         console.log(a);
// }

// // var editTask=function(event){
// //     var editInput=event.target;
// //         console.log(editInput);
// //         if(event.target.id=="inputbox"){
// //             console.log(event.target.id);
// //             var input = document.createElement("INPUT");
// //             var a=input.setAttribute("type", "text");
// //             var b=input.className="inputbox"; 
// //             input.value="%todoName%";
            
// // }    
//         // var label=listItem.querySelector("label");
//         // var containsClass=listItem.classList.contains("editMode");
//         //         //If class of the parent is .editmode
//         //         if(containsClass){
        
//         //         //switch to .editmode
//         //         //label becomes the inputs value.
//         //             label.innerText=editInput.value;
//         //         }else{
//         //             editInput.value=label.innerText;
//         //         }
        
//         //         //toggle .editmode on the parent.
//         //         listItem.classList.toggle("editMode");

// var editTask=function(event){
//     var editInput=event.target.id;
//     var todoName=document.getElementById("todo-inputbox").value;
//     console.log(todoName);
//     console.log(editInput);

//     if(event.target.id=="inputbox"){ 
//         console.log("amma");
//                var Id=(Todos.length == 0)? 0:Todos[Todos.length-1].id+1;
//                console.log(Id);
//                var newItemName=event.target.id.value;
//                console.log(newItemName);
//                var editNewItem=new newTodo(Id,newItemName);
//                console.log(editNewItem);
//                Todos.push(editNewItem);
//     }

// } 
// document.querySelector(".todo-container").addEventListener("click",editTask);


var oldItem="";
var dataController=function(){
    //add newtodo
    var newTodo=function(id,todoName) {
        this.id=id;
        this.todoName=todoName;
    };
    //store the value in array
    var todoItems=[];
    //store the value in local storage
    var Todos=(localStorage.TodoList)?(JSON.parse(localStorage.TodoList)):todoItems;
    console.log(Todos);

    localStorage.setItem('TodoList',JSON.stringify(Todos));
    return{
        //Add the item
        addNewTodo:function(ele) {
            var Id,todoName,newItem;
            //create new id
            Id=(Todos.length == 0)? 0:Todos[Todos.length-1].id+1;
            console.log(Id);
            todoName=document.getElementById("todo-inputbox").value;
            //create new item
            newItem=new newTodo(Id,todoName);
            Todos.push(newItem); 

            localStorage.setItem('TodoList',JSON.stringify(Todos));
            console.log(Id,todoName,newItem)
            return newItem;
        },

        deleteTodo:function(id){
            var ids,index;
            ids=Todos.map(function(current){
                return current.id;
            });
            index=ids.indexOf(id);

            if(index!==-1){
                Todos.splice(index,1);
            }
            localStorage.setItem('TodoList', JSON.stringify(Todos));
        },

        TodoInput:function(idd){
            console.log(idd);
            for(var i =0;i<Todos.length;i++){
                if(Todos[i].id==idd){
                    return Todos[i];
                }
            }
        },

        editItem:function(id,obj){
            var index=0;
            console.log(id);
            console.log(obj);
            for(var i =0;i<Todos.length;i++){
                console.log(Todos[i].todoName);
                if(oldItem==Todos[i].todoName){
                   index=i;
               }
           }
           Todos[index].id=id;
           Todos[index].todoName=obj.todoName;         
       },

        getValues:function() {
                return{
                    Arr : Todos
                }
        },
        testing:function(){
            console.log(Todos);
        }
    }
}();

var uicontroller=function(){

    var DOMStrings={
        inputvalue:"#todo-inputbox",
        container:".todo-container",
    };
    return{
        //getting input values
        getInput:function(){
            return{
                Input:document.querySelector(DOMStrings.inputvalue).value
            }
        },

        //add the item ui
        addListItem:function(obj){
            var container=document.querySelector(DOMStrings.container);
            var HTMLString= '<div class="todo-item" id="item-%id%">'+
                            '<input type="checkbox" class="circle-icon" id="complete">'+
                            '<input class="todo-item-input" id="inputbox" value="%todoName%">'+
                            '<input type="button" id="edit" class="edit-btn" value="Save"></input>'+
                            '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div>'+
                            '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i></div>';
                            
            var newHtml=HTMLString.replace("%id%",obj.id).replace("%todoName%",obj.todoName);
            if(obj.todoName==''){
            newHtml='';
            }
            //localStorage.setItem('TodoList', JSON.stringify(Todos)); 
            container.insertAdjacentHTML('beforeend',newHtml); 
        },

        //delete the item ui 
        deleteListitem:function(selectorID){
                var ele=document.getElementById(selectorID);
                ele.parentNode.removeChild(ele);
        },

        //edit the item
        editListItem:function(obj){
            console.log(obj);
        },

        //this is used to return the classes and id's
        getDOMStrings:function () {
            return DOMStrings;
        },
        
    }

}();


var controller=function(Datactrl,UIctrl){

    var settupEventListeners=function(){
        var DOM=UIctrl.getDOMStrings();
        //when the enter button was clicked 
        document.addEventListener("keypress",function(event){
            if(event.keycode===13 || event.which===13){
                ctrlAdditem();
                document.querySelector("#todo-inputbox").value='';
            }
        });

        document.addEventListener('click',function(eve){
            if(eve.target.id=='inputbox'){
                document.getElementById('edit').style.display='block';                
            }else if(eve.target.id=="edit"){
                document.getElementById("edit").style.display="none"
            }
        });
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteitem);
        document.querySelector(DOM.container).addEventListener('click',ctrlFavouriteitem);
        document.querySelector(".todo-container").addEventListener('click',ctrlcompleteItem);
        document.querySelector(DOM.container).addEventListener('click',ctrlEditItem);
        updateEdit();
    };

    var ctrlAdditem=function(){
        //get the input
            var INPUT=UIctrl.getInput();
        //add the item
            var NEWITEM=Datactrl.addNewTodo(INPUT.Input);
        //add the item to the ui
            UIctrl.addListItem(NEWITEM);
    };

    var ctrlDeleteitem=function(event){
        if(event.target.id=="delete"){
            var itemId,splitId,type,ID;
                itemId=event.target.parentNode.parentNode.id;
                console.log(itemId);
                if(itemId){
                    splitId=itemId.split('-'); 
                    type=splitId[0]; 
                    ID=parseInt(splitId[1]);
                    Datactrl.deleteTodo(ID);
                    UIctrl.deleteListitem(itemId);
                };
        }
    };

    var ctrlEditItem=function(event){
            if(event.target.id=="inputbox"){
                var editItem;
                itemId=event.target.parentNode.id;
                console.log(itemId);
                splitId=itemId.split('-'); 
                type=splitId[0]; 
                ID=parseInt(splitId[1]);
                editItem=Datactrl.TodoInput(ID);
                console.log(editItem);
                UIctrl.editListItem(editItem);       
        }
     };

    var updateEdit=function(){
         var input=UIctrl.getInput();
         console.log(input);
    };

    var ctrlFavouriteitem=function(favour){
        if(favour.target.id==="favourite"){   
            var favouriteId=favour.target.parentNode.lastElementChild;
            favouriteId.classList.toggle("favourite");  
        }
    };

    var ctrlcompleteItem=function(complete){
        if(complete.target.id==="complete"){
            console.log("hi");
            var completeId=complete.target.parentNode;
            console.log(completeId);
            completeId.classList.toggle("checked");
         }
    };
    return{
        init:function(){
            console.log("Application has started...");
            settupEventListeners();
            var ArrayList = Datactrl.getValues().Arr;
            for(var i=0;i<ArrayList.length;i++){
                UIctrl.addListItem(ArrayList[i]);
            }   
        }
    }


}(dataController,uicontroller)
controller.init();