import { studentRepository } from "./student.repository";

export const createStudentService = (): {
    list: (query?: Record<string, string>) => Promise<any>;
    create: (data: Record<string, string>) => Promise<any>;
} => {
    //  TODO: implement method for list and create that will use the studentRepository

    return {
        list: async (query?: Record<string, string>) => {
            return await studentRepository.list(query);
        },
        create: async (data: Record<string, string>) => {
            return await studentRepository.create(data);
        },
    };
};
