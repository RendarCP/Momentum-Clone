const todoForm = document.querySelector(".js-toDoForm"),
    toDoInput = todoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    todoDiv = document.querySelector(".wrapper"),
    toDoAllDelete = todoDiv.querySelector("button");

const TODOS_LS = 'toDos';

let toDos = [];

function allDeleteTodo(event){
    if(localStorage.getItem('toDos') !== null){ // 목록이있을때만 다 지우도록 기능함
        localStorage.removeItem('toDos');
        toDoList.innerHTML = "";
        //location.reload();
    }
    else{
        alert("목록에 아무것도 없습니다");
    }
    const deleteBtn = event.target;
  //  localStorage.removeItem('toDos');
  //  location.reload();
}

function deleteToDo(event){
    const btn = event.target; //evnet의 타깃을 잡음
    const li = btn.parentNode; //부모를 찾음
    toDoList.removeChild(li); //자식을 지움 
    const cleanToDos = toDos.filter(function(toDo){ //todo를 지우고나서 다시 저장하는 방식 
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; //리프레쉬시에 지운정보가 나타나지 않게 기존 정보만 저장 
    saveToDos();   // 
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //JSON.stringify object를 string으로 변환해줌
}

function paintToDo(text){ //Todollist를 보여주게함 
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1; //초기값을 1로만들기위해서 
    delBtn.classList.add("listDelete");
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    //li.appendChild(delBtn); //appendChild -> 부모노드에 붙힘 
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId //초기값을 1로만들기위해서 
    };
    toDos.push(toDoObj);
    saveToDos(); //이곳에서 호출해야됨 ---> 전에 호출하면 저장된 정보가 없음
}

function handleSubmit(event){ // 엔터칠시 발생하는 이벤트
    event.preventDefault();
    const currentValue = toDoInput.value;
    if(currentValue ===""){ //할일은 적을때만 가능하도록 
        alert("할 일을 적어주세요");
    }
    else{
        paintToDo(currentValue);
        toDoInput.value = "";
    }
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        // parsedToDos.forEach(function(toDo){ //함수를 안에서 선언하여 
        //     paintToDo(toDo.text); // todo를 그리도록함 
        // })
        parsedToDos.forEach((toDo)=>{ //함수를 안에서 선언하여     es6 적용
            paintToDo(toDo.text); // todo를 그리도록함 
        })
    }
}

function init(){
    loadToDos();
    todoForm.addEventListener("submit",handleSubmit);
    toDoAllDelete.addEventListener("click",allDeleteTodo);
}

init();