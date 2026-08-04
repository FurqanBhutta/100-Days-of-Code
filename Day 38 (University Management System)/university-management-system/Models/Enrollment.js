import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    classOfferingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassOffering"
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);