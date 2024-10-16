import Student from "./Student";
import { Student as StudentType } from "./types";
/* import AddStudentForm from "./AddStudentForm"; */
import { PropsWithChildren } from "react";

type GridProps = {
    students: StudentType[];
    /* onAddStudent: ({ name }: { name: string }) => void; */
    onDeleteStudent: (id: string) => void;
};

export default function Grid({
    students,
    onDeleteStudent,
    children,
}: PropsWithChildren<GridProps>) {
    return (
        <section>
            <article className="grid">
                {students.map((student) => (
                    <Student
                        key={student.id}
                        name={student.name}
                        id={student.id}
                        onDelete={onDeleteStudent}
                    />
                ))}
            </article>
            {/* <AddStudentForm onAddStudent={onAddStudent} /> */}
            {children}
        </section>
    );
}
