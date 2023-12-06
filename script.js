
var inputContent = document.getElementById("inputcont");
var canceBtn = document.getElementById("cancel");
canceBtn.addEventListener("click", () => {
    inputContent.classList.remove("display-none");
});

// localStorage.removeItem("tasks"); used for delte local storage

var disInp = document.querySelector(".background-inp").addEventListener("click", () => {
    inputContent.classList.add("display-none");
});

document.querySelector("#add-btn").addEventListener("click", (e) => {
    e.preventDefault();
    
    var title = document.querySelector("#title").value;
    var dueDate = document.querySelector("#due").value;
    var descR = document.querySelector("#des").value;


    if (title === "" || dueDate === "" || descR === "") {
        alert("Enter all fields");
    } else {
        addItem(title, dueDate, descR);
        inputContent.classList.remove("display-none");
        cleanfield();
       
    }
});

var mainCon = document.querySelector(".task-area");

function showdata() {
    var storedData = localStorage.getItem("data");
    if (storedData) {
        mainCon.innerHTML = storedData;
        deletebtns();
        edutbtns();
    }
}
showdata();

function addItem(title, dueDate, descR) {
    var taskContent = document.createElement("div");
    taskContent.classList.add("task-content")
    taskContent.innerHTML = `<p class="task-hed">${title}</p>
    <p class="task-date">${dueDate}</p>
    <p class="task-para">${descR}</p>
    <div class="icons">
    <i class="fa-regular fa-pen-to-square edit"></i>
    <i class="fa-solid fa-trash delete"></i>
</div>`;
mainCon.appendChild(taskContent);
storedata()

edutbtns();
deletebtns();

}



function cleanfield(){
    document.querySelector("#title").value = "";
    document.querySelector("#due").value = "";
    document.querySelector("#des").value = "";
}
cleanfield();

//edit the content
function edutbtns (){
    var editButton = document.querySelectorAll(".edit");
    editButton.forEach( (btn, i)=>{
    btn.addEventListener("click",()=>{
        inputContent.classList.add("display-none");
        document.querySelector("#des").value = btn.parentElement.previousElementSibling.innerHTML;
        document.querySelector("#due").value = btn.parentElement.previousElementSibling.previousElementSibling.innerHTML;
        document.querySelector("#title").value = btn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        document.querySelector("#add-btn").addEventListener("click",()=>{
            btn.parentElement.parentElement.remove();
        })
        document.querySelector("#cancel").addEventListener("click", (e)=>{
            cleanfield();
            e.parentElement.parentElement.remove();
           

        })
           
        
  })
    });
    storedata()

       }


// function edutbtns (){
//     var editButton = document.querySelectorAll(".edit");
//     editButton.forEach( (btn, i)=>{
//     btn.addEventListener("click",()=>{
//         var container = document.querySelectorAll(".task-content");
//         container[i].classList.toggle("edited");
          
//            var heding = document.querySelectorAll(".task-hed")
//            heding.forEach( (clk)=>{
//             clk.setAttribute("contenteditable","true");
//             clk.classList.add("no");
//            })
//            var dateed = document.querySelectorAll(".task-date");
//            dateed.forEach( (clk)=>{
//             clk.setAttribute("contenteditable","true");
//             clk.classList.add("no");
//            })
//            var parag = document.querySelectorAll(".task-para");
//             parag.forEach( (clk)=>{
//             clk.setAttribute("contenteditable","true");
//             clk.classList.add("no");
//            })
//         })             
//   })
  
//     storedata()
//  }


//delte the content
function deletebtns() {
    var deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            btn.parentElement.parentElement.remove();
            storedata(); // Update local storage after deleting a task
        });
    });
}
function storedata(){
    localStorage.setItem("data",mainCon.innerHTML);
}
