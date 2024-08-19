import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import PageLayout from '../components/PageLayout';
import apiFetch from '../functions/apiFetch';


const Todo = () => {
    const [todos, setTodos] = useState([]);
    
    // Fetch data once without updating unnecessarily.
    useEffect(() => {
        const fetchTodos = async () => {
            let response = await apiFetch("/todo/");
    
            if (response.status === 200) {
                console.log(response.body);
                setTodos(response.body);
            }
            else {
                console.log("error")
            }
        }
        fetchTodos();
        
    }, []);

    return (
        <PageLayout title="Create todo">
            <Container>
                <div>
                    {todos.map((todo) => (
                        <div key={todo.id}>
                            {todo.name}
                        </div>
                    ))}
                </div>
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