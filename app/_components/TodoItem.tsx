"use client"
import { get } from 'http';
import React, { useState } from 'react';

interface TodoItemProps {
    id: string;
    description: string;
    completed: boolean;
    getAllTodos: () => void;
}

export default function TodoItem({ id, description, completed, getAllTodos }: TodoItemProps) {
    const updateTodo = async () => {
        try {
            const updatedTodo = { id, description, completed: !completed };
            await fetch(`/api/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo),
            });
            getAllTodos();
        } catch (error) {
            // Handle error
        }
    };

    const deleteTodo = async () => {
        try {
            await fetch(`/api/todo/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
        }
    };

    return (
        <li key={id} className="todo stack-small">
            <div className="c-cb">
                <input type="checkbox" checked={completed} id={"checkbox-"+ id} onChange={updateTodo}/>
                <label className="todo-label" htmlFor={id}>
                    {description}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn btn__danger" onClick={deleteTodo}>
                    Delete
                </button>
            </div>
        </li>
        
    );
}