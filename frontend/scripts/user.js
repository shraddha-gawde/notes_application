function getData() {
    fetch("https://long-teal-fossa-wig.cyclic.app/users", {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.notes_data);
        displayNotes(data);
      })
      .catch((err) => console.log(err));
  }
  
  function displayNotes(data) {
    const noteList = document.getElementById("note-card-list");
    const notes = data.notes_data;
  
    notes.forEach((note) => {
      const noteCard = document.createElement("div");
      noteCard.classList.add("note-card");
  
      const title = document.createElement("h3");
      title.innerText = note.title;
  
      const content = document.createElement("p");
      content.innerText = note.body;
  
      const editBtn = document.createElement("button");
      editBtn.className = "btn1";
      editBtn.innerText = "Edit";
      editBtn.addEventListener("click", () => {
          openEditModal(note._id, note.title, note.body);
        });
  
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn1";
      deleteBtn.innerText = "Delete";
      deleteBtn.addEventListener("click", () => {
          deleteNote(note._id)
      });
  
      noteCard.append(title, content, editBtn, deleteBtn);
      
  
      noteList.appendChild(noteCard);
    });
  }
  
  getData();