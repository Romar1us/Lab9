// src/interfaces/ITicket.ts
export interface ITicket {
  _id?: string;
  ticket_number: string;
  ticket_price: number;
  issue_date: string;
  __v?: number;
  passenger_details: {
    first_name: string;
    last_name: string;
    phone: string;
  };
  trip_details: {
    trip_date: string;
    route_name: string;
    route_number: string;
  };
  departure_point: {
    station_name: string;
    station_city: string;
    city_region: string;
  };
  destination_point: {
    station_name: string;
    station_city: string;
    city_region: string;
  };
  seat_details: {
    car_sequence_number: number;
    carriage_type: string;
    seat_number: string;
  };
}