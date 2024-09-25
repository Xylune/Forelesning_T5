import Grid from "./components/Grid";
import "./index.css";

const students = [
  { id: "1", name: "Aleksander" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

function App() {
    return (
        <main>
            <Grid students={students}/>
        </main>
    );
}

export default App;
