import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Total from "./components/Total";
import "./index.css";
import { Student as StudentType } from "./components/types";
import AddStudentForm from "./components/AddStudentForm";
import Filter from "./components/Filter";

const initialStudents = [
    { id: "1", name: "Aleksander" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
];

function App() {
    const [filter, setFilter] = useState("-");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [students, setStudents] = useState<StudentType[]>(initialStudents);

    const filteredStudents = students.filter((student) =>
        filter !== "-" ? student.name.toLowerCase().includes(filter) : true
    );

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                // TODO: No hardcoded url. Move to config/index.ts
                const response = await fetch(
                    "http://localhost:3999/api/students"
                );
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error(error);
                setError("Error fetching students");
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const options = Array.from(
        students
            .reduce((acc, { name, ...rest }) => {
                const firstName = name.trim().split(" ")[0];
                if (!acc.has(firstName)) {
                    acc.set(firstName, {
                        ...rest,
                        name,
                        value: firstName.toLowerCase(),
                        label: firstName,
                    });
                }
                return acc;
            }, new Map())
            .values()
    );

    const onFilterChange = (filter: string) => {
        setFilter(filter);
    };

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
            <Filter
                filter={filter}
                onFilterChange={onFilterChange}
                options={Object.values(options)}
            />
            <Grid
                students={filteredStudents}
                //  onAddStudent={onAddStudent}
                onDeleteStudent={onDeleteStudent}
            >
                <AddStudentForm onAddStudent={onAddStudent} />
            </Grid>
            <Total total={students.length} />
        </main>
    );
}

export default App;
