import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import { ITicket, TicketModel } from './interfaces/Ticket';
import { 
    searchTicketsController, 
    updateTicketController, 
    createTicketController 
} from './controllers/TicketController';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/db_lab_9')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/tickets', async (req: Request, res: Response) => {
  try {
    const tickets = await TicketModel.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
});

app.get('/tickets/:id', async (req: Request, res: Response) => {
    try {
      const ticket = await TicketModel.findById(req.params.id);
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching ticket' });
    }
  });

app.post('/tickets', createTicketController);

app.delete('/tickets/:id', async (req: Request, res: Response) => {
  try {
    await TicketModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket' });
  }
});

app.get('/api/tickets/search', searchTicketsController);

app.patch('/tickets/:id', updateTicketController);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));