import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";

var counter = 0;
const kids = ["Jacob", "Hailey", "Ben", "Cora"];

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="confirm" element={<Confirm />} />

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
      </header>
    </div>
  );
}

function Confirm() {
  const navigate = useNavigate();

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
                "inorder": true
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

export default App;
