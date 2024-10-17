import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
//	import { initialStudents } from "./data/students";
import { port } from "./config";
import { isNameValid } from "./lib/validators";

const app = new Hono();
app.use("*", cors());

let students = [
    { id: "1", name: "Aleksander" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
];

app.get("/api/students", (c) => {
    return c.json(students);
});

app.get("/api/students/:id", (c) => {
    const { id } = c.req.param();
    const student = students.find((student) => student.id === id);
    if (!student) {
        return c.json({ message: "Student not found" }, { status: 404 });
    }
    return c.json(student);
});

app.post("/api/students", async (c) => {
    const { name } = await c.req.json();

    // Validate the name length
    if (!isNameValid(name)) {
        return c.json(
            {
                error: "Name must be at least 5 characters long, include a space and end with a '!'",
            },
            { status: 400 }
        );
    }

    const student = { id: crypto.randomUUID(), name };
    students.push(student);
    return c.json(
        { message: "Student added successfully", student },
        { status: 201 }
    );
});

app.delete("/api/students/:id", (c) => {
    const { id } = c.req.param();
    const initialLength = students.length;
    students = students.filter((student) => student.id !== id);
    if (students.length < initialLength) {
        return c.json(students, { status: 200 });
    } else {
        return c.json({ message: "Student not found" }, { status: 404 });
    }
});

app.patch("/api/students/:id", async (c) => {
    const { id } = c.req.param();
    const { name } = await c.req.json();
    students = students.map((student) =>
        student.id === id ? { ...student, name } : student
    );
    return c.json(students, { status: 200 });
});

console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});
