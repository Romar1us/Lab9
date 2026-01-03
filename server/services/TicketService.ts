import { TicketModel } from '../interfaces/Ticket';
import { AuditLogModel } from '../models/AuditLog';

export class TicketService {
    
    async findPremiumTickets(minPrice: number) {
        return await TicketModel.aggregate([
            {
                $match: {
                    "ticket_price": { $gte: minPrice },
                    "seat_details.carriage_type": "Coupe"
                }
            },
            {
                $sort: { "ticket_price": -1 }
            },
            {
                $project: {
                    ticketNumber: "$ticket_number",
                    price: "$ticket_price",
                    passenger: { $concat: ["$passenger_details.first_name", " ", "$passenger_details.last_name"] },
                    route: "$trip_details.route_name"
                }
            }
        ]);
    }

    async getCarriageStatistics() {
        return await TicketModel.aggregate([
            {
                $group: {
                    _id: "$seat_details.carriage_type",
                    totalRevenue: { $sum: "$ticket_price" },
                    averagePrice: { $avg: "$ticket_price" },
                    ticketsSold: { $sum: 1 }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]);
    }

    async findFellowPassengers(ticketId: string) {
        const currentTicket = await TicketModel.findOne({ ticket_number: ticketId });
        if (!currentTicket) throw new Error("Ticket not found");

        return await TicketModel.aggregate([
            {
                $match: {
                    "trip_details.route_number": currentTicket.trip_details.route_number,
                    "trip_details.trip_date": currentTicket.trip_details.trip_date,
                    "ticket_number": { $ne: ticketId } 
                }
            },
            {
                $project: {
                    ticketNumber: "$ticket_number",
                    seat: "$seat_details.seat_number",
                    passenger: "$passenger_details.first_name"
                }
            },
            { $limit: 5 }
        ]);
    }
    async searchTickets(params: any) {
        const query: any = {};

        if (params.searchQuery) {
            const regex = new RegExp(params.searchQuery, 'i'); 
            query.$or = [
                { 'passenger_details.first_name': regex },
                { 'passenger_details.last_name': regex },
                { 'ticket_number': regex }
            ];
        }

        if (params.route) {
            query['trip_details.route_name'] = new RegExp(params.route, 'i');
        }

        if (params.minPrice || params.maxPrice) {
            query.ticket_price = {};
            if (params.minPrice) query.ticket_price.$gte = Number(params.minPrice);
            if (params.maxPrice) query.ticket_price.$lte = Number(params.maxPrice);
        }

        if (params.carriageType) {
            query['seat_details.carriage_type'] = params.carriageType;
        }

        const page = Number(params.page) || 1;
        const limit = Number(params.limit) || 5;
        const skip = (page - 1) * limit;

        const tickets = await TicketModel.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ 'trip_details.trip_date': -1 }); 

        const totalCount = await TicketModel.countDocuments(query);

        return {
            data: tickets,
            pagination: {
                total: totalCount,
                page: page,
                limit: limit,
                totalPages: Math.ceil(totalCount / limit)
            }
        };
    }

    async updateTicket(id: string, updateData: any) {
        const ticket = await TicketModel.findById(id);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        if (updateData.ticket_price !== undefined) {
            const price = Number(updateData.ticket_price);
            if (price < 10 || price > 20000) {
                throw new Error("Validation Error: Price must be between 10 and 20000 UAH");
            }
        }
        if (updateData.passenger_details) {
            const { first_name, last_name } = updateData.passenger_details;
            if (first_name !== undefined && (first_name.length < 2 || first_name.length > 50)) {
                throw new Error("Validation Error: First name length must be between 2 and 50 chars");
            }
            if (last_name !== undefined && (last_name.length < 2 || last_name.length > 50)) {
                throw new Error("Validation Error: Last name length must be between 2 and 50 chars");
            }
        }
        if (updateData.ticket_price) ticket.ticket_price = updateData.ticket_price;
        
        if (updateData.passenger_details) {
            ticket.passenger_details = { ...ticket.passenger_details, ...updateData.passenger_details };
        }
        if (updateData.trip_details) {
            ticket.trip_details = { ...ticket.trip_details, ...updateData.trip_details };
        }
        if (updateData.seat_details) {
            ticket.seat_details = { ...ticket.seat_details, ...updateData.seat_details };
        }

        const updatedTicket = await ticket.save();

        await AuditLogModel.create({
            action: 'UPDATE',
            entity: 'Ticket',
            entity_id: ticket._id,
            changes: updateData,
            timestamp: new Date()
        });

        return updatedTicket;
    }
}