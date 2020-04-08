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
    
    var Todos=(localStorage.TodoList)?(JSON.parse(localStorage.TodoList)):todoItems;
    console.log(Todos);
    localStorage.setItem('TodoList',JSON.stringify(Todos));

    var FavTodos=(localStorage.FavTodo)?(JSON.parse(localStorage.FavTodo)):favTodoList;
    localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
    console.log(FavTodos);

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

        favlist:function(name) {
			
            var Id,todoName,newItem;
            //create new id
            Id=(FavTodos.length == 0)? 0:FavTodos[FavTodos.length-1].ID+1;
            //create new item
            newItem=new newFavTodo(Id,name);
			console.log(newItem);
            FavTodos.push(newItem); 

            localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
            console.log(Id ,newItem);
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
        favTodo:function(ID){
            var IDS,Index;
            IDS=FavTodos.map(function(current){
                return current.ID;
            });
            Index=IDS.indexOf(ID);

            if(Index!==-1){
                FavTodos.splice(Index,1);
            }
            localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
        },

        getValues:function() {
                return{
                    Arr : Todos,
					Arr1 : FavTodos
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
            for(i=0;i<favTodoList.length;i++){
                var html='<div class="fav-todo-item" id="item-'+i+'">'+
                         '<input type="checkbox" class="circle-icon" id="complete"></input>'+
                         '<div class="todo-item-input" id="inputbox" >%todoName%</div>'+
                         '<input type="button" id="edit" class="edit-btn" value="Save"></input>'+
                         '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div>'+      
                         '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i></div>';
                console.log(html);
                var favHtml=html.replace("%todoName%",favTodoList[i].todoName);
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

        clearfields:function() {

			var fields,fieldsArr;

			fields=document.querySelectorAll(DOMStrings.inputvalue);
			fieldsArr=Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current,index,array){
				current.value="";
			});
			fieldsArr[0].focus();
		}
    }
}();


var controller=function(Datactrl,UIctrl){

    var settupEventListeners=function(element){
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
        document.querySelector(DOM.favCont).addEventListener('click',ctrlFavDeleteitem);
        document.querySelector(DOM.favCont).addEventListener('click',ctrlFavcompleteItem);
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

    var ctrlFavDeleteitem=function(event){
        if(event.target.id=="delete"){
            var itemId,splitId,type,ID;
                itemId=event.target.parentNode.parentNode.id;
                console.log(itemId);
                if(itemId){
                    splitId=itemId.split('-'); 
                    type=splitId[0]; 
                    ID=parseInt(splitId[1]);
                    Datactrl.favTodo(ID);
                    UIctrl.favDelitem(itemId);
                };
        }
    };

    var ctrlFavouriteitem=function(favour){
        // ctrlAdditem();
        if(favour.target.id==="favourite"){   
            var favourId=favour.target;
            console.log(favourId);
            favourId.classList.toggle("favourite"); 
            var favouriteId=favour.target.parentNode;
            favouriteId.classList.toggle("favourite"); 

            var itemId,splitId,ID;
            itemId=favour.target.parentNode.id;
			console.log(itemId);
            if(itemId){
                splitId=itemId.split('-'); 
                type=splitId[0]; 
                ID=parseInt(splitId[1]);
                UIctrl.favDelitem(itemId);
            };

            var innerTxt=favour.target.parentNode.innerText;
            for(i=0;i<Todos.length;i++){
                if(innerTxt==Todos[i].todoName){
                    favTodoList.push(Todos[i]);
                    Todos.splice(i,1);
                }
            };
            document.querySelector(".fav-heading").style.display="block";
           // UIctrl.favListItem(favTodoList);
			UIctrl.favListItem(innerTxt);
			var NEWITEM=dataController.favlist(innerTxt);
        }   
    };

    var ctrlcompleteItem=function(complete){
        if(complete.target.id==="complete"){
            var completeId=complete.target.parentNode;
            completeId.classList.toggle("checked");
         }
    };

    var ctrlFavcompleteItem=function(complete){
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
            var FavArrayList = Datactrl.getValues().Arr1;
            for(var i=0;i<FavArrayList.length;i++){
               console.log(UIctrl.favListItem(FavArrayList[i]));
            }
        }
    }   
}(dataController,uicontroller)
controller.init();

var ctrlAdditem=function(){
    //get the input
        var INPUT=uicontroller.getInput();
    //add the item
        var NEWITEM=dataController.addNewTodo(INPUT.Input);
    //add the item to the ui
        uicontroller.addListItem(NEWITEM);
    //clear the fields
        uicontroller.clearfields();
};