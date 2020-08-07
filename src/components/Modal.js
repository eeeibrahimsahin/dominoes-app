import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Input from './Input';
export default function DominoModal(props) {
    const [show, setShow] = useState(props.show);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const clickHandler = (e) => {
        props.click(e);
        handleClose();
    };

    let content = props.body;

    if (props.type === 'input') {
        content = (
            <Input click={(e) => clickHandler(e)} player={props.player} />
        );
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                {props.type !== 'input' && (
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={clickHandler}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
}
