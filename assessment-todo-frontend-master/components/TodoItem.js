import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import apiFetch from '../functions/apiFetch';
import { Colours, Typography } from '../definitions';


// TodoItem is a component used to display individual todo items, and takes in a single todo object as props.
const TodoItem = ({todoData}) => {

    const [todo, setTodo] = useState({
        ...todoData,
        todoID: todoData.todoID || '',
        name: todoData.name || 'Unnamed Todo',
        completed: todoData.completed || false
    });

    // update completed state in both frontend and persist in database at the same time.
    const handleCheckboxChange = async (event) => {
        setTodo({
            ...todo,
            completed: event.target.checked
        });

        let response = await apiFetch(`/todo/${todo.todoID}`, {
            body: {
                ...todo,
                completed: event.target.checked
            },
            method: "PUT"
        });

        if (response.status === 204) {
            console.log("success");
        }
        else {
            console.log("error");
        }
    }

    return (
        <Container completed={todo.completed}>
            <div className='item'>
                {todo.name}
                <label>
                    <input 
                            type='checkbox' 
                            checked={todo.completed}
                            onChange={handleCheckboxChange}
                        />
                    Completed
                </label>
            </div>
        </Container>
    );
}

export default TodoItem;

const Container = styled.div`
    width: 100%;

    .item {
        display: flex;
        justify-content: space-between;
        margin: 2rem 2rem;
        padding: 1.5rem 1.5rem;
        border: 1px solid ${Colours.GRAY_DARK};
        border-radius: 0.75rem;
        background-color: ${props => props.completed ? Colours.GREEN : Colours.GRAY_LIGHT};
    }
`