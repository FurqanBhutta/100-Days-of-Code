import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
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
    totalMarks: {
        type: Number,
        required: true 
    },
    grade: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

export default mongoose.models.Result || mongoose.model("Result", resultSchema);