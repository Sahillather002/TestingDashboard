import mongoose, { Schema, Document } from 'mongoose';

interface AllTestcases extends Document {
  _id: string;
  Date: Date;
  TcName: string;
  Description: string;
  ExpectedOutput: Record<string, string>;
  StepsToReproduce: Record<string, string>;
}

const allTestcasesSchema = new Schema<AllTestcases>({
  _id: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  TcName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: false,
  },
  ExpectedOutput: {
    type: Map,
    of: String,
    required: false,
  },
  StepsToReproduce: {
    type: Map,
    of: String,
    required: false,
  },
});

// Use mongoose.models to avoid model overwrite error
const AllTestcasesModel =
  mongoose.models.AllTestcases || mongoose.model<AllTestcases>('AllTestcases', allTestcasesSchema);

export default AllTestcasesModel;
