import { Result } from "@/types";
import { DB, db } from "@/db/db";
import { Student, StudentDB } from "./student.types";

type StudentRepository = {
    list: (query?: Record<string, string>) => Promise<Result<StudentDB[]>>;
    create: (data: Student) => Promise<Result<Student>>;
};

export const createStudentRepository = (db: DB): StudentRepository => {
    const create = (data: Student) => {
        try {
            const studentToDB: StudentDB = {
                id: data.id,
                name: data.name,
                created_at: data.createdAt,
                updated_at: data.updatedAt,
            };

            const query = db.prepare(`
            INSERT INTO students (id, name, created_at, updated_at)
            VALUES (?, ?, ?, ?)
            `);

            const result = query.run(
                studentToDB.id,
                studentToDB.name,
                studentToDB.created_at,
                studentToDB.updated_at
            );

            return {
                success: true,
                data: data,
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed creating student",
                },
            };
        }
    };

    const list = async (
        query?: Record<string, string>
    ): Promise<Result<StudentDB[]>> => {
        try {
            const stmt = db.prepare(`SELECT * FROM students`);
            const data = stmt.all() as StudentDB[];

            return {
                success: true,
                data: data,
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed fetching students",
                },
            };
        }
    };

    return {
        list,
        create,
    };
};

export const studentRepository = createStudentRepository(db);
