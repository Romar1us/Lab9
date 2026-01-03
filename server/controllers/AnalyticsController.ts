import { Request, Response } from 'express';
import { TicketService } from '../services/TicketService';

const ticketService = new TicketService();

export const getAnalytics = async (req: Request, res: Response) => {
    try {
        const premiumTickets = await ticketService.findPremiumTickets(400);
        const stats = await ticketService.getCarriageStatistics();
        
        res.json({
            meta: { generatedAt: new Date() },
            data: {
                top_sales: premiumTickets,
                carriage_stats: stats
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics", error });
    }
};