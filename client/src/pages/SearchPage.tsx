import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Pagination, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FilterList, Search as SearchIcon, Clear, Visibility as ViewIcon, Edit as EditIcon } from '@mui/icons-material';
import type { ITicket } from '../interfaces/ITicket';
import { ticketApi } from '../services/api';

interface SearchPageProps {
    onViewDetails: (ticket: ITicket) => void;
    onEdit: (ticket: ITicket) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onViewDetails, onEdit }) => {
    const [searchParams, setSearchParams] = useState({
        searchQuery: '', minPrice: '', maxPrice: '', route: '', carriageType: ''
    });
    const [results, setResults] = useState<ITicket[]>([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (page = 1) => {
        setLoading(true);
        setSearched(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '5',
                ...searchParams
            });
            // @ts-ignore
            Object.keys(searchParams).forEach(key => !searchParams[key] && params.delete(key));

            const res = await ticketApi.search(params);
            setResults(res.data.data);
            setPagination({ page: res.data.pagination.page, totalPages: res.data.pagination.totalPages });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setSearchParams({ searchQuery: '', minPrice: '', maxPrice: '', route: '', carriageType: '' });
        setResults([]);
        setSearched(false);
    };

    return (
        <Stack spacing={3}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterList /> Search Parameters
                </Typography>
                 {/* Використовуємо 'container', але прибираємо 'item' та використовуємо 'size' */}
                 <Grid container spacing={2}>
                     <Grid size={{ xs: 12, md: 4 }}>
                         <TextField fullWidth label="Search (Name, Ticket #)" size="small" value={searchParams.searchQuery} onChange={(e) => setSearchParams({...searchParams, searchQuery: e.target.value})} />
                     </Grid>
                     <Grid size={{ xs: 12, md: 4 }}>
                          <TextField fullWidth label="Route" size="small" value={searchParams.route} onChange={(e) => setSearchParams({...searchParams, route: e.target.value})} />
                     </Grid>
                     <Grid size={{ xs: 6, md: 2 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Type</InputLabel>
                            <Select value={searchParams.carriageType} label="Type" onChange={(e) => setSearchParams({...searchParams, carriageType: e.target.value})}>
                                <MenuItem value=""><em>Any</em></MenuItem>
                                <MenuItem value="Coupe">Coupe</MenuItem>
                                <MenuItem value="Platzkart">Platzkart</MenuItem>
                                <MenuItem value="Lux">Lux</MenuItem>
                                <MenuItem value="Intercity+">Intercity+</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                     <Grid size={{ xs: 3, md: 1 }}>
                         <TextField fullWidth label="Min Price" type="number" size="small" value={searchParams.minPrice} onChange={(e) => setSearchParams({...searchParams, minPrice: e.target.value})} />
                     </Grid>
                     <Grid size={{ xs: 3, md: 1 }}>
                         <TextField fullWidth label="Max Price" type="number" size="small" value={searchParams.maxPrice} onChange={(e) => setSearchParams({...searchParams, maxPrice: e.target.value})} />
                     </Grid>
                     
                     <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button onClick={clearFilters} startIcon={<Clear />}>Clear</Button>
                        <Button variant="contained" onClick={() => handleSearch(1)} startIcon={<SearchIcon />} disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </Button>
                     </Grid>
                 </Grid>
            </Paper>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Ticket Info</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Route</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.length > 0 ? results.map((t) => (
                            <TableRow key={t._id} hover>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">{t.ticket_number}</Typography>
                                    <Typography variant="caption">{t.passenger_details.first_name} {t.passenger_details.last_name}</Typography>
                                </TableCell>
                                <TableCell>
                                    {t.trip_details.route_name}
                                    <Typography variant="caption" display="block">{t.trip_details.trip_date}</Typography>
                                </TableCell>
                                <TableCell sx={{ color: 'success.main', fontWeight: 'bold' }}>{t.ticket_price} UAH</TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <IconButton color="primary" onClick={() => onViewDetails(t)}>
                                            <ViewIcon />
                                        </IconButton>
                                        <IconButton color="warning" onClick={() => onEdit(t)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                    {searched ? 'No results found.' : 'Enter parameters and search.'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
             {results.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={pagination.totalPages} page={pagination.page} onChange={(_, p) => handleSearch(p)} color="primary" />
                </Box>
            )}
        </Stack>
    );
};