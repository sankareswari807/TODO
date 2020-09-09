    var newTodo=function(id,todoName,isFav,isComplete) {
        this.id=id;
        this.todoName=todoName;
        this.isFav=isFav;
        this.isComplete=isComplete;
    };
    var newFavTodo=function(ID,todoName,isFav,isComplete){
        this.ID=ID;
        this.todoName=todoName;
        this.isFav=isFav;
        this.isComplete=isComplete;
    };
    var newcompleteTodo=function(ID,todoName,isFav,isCompletey){
        this.ID=ID;
        this.todoName=todoName;
        this.isFav=isFav;
        this.isComplete=isComplete;
    };

    var todoItems=[];
    var favTodoList=[];
    var completeTodoList=[];

    var Todos=(localStorage.TodoList)?(JSON.parse(localStorage.TodoList)):todoItems;
    console.log(Todos);
    localStorage.setItem('TodoList',JSON.stringify(Todos));

    var FavTodos=(localStorage.FavTodo)?(JSON.parse(localStorage.FavTodo)):favTodoList;
    console.log(FavTodos);

    var CompleteTodos=(localStorage.CompleteTodo)?(JSON.parse(localStorage.CompleteTodo)):completeTodoList;
    console.log(CompleteTodos);
    localStorage.setItem('CompleteTodo',JSON.stringify(CompleteTodos));

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
            newItem=new newTodo(Id,todoName,"unFav","incomplete","day","irremain","notfile","notpriority");
            
            Todos.push(newItem); 

            localStorage.setItem('TodoList',JSON.stringify(Todos));
            return newItem;
            
        },

        favlist:function(Id,name) {
			
            var Id,newItem;
            console.log(FavTodos);
            //create new id
            Id=(FavTodos.length == 0)? 0:FavTodos[FavTodos.length-1].ID+1;
            console.log(Id);
            //create new item
            newItem=new newFavTodo(Id,name,"Fav","incomplete","day","irremain","notfile","notpriority");
            FavTodos.push(newItem); 

            localStorage.setItem("FavTodo",JSON.stringify(FavTodos));

            console.log(Id,newItem);
            return newItem;
        },

        completelist:function(Id,name) {
			
            var Id,newItem;
            console.log(FavTodos);
            //create new id
            Id=(CompleteTodos.length == 0)? 0:CompleteTodos[CompleteTodos.length-1].ID+1;
            console.log(Id);
            //create new item
            newItem=new newcompleteTodo(Id,name,"unFav","complete","day","irremain","notfile","notpriority");
            CompleteTodos.push(newItem); 

            localStorage.setItem('CompleteTodo',JSON.stringify(CompleteTodos));

            console.log(Id,newItem);
            return newItem;
        },

        deleteTodo:function(id){
            var ids,index;
            ids=Todos.map(function(current){
                console.log(id);
                return current.id;
            });
            index=ids.indexOf(id);
            console.log(ids);
            console.log(index);
            if(index!==-1){
                var a=Todos.splice(ids,1);
                console.log(a); 
            }
            localStorage.setItem('TodoList', JSON.stringify(Todos));
        },

        favdeleteTodo:function(id){
            var ids,index;
            ids=FavTodos.map(function(current){
                return current.id;
            });
            index=ids.indexOf(id);

            if(index!==-1){
                FavTodos.splice(index,1);
            }
            localStorage.setItem('FavTodo', JSON.stringify(FavTodos));
        },

        getValues:function() {
                return{
                    Arr : Todos,
					Arr1 : FavTodos
                }
        },
    }
}();

