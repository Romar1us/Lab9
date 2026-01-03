// src/components/TicketForm.tsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid as Grid, Typography, Button, Divider, InputAdornment, Paper } from '@mui/material'; 
import { Save, Person, Place, ConfirmationNumber, ArrowBack } from '@mui/icons-material';
import type { ITicket } from '../interfaces/ITicket';

interface TicketFormProps {
    initialData?: ITicket;
    onSubmit: (data: ITicket) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

const defaultTicketState: ITicket = {
  ticket_number: '',
  ticket_price: 450,
  issue_date: new Date().toISOString().split('T')[0],
  passenger_details: { first_name: '', last_name: '', phone: '' },
  trip_details: { trip_date: '2025-10-08', route_name: 'Lviv - Kyiv', route_number: '701A' },
  departure_point: { station_name: 'Lviv Holovnyi', station_city: 'Lviv', city_region: 'Lviv Obl' },
  destination_point: { station_name: 'Kyiv Pas', station_city: 'Kyiv', city_region: 'Kyiv Obl' },
  seat_details: { car_sequence_number: 1, carriage_type: 'Coupe', seat_number: '' }
};

export const TicketForm: React.FC<TicketFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
    const [formData, setFormData] = useState<ITicket>(defaultTicketState);
    
    // Стейт для відображення помилок валідації
    const [errors, setErrors] = useState({ firstName: false, lastName: false, price: false });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleNestedChange = (section: keyof ITicket, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...(prev[section] as object), [field]: value }
        }));
        // Скидаємо помилку при вводі
        if (section === 'passenger_details' && field === 'first_name') setErrors(e => ({...e, firstName: false}));
        if (section === 'passenger_details' && field === 'last_name') setErrors(e => ({...e, lastName: false}));
    };

    const handleSubmit = () => {
        // Проста фронтенд-валідація
        const newErrors = {
            firstName: !formData.passenger_details.first_name,
            lastName: !formData.passenger_details.last_name,
            price: formData.ticket_price < 0
        };

        setErrors(newErrors);

        if (newErrors.firstName || newErrors.lastName || newErrors.price) {
            // Якщо є помилки, перериваємо відправку
            return;
        }

        onSubmit(formData);
    };

    return (
        <Box component={Paper} elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button onClick={onCancel} sx={{ mr: 1, minWidth: 'auto' }}><ArrowBack /></Button>
                <Typography variant="h5" fontWeight="bold">
                    {initialData ? `Edit Ticket #${initialData.ticket_number}` : 'Issue New Ticket'}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Passenger Details */}
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" color="primary" sx={{ mb: 1, display: 'flex', gap: 1 }}>
                        <Person fontSize="small" /> Passenger Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField 
                                label="First Name" fullWidth size="small"
                                required
                                error={errors.firstName}
                                helperText={errors.firstName ? "Required" : ""}
                                value={formData.passenger_details.first_name}
                                onChange={e => handleNestedChange('passenger_details', 'first_name', e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                             <TextField 
                                label="Last Name" fullWidth size="small"
                                required
                                error={errors.lastName}
                                helperText={errors.lastName ? "Required" : ""}
                                value={formData.passenger_details.last_name}
                                onChange={e => handleNestedChange('passenger_details', 'last_name', e.target.value)}
                            />
                        </Grid>
                         <Grid size={{ xs: 12, sm: 4 }}>
                             <TextField label="Phone" fullWidth size="small"
                                value={formData.passenger_details.phone}
                                onChange={e => handleNestedChange('passenger_details', 'phone', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid size={{ xs: 12 }}><Divider /></Grid>

                {/* Trip Details */}
                <Grid size={{ xs: 12 }}>
                     <Typography variant="subtitle1" color="primary" sx={{ mb: 1, display: 'flex', gap: 1 }}>
                        <Place fontSize="small" /> Trip Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField label="Route Name" fullWidth size="small"
                                value={formData.trip_details.route_name}
                                onChange={e => handleNestedChange('trip_details', 'route_name', e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                             <TextField label="Route Number" fullWidth size="small"
                                value={formData.trip_details.route_number}
                                onChange={e => handleNestedChange('trip_details', 'route_number', e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                             <TextField label="Trip Date" type="date" fullWidth size="small" InputLabelProps={{ shrink: true }}
                                value={formData.trip_details.trip_date}
                                onChange={e => handleNestedChange('trip_details', 'trip_date', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                 <Grid size={{ xs: 12 }}><Divider /></Grid>

                {/* Seat & Price */}
                 <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" color="primary" sx={{ mb: 1, display: 'flex', gap: 1 }}>
                        <ConfirmationNumber fontSize="small" /> Seat & Price
                    </Typography>
                     <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                             <TextField label="Carriage Type" fullWidth size="small"
                                value={formData.seat_details.carriage_type}
                                onChange={e => handleNestedChange('seat_details', 'carriage_type', e.target.value)}
                            />
                        </Grid>
                         <Grid size={{ xs: 12, sm: 4 }}>
                             <TextField label="Seat Number" fullWidth size="small"
                                value={formData.seat_details.seat_number}
                                onChange={e => handleNestedChange('seat_details', 'seat_number', e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                             <TextField 
                                label="Price" type="number" fullWidth size="small"
                                required
                                error={errors.price}
                                // ДОДАНО: Текст помилки
                                helperText={errors.price ? "Price must be positive" : ""}
                                inputProps={{ min: 0 }}
                                InputProps={{ endAdornment: <InputAdornment position="end">UAH</InputAdornment> }}
                                value={formData.ticket_price}
                                onChange={e => {
                                    setFormData({...formData, ticket_price: Number(e.target.value)});
                                    setErrors(prev => ({...prev, price: false}));
                                }}
                            />
                        </Grid>
                     </Grid>
                 </Grid>

                <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button variant="contained" size="large" startIcon={<Save />} onClick={handleSubmit} disabled={isSubmitting}>
                        {initialData ? 'Save Changes' : 'Issue Ticket'}
                    </Button>
                    <Button variant="outlined" size="large" onClick={onCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Box>
    );
};