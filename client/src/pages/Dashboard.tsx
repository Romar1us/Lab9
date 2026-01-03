// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Stack, IconButton } from '@mui/material';
import { Add as AddIcon, Person, Visibility as ViewIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { ITicket } from '../interfaces/ITicket';
import { ticketApi } from '../services/api';

interface DashboardProps {
    onCreateClick: () => void;
    onEditClick: (ticket: ITicket) => void;
    onDetailsClick: (ticket: ITicket) => void;
    onError: (msg: string) => void;
    onSuccess: (msg: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onCreateClick, onEditClick, onDetailsClick, onError, onSuccess }) => {
    const [tickets, setTickets] = useState<ITicket[]>([]);

    useEffect(() => {
        //loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const res = await ticketApi.getAll();
            setTickets(res.data);
        } catch (error) {
            console.error(error);
            onError('Failed to load tickets');
        }
    };

    const handleDelete = async (id: string) => {
        if(!window.confirm("Are you sure?")) return;
        try {
            await ticketApi.delete(id);
            onSuccess('Ticket deleted');
            loadTickets();
        } catch (error) {
            onError('Failed to delete ticket');
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" color="text.primary" fontWeight="500">Recent Tickets</Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={onCreateClick} sx={{ borderRadius: 2, textTransform: 'none', fontSize: '1rem' }}>
                Issue Ticket
              </Button>
            </Box>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Ticket #</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Passenger</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Route</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((t) => (
                    <TableRow key={t._id} hover>
                      <TableCell><Chip label={t.ticket_number} size="small" color="primary" variant="outlined" /></TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person fontSize="small" color="action" />
                          {t.passenger_details.first_name} {t.passenger_details.last_name}
                        </Box>
                      </TableCell>
                      <TableCell>{t.trip_details.route_name}</TableCell>
                      <TableCell>{t.trip_details.trip_date}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'success.main' }}>{t.ticket_price} UAH</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <IconButton color="primary" onClick={() => onDetailsClick(t)}><ViewIcon /></IconButton>
                          <IconButton color="warning" onClick={() => onEditClick(t)}><EditIcon /></IconButton>
                          <IconButton color="error" onClick={() => t._id && handleDelete(t._id)}><DeleteIcon /></IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  {tickets.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 3 }}>No tickets found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
        </>
    );
};