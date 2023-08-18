import './App.css';
import { Link, Routes, Route, useNavigate } from "react-router-dom";

var counter = 0;
const kids = ["Jacob", "Hailey", "Ben", "Cora"];

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="confirm" element={<Confirm />} />
        <Route path="history" element={<History />} />
      </Routes>
    </div>
  );
}

function MainLayout() {
  const navigate = useNavigate();
  fetch('http://192.168.0.128:3002/api/v2/dishwasher_turns', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < kids.length; i++) {
        if (data[data.length - 1].name == kids[i]) {
          counter = (i + 1) % 4;
          document.getElementById("turn_name").innerHTML = "<h1>" + kids[counter] + "'s</h1>";
          break;
        }
      }
    })
    .catch(error => {
      console.log("Error: " + error);
    });

  return (
    <div>
      <header className="App-header" id="main-header">
        <p>
          It is currently
        </p>
        <div id="turn_name">
          <h1> waiting... </h1>
        </div>
        <p>
          turn to unload the dishwasher
        </p>
        <button className="button_finished" onClick={(e) => {
          e.preventDefault();
          navigate("/confirm");
        }}>I finished unloading it!</button>
        <br></br><br></br>
        <Link to="history">View History</Link>
        {/* <a href="http://192.168.0.128:3002/api/v2/dishwasher_turns" id="history-link">View History</a> */}
      </header>
    </div>
  );
}

function Confirm() {
  const navigate = useNavigate();
  var inorder = true;
  var tempCount = counter;

  return (
    <div>
      <div id="confirmation">
        <button className="button_finished" id="button_finished" onClick={(e) => {
          const button = document.querySelector('.button_finished');
          e.preventDefault();
          fetch('http://192.168.0.128:3002/api/v2/dishwasher_turns', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "dishwasher_turn": {
                "name": kids[counter],
                "inorder": inorder
              }

            })
          });
          counter = (counter + 1) % 4;
          button.classList.add('button_finished--clicked');
          document.querySelectorAll('span').forEach((element) => { element.classList.add('expanded') })

          setTimeout(() => { button.classList.remove("button_finished--clicked") }, 3500);
          setTimeout(() => { navigate("/") }, 3400);
          setTimeout(() => { document.getElementById("confirmation").remove() }, 1000);
          setTimeout(() => { document.querySelectorAll('span').forEach((element) => { element.classList.remove('expanded') }) }, 1700)

        }}><h2>{`${kids[counter]}`} just finished unloading the dishwasher!</h2></button>
        <p>Not {`${kids[counter]}`}? Select your name here: <select name="name-list" id="name-list" onChange={(e) => {
          for (let i = 0; i < kids.length; i++) {
            if (e.target.value == kids[i]) {
              if (tempCount != i) {
                inorder = false;
              } else {
                inorder = true;
              }
              counter = i;
              break;
            }
          }
          document.getElementById("button_finished").innerHTML = "<h2>" + kids[counter] + " just finished unloading the dishwasher!</h2>";
        }}>
          {kids.map((kid) => kid == kids[counter] ? <option key={kid} value={kid} selected>{kid}</option> : <option key={kid} value={kid}>{kid}</option>)}
        </select>
        </p>
      </div>
      <span className="color color--blue" data-value="1"></span>
      <span className="color color--orange" data-value="1"></span>
      <span className="color color--green" data-value="1"></span>
      <span className="color color--white" data-value="1"></span>

    </div>
  );
}

function History() {
  // Create a 2d array in js then use map to make that a li
  var table = document.createElement('table');
  fetch('http://192.168.0.128:3002/api/v2/dishwasher_turns', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      // const mylist = document.getElementById("mylist");
      var j = 0;
      for (let i = data.length - 1; i >= 0; i--) {
        var row = table.insertRow(j);
        row.insertCell(0).innerHTML = data[i].name;
        let d = new Date(data[i].created_at);
        row.insertCell(1).innerHTML = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " at " + (d.getHours() > 11 ? d.getHours() % 12 + 1 : d.getHours() % 12) + ":" + d.getMinutes() + (d.getHours() > 11 ? " PM" : " AM");
        j++;
      }
      document.getElementById("history").appendChild(table);
    })
    .catch(error => {
      console.log("Error: " + error);
    });

  return (
    <div id="history">
    </div>
  )
}
export default App;
