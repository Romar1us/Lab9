import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Divider, Button } from '@mui/material';
import { Train, ArrowForward } from '@mui/icons-material';
import type { ITicket } from '../interfaces/ITicket';

interface TicketCardProps {
    ticket: ITicket;
    onBack: () => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onBack }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', maxWidth: 700, borderRadius: 3, border: '1px solid #e0e0e0' }}>
                <Box sx={{ bgcolor: '#1e293b', color: 'white', p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="overline" sx={{ opacity: 0.8 }}>BOARDING PASS</Typography>
                    <Typography variant="h5" fontWeight="bold">{ticket.trip_details.route_name}</Typography>
                    <Typography variant="body2">{ticket.trip_details.route_number} | {ticket.trip_details.trip_date}</Typography>
                </Box>
                <Train sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                
                <CardContent sx={{ p: 4 }}>
                {/* ВИПРАВЛЕНО: Grid container залишаємо для spacing */}
                <Grid container spacing={4}>
                    {/* ВИПРАВЛЕНО: 'item xs={12}' -> 'size={{ xs: 12 }}' */}
                    <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                        <Typography variant="caption" color="text.secondary">FROM</Typography>
                        <Typography variant="h6">{ticket.departure_point.station_city}</Typography>
                        <Typography variant="body2" color="text.secondary">{ticket.departure_point.station_name}</Typography>
                        </Box>
                        <ArrowForward color="action" />
                        <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary">TO</Typography>
                        <Typography variant="h6">{ticket.destination_point.station_city}</Typography>
                        <Typography variant="body2" color="text.secondary">{ticket.destination_point.station_name}</Typography>
                        </Box>
                    </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}><Divider style={{borderStyle: 'dashed'}} /></Grid>

                    <Grid size={{ xs: 4 }}>
                    <Typography variant="caption" color="text.secondary">PASSENGER</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {ticket.passenger_details.first_name} {ticket.passenger_details.last_name}
                    </Typography>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                    <Typography variant="caption" color="text.secondary">SEAT</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {ticket.seat_details.seat_number} <Typography component="span" variant="caption">({ticket.seat_details.carriage_type})</Typography>
                    </Typography>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                    <Typography variant="caption" color="text.secondary">PRICE</Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        {ticket.ticket_price} UAH
                    </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">TICKET ID</Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'monospace', letterSpacing: 2 }}>
                            {ticket.ticket_number}
                        </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Button fullWidth variant="outlined" sx={{ mt: 4 }} onClick={onBack}>
                    Return to Dashboard
                </Button>
                </CardContent>
            </Card>
        </Box>
    );
};