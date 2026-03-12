import { getToken } from "../lib/utils/tokenValidation";
import { API_BASE_URL } from "../../Config";
import axios from "axios";

export type GetTasksActionOutput = {
  status: GetTasksStatus;
  data: any;
};

export type GetTasksStatus = 'SUCCESS' | 'TASKS_NOT_FOUND' | 'TOKEN_NOT_FOUND' | 'INVALID_TOKEN' | 'UNKNOWN';

const token = getToken()

export class GetTasksAction {
    static async execute(): Promise<GetTasksActionOutput> {
        try {
          const response = await axios.get(`${API_BASE_URL}/tasks`,
          {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}` 
            },
            withCredentials: true
          });

          const { success, message } = response.data;

          if (success) {
            return { status: 'SUCCESS', data: message };
          } else {
            return { status: 'TASKS_NOT_FOUND', data: message || 'Erro desconhecido' };
          }
        } catch (error: any) {
          if (error.response && error.response.data) {
            const { message, error: backendError } = error.response.data;

            if (message === 'Token não fornecido') {
              return { status: 'TOKEN_NOT_FOUND', data: message };
            } else if (message === 'Token inválido') {
              return { status: 'INVALID_TOKEN', data: message };
            } else {
              return { status: 'UNKNOWN', data: message || backendError || 'Erro desconhecido' };
            }
          }

          return { status: 'UNKNOWN', data: error.message || 'Erro de conexão'};
        }
    } 
}
