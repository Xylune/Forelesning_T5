import { useState } from "react";
import Student from "./Student";
import { Student as StudentType } from "./types";
import AddStudentForm from "./AddStudentForm";

type GridProps = {
    students: StudentType[];
};

export default function Grid(data: GridProps) {
    const [students, setStudents] = useState<StudentType[]>(data.students ?? []);

    const onAddStudent = (student: { name: string }) => {
        setStudents((prev) => [...prev, {id: crypto.randomUUID(), ...student}]);
    };
    return (
        <section>
            <article className="grid">
                {students.map((student: { id: string; name: string }) => (
                    <Student
                        key={student.id}
                        name={student.name}
                        id={student.id}
                    />
                ))}
            </article>
            <AddStudentForm onAddStudent={onAddStudent} />
        </section>
    );
}
