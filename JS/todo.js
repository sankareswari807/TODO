var oldItem="";
    var newTodo=function(id,todoName,isFav) {
        this.id=id;
        this.todoName=todoName;
        this.isFav=isFav;
    };
    var newFavTodo=function(ID,todoName,isFav){
        this.ID=ID;
        this.todoName=todoName;
        this.isFav=isFav;
    };
    var todoItems=[];
    var favTodoList=[];

    // var Todos=[];
    
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

            //create todoname
            todoName=document.getElementById("todo-inputbox").value;
            
            //create new item
            newItem=new newTodo(Id,todoName,"unFav");
            
            Todos.push(newItem); 

            localStorage.setItem('TodoList',JSON.stringify(Todos));

            console.log(Id,todoName,newItem)
            return newItem;
        },

        favlist:function(Id,name) {
			
            var Id,newItem;
            console.log(FavTodos);
            //create new id
            Id=(FavTodos.length == 0)? 0:FavTodos[FavTodos.length-1].ID+1;
            console.log(Id);
            //create new item
            newItem=new newFavTodo(Id,name,"Fav");
            FavTodos.push(newItem); 

            localStorage.setItem("FavTodo",JSON.stringify(FavTodos));

            console.log(Id,newItem);
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

        favdeleteTodo:function(id){
            var ids,index;
            ids=Todos.map(function(current){
                return current.id;
            });
            index=ids.indexOf(id);

            if(index!==-1){
                Todos.splice(index,1);
            }
            localStorage.setItem("FavTodo",JSON.stringify(FavTodos));
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
            var x='<div class="todo-item" id="item-%id%">';
            if(obj.isFav == "Fav"){
                 x='<div class="todo-item hide" id="item-%id%">';
            }   
            var HTMLString= x+
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
            if(FavTodos.length > 0){
                document.querySelector(".fav-heading").style.display="block";
            }else{
                document.querySelector(".fav-heading").style.display="none`";
            }
            var y='<div class="fav-todo-item" id="item-';
            if(FavTodos.isFav == "unFav"){
                 y='<div class="fav-todo-item hide" id="item-';
            } 
            for(i=0;i<FavTodos.length;i++){
                var html=y+i+'">'+
                         '<input type="checkbox" class="circle-icon" id="complete"></input>'+
                         '<div class="todo-item-input" id="inputbox" >%todoName%</div>'+
                         '<input type="button" id="edit" class="edit-btn" value="Save"></input>'+
                         '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div>'+      
                         '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favouritestar"></i></div>';
                var favHtml=html.replace("%todoName%",FavTodos[i].todoName);  
                 
            }
            favCont.insertAdjacentHTML('beforeend',favHtml);
            localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
        },

        favTodo:function(selectorID){            
            // document.querySelector(".todo-favourite-div #item-"+id).style.display = "none";
            // document.querySelector(".todo-container #item-"+id).style.display = "block";  
            // for(i=0;i<FavTodos.length;i++){
            //     if(FavTodos[i].ID == id){
            //         FavTodos.splice(i,1);
            //     }
            // }
            // localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
            var ele=document.getElementById("item-"+selectorID);
            console.log(ele);
            ele.style.display="none";
            localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
        },

        favDelitem:function(selectorID) {
            var ele=document.getElementById(selectorID);
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

			fieldsArr.forEach(function(current){
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
        document.querySelector(DOM.favCont).addEventListener('click',ctrlFavouritestarItem);
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

    var ctrlcompleteItem=function(complete){
        if(complete.target.id==="complete"){
            var completeId=complete.target.parentNode;
            completeId.classList.toggle("checked");
            // localStorage.setItem('TodoList', JSON.stringify(Todos));
         }
        
    };

    var ctrlFavouriteitem=function(favour){
        ctrlAdditem();
        if(favour.target.id==="favourite"){   
            var favourId=favour.target;
            console.log(favourId);
            var favouriteId=favour.target.parentNode;
            console.log(favouriteId);
            favouriteId.classList.toggle("hide"); 

            favouriteId.style.display="none";
            var itemId,splitId,ID;
            itemId=favour.target.parentNode.id;
            var innerTxt=favour.target.parentNode.innerText;
                splitId=itemId.split('-'); 
                type=splitId[0]; 
                ID=parseInt(splitId[1]);
                Todos.splice(ID,1,{"id":ID,"todoName":innerTxt,"isFav":"Fav"});
                localStorage.setItem('TodoList', JSON.stringify(Todos));

            for(i=0;i<Todos.length;i++){
                if(innerTxt==Todos[i].todoName){
                    Todos.splice(i,1);  
                }   
            };

            document.querySelector(".fav-heading").style.display="block";
           //UIctrl.favListItem(favTodoList);
           var NEWITEM=dataController.favlist(ID,innerTxt);
           UIctrl.favListItem(innerTxt);
           console.log(NEWITEM);
        }   
    };

    var ctrlFavcompleteItem=function(complete){
        if(complete.target.id==="complete"){
            var completeId=complete.target.parentNode;
            completeId.classList.toggle("checked");
         }
    };

    var ctrlFavouritestarItem=function(favourstar) {
        if(favourstar.target.id=="favouritestar") {
           var favourstarId=favourstar.target.parentNode.id;
           console.log(favourstarId);
                var splitId=favourstarId.split('-'); 
                var  type=splitId[0];
                var ID=parseInt(splitId[1]);
                console.log(ID);
                UIctrl.favTodo(ID);

                var innerTxt=favourstar.target.parentNode.innerText;
                console.log(innerTxt);
                FavTodos.splice(ID,1,{"id":ID,"todoName":innerTxt,"isFav":"unFav"});
                localStorage.setItem('FavTodo',JSON.stringify(FavTodos));

                console.log(Todos);
                for(i=0;i<FavTodos.length;i++){
                    if(innerTxt==FavTodos[i].todoName){
                        console.log(innerTxt,FavTodos[i]);
                        FavTodos.splice(i,1);
                    }   
                };

                Todos.splice(ID,0,{"id":ID,"todoName":innerTxt,"isFav":"unFav"});
                localStorage.setItem('TodoList', JSON.stringify(Todos));
                console.log(Todos);
                for(j=0;j<Todos.length;j++){                    
                    if(innerTxt==Todos[j].todoName){
                        console.log(innerTxt,Todos[j]);
                        Todos.splice(j,0);
                    }
                };
        localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
        var NEWITEM=uicontroller.favTodo(ID);
           //UIctrl.favListItem(innerTxt);
        }
    };

    var ctrlFavDeleteitem=function(event) {
        if(event.target.id=="delete"){
            var itemId,splitId,type,ID;
                itemId=event.target.parentNode.parentNode.id;
                console.log(itemId);
                if(itemId){
                    splitId=itemId.split('-'); 
                    type=splitId[0]; 
                    ID=parseInt(splitId[1]);
                    console.log(splitId+","+type+","+ID);
                    Datactrl.favdeleteTodo(ID);
                    UIctrl.favDelitem(itemId);
                };
        }   
    };

    return{        
        init:function(){
            settupEventListeners();
            // var ArrayList = Datactrl.getValues().Arr;
            // console.log(ArrayList);
            for(var i=0; i<Todos.length;i++){
                UIctrl.addListItem(Todos[i]);
            }   

            // var FavArrayList = Datactrl.getValues().Arr1;
            for(var j=0;j<FavTodos.length;j++){
                UIctrl.favListItem(localStorage.getItem(FavTodos[j]));
            }
        }
    }   
}(dataController,uicontroller)
controller.init();

var ctrlAdditem=function(){
    //get the input
    var INPUT=uicontroller.getInput();
    if( INPUT.Input!== "" ){
            //add the item
                var NEWITEM=dataController.addNewTodo(INPUT.Input);
            //add the item to the ui
                uicontroller.addListItem(NEWITEM);
            //clear the fields
                uicontroller.clearfields();
    }
};