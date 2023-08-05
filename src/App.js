// import logo from './logo.svg';
import './App.css';
import confetti from 'canvas-confetti';

function App() {
  // TEMP ARRAY:
  let counter = 0;
  const kids = ["Jacob", "Hailey", "Ben", "Cora"];
  let name = kids[counter];
  // document.getElementById("button_finished").addEventListener("click", function () { console.log("HI"); });
  return (
    <div className="App">
      <header className="App-header">
        <p>
          It is currently
        </p>
        <div id="turn_name">
          <h1>
            {`${name}`}'s
          </h1>
        </div>
        <p>
          turn to unload the dishwasher
        </p>
        <button class="button_finished" onClick={() => {
          name = kids[((counter++) % 4)];
          console.log(name);
          confetti();
          document.getElementById("turn_name").innerHTML = "<h1>" + name + "'s";
        }}>I finished unloading it!</button>
      </header>
    </div>
  );
}

export default App;
