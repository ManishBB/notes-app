import { Note } from "../models/note.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createNote = async (req, res) => {
    const { noteTitle, noteDescription } = req.body;

    const user = req.user?._id;
    // Create a new note object
    const note = await Note.create({
        ownersEmail: req.user?.email,
        noteTitle: noteTitle,
        noteDescription: noteDescription,
    });

    const createdNote = await Note.findById(note._id);

    if (!createNote)
        throw new ApiError(
            500,
            "Something went wrong while creating a new note"
        );

    return res
        .status(200)
        .json(new ApiResponse(200, createdNote, "Note created successfully"));
};

const updateNote = async (req, res) => {
    const { noteId, noteTitle, noteDescription } = req.body;

    const note = await Note.findOneAndUpdate(
        { _id: req.body.noteId },
        {
            $set: {
                noteTitle: noteTitle,
                noteDescription: noteDescription,
            },
        }
    );

    const createdNote = await Note.findById(note._id);

    if (!createNote)
        throw new ApiError(500, "Something went wrong while updating note");

    return res
        .status(200)
        .json(new ApiResponse(200, createdNote, "Note updated successfully"));
};

const getNoteById = async (req, res) => {
    const noteId = req.params.noteId;

    const note = await Note.findById(noteId);

    if (!note)
        throw new ApiError(500, "Something went wrong while getting note");

    return res
        .status(200)
        .json(new ApiResponse(200, note, "note fetched successfully"));
};

const deleteNote = async (req, res) => {
    const noteId = req.params.noteId;

    const note = await Note.findById(noteId);

    if (note.ownersEmail !== req.user.email) {
        throw new ApiError(404, "Unauthorized access to the user");
    }

    await Note.findByIdAndDelete(noteId);

    return res
        .status(200)
        .json(new ApiResponse(200, "", "Note deleted successfully"));
};

const getAllNotes = async (req, res) => {
    const userEmail = req.user.email;

    if (!userEmail) throw new ApiError(400, "Unauthorized Access");

    const allNotes = await Note.aggregate([
        {
            $match: {
                ownersEmail: userEmail,
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, allNotes, "All notes fetched successfully"));
};

export { createNote, getNoteById, deleteNote, getAllNotes, updateNote };
