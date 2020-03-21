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
                            '<input type="checkbox" class="circle-icon" id="complete"></input>'+
                            '<input class="todo-item-input" id="inputbox" value="%todoName%"></input>'+
                            '<input type="button" id="edit" class="edit-btn" value="Save"></input>'+
                            '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div>'+
                            '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i></div>';
                            
            var newHtml=HTMLString.replace("%id%",obj.id).replace("%todoName%",obj.todoName);
            if(obj.todoName==''){
            newHtml='';
            }
            container.insertAdjacentHTML('beforeend',newHtml); 
        },

        //delete the item ui 
        deleteListitem:function(selectorID){
                var ele=document.getElementById(selectorID);
                ele.parentNode.removeChild(ele);
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
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteitem);
        document.querySelector(DOM.container).addEventListener('click',ctrlFavouriteitem);
        document.querySelector(DOM.container).addEventListener('click',ctrlcompleteItem);
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

    var ctrlFavouriteitem=function(favour){
        if(favour.target.id==="favourite"){   
            var favouriteId=favour.target.parentNode.lastElementChild;
            favouriteId.classList.toggle("favourite");  
        }
    };

    var ctrlcompleteItem=function(complete){
        if(complete.target.id==="complete"){
            console.log("hi");
            var completeId=complete.target.parentNode.firstElementChild;
            console.log(completeId);
            var a=completeId.nextElementSibiling;
            console.log(a);
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