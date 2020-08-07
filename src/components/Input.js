import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
export default function Input(props) {
    const [title, setTitle] = useState('');
    const clickHandler = () => {
        props.click(title);
    };
    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder={`Enter Player${props.player} name`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(event) => setTitle(event.target.value)}
            />
            <InputGroup.Append>
                <Button variant="outline-secondary" onClick={clickHandler}>
                    Save
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
}
