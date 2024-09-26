import { useState } from "react";
import Grid from "./components/Grid";
import Total from "./components/Total";
import "./index.css";
import { Student as StudentType } from "./components/types";

const initialStudents = [
    { id: "1", name: "Aleksander" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
];

function App() {
    const [students, setStudents] = useState<StudentType[]>(initialStudents);

    const onAddStudent = (student: { name: string }) => {
        setStudents((prev) => [
            ...prev,
            { id: crypto.randomUUID(), ...student },
        ]);
    };

    const onDeleteStudent = (id: string) => {
        setStudents((prev) => prev.filter((student) => student.id !== id));
    };

    return (
        <main>
            <Grid
                students={students}
                onAddStudent={onAddStudent}
                onDeleteStudent={onDeleteStudent}
            />
            <Total total={students.length} />
        </main>
    );
}

export default App;
