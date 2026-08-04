import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    classOfferingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassOffering",
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent", "leave"],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);