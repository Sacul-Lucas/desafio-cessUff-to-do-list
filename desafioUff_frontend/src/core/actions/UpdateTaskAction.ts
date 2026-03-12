import { getToken } from "../lib/utils/tokenValidation";
import { API_BASE_URL } from "../../Config";
import axios from "axios";

export type UpdateTaskActionInput = {
    title?: string;
    description?: string;
    deadline?: Date;
    status?: 'pending' | 'completed' | 'archived';
};

export type UpdateTaskActionOutput = {
  status: UpdateTaskStatus;
  data: string;
};

export type UpdateTaskStatus = 
  | 'SUCCESS'
  | 'UNKNOWN';

const token = getToken()

export class UpdateTaskAction {
  static async execute(input: UpdateTaskActionInput, id: string): Promise<UpdateTaskActionOutput> {
    try {
        const response = await axios.patch(`${API_BASE_URL}/tasks/${id}`, {
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
            return { status: 'SUCCESS', data: message || 'Tarefa atualizada com sucesso!' };
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
