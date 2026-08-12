import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Section || mongoose.model("Section", sectionSchema);