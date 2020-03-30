    var oldItem="";
    var newTodo=function(id,todoName) {
        this.id=id;
        this.todoName=todoName;
    };
    var newFavTodo=function(ID,todoName){
        this.ID=ID;
        this.todoName=todoName;
    };
    var todoItems=[];
    var favTodoList=[];
    var rtnTodoItems=function(){
        return todoItems;
    };
    var Todos=(localStorage.TodoList)?(JSON.parse(localStorage.TodoList)):todoItems;
    console.log(Todos);
    localStorage.setItem('TodoList',JSON.stringify(Todos));

    var FavTodos=(localStorage.FavTodo)?(JSON.parse(localStorage.FavTodo)):favTodoList;
    console.log(FavTodos);
    localStorage.setItem('FavTodo',JSON.stringify(FavTodos));

var dataController=function(){
    return{
        //Add the item
        addNewTodo:function() {
            var Id,todoName,newItem;
            //create new id
            Id=(Todos.length == 0)? 0:Todos[Todos.length-1].id+1;
            console.log(Id);
            todoName=document.getElementById("todo-inputbox").value;
            console.log(todoName);
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

        favTodo:function(){
            var Id,todoName,newItem;
            //create new id
            Id=(Todos.length == 0)? 0:Todos[Todos.length-1].id+1;
            console.log(Id);
            todoName=document.getElementById("todo-inputbox").value;
            console.log(todoName);
            //create new item
            newItem=new newFavTodo(ID,todoName);
            FavTodos.push(newItem); 

            
            console.log(Id,todoName,newItem)
            localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
            return newItem;
            
        },

        getValues:function() {
                return{
                    Arr : Todos
                }
        },
        testing:function(){
            console.log(Todos);
            console.log(FavTodos);
        }
    }
}();

var uicontroller=function(){

    var DOMStrings={
        inputvalue:"#todo-inputbox",
        container:".todo-container",
        favCont:".todo-favourite-div"
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
                            '<div class="todo-item-input" id="inputbox" >%todoName%</div>'+
                            '<input type="button" id="edit" class="edit-btn" value="Save"></input>'+
                            '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div>'+
                            '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i></div>';
            var newHtml=HTMLString.replace("%id%",obj.id).replace("%todoName%",obj.todoName);
            console.log(newHtml);
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

        favListItem:function(){		
            var favCont=document.querySelector(DOMStrings.favCont);
            console.log(favCont);
            // var obj=rtnTodoItems();
            for(i=0;i<favTodoList.length;i++){
                var html='<div class="todo-item" id="item-'+i+'">'+
                        '<input type="checkbox" class="circle-icon" id="complete"></input>'+
                        '<div class="todo-item-input" id="inputbox" >%todoName%</div>'+
                        '<input type="button" id="edit" class="edit-btn" value="Save"></input>'+
                        '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div>'+
                        '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i></div>';
                var favHtml=html.replace("%todoName%",favTodoList[i].todoName);
                console.log(favHtml);
            }		
            favCont.insertAdjacentHTML('beforeend',favHtml);             
        },

        favDelitem:function(selectorID) {
            var ele=document.getElementById(selectorID);
            console.log(ele)
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
            var favourId=favour.target;
            console.log(favourId)
            favourId.classList.add("favourite"); 
            var favouriteId=favour.target.parentNode;
            favouriteId.classList.add("favourite"); 
        }
            var itemId,splitId,ID;
            itemId=favour.target.parentNode.id;
            if(itemId){
                splitId=itemId.split('-'); 
                type=splitId[0]; 
                ID=parseInt(splitId[1]);
                UIctrl.favDelitem(itemId);
            };
            var innerTxt=favour.target.parentNode.innerText;
            console.log(innerTxt);

            for(i=0;i<Todos.length;i++){
                if(innerTxt==Todos[i].todoName){
                    favTodoList.push(Todos[i]);
                    Todos.splice(i,1);
                }
            };
            UIctrl.favListItem(innerTxt);
    };    

    var ctrlcompleteItem=function(complete){
        if(complete.target.id==="complete"){
            var completeId=complete.target.parentNode;
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