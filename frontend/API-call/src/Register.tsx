import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap';

interface RegisterForm {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export default function Register() {
    const [validated, setValidated] = useState(false);
    const [isDifferent, setIsDifferent] = useState(false);
    const [alertMess, setAlertMess] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Boilerplate stuff

        // Disable submit event
        event.preventDefault();
        
        const form = event.currentTarget;

        setValidated(true); // Make Bootstrap display validation check
        setIsDifferent(false); // Set password check to default
        setAlertMess(""); // Set error message to default

        // Check if all form field is valid
        if (form.checkValidity() === true) {
            const password1: HTMLInputElement = form["password1"];
            const password2: HTMLInputElement = form["password2"];

            // Check if two password are the same
            if (password1.value !== password2.value) {
                setIsDifferent(true);
                setValidated(false);
                setAlertMess("Retype your password")
            } else {
                // API request
                let register_form: RegisterForm = {
                    username: form["username"].value,
                    password: form["password1"].value,
                    email: form["email"].value,
                    firstName: form["firstname"].value,
                    lastName: form["lastname"].value,
                }
            }
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='p-5 rounded bg-info-subtle'>
                    {!!alertMess && <Alert variant='danger'>{alertMess}</Alert>}
                    <Form validated={validated} noValidate onSubmit={handleSubmit}>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId='email'>
                                        <Form.Label><strong>Email address</strong></Form.Label>
                                        <Form.Control type="email" required maxLength={255} />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId='username'>
                                        <Form.Label><strong>Username</strong></Form.Label>
                                        <Form.Control type="text" required maxLength={255}></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId='password1'>
                                        <Form.Label><strong>Password</strong></Form.Label>
                                        <Form.Control type="password" required maxLength={255} minLength={8} isInvalid={isDifferent}></Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId='password2'>
                                        <Form.Label><strong>Re-enter password</strong></Form.Label>
                                        <Form.Control type="password" required maxLength={255} minLength={8} isInvalid={isDifferent}></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId='firstname'>
                                        <Form.Label><strong>First name</strong></Form.Label>
                                        <Form.Control type="text" required maxLength={255}></Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId='lastname'>
                                        <Form.Label><strong>Last name</strong></Form.Label>
                                        <Form.Control type="text" required maxLength={255}></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Button type="submit" className="my-3">Register</Button>
                            </Row>
                        </Container>
                    </Form>
                </div>
            </div>
        </>
    )
}
