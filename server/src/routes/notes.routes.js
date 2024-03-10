import { Router } from "express";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import {
    createNote,
    deleteNote,
    getAllNotes,
    getNoteById,
    updateNote,
} from "../controllers/note.controller.js";

const router = Router();

router.route("/create-note").post(verifyUserJWT, createNote);
router.route("/update-note").patch(verifyUserJWT, updateNote);
router.route("/delete-note/:noteId").delete(verifyUserJWT, deleteNote);
router.route("/get-note/:noteId").get(verifyUserJWT, getNoteById);
router.route("/get-all-notes").get(verifyUserJWT, getAllNotes);

export default router;
