import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import PageLayout from '../components/PageLayout';
import apiFetch from '../functions/apiFetch';
import TodoItem from '../components/TodoItem';
import Alert from '../components/Alert';


const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    // Fetch data once without updating unnecessarily.
    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            let response = await apiFetch("/todo/");
    
            if (response.status === 200) {
                setTodos(response.body);
                setLoading(false);
            }
            else {
                setLoading(false);
                setError(true);
            }
        }
        fetchTodos();
        
    }, []);

    return (
        <PageLayout title="My Todos">
            <Container>
                {error && <Alert text="Something went wrong. Please try again later." />}
                {loading && <Alert text="Loading..." />}
                {!loading && !error && todos.length === 0 && <Alert text="No todos found." />}
                {!loading && !error && todos.length > 0 &&
                <div>
                    <h1>My Todos</h1>
                    {todos.map((todo) => (
                        <TodoItem todoData={todo} />
                    ))}
                </div>
                }
            </Container>
        </PageLayout>
    );
};

export default Todo;

const Container = styled.div`
    width: 100%;

    .content {
        h1 {
            color: ${Colours.BLACK};
            font-size: ${Typography.HEADING_SIZES.M};
            font-weight: ${Typography.WEIGHTS.LIGHT};
            line-height: 2.625rem;
            margin-bottom: 2rem;
            margin-top: 1rem;
        }

        .saveButton {
            margin-top: 1rem;
        }
    }
`;