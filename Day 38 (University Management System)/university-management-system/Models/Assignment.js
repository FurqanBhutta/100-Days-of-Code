import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  classOfferingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassOffering"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
    dueDate: {
    type: Date,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);