// src/App.tsx
import React, { useState } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, IconButton, Snackbar, Alert, Button } from '@mui/material';
import { Train, Search as SearchIcon, Dashboard as DashboardIcon } from '@mui/icons-material';

import type { ITicket } from './interfaces/ITicket';
import { ticketApi } from './services/api';

import { TicketForm } from './components/TicketForm';
import { TicketCard } from './components/TicketCard';
import { Dashboard } from './pages/Dashboard';
import { SearchPage } from './pages/SearchPage';

function App() {
  const [view, setView] = useState<'list' | 'create' | 'details' | 'search' | 'edit'>('list');
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
    open: false, message: '', severity: 'success'
  });

  const showMessage = (message: string, severity: 'success' | 'error' = 'success') => {
      setSnackbar({ open: true, message, severity });
  };

  // Допоміжна функція для визначення тексту помилки
  const getErrorMessage = (error: any): string => {
      // 1. Сервер відповів із помилкою (4xx, 5xx) - наприклад, валідація або дублікат
      if (error.response) {
          return error.response.data?.message || 'Server Error';
      } 
      // 2. Запит відправлено, але відповіді немає (Сервер вимкнений / Timeout)
      else if (error.request) {
          return 'Network Error: Server is unavailable.';
      } 
      // 3. Помилка при налаштуванні запиту
      else {
          return error.message || 'Unknown Error';
      }
  };

  // Handlers
  const handleCreate = async (data: ITicket) => {
      try {
          // Генеруємо номер квитка (якщо це робить бекенд, можна прибрати)
          const payload = { ...data, ticket_number: 'TX-' + Math.floor(Math.random() * 90000 + 10000) };
          await ticketApi.create(payload);
          showMessage('Ticket created successfully!');
          setView('list');
      } catch (e: any) { 
          console.error(e);
          showMessage(getErrorMessage(e), 'error'); 
      }
  };

  const handleUpdate = async (data: ITicket) => {
      if (!selectedTicket?._id) return;
      try {
          await ticketApi.update(selectedTicket._id, data);
          showMessage('Ticket updated successfully!');
          setView('list');
      } catch (e: any) { 
          showMessage(getErrorMessage(e), 'error'); 
      }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh', pb: 4 }}>
      <AppBar position="static" sx={{ mb: 4, bgcolor: '#1e293b' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}><Train /></IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>Railway Admin</Typography>
          <Button color="inherit" startIcon={<DashboardIcon />} onClick={() => setView('list')}>Dashboard</Button>
          <Button color="inherit" startIcon={<SearchIcon />} onClick={() => setView('search')}>Search</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {view === 'list' && (
            <Dashboard 
                onCreateClick={() => setView('create')}
                onEditClick={(t) => { setSelectedTicket(t); setView('edit'); }}
                onDetailsClick={(t) => { setSelectedTicket(t); setView('details'); }}
                onError={(msg) => showMessage(msg, 'error')}
                onSuccess={(msg) => showMessage(msg, 'success')}
            />
        )}

        {view === 'search' && (
            <SearchPage 
                onViewDetails={(t) => { setSelectedTicket(t); setView('details'); }} 
                onEdit={(t) => { setSelectedTicket(t); setView('edit'); }}
            />
        )}

        {view === 'create' && (
            <TicketForm onSubmit={handleCreate} onCancel={() => setView('list')} />
        )}

        {view === 'edit' && selectedTicket && (
            <TicketForm 
                initialData={selectedTicket}
                onSubmit={handleUpdate} 
                onCancel={() => setView('list')} 
            />
        )}

        {view === 'details' && selectedTicket && (
            <TicketCard ticket={selectedTicket} onBack={() => setView('list')} />
        )}
      </Container>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({...snackbar, open: false})}>
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({...snackbar, open: false})}>
            {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;