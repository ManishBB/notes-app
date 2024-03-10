import mongoose, { Schema, Types } from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        ownersEmail: {
            type: String,
            required: true,
        },
        noteTitle: {
            type: String,
            required: true,
        },
        noteDescription: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Note = mongoose.model("Note", noteSchema);
