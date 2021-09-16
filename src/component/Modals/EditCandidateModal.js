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
    candidateInputName,
    verbalCommitment,
    setVerbalCommitment,
    secondContact,
    setSecondContact,
    phase
    }) => {

    const [actionValue, setActionValue] = useState(0)
    var getCandidateData;

    //Receives the selected candidate-object/getCandidateData as input. Checks in which phase the candidate is and after pressing "save change" button, it will change the selected candidates phase to the next one.
    const handleMoveCandidate = (candidateData) => {
        if(candidateData[0].phase === "Incoming"){
            setFirstContact([...firstContact, {candidate: candidateData[0].candidate, score: candidateData[0].score, key: candidateData[0].candidate, phase: "First contact"}])
        }
        if(candidateData[0].phase === "First contact"){
            setSecondContact([...secondContact, {candidate: candidateData[0].candidate, score: candidateData[0].score, key: candidateData[0].candidate, phase: "Second contact"}])
        }
        if(candidateData[0].phase === "Second contact"){
            setVerbalCommitment([...verbalCommitment, {candidate: candidateData[0].candidate, score: candidateData[0].score, key: candidateData[0].candidate, phase: "Verbal commitment"}])
        }
    }

    //Receives the selected candidate-object/getCandidateData as input. Checks in which phase he is in order to remove him from the array/state.
    const handleRemoveCandidate = (candidateData) => {
        if(candidateData[0].phase === "Incoming"){
            setIncoming(incoming.filter(candidateName => candidateName.candidate !== selectCandidate.candidate))
        }
        if(candidateData[0].phase === "First contact"){
            setFirstContact(firstContact.filter(candidateName => candidateName.candidate !== selectCandidate.candidate))
        }
        if(candidateData[0].phase === "Second contact"){
            setSecondContact(secondContact.filter(candidateName => candidateName.candidate !== selectCandidate.candidate))
        }
        if(candidateData[0].phase === "Verbal commitment"){
            setVerbalCommitment(verbalCommitment.filter(candidateName => candidateName.candidate !== selectCandidate.candidate))
        }

    }

    // Checks in which phase the candidate is to access the right array/state for the filter. 
    const handleFilterCandidateDataForFurtherUse = () => {
        if(selectCandidate.phase === "Incoming"){
            getCandidateData = incoming.filter(candidateName => candidateName.candidate === selectCandidate.candidate);
        }
        if(selectCandidate.phase === "First contact"){
            getCandidateData = firstContact.filter(candidateName => candidateName.candidate === selectCandidate.candidate);
        }
        if(selectCandidate.phase === "Second contact"){
            getCandidateData = secondContact.filter(candidateName => candidateName.candidate === selectCandidate.candidate);
        }
        if(selectCandidate.phase === "Verbal commitment"){
            getCandidateData = verbalCommitment.filter(candidateName => candidateName.candidate === selectCandidate.candidate);
        }
    }
    
    // handleFilterCandidateDataForFurtherUse gets the Data from the selected candidate.
    // Case 1: Moves Candidate from Incoming to First. Case 2: Deletes Candidate from Incoming. Case 3: Set new Score for Candidate.
    const handleApplyEdit = (e) => {
        e.preventDefault()
        handleFilterCandidateDataForFurtherUse()
        switch (actionValue) {
            case 1:
                handleMoveCandidate(getCandidateData)
                handleRemoveCandidate(getCandidateData)
                handleCloseEditCandidateModal()
                setActionValue(0)
                break;
            case 2:
                handleRemoveCandidate(getCandidateData)
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
                <Modal.Title>{selectCandidate.candidate} 
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
                <Button variant="outline-success" onClick={() => setActionValue(1)}>{phase}</Button>
                <Button variant="outline-success" onClick={() => setActionValue(2)}>Remove Candidate</Button>
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