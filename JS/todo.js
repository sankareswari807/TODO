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
    
    var Todos=(localStorage.TodoList)?(JSON.parse(localStorage.TodoList)):todoItems;
    console.log(Todos);
    localStorage.setItem('TodoList',JSON.stringify(Todos));

    var FavTodos=(localStorage.FavTodo)?(JSON.parse(localStorage.FavTodo)):favTodoList;
    console.log(FavTodos);
    //localStorage.setItem('FavTodo',JSON.stringify(FavTodos));

var dataController=function(){
    return{
        //Add the item
        addNewTodo:function() {
            var Id,todoName,optionPlace,newItem,optionDate;
            //create new id
            Id=(Todos.length == 0)? 0:Todos[Todos.length-1].id+1;

            //create todoname
            todoName=document.getElementById("todo-inputbox").value;

            //create new item
            newItem=new newTodo(Id,todoName,"unFav",optionPlace,optionDate);
            
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
            var x='<div class="todo-item" id="item-%id%" draggable=true>';
            if(obj.isFav == "Fav"){
                 x='<div class="todo-item hide" id="item-%id%" draggable=true>';
            }   
            var HTMLString= x+
                            '<input type="checkbox" class="circle-icon" id="complete"></input>'+
                            '<div class="todo-item-input" id="inputbox" >%todoName%</div>'+
                            '<input type="button" id="edit" class="edit-btn" value="Save"></input>'+
                            '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div>'+
                            '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favourite"></i>'+
                            '</div>';
            var newHtml=HTMLString.replace("%id%",obj.id).replace("%todoName%",obj.todoName).replace("%placecategory%",obj.place).replace("%datecategory%",obj.date);
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

        favListItem:function(id,name,fav){
            console.log(id,name,fav);
            var name1=name+"";
            var favCont=document.querySelector(DOMStrings.favCont);
            console.log(favCont);
            if(FavTodos.length > 0){
                document.querySelector(".fav-heading").style.display="block";
            }else{
                document.querySelector(".fav-heading").style.display="none`";
            }
            var y='<div class="fav-todo-item" id="item-%id%" draggable="true">';
            if(fav == "unFav"){
                 y='<div class="fav-todo-item hide" id="item-%id%" draggable="true">';
            } 
            console.log(FavTodos);
        
                var html=y+
                         '<input type="checkbox" class="circle-icon" id="complete"></input>'+
                         '<div class="todo-item-input" id="inputbox" >'+name1+'</div>'+
                         '<input type="button" id="edit" class="edit-btn" value="Save"></input>'+
                         '<div class="todo-remove"><i class="fa fa-trash-o remove-icon" style="font-size:34px" id="delete"></i></div>'+      
                         '<i class="fa fa-star-o favourite-icon" style="font-size:34px"; id="favouritestar"></i></div>';
                var favHtml=html.replace("%id%",id);  
                console.log(FavTodos);
                 
    
            console.log(FavTodos);
            favCont.insertAdjacentHTML('beforeend',favHtml);
            console.log(favCont);
            localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
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
        document.querySelector(DOM.container).addEventListener('click',ctrlcompleteItem);
        document.querySelector(".categories").addEventListener('click',ctrlcompleteItem);
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
                console.log(ID);
            var number=0;
            for(i=0;i<Todos.length;i++){
                if(innerTxt==Todos[i].todoName){
                    number=i; 
                }   
            };
            Todos.splice(number,1,{"id":number,"todoName":innerTxt,"isFav":"Fav"});
            localStorage.setItem('TodoList', JSON.stringify(Todos));

            document.querySelector(".fav-heading").style.display="block";
           //UIctrl.favListItem(favTodoList);
           var NEWITEM=dataController.favlist(ID,innerTxt);
        //    UIctrl.favListItem(innerTxt);
           console.log(NEWITEM);
           console.log(Todos);
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

                //Todos.splice(ID,0,{"id":ID,"todoName":innerTxt,"isFav":"unFav"});
               // localStorage.setItem('TodoList', JSON.stringify(Todos));
                console.log(Todos);
                var num=0;
                for(j=0;j<Todos.length;j++){             
                    console.log(innerTxt);       
                    if(innerTxt==Todos[j].todoName){
                        // Todos.splice(j,0);
                        num=j;   
                    }
                };
                Todos.splice(num,1,{"id":num,"todoName":innerTxt,"isFav":"unFav"});
                        console.log(Todos);
                        localStorage.setItem('TodoList', JSON.stringify(Todos));
                        console.log(innerTxt,Todos[j]);
                //location.reload();
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
                    //console.log(splitId+","+type+","+ID);
                    Datactrl.favdeleteTodo(ID);
                    UIctrl.favTodo(ID);
                };
                localStorage.setItem('FavTodo',JSON.stringify(FavTodos));
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
                var id=FavTodos[j].ID;
                var name=FavTodos[j].todoName;
                var fav=FavTodos[j].isFav;
                console.log(id,name,fav);
                UIctrl.favListItem(id,name,fav);
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


    function clickFunction(e) {
        var target=e.target.className;
        if(target == "todo-item"){              
            // console.log("baby");
            document.querySelector(".categories").style.display="block";
            document.querySelector(".todo-addtasks").style.width="900px";
            document.querySelector(".todo-addtasks").style.marginTop="-590px";
            document.querySelector(".TODO").style.width="50%";
            var input=document.querySelectorAll("#inputbox");
            var del=document.querySelectorAll("#delete");
            var fav=document.querySelectorAll("#favourite");
            for(var i=0; i<input.length; i++){
                del[i].style.marginLeft="850px";
                fav[i].style.marginLeft="800px";
            }   

            //set the inputName
            var gettodoname=e.target.innerText;
            document.querySelector(".inputName").innerHTML = gettodoname;

            //add my day
            function addMyDay() {
                // console.log("add to my day");
                var addInput="Added to My Day";
                document.querySelector(".todo-item-input").style.marginTop="-50px";
                var changeInput=document.querySelector(".daySettings");
                changeInput.innerHTML=addInput;
                changeInput.style.color="#67A8F7";
                document.querySelector(".iconify").style.color="#67A8F7";
                document.querySelector("#crossIcon").style.display="block";

                var createDiv=document.createElement("div");
                createDiv.className="newElementClass";
                createDiv.innerHTML="My Day";
                document.querySelector(".todo-item-input").appendChild(createDiv);

                var createSpan=document.createElement("span");
                createSpan.className="fas fa-sun icon";
                createDiv.appendChild(createSpan);
            }
            document.querySelector(".daySettings").addEventListener('click',addMyDay);
            
            //remove my day
            function removeMyDay() {
                console.log("remove my day");   
                var removeInput="Add My Day"
                var changeInput=document.querySelector(".daySettings");
                changeInput.innerHTML=removeInput;
                changeInput.style.color="gray";
                document.querySelector(".iconify").style.color="gray";
                document.querySelector(".todo-item-input").style.marginTop="-28px";
                document.querySelector("#crossIcon").style.display="none";
                document.querySelector(".newElementClass").remove();
            }
            document.querySelector("#crossIcon").addEventListener('click',removeMyDay);

            //file attaching
            function fileAttach() {
                // console.log("file attached");
                document.querySelector(".todo-item-input").style.marginTop="-50px";
                document.querySelector(".fileattachDiv").style.display="block";
                var createDiv=document.createElement("div");
                createDiv.className="newElementClass1";
                createDiv.innerHTML="Files Attached";
                createDiv.style.color="black";
                document.querySelector(".todo-item-input").appendChild(createDiv);
                var createSpan=document.createElement("span");
                createSpan.className="fa fa-paperclip fileAttachIcon";
                createDiv.appendChild(createSpan);

                function myFunction(){
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
                document.querySelector(".addFile").addEventListener('mouseover',myFunction);
            }
            document.querySelector(".addFile").addEventListener('click',fileAttach);

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

                    //set day          
                    var day = weekday[date.getDay()+1];
                    //set time
                    var time=Todaytime-10 +":00";
                    document.querySelector(".TomorrowName").textContent=day+' ,'+time;

                //get nextweek day & time settings

                    //set day
                    var day=weekday[1];
                    //set time
                    var time=Todaytime-10 +":00";
                    document.querySelector(".NextweekName").textContent=day+' ,'+time;

                 //get latertodayFunction
                function latertodayFunction() {
                    document.querySelector(".todo-item-input").style.marginTop="-50px";

                    var createDiv=document.createElement("div");
                    createDiv.className="newElementClass2";
                    document.querySelector(".todo-item-input").appendChild(createDiv);

                    var createSpan=document.createElement("span");
                    createSpan.className="fas fa-bell note";
                    createDiv.appendChild(createSpan);  
      
                    var addInput="Remaind me at ";
                    var numInput=document.querySelector(".TodayTime").innerHTML;
                    var changeInput=document.querySelector(".remainInput");
                    changeInput.innerHTML=addInput +" "+numInput;
                    changeInput.style.color="#67A8F7";
                    document.querySelector(".notify").style.color="#67A8F7";
                }
                document.querySelector(".laterToday").addEventListener('click',latertodayFunction);

                //  get tomorrowFunction
                 function tomorrowFunction() {
                    document.querySelector(".todo-item-input").style.marginTop="-50px";

                    var createDiv=document.createElement("div");
                    createDiv.className="newElementClass2";
                    document.querySelector(".todo-item-input").appendChild(createDiv);
                    var createSpan=document.createElement("span");
                    createSpan.className="fas fa-bell note";
                    createDiv.appendChild(createSpan);

                    var addInput="Remaind me at ";
                    var numInput=document.querySelector(".TomorrowName").innerHTML;
                    var changeInput=document.querySelector(".remainInput");
                    changeInput.innerHTML=addInput +" "+numInput;
                    changeInput.style.color="#67A8F7";                    
                    document.querySelector(".notify").style.color="#67A8F7";
                }
                document.querySelector(".tomorrow").addEventListener('click',tomorrowFunction);

                 //  get tomorrowFunction
                 function nextWeekFunction() {
                    document.querySelector(".todo-item-input").style.marginTop="-50px";

                    var createDiv=document.createElement("div");
                    createDiv.className="newElementClass2";
                    document.querySelector(".todo-item-input").appendChild(createDiv);

                    var createSpan=document.createElement("span");
                    createSpan.className="fas fa-bell note";
                    createDiv.appendChild(createSpan);
                     
                    var addInput="Remaind me at ";
                    var numInput=document.querySelector(".NextweekName").innerHTML;
                    var changeInput=document.querySelector(".remainInput");
                    changeInput.innerHTML=addInput +" "+numInput;
                    changeInput.style.color="#67A8F7";                    
                    document.querySelector(".notify").style.color="#67A8F7";
                }
                document.querySelector(".nextweek").addEventListener('click',nextWeekFunction);

                //pick  date function
                function pickdatefunction(){
                    $( function() {
                        $( ".pickdatetimeRemain" ).datepicker();
                      } );
                }
                document.querySelector(".pickdatetimeRemain").addEventListener('click',pickdatefunction); 
                
                //remove remainderfunction
            function removeremainderfunction() {
                // console.log("remove my day");   
                var removeInput="Remaind Me"
                var changeInput=document.querySelector(".remainInput");
                changeInput.innerHTML=removeInput;
                changeInput.style.color="gray";
                document.querySelector(".notify").style.color="gray";
                document.querySelector("#crossIcon").style.display="none";
                document.querySelector(".newElementClass").remove();
            }
            document.querySelector("#crossIcon").addEventListener('click',removeremainderfunction);
            }
            document.querySelector(".remainderPopup").addEventListener('click',remainderPopupFunction);

            //due date & time
            function dueFunction() {
                var count = 0;
                var countButton = document.querySelector(".duedate");
                countButton.onclick = function(){
                    count++;
                    if(count % 2 == 0){
                        document.querySelector(".duePopup").style.display="none";
                    } else if(count % 2 != 0){
                        document.querySelector(".duePopup").style.display="block";
                    }
                }
            }
            document.querySelector(".dateInput").addEventListener('click',dueFunction);

            //due popup function
            function duepopupFunction() {

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

                //get today
                function todayFunction(){
                    document.querySelector(".TodayName").textContent=day;
                }
                todayFunction();

                //get tomorrow
                function tomorrowFunction(){                  
                    var tomday = weekday[date.getDay()+1];
                    console.log(tomday);
                    document.querySelector(".TomorrowName").textContent=tomday;
                }
                tomorrowFunction();

                //get nextweek
                function nextWeekFunction() {
                    var nexday=weekday[1];
                    console.log(nexday);
                    document.querySelector(".NextweekName").textContent=nexday;
                }
                nextWeekFunction();

                //pick date & time
                function datefunction(){
                    $( function() {
                        $( ".pickdatetimeDue" ).datepicker();
                      } );
                }
                document.querySelector(".pickdatetimeDue").addEventListener('click',datefunction); 
            }
            document.querySelector(".duePopup").addEventListener('click',duepopupFunction);   

            //category popup function

            function categoryPopup() {
                var count = 0;
                var countButton = document.querySelector(".fourthDiv");
                countButton.onclick = function(){
                    count++;
                    console.log(count);
                    if(count % 2 == 0){
                        document.querySelector(".categoryPopup").style.display="none";
                    } else if(count % 2 != 0){
                        document.querySelector(".categoryPopup").style.display="block";
                    }
                }                
            }
            document.querySelector(".categoryInput").addEventListener('click',categoryPopup);

            //colors function
            // color - red
            function redfunction(e) {
                console.log("red");    
                document.querySelector(".todo-item-input").style.marginTop="-50px";
                var createdivred=document.createElement("div");
                createdivred.className="divred";
                createdivred.innerHTML="Red Category";  
                console.log(createdivred);  
                document.querySelector(".todo-item-input").appendChild(createdivred);
                document.querySelector(".categoryInput").innerHTML = createdivred.innerText;
                function createdivredfunction(e){
                    if(e.target.className=="divred"){
                        var ele=e.target;
                        ele.parentNode.removeChild(ele);
                    }
                }                
                document.querySelector('.divred').addEventListener('click',createdivredfunction);
            }
            document.querySelector(".redcolor").addEventListener('click',redfunction);
            //color - yellow
            function yellowfunction() {
                console.log("yellow");    
                var createdivyellow=document.createElement("div");
                createdivyellow.className="divyellow";
                createdivyellow.innerHTML="Yellow Category";
                document.querySelector(".fourthDiv").appendChild(createdivyellow);
                document.querySelector(".todo-item-input").appendChild(createdivyellow);
                document.querySelector(".categoryInput").innerHTML = createdivyellow.innerText;
                function createdivyellowfunction(e){
                    if(e.target.className=="divyellow"){
                        var ele=e.target;
                        ele.parentNode.removeChild(ele);
                    }
                }                
                document.querySelector('.divyellow').addEventListener('click',createdivyellowfunction);
            }
            document.querySelector(".yellowcolor").addEventListener('click',yellowfunction);
            //color - blue
            function bluefunction() {
                console.log("blue");  
                var createdivblue=document.createElement("div");
                createdivblue.className="divblue";
                createdivblue.innerHTML="Blue Category";
                document.querySelector(".fourthDiv").appendChild(createdivblue); 
                document.querySelector(".todo-item-input").appendChild(createdivblue); 
                document.querySelector(".categoryInput").innerHTML = createdivblue.innerText;
                function createdivbluefunction(e){
                    if(e.target.className=="divblue"){
                        var ele=e.target;
                        ele.parentNode.removeChild(ele);
                    }
                }                
                document.querySelector('.divblue').addEventListener('click',createdivbluefunction);
            }
            document.querySelector(".bluecolor").addEventListener('click',bluefunction);
            //color- green
            function greenfunction() {
                console.log("green");    
                var createdivgreen=document.createElement("div");
                createdivgreen.className="divgreen";
                createdivgreen.innerHTML="Green Category";
                document.querySelector(".fourthDiv").appendChild(createdivgreen); 
                document.querySelector(".todo-item-input").appendChild(createdivgreen);
                document.querySelector(".categoryInput").innerHTML = createdivgreen.innerText;
                function createdivgreenfunction(e){
                    if(e.target.className=="divgreen"){
                        var ele=e.target;
                        ele.parentNode.removeChild(ele);
                    }
                }                
                document.querySelector('.divgreen').addEventListener('click',createdivgreenfunction);
            }
            document.querySelector(".greencolor").addEventListener('click',greenfunction);
            //color - purple
            function purplefunction() {
                console.log("purple");    
                var createdivpurple=document.createElement("div");
                createdivpurple.className="divpurple";
                createdivpurple.innerHTML="Purple Category";
                document.querySelector(".fourthDiv").appendChild(createdivpurple); 
                document.querySelector(".todo-item-input").appendChild(createdivpurple);
                document.querySelector(".categoryInput").innerHTML = createdivpurple.innerText;
                function createdivpurplefunction(e){
                    if(e.target.className=="divpurle"){
                        var ele=e.target;
                        ele.parentNode.removeChild(ele);
                    }
                }                
                document.querySelector('.divpurple').addEventListener('click',createdivpurplefunction);
            }
            document.querySelector(".purplecolor").addEventListener('click',purplefunction);
            //color - orange
            function orangefunction() {
                console.log("orange");    
                var createdivorange=document.createElement("div");
                createdivorange.className="divorange";
                createdivorange.innerHTML="Orange Category";
                document.querySelector(".fourthDiv").appendChild(createdivorange);
                document.querySelector(".todo-item-input").appendChild(createdivorange); 
                document.querySelector(".categoryInput").innerHTML = createdivorange.innerText;
                function createdivorangefunction(e){
                    if(e.target.className=="divorange"){
                        var ele=e.target;
                        ele.parentNode.removeChild(ele);
                    }
                }                
                document.querySelector('.divorange').addEventListener('click',createdivorangefunction);
            }
            document.querySelector(".orangecolor").addEventListener('click',orangefunction);
        }         
    }

    document.querySelector(".todo-container").addEventListener('click',clickFunction);


    function taskFunction() {
        document.querySelector(".todo-container").style.display="block";
        document.querySelector(".todo-addtasks").style.display="block";
        document.querySelector(".homeIcon").style.color="#4993E9";
        document.querySelector(".addtask").style.color="#4993E9";
        document.querySelector(".todo-header").style.display="block";
        document.querySelector(".favIcon").style.color="grey";
        document.querySelector(".addimp").style.color="grey";
    }
    document.querySelector(".tasks").addEventListener('click',taskFunction);

    function favFunction() {
        document.querySelector(".todo-container").style.display="none";
        document.querySelector(".todo-favourite-div").style.display="block";
        document.querySelector(".todo-addtasks").style.display="none";
        document.querySelector(".todo-header").style.display="none";
        document.querySelector(".favIcon").style.color="#4993E9";
        document.querySelector(".addimp").style.color="#4993E9";
        document.querySelector(".homeIcon").style.color="grey";
        document.querySelector(".addtask").style.color="grey";
    }
    document.querySelector(".important").addEventListener('click',favFunction);