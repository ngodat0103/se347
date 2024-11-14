import { useState } from "react";
import { Alert, Container, Form, Row, Col, Button } from "react-bootstrap";

import { LoginForm, LoginResponse } from "../types/user";
import { login } from "../services/user_api";



export default function Login({ changePage }: { changePage: (page: string) => void }) {
    const [alertMess, setAlertMess] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Disable submit event
        event.preventDefault();

        setAlertMess("");

        const form = event.currentTarget;
        console.debug(form);

        const login_form: LoginForm = {
            username: form["username"].value,
            password: form["password"].value
        };

        try {
            const res: LoginResponse = await login(login_form);
            console.debug(res);

            // Set token to local storage
            localStorage.setItem("accessToken", res.accessToken.tokenValue);
        } catch (error) {
            if (error instanceof Error) {
                setAlertMess(error.message);
            } // Should not return any other type of error
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='p-5 rounded bg-info-subtle w-50'>
                    {!!alertMess && <Alert variant='danger'>{alertMess}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Container fluid>
                            <Row>
                                <Form.Group className="mb-3" controlId='username'>
                                    <Form.Label><strong>Username</strong></Form.Label>
                                    <Form.Control type="text" required maxLength={255}></Form.Control>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3" controlId='password'>
                                    <Form.Label><strong>Password</strong></Form.Label>
                                    <Form.Control type="password" required maxLength={255} minLength={8}></Form.Control>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Button type="submit" className="my-3">Login</Button>
                            </Row>

                            <Row className="text-center">
                                <Col>or <a href="" onClick={(e) => { e.preventDefault(); changePage("register") }}>Register</a></Col>
                            </Row>
                            {/* TODO: Add link to test authentication */}
                        </Container>
                    </Form>
                </div>
            </div>
        </>
    );
}