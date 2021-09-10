import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"

const MoveCandidateModal = ({
    handleCloseEditCandidateModal, 
    show, 
    incoming, 
    setIncoming, 
    setFirstContact, 
    selectCandidate, 
    firstContact,
    setCandidateInputScore,
    candidateInputScore,
    setCandidateInputName,
    candidateInputName}) => {

    const [actionValue, setActionValue] = useState(0)

    // getCandidateData gets the data from selected Candidate. Case 1: Moves Candidate from Incoming to First. Case 2: Deletes Candidate from Incoming. Case 3: Set new Score for Candidate.
    const handleApplyEdit = (e) => {
        e.preventDefault()
        let getCandidateData = incoming.filter(e => e.candidate === selectCandidate);
        switch (actionValue) {
            case 1:
                setFirstContact([...firstContact, {candidate: getCandidateData[0].candidate, score: getCandidateData[0].score, key: getCandidateData[0].candidate}])
                setIncoming(incoming.filter(e => e.candidate !== selectCandidate))
                handleCloseEditCandidateModal()
                setActionValue(0)
                break;
            case 2:
                setIncoming(incoming.filter(e => e.candidate !== selectCandidate))
                handleCloseEditCandidateModal()
                setActionValue(0)
                break;
            case 3:
                getCandidateData[0].score = candidateInputScore;
                getCandidateData[0].candidate = candidateInputName;
                handleCloseEditCandidateModal();
                setCandidateInputScore("")
                setCandidateInputName("")
                setActionValue(0)
                break;
            default:
                handleCloseEditCandidateModal()
                setActionValue(0)
                break;
        }
    }

    return(
        <Modal show={show} onHide={handleCloseEditCandidateModal}>
            <Modal.Header>
                <Modal.Title>{selectCandidate} 
                    <Form>
                        <Form.Group>
                            <Form.Label>Edit Name</Form.Label>
                            <Form.Control 
                                onChange={ e => setCandidateInputName(e.target.value)}
                                value={candidateInputName}
                                type="text" 
                                placeholder="Enter new Name..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Edit score</Form.Label>
                            <Form.Control 
                                onChange={ e => setCandidateInputScore(e.target.value)}
                                value={candidateInputScore}
                                type="text" 
                                placeholder="Enter new score..." />
                        </Form.Group>
                    </Form>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>  
                <Button variant="outline-success" onClick={() => setActionValue(1)}>First contact</Button>
                <Button variant="outline-success" onClick={() => setActionValue(2)}>Delete Candidate</Button>
                <Button variant="outline-success" onClick={() => setActionValue(3)}>Edit Name/Score</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="secondary" 
                    onClick={handleCloseEditCandidateModal}>
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleApplyEdit}
                    type="submit"
                    >
                    Save Changes
                </Button>
            </Modal.Footer>
      </Modal>
    )
}

export default MoveCandidateModal;