var uicontroller=function(){

    var DOMStrings={
        inputvalue:"#todo-inputbox",
        container:".todo-container",
        favCont:".todo-favourite-div",
        completecont:".todo-complete-div",
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
            var x='<div class="todo-item" id="item-%id%" draggable=true>';
            if(obj.isFav == "Fav" && obj.isComplete == "complete"){
                 x='<div class="todo-item hide" id="item-%id%" draggable=true>';
            }   
            var HTMLString= x+
                            '<input type="checkbox" class="circle-icon" id="complete"></input>'+
                            '<input type="text" class="todo-item-input" id="inputbox" value="%todoName%"></input>'+
                            '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i>'+
                            '</div>'+
                            '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i>'+
                            '</div>';
            var newHtml=HTMLString.replace("%id%",obj.id).replace("%todoName%",obj.todoName);
            if(obj.todoName==''){
                newHtml='';
            }
            container.insertAdjacentHTML('beforeend',newHtml); 
        },

       

        //delete the item ui 
        deleteListitem:function(selectorID){
                var ele=document.getElementById("item-"+selectorID);
                console.log(ele);
                ele.parentNode.removeChild(ele);
        },

        favListItem:function(id,name,fav,comp,day,remain,file,priority){
            var name1=name+"";
            var favCont=document.querySelector(DOMStrings.favCont);
            console.log(favCont);
            var y='<div class="fav-todo-item" id="item-%id%" draggable="true">';
            if(fav == "unFav" && comp == "complete"){
                 y='<div class="fav-todo-item hide" id="item-%id%" draggable="true">';
            } 
            console.log(FavTodos);
        
                var html=y+
                '<input type="checkbox" class="circle-icon" id="complete"></input>'+
                '<input type="text" class="todo-item-input" id="inputbox" value='+name1+'></input>'+
                '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i>'+
                '</div>'+
                '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i>'+
                '</div>';
                var favHtml=html.replace("%id%",id);  
                console.log(FavTodos);
                 
    
            console.log(FavTodos);
            favCont.insertAdjacentHTML('beforeend',favHtml);
            console.log(favCont);
            localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
        },

        completelistitem:function(id,name,fav,comp,day,remain,file,priority){
            var name1=name+"";
            var completecont=document.querySelector(DOMStrings.completecont);
            console.log(completecont);
            if(CompleteTodos.length > 0){
                document.querySelector(".complete-heading").style.display="block";
            }else{
                document.querySelector(".complete-heading").style.display="none`";
            }
            var y='<div class="complete-todo-item" id="item-%id%" draggable="true">';
            if(fav == "Fav" && comp == "incomplete"){
                 y='<div class="complete-todo-item hide" id="item-%id%" draggable="true">';
            } 
            console.log(CompleteTodos);
        
                var html=y+
                '<input type="checkbox" class="circle-icon" id="complete"></input>'+
                '<input type="text" class="todo-item-input" id="inputbox" value='+name1+'></input>'+
                '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i>'+
                '</div>'+
                '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i>'+
                '</div>';
                var completeHtml=html.replace("%id%",id);  
                console.log(CompleteTodos);
                 
    
            console.log(CompleteTodos);
            completecont.insertAdjacentHTML('beforeend',completeHtml);
            console.log(completecont);
            localStorage.setItem('CompleteTodo',JSON.stringify(CompleteTodos));
        },

        favTodo:function(selectorID){            
            var ele=document.getElementById("item-"+selectorID);
            console.log(ele);
            ele.style.display="none";
            localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
        },
        
        favDelitem:function(selectorID) {
                var ele=document.getElementById(selectorID);
                ele.parentNode.removeChild(ele);
                localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
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
        document.querySelector(".categories").addEventListener('click',ctrlcompleteItem);
        document.querySelector(DOM.favCont).addEventListener('click',ctrlFavDeleteitem);
        document.querySelector(DOM.favCont).addEventListener('click',ctrlFavcompleteItem);
        document.querySelector(DOM.favCont).addEventListener('click',ctrlFavouritestarItem);
    };

    var ctrlDeleteitem=function(event){
        var target=event.target.parentNode.parentNode;
            if(event.target.id=="delete"){
                console.log(event.target.id);
                var innerTxt=target.querySelector('input[type=text]').value;
                var itemId=target.id;
                console.log(itemId);
                var splitId,type,ID;
                    if(itemId){
                        console.log(itemId)
                        splitId=itemId.split('-'); 
                        console.log(splitId);
                        type=splitId[0]; 
                        ID=parseInt(splitId[1]);
                        console.log(type);
                        console.log(ID);
                        Datactrl.deleteTodo(ID);
                        UIctrl.deleteListitem(ID);
                    };
                }
    }
    document.querySelector(".todo-container").addEventListener('click',ctrlDeleteitem);

    var ctrlFavouriteitem=function(favour){
        if(favour.target.id==="favourite"){   

            var favouriteId=favour.target.parentNode;
            console.log(favouriteId);
            favouriteId.classList.toggle("hide"); 

            favouriteId.style.display="none";
            var itemId,splitId,ID;
            itemId=favour.target.parentNode.id;

            var innerTxt=favouriteId.querySelector('input[type=text]').value;
            console.log(innerTxt)
                splitId=itemId.split('-'); 
                type=splitId[0]; 
                ID=parseInt(splitId[1]);
                console.log(ID);
            var number=0;
            for(i=0;i<Todos.length;i++){
                console.log(number);
                if(innerTxt==Todos[i].todoName){
                    number=i; 
                    console.log(number);
                }   
            };
            var a=Todos.splice(number,1,{"id":number,"todoName":innerTxt,"isFav":"Fav"});
            console.log(a);
            localStorage.setItem('TodoList', JSON.stringify(Todos));

            document.querySelector(".fav-heading").style.display="block";
            var NEWITEM=dataController.favlist(ID,innerTxt);
            console.log(NEWITEM);
           location.reload();
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
            var favour=favourstar.target.parentNode;
           var favourstarId=favourstar.target.parentNode.id;
           console.log(favourstarId);
                var splitId=favourstarId.split('-'); 
                var  type=splitId[0];
                var ID=parseInt(splitId[1]);
                console.log(ID);
                UIctrl.favTodo(ID);

                var innerTxt=favour.querySelector('input[type=text]').value;
                console.log(innerTxt)
                FavTodos.splice(ID,1,{"id":ID,"todoName":innerTxt,"isFav":"unFav"});
                localStorage.setItem('FavTodo',JSON.stringify(FavTodos));

                console.log(Todos); 
                for(i=0;i<FavTodos.length;i++){
                    if(innerTxt==FavTodos[i].todoName){
                        console.log(innerTxt,FavTodos[i]);
                        FavTodos.splice(i,1);
                    }   
                };

                var num=0;
                for(j=0;j<Todos.length;j++){             
                    console.log(innerTxt);       
                    if(innerTxt==Todos[j].todoName){
                        num=j;   
                    }
                };
                Todos.splice(num,1,{"id":num,"todoName":innerTxt,"isFav":"unFav"});
                console.log(Todos);
                localStorage.setItem('TodoList', JSON.stringify(Todos));
                console.log(innerTxt,Todos[j]);
                localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
                var NEWITEM=uicontroller.favTodo(ID);
                location.reload();
           
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
                    Datactrl.favdeleteTodo(ID);
                    UIctrl.favTodo(ID);
                };
                localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
        }   
    };    

    return{        
        init:function(){
            
            var id,name,fav,day,remain,file,priority;

            settupEventListeners();
            for(var i=0; i<Todos.length;i++){
                UIctrl.addListItem(Todos[i]);
            }   

            for(var j=0;j<FavTodos.length;j++){
                id=FavTodos[j].ID;
                name=FavTodos[j].todoName;
                fav=FavTodos[j].isFav;
                comp=FavTodos[j].isComplete;
                day=FavTodos[j].isday;
                remain=FavTodos[j].isremain;
                file=FavTodos[j].isfile;
                priority=FavTodos[j].priority;
                UIctrl.favListItem(id,name,fav,comp,day,remain,file,priority);
            }

            for(var k=0;k<CompleteTodos.length;k++){
                id=CompleteTodos[k].ID;
                name=CompleteTodos[k].todoName;
                fav=CompleteTodos[k].isFav;
                comp=CompleteTodos[k].isComplete;
                day=CompleteTodos[k].isday;
                remain=CompleteTodos[k].isremain;
                file=CompleteTodos[k].isfile;
                priority=CompleteTodos[k].priority
                UIctrl.completelistitem(id,name,fav,comp,day,remain,file,priority);
            }
        }
    }   
}(dataController,uicontroller)
controller.init();

//add the tasks
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

//complete the tasks
function ctrlcompleteItem(complete){
    if(complete.target.id==="complete"){
        var completeId=complete.target.parentNode;
        completeId.classList.toggle("checked");

        var itemId,splitId,ID;
        itemId=complete.target.parentNode.id;
        var innerTxt=completeId.querySelector('input[type=text]').value;
        console.log(innerTxt)
            splitId=itemId.split('-'); 
            type=splitId[0]; 
            ID=parseInt(splitId[1]);
            console.log(ID);
        var number=0;
        for(i=0;i<Todos.length;i++){
            if(innerTxt==Todos[i].todoName){
                number=i; 
            }   
        };
        Todos.splice(number,1,{"id":number,"todoName":innerTxt,"isFav":"Fav","isComplete":"complete"});
        localStorage.setItem('TodoList', JSON.stringify(Todos));

        document.querySelector(".complete-heading").style.display="block";
        var NEWITEM=dataController.completelist(ID,innerTxt);
        location.reload();
     }
    
};
document.querySelector(".todo-container").addEventListener('click',ctrlcompleteItem);

//drag and drop functions

    function dragStart(ele) {
        this.style.opacity = '0.2';
        dragSrcEl = this;
        ele.dataTransfer.effectAllowed="move";
        ele.dataTransfer.setData('text/html', this.innerHTML);
    };
    
    function dragOver(ele) {
        ele.preventDefault();
        ele.dataTransfer.dropEffect="move";
        return false;
    };

    function dragDrop(e) {
        if (dragSrcEl != this) {
          dragSrcEl.innerHTML = this.innerHTML;
          this.innerHTML = e.dataTransfer.getData('text/html');
        }
        return false;
    };      

    function dragEnd(e) {
        this.style.opacity = '1';
    };
  
    function addEventsDragAndDrop(el) {
        el.addEventListener('dragstart',dragStart,false);
        el.addEventListener('dragover',dragOver,false);
        el.addEventListener('drop',dragDrop,false);
        el.addEventListener('dragend',dragEnd,false);
    };

    var dragitems=document.querySelectorAll(".todo-item");
        [].forEach.call(dragitems, function(item) {
        addEventsDragAndDrop(item);
    });

    var dragfavitems=document.querySelectorAll(".fav-todo-item");
        [].forEach.call(dragfavitems, function(item) {
        addEventsDragAndDrop(item);
    });

    function clickFunction(clk) {              

        var itemId,splitId,ID;
        itemId=clk.target.parentNode.id;
        var item=clk.target.parentNode;
        var innerTxt=item.querySelector('input[type=text]').value;
            if(itemId){
                splitId=itemId.split('-'); 
                type=splitId[0]; 
                ID=parseInt(splitId[1]);
                
                var totalDiv=document.createElement("div");
                totalDiv.className="total-div";
                totalDiv.id="totalId";
        

                if($("#"+itemId).find("#totalId").length == 0){
                    document.getElementById(itemId).style.backgroundColor="#99CCFF";
                    item.querySelector('input[type=text]').style.backgroundColor="#99CCFF";
                    document.querySelector(".iconify").style.color="black";
                    document.querySelector(".daySettings").style.color="black";
                    document.querySelector(".notify").style.color="black";
                    document.querySelector(".remainInput").style.color="black";
                    document.querySelector(".daysettings").innerHTML="Add to my day";

                    document.getElementById(itemId).appendChild(totalDiv);
                }
            }

            //add my day
            function addMyDay(e) {             

                var addInput="Added to My Day";
                var changeInput=document.querySelector(".daySettings");
                changeInput.innerHTML=addInput;
                changeInput.style.color="#67A8F7";
                document.querySelector(".iconify").style.color="#67A8F7";
                document.querySelector("#crossIcon").style.display="block";
                var createDiv=document.createElement("div");
                createDiv.className="newElementClass";
                createDiv.id="element1";
                
                var createSpanhtml=document.createElement("span");
                createSpanhtml.className="spanhtml";
                createSpanhtml.id="html1";
                createSpanhtml.innerHTML="My Day";
                createDiv.appendChild(createSpanhtml);

                var createSpan=document.createElement("span");
                createSpan.className="fas fa-sun icon";
                createDiv.appendChild(createSpan);

                if($("#"+itemId).find("#element1").length == 0){
                    document.querySelector(".total-div").appendChild(createDiv);
                }
               
            }
            document.querySelector(".daySettings").addEventListener('click',addMyDay);

            //file attaching
            function fileAttach() {
                var createDiv=document.createElement("div");
                createDiv.className="newElementClass";
                createDiv.id="element2";
                createDiv.innerHTML="Files Attached";
                
                var createSpan=document.createElement("span");
                createSpan.className="fa fa-paperclip fileAttachIcon";
                createDiv.appendChild(createSpan);

                if($("#"+itemId).find("#element2").length == 0){
                    document.querySelector(".total-div").appendChild(createDiv);
                }
                console.log(ID,innerTxt);

                function myFunction(){
                    document.querySelector(".fileattachDiv").style.display="block";
                    var x = document.getElementById("fileAttach");
                    console.log(x);
                    var txt = "";
                    if ('files' in x) {
                         if (x.files.length == 0) {
                             txt = "Select one or more files.";
                         }else {
                            for(var i=0; i<x.files.length; i++) {
                                var file = x.files[i];
                                if ('name' in file) {
                                    txt +=file.name +"<br>";
                                }
                                if ('size' in file) {
                                    txt +=file.size + " bytes <br>";
                                }
                            }
                         }
                    } 
                    else {
                        if(x.value == "") {
                            txt += "Select one or more files.";
                        }else {
                            txt += "The files property is not supported by your browser!";
                            txt  += "<br>The path of the selected file: " + x.value;  
                        }
                    }
                    document.querySelector(".fileattachDiv").innerHTML = txt;
                }
                document.querySelector(".addFilename").addEventListener('mouseover',myFunction);
            }
            document.querySelector(".addFilename").addEventListener('click',fileAttach);

            //remainder
            function remainderFunction() {
                var count = 0;
                var countButton = document.querySelector(".remainder");
                countButton.onclick = function(){
                    count++;
                    if(count % 2 == 0){
                        document.querySelector(".remainderPopup").style.display="none";
                    } else if(count % 2 != 0){
                        document.querySelector(".remainderPopup").style.display="block";
                    }
                }
            }
            document.querySelector(".remainInput").addEventListener('click',remainderFunction);

            //remainder popup function
            function remainderPopupFunction(e) {

                console.log(e.target.className);
                //get time
                var dateget= new Date();
                var Todaytime=dateget.getHours();

                //get day
                var date = new Date();
                    var weekday = new Array(7);
                    weekday[0] = "Sun";
                    weekday[1] = "Mon";
                    weekday[2] = "Tues";
                    weekday[3] = "Wed";
                    weekday[4] = "Thurs";
                    weekday[5] = "Fri";
                    weekday[6] = "Satur";
                  
                var day = weekday[date.getDay()];

                //later today timesettings
                var time=Todaytime+3 +":00";
                document.querySelector(".TodayTime").textContent=time;
                
                //get tomorrow day & time settings
                    //set day   set time        
                    var day = weekday[date.getDay()+1];
                    var time=Todaytime-10 +":00";
                    document.querySelector(".TomorrowName").textContent=day+' ,'+time;

                //get nextweek day & time settings
                    //set day & set time
                    var day=weekday[1];
                    var time=Todaytime-10 +":00";
                    document.querySelector(".NextweekName").textContent=day+' ,'+time;

                //create div and create span
                    var createDiv=document.createElement("div");
                    createDiv.className="newElementClass";
                    createDiv.id="element3";

                    var createSpan=document.createElement("span");
                    createSpan.className="fas fa-bell note";
                    createDiv.appendChild(createSpan);
                
                 //get latertodayFunction
                function latertodayFunction() {
                    var addInput="Remaind me at ";
                    var numInput=document.querySelector(".TodayTime").innerHTML;
                    var changeInput=document.querySelector(".remainInput");
                    changeInput.innerHTML=addInput +" "+numInput;
                    changeInput.style.color="#67A8F7";
                    document.querySelector(".notify").style.color="#67A8F7";

                    if($("#"+itemId).find("#element3").length == 0){
                        document.querySelector(".total-div").appendChild(createDiv);
                    }
                }
                document.querySelector(".laterToday").addEventListener('click',latertodayFunction);

                //  get tomorrowFunction
                 function tomorrowFunction() {
                    var addInput="Remaind me at ";
                    var numInput=document.querySelector(".TomorrowName").innerHTML;
                    var changeInput=document.querySelector(".remainInput");
                    changeInput.innerHTML=addInput +" "+numInput;
                    changeInput.style.color="#67A8F7";                    
                    document.querySelector(".notify").style.color="#67A8F7";

                    if($("#"+itemId).find("#element3").length == 0){
                        document.querySelector(".total-div").appendChild(createDiv);
                    }
                }
                document.querySelector(".tomorrow").addEventListener('click',tomorrowFunction);

                 //  get tomorrowFunction
                 function nextWeekFunction() {
                    var addInput="Remaind me at ";
                    var numInput=document.querySelector(".NextweekName").innerHTML;
                    var changeInput=document.querySelector(".remainInput");
                    changeInput.innerHTML=addInput +" "+numInput;
                    changeInput.style.color="#67A8F7";                    
                    document.querySelector(".notify").style.color="#67A8F7";

                    if($("#"+itemId).find("#element3").length == 0){
                        document.querySelector(".total-div").appendChild(createDiv);
                    }
                }
                document.querySelector(".nextweek").addEventListener('click',nextWeekFunction);
                
               
            }
            document.querySelector(".remainderPopup").addEventListener('click',remainderPopupFunction);

            //priority popup function

            function priorityPopup() {
                var count = 0;
                var countButton = document.querySelector(".fourthDiv");
                countButton.onclick = function(){
                    count++;
                    console.log(count);
                    if(count % 2 == 0){
                        document.querySelector(".priorityPopup").style.display="none";
                    } else if(count % 2 != 0){
                        document.querySelector(".priorityPopup").style.display="block";
                    }
                }                
            }
            document.querySelector(".priorityInput").addEventListener('click',priorityPopup);

            //priorities function
            // priority1
            function priorityOnefunction() {  
                var createdivpro1=document.createElement("div");
                createdivpro1.className="PriorityOne";
                createdivpro1.id="Red"
                createdivpro1.innerHTML="Priority 1";  
                console.log(createdivpro1);  
                
                document.querySelector(".priorityInput").innerHTML = createdivpro1.innerText;
                if($("#"+itemId).find("#Red").length == 0){
                    document.querySelector(".total-div").appendChild(createdivpro1);
                }

                function createdivpro1function(e){
                    if(e.target.className=="PriorityOne"){
                        var ele=e.target;
                        ele.parentNode.removeChild(ele);
                    }
                }                
                document.querySelector('.PriorityOne').addEventListener('click',createdivpro1function);
            }
            document.querySelector(".firstpriority").addEventListener('click',priorityOnefunction);

            //priority2
            function priorityTwofunction() {    
                var createdivpro2=document.createElement("div");
                createdivpro2.className="PriorityTwo";
                createdivpro2.id="Yellow";
                createdivpro2.innerHTML="Priority 2";
                
                document.querySelector(".priorityInput").innerHTML = createdivpro2.innerText;
                // document.querySelector(".priority2").style.display="block";
                // document.querySelector(".priority2").innerHTML=createdivpro2.innerText;

                if($("#"+itemId).find("#Yellow").length == 0){
                    document.querySelector(".total-div").appendChild(createdivpro2);
                }

                function createdivpro2function(e){
                    if(e.target.className=="PriorityTwo"){
                        var ele=e.target;
                        ele.parentNode.removeChild(ele);
                    }
                }                
                document.querySelector('.PriorityTwo').addEventListener('click',createdivpro2function);
            }
            document.querySelector(".secondpriority").addEventListener('click',priorityTwofunction);

            //priority3
            function priorityThreefunction() {    
                var createdivpro3=document.createElement("div");
                createdivpro3.className="PriorityThree";
                createdivpro3.id="Blue";
                createdivpro3.innerHTML="Priority 3";
                
                document.querySelector(".priorityInput").innerHTML = createdivpro3.innerText;
                // document.querySelector(".priority3").style.display="block";
                // document.querySelector(".priority3").innerHTML=createdivpro3.innerText;

                if($("#"+itemId).find("#Blue").length == 0){
                    document.querySelector(".total-div").appendChild(createdivpro3);
                }

                function createdivpro3function(e){
                    if(e.target.className=="PriorityThree"){
                        var ele=e.target;
                        ele.parentNode.removeChild(ele);
                    }
                }                
                document.querySelector('.PriorityThree').addEventListener('click',createdivpro3function);
            }
            document.querySelector(".thirdpriority").addEventListener('click',priorityThreefunction);
        }         
    document.querySelector(".todo-container").addEventListener('click',clickFunction);
   
    function taskFunction() {
        document.querySelector(".todo-addtasks").style.display="block";
        document.querySelector(".homeIcon").style.color="#4993E9";
        document.querySelector(".addtask").style.color="#4993E9";
        document.querySelector(".todo-header").style.display="block";
        document.querySelector(".favIcon").style.color="black";
        document.querySelector(".addimp").style.color="black";
        document.querySelector(".checkIcon").style.color="black";
        document.querySelector(".addcomplete").style.color="black";
        document.querySelector(".todo-container").style.display="block";
        document.querySelector(".todo-favourite-div").style.display="none";
        document.querySelector(".todo-complete-div").style.display="none";
    }
    document.querySelector(".tasks").addEventListener('click',taskFunction);

    function favFunction() {
        document.querySelector(".todo-addtasks").style.display="none";
        document.querySelector(".todo-header").style.display="none";
        document.querySelector(".favIcon").style.color="#4993E9";
        document.querySelector(".addimp").style.color="#4993E9";
        document.querySelector(".homeIcon").style.color="black";
        document.querySelector(".addtask").style.color="black";
        document.querySelector(".checkIcon").style.color="black";
        document.querySelector(".addcomplete").style.color="black";
        document.querySelector(".fav-heading").style.display="block";
        document.querySelector(".todo-container").style.display="none";
        document.querySelector(".todo-favourite-div").style.display="block";
        document.querySelector(".todo-complete-div").style.display="none";
    }
    document.querySelector(".important").addEventListener('click',favFunction);

    function completefunction(){
        document.querySelector(".todo-addtasks").style.display="none";
        document.querySelector(".todo-header").style.display="none";
        document.querySelector(".checkIcon").style.color="#4993E9";
        document.querySelector(".addcomplete").style.color="#4993E9";
        document.querySelector(".homeIcon").style.color="black";
        document.querySelector(".addtask").style.color="black";
        document.querySelector(".favIcon").style.color="black";
        document.querySelector(".addimp").style.color="black";
        document.querySelector(".todo-container").style.display="none";
        document.querySelector(".todo-favourite-div").style.display="none";
        document.querySelector(".todo-complete-div").style.display="block";
    }
    document.querySelector(".completed").addEventListener("click",completefunction);

    document.querySelector(".noofTasks").textContent=Todos.length;
    document.querySelector(".nooffavTasks").textContent=FavTodos.length;
    document.querySelector(".noofcompletetasks").textContent=CompleteTodos.length;