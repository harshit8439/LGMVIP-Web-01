const addTaskBtn=document.getElementById("addTask");
const tasktextField=document.getElementById("taskname");
const recordDisplay=document.getElementById("records");
const btnText=addTaskBtn.innerText;
let taskArray=[];
let edit_id=null;

let objStr=localStorage.getItem('tasks');
if(objStr!=null)
{
    taskArray=JSON.parse(objStr);
}
DisplayInfo();
tasktextField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Prevent the default Enter key behavior (form submission)
      event.preventDefault();
  
      // Trigger the button click
      addTaskBtn.click();
    }
  });
  

// Implement a function to get the index of the selected row
function getSelectedRowIndex() {
    const selectedRow = document.querySelector("tr.selected"); // Add a "selected" class to the selected row
    if (selectedRow) {
        return parseInt(selectedRow.getAttribute("data-index"));
    }
    return -1; // Return -1 if no row is selected
}

addTaskBtn.onclick=()=>{
    const name=tasktextField.value;
    if(edit_id!=null)
    {
        //edit kro
        taskArray.splice(edit_id,1,{'name':name});
        edit_id=null;
    }
    else{
        //insert kro
        taskArray.push({'name':name});
    }
   
   
    // console.log(taskArray);
    SaveInfo(taskArray);
    tasktextField.value='';//to reset the text field after clicking on the add button
    DisplayInfo();
    addTaskBtn.innerText=btnText;
}

function SaveInfo(taskArray){
    let str=JSON.stringify(taskArray);
    localStorage.setItem('tasks',str); //local storage only takes string so first convert the array objectc into a string then it will work perfectly
}
function DisplayInfo(){
    let display='';
    taskArray.forEach((task,i)=>{
        display +=`<tr>
        <th scope="row">${i+1}</th>
        <td>${task.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i><i class="btn btn-danger text-white fa fa-trash " onclick='DeleteInfo(${i})'></i></td>
     </tr>`;
    });
    recordDisplay.innerHTML=display;
}
function EditInfo(id){
    edit_id=id;
    tasktextField.value=taskArray[id].name;
    addTaskBtn.innerText="Save Changes";
}
function DeleteInfo(id){
    taskArray.splice(id,1);//it deletes as well as adds the element:1-to delete the items and 0 to add the items
    SaveInfo(taskArray);
    DisplayInfo();
}
