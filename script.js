// NOTES
function addNote() {
  let input = document.getElementById("noteInput");
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.push(input.value);
  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();
  input.value = "";
}

function displayNotes() {
  let list = document.getElementById("notesList");
  list.innerHTML = "";

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach(note => {
    let li = document.createElement("li");
    li.innerText = note;
    list.appendChild(li);
  });
}

// TIMETABLE
function addTimetable() {
  let subject = document.getElementById("subject").value;
  let time = document.getElementById("time").value;

  let timetable = JSON.parse(localStorage.getItem("timetable")) || [];

  timetable.push(subject + " - " + time);
  localStorage.setItem("timetable", JSON.stringify(timetable));

  displayTimetable();
}

function displayTimetable() {
  let list = document.getElementById("timetableList");
  list.innerHTML = "";

  let timetable = JSON.parse(localStorage.getItem("timetable")) || [];

  timetable.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

// AI CHAT (SMART FEEL)
async function chat() {
  let input = document.getElementById("chatInput").value.toLowerCase();
  let output = document.getElementById("chatOutput");

  // 🔥 PREDEFINED Q&A (DEMO BOOST)
  if (input.includes("study")) {
    output.innerText = "Use Pomodoro technique: 25 min study + 5 min break 📚";
    return;
  }

  if (input.includes("time table")) {
    output.innerText = "You can manage your timetable in the section above 📅";
    return;
  }

  if (input.includes("notes")) {
    output.innerText = "Use Notes section to store and organize your study material 📝";
    return;
  }

  if (input.includes("hello") || input.includes("hi")) {
    output.innerText = "Hey! I'm your Smart College Assistant 🤖";
    return;
  }

  // 🤖 TRY REAL AI (if working)
  output.innerText = "Thinking... 🤖";

  try {
    let response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    let data = await response.json();
    output.innerText = data.reply || "AI not available, but system is ready 🚀";

  } catch (error) {
    // 🔥 FALLBACK
    output.innerText = "AI is currently unavailable, but I'm here to help you manage your tasks efficiently 🚀";
  }
}

// LOAD DATA
window.onload = function() {
  displayNotes();
  displayTimetable();
}