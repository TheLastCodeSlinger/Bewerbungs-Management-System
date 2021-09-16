import {Modal, Button, Form} from "react-bootstrap"

const InputModal = ({
    candidateInputScore, 
    setCandidateInputScore, 
    candidateInputName, 
    setCandidateInputName, 
    show, 
    handleCloseAddCandidateModal, 
    incoming, 
    setIncoming,}) => {

    const addCandidate = (e) => {
        //Spread copies old array and adds the new condidate to Incoming-List. Then reset Inputs.
        e.preventDefault()
        setIncoming([...incoming, {candidate: candidateInputName, score: candidateInputScore, key: candidateInputName, phase: "Incoming"}])
        setCandidateInputName("")
        setCandidateInputScore("")
        handleCloseAddCandidateModal()
      }

    return (
        <Modal show={show} onHide={handleCloseAddCandidateModal}>
            <Modal.Header>
                <Modal.Title>Add new Candidate to List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            onChange={ e => setCandidateInputName(e.target.value)}
                            value={candidateInputName}
                            type="text" 
                            placeholder="Enter Candidate Name..." />
                    </Form.Group>
                        <Form.Group>
                        <Form.Label>Score</Form.Label>
                        <Form.Control 
                            onChange={ e => setCandidateInputScore(e.target.value)} 
                            value={candidateInputScore} 
                            type="text" 
                            placeholder="Enter Candidate Score..." />
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