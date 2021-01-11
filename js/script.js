showNotes();
// addnote
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click',function(e) {
	let noteTitle = document.getElementById("noteTitle");
	let noteTxt = document.getElementById("noteTxt");
	let notes = localStorage.getItem("notes");
	if(notes == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notes);
	}
	let myObj = {
		title : noteTitle.value,
		text : noteTxt.value
	} 
	notesObj.push(myObj);
	localStorage.setItem("notes",JSON.stringify(notesObj));
	noteTitle.value = "";
	noteTxt.value = "";
	showNotes();
})

function showNotes(){
	let noteTitle = document.getElementById("noteTitle");
	let noteTxt = document.getElementById("noteTxt");
	let notes = localStorage.getItem("notes");
	if(notes == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notes);
	}
	let html = "";
	notesObj.forEach(function(element,index){
		html += 
		`
		<div class="noteCard card mx-3 my-2" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="delete_note(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>
		`;
	});
	let noteEle = document.getElementById("notes");
	if(notesObj.length != 0){
		noteEle.innerHTML = html;
	}
	else{
		noteEle.innerHTML = `Nothing to show ! 'Add a note ' from the above to show note`;
		noteEle.style.marginTop = '5px';
		noteEle.style.marginLeft = '3px';
	}
}
// function to delete note
function delete_note(index){
	let notes = localStorage.getItem("notes");
	if(notes == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notes);
	}

	notesObj.splice(index,1);
	localStorage.setItem("notes",JSON.stringify(notesObj));
	showNotes();
}
// searching Logic
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener('click',function(e) {
	e.preventDefault();
	let noteCard = document.getElementsByClassName("noteCard");
	let searchItem = document.getElementById("searchItem").value.toLowerCase();
	Array.from(noteCard).forEach(function(ele) {
		let p = ele.querySelectorAll("h5")[0].innerText.toLowerCase();
		if(p.includes(searchItem)){
			ele.style.display = "block";
		}
		else{
			ele.style.display = "none";
		}
	})

})