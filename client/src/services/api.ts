import axios from 'axios';
// ВИПРАВЛЕННЯ: додано 'type'
import type { ITicket } from '../interfaces/ITicket';

const API_URL = 'http://localhost:5000';

export const ticketApi = {
    getAll: () => axios.get<ITicket[]>(`${API_URL}/tickets`),
    search: (params: URLSearchParams) => axios.get(`${API_URL}/api/tickets/search?${params}`),
    create: (data: ITicket) => axios.post(`${API_URL}/tickets`, data),
    update: (id: string, data: Partial<ITicket>) => axios.patch(`${API_URL}/tickets/${id}`, data),
    delete: (id: string) => axios.delete(`${API_URL}/tickets/${id}`),
};