// interfaces/ISearchTicketParams.ts
export interface ISearchTicketParams {
    searchQuery?: string; // Загальний пошук (ім'я, номер квитка)
    minPrice?: number;
    maxPrice?: number;
    startDate?: string;
    endDate?: string;
    carriageType?: string;
    route?: string;
    page?: number;
    limit?: number;
}