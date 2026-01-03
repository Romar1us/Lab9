// controllers/TicketController.ts
import { Request, Response } from 'express';
import { TicketService } from '../services/TicketService';

const ticketService = new TicketService();

export const searchTicketsController = async (req: Request, res: Response) => {
    try {
        // Передаємо query параметри з URL (наприклад: ?searchQuery=Ivan&minPrice=100)
        const result = await ticketService.searchTickets(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error searching tickets", error });
    }
};

export const updateTicketController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedTicket = await ticketService.updateTicket(id, req.body);
        res.json(updatedTicket);
    } catch (error: any) {
        if (error.message.includes("Validation Error")) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error updating ticket", error: error.message });
        }
    }
};

export const createTicketController = async (req: Request, res: Response) => {
    try {
        const newTicket = await ticketService.createTicket(req.body);
        res.status(201).json(newTicket);
    } catch (error: any) {
        // Обробка помилок валідації
        if (error.message && error.message.includes("Validation Error")) {
            res.status(400).json({ message: error.message });
        } else {
            console.error("Transaction failed:", error);
            res.status(500).json({ message: "Transaction failed", error: error.message });
        }
    }
};