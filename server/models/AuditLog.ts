import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  action: string;
  entity: string;
  entity_id: string;
  changes: any;
  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema({
  action: { type: String, required: true },
  entity: { type: String, required: true },
  entity_id: { type: String, required: true },
  changes: { type: Object }, 
  timestamp: { type: Date, default: Date.now }
});

export const AuditLogModel = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);