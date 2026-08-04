import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    audience: {
        type: String,
        enum: ['students', 'teachers', 'all'],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    classOfferingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassOffering"
    }
}, {
    timestamps: true
});

export default mongoose.models.Notice || mongoose.model("Notice", noticeSchema);