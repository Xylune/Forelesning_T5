import { useState } from "react";
import Avatar from "./Avatar";
import { Student as StudentProps } from "./types";

type StudentComponentProps = StudentProps & {
    onDelete: (id: string) => void;
};

export default function Student(props: StudentComponentProps) {
    const { id, name, onDelete } = props;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="student"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Avatar name={name} />
            <p className="student-name">{name}</p>
            {isHovered && (
                <button className="delete-button" onClick={() => onDelete(id)}>
                    Delete
                </button>
            )}
        </div>
    );
}
