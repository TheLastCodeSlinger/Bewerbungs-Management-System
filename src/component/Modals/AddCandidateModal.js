import { useState, useRef, useEffect } from "react"
import {Modal, Button, Form} from "react-bootstrap"

const InputModal = ({
    show, 
    handleCloseAddCandidateModal, 
    incoming, 
    setIncoming,}) => {

    const scoreInputRef = useRef()
    const candidateInputRef = useRef()

    useEffect(() => {
        if(show) {
            candidateInputRef.current.focus();
        }
    },[show])

    const addCandidate = (e) => {
        //Spread copies old array and adds the new condidate to Incoming-List. Then reset Inputs.
        e.preventDefault()
        setIncoming([...incoming, {candidate: candidateInputRef.current.value, score: scoreInputRef.current.value, phase: "Incoming"}])
        handleCloseAddCandidateModal()
      }

    return (
        <Modal show={show} onHide={handleCloseAddCandidateModal}>
            <Modal.Header>
                <Modal.Title>Add new Candidate to List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            ref={candidateInputRef}
                            placeholder="Enter Candidate Name..."
                             />
                    </Form.Group>
                        <Form.Group>
                        <Form.Label>Score</Form.Label>
                        <Form.Control 
                            type="number" 
                            ref={scoreInputRef}
                            placeholder="Enter Candidate Score..." 
                            />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="secondary" 
                    onClick={handleCloseAddCandidateModal}>
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={addCandidate}>
                    Save Changes
                </Button>
            </Modal.Footer>
      </Modal>
    )
}

export default InputModal;