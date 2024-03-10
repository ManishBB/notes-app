"use client";

import conf from "@/config/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Note = ({ id, title, description, onDelete, onUpdate }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);

    const handleDelete = () => {
        onDelete(id);
        setIsDeleteModalOpen(false);
    };

    const handleUpdate = () => {
        onUpdate(id, updatedTitle, updatedDescription);
        setIsUpdateModalOpen(false);
    };

    return (
        <div className="relative bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg text-black font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="flex justify-between">
                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
                <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Update
                </button>
            </div>

            {/* Delete confirmation modal */}
            {isDeleteModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">
                            Are you sure you want to delete this note?
                        </h2>
                        <div className="flex justify-end">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-2"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update modal */}
            {isUpdateModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">
                            Update Note
                        </h2>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="w-full text-black border-gray-300 py-2 px-4 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-4"
                        />
                        <textarea
                            value={updatedDescription}
                            onChange={(e) =>
                                setUpdatedDescription(e.target.value)
                            }
                            className="w-full text-black border-gray-300 py-2 px-4 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-20 resize-none mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AddNotePopup = ({ isOpen, onClose, onCreate }) => {
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const handleCreate = () => {
        onCreate(newTitle, newDescription);
        setNewTitle("");
        setNewDescription("");
        onClose();
    };

    return (
        isOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                        Create New Note
                    </h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full border-gray-300 py-2 px-4 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-4"
                    />
                    <textarea
                        placeholder="Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full border-gray-300 py-2 px-4 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-20 resize-none mb-4"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handleCreate}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                        >
                            Create
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

const Homepage = () => {
    const router = useRouter();

    if (typeof window !== "undefined") {
        // now access your localStorage
        const isUserLoggedIn = localStorage.getItem("isLoggedIn");
    }

    if (!isUserLoggedIn) router.push("/login");

    const [userNotes, setUserNotes] = useState();
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

    const fetchNotesData = async () => {
        const notes = await axios.get(`${conf.baseUrl}/notes/get-all-notes`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("accessToken")
                )}`,
            },
        });

        setUserNotes(notes.data.data);
    };

    useEffect(() => {
        fetchNotesData();
    }, []);

    const handleDeleteNote = async (id) => {
        try {
            const response = await axios.delete(
                `${conf.baseUrl}/notes/delete-note/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("accessToken")
                        )}`,
                    },
                }
            );

            await fetchNotesData();
        } catch (error) {
            alert("Something went wrong while deleting note!");
        }
    };

    const handleUpdateNote = async (id, updatedTitle, updatedDescription) => {
        try {
            const response = await axios.patch(
                `${conf.baseUrl}/notes/update-note`,
                {
                    noteId: id,
                    noteTitle: updatedTitle,
                    noteDescription: updatedDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("accessToken")
                        )}`,
                    },
                }
            );

            await fetchNotesData();
        } catch (error) {
            alert("Something went wrong while updating note!!");
        }
    };

    const handleCreateNote = async (newTitle, newDescription) => {
        try {
            const response = await axios.post(
                `${conf.baseUrl}/notes/create-note`,
                {
                    title: newTitle,
                    description: newDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("accessToken")
                        )}`,
                    },
                }
            );

            await fetchNotesData();
        } catch (error) {
            alert("Something went wrong while creating a note!");
        }
    };

    return (
        userNotes && (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">My Notes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userNotes.map((note) => (
                        <Note
                            key={note._id}
                            id={note._id}
                            title={note.noteTitle}
                            description={note.noteDescription}
                            onDelete={handleDeleteNote}
                            onUpdate={handleUpdateNote}
                        />
                    ))}
                </div>
                <div className="fixed bottom-8 right-8">
                    <button
                        onClick={() => setIsAddPopupOpen(true)}
                        className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600"
                    >
                        + Add Note
                    </button>
                </div>
                <AddNotePopup
                    isOpen={isAddPopupOpen}
                    onClose={() => setIsAddPopupOpen(false)}
                    onCreate={handleCreateNote}
                />
            </div>
        )
    );
};

export default Homepage;
