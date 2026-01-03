// server/controllers/TicketController.ts
import { Request, Response } from 'express';
import { TicketService } from '../services/TicketService';

const ticketService = new TicketService();

export const searchTicketsController = async (req: Request, res: Response) => {
    try {
        const result = await ticketService.searchTickets(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error searching tickets", error });
    }
};

export const createTicketController = async (req: Request, res: Response) => {
    try {
        const newTicket = await ticketService.createTicket(req.body);
        res.status(201).json(newTicket);
    } catch (error: any) {
        console.error("Error inside createTicketController:", error);

        if (error.message && error.message.includes("Validation Error")) {
            return res.status(400).json({ message: error.message });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val: any) => val.message);
            return res.status(400).json({ 
                message: `Validation error: ${messages.join(', ')}` 
            });
        }

        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(409).json({ 
                message: `Database error: Record with such '${field}' already exists.` 
            });
        }

        if (error.name === 'MongooseServerSelectionError' || error.name === 'MongoNetworkError') {
            return res.status(503).json({ 
                message: "Service temporarily unavailable. No connection to the database." 
            });
        }

        if (error.name === 'CastError') {
             return res.status(400).json({ message: "Invalid data format." });
        }

        res.status(500).json({ 
            message: "Internal server error. Please try again later.", 
            error: error.message 
        });
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
        } else if (error.name === 'CastError') {
            res.status(400).json({ message: "Invalid ticket ID" });
        } else {
            res.status(500).json({ message: "Error updating ticket", error: error.message });
        }
    }
};