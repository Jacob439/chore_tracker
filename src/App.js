// import logo from './logo.svg';
import './App.css';

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
          Welcome to the Chore Tracking Website
        </p>
        <div id="turn_name">
          <p>
            It is {`${name}`}'s turn for the dishwasher
          </p>
        </div>
        <button class="button_finished" onClick={() => {
          name = kids[((counter++) % 4)];
          console.log(name);
          document.getElementById("turn_name").innerHTML = "<p>It is " + name + "'s turn for the dishwasher</p>";
        }}>I finished unloading it!</button>
      </header>
    </div>
  );
}

export default App;
