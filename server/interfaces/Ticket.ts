import mongoose, { Schema, Document } from 'mongoose';
import { IPassengerDetails } from '../interfaces/IPassengerDetails';
import { ITripDetails } from '../interfaces/ITripDetails';
import { IStationDetails } from '../interfaces/IStationDetails';
import { ISeatDetails } from '../interfaces/ISeatDetails';

export interface ITicket extends Document {
    ticket_number: string;
    ticket_price: number;
    issue_date: string;
    
    passenger_details: IPassengerDetails;
    trip_details: ITripDetails;
    departure_point: IStationDetails;
    destination_point: IStationDetails;
    seat_details: ISeatDetails;
}

const TicketSchema: Schema = new Schema({
    ticket_number: { type: String, required: true, unique: true },
    ticket_price: { type: Number, required: true },
    issue_date: { type: String, required: true },
    
    passenger_details: {
        first_name: String,
        last_name: String,
        phone: String
    },
    
    trip_details: {
        trip_date: String,
        route_name: String,
        route_number: String
    },
    
    departure_point: {
        station_name: String,
        station_city: String,
        city_region: String
    },
    
    destination_point: {
        station_name: String,
        station_city: String,
        city_region: String
    },
    
    seat_details: {
        car_sequence_number: Number,
        carriage_type: String,
        seat_number: String
    }
});

export const TicketModel = mongoose.model<ITicket>('Ticket', TicketSchema);