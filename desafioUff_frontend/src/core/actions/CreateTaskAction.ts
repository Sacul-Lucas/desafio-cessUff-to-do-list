import { getToken } from "../lib/utils/tokenValidation";
import { API_BASE_URL } from "../../Config";
import axios from "axios";


export type CreateTaskActionInput = {
    title: string;
    description: string;
    deadline?: Date;
    status?: 'pending' | 'completed' | 'archived';
};

export type CreateTaskActionOutput = {
    status: CreateTaskStatus;
    data: string;
};

export type CreateTaskStatus = 
    | 'SUCCESS'
    | 'UNKNOWN';

const token = getToken()

export class CreateTaskAction {
    static async execute(input: CreateTaskActionInput): Promise<CreateTaskActionOutput> {
        try {
            const response = await axios.post(`${API_BASE_URL}/tasks`, {
                title: input.title,
                description: input.description,
                status: input.status,
                deadline: input.deadline,
            }, {
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
                },
                withCredentials: true,
            });
          
            const { success, message } = response.data;
          
            if (success) {
                return { status: 'SUCCESS', data: message || 'Tarefa criada com sucesso!' };
            } else {
                return { status: 'UNKNOWN', data: message || 'Erro desconhecido' };
            }
          
        } catch (error: any) {
            if (error.response && error.response.data) {
                const { message, error: backendError } = error.response.data;

                if (!message) {
                    return { status: 'UNKNOWN', data: message || backendError || 'Erro desconhecido' };
                }
            }
          
            return { status: 'UNKNOWN', data: error.message || 'Erro de conexão' };
        }
    }
}
