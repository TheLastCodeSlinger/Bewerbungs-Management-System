import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap"

const MoveCandidateModal = ({
    handleCloseEditCandidateModal, 
    showEditModal, 
    candidateArray, 
    setCandidateArray, 
    selectCandidate,
    phases,
    phasesWithoutIncoming
    }) => {

    const [actionValue, setActionValue] = useState(0)
    const [phase, setPhase] = useState("")
    const scoreInputRef = useRef()
    const candidateInputRef = useRef()
    const action = {
        MOVECANDIDATE: 1,
        REMOVECANDIDATE: 2,
        CHANGECANDIDATE: 3
    }
    let saveCandidateData = candidateArray.filter(candidateName => candidateName.candidate === selectCandidate.candidate)[0];
    useEffect(() => {
        if(showEditModal) {
            candidateInputRef.current.focus();
        }
    },[showEditModal])

    //Changes Edit-Modal-Button for next phase whenever the edit-button is clicked. Loops over phases-object-values to look for a match and then uses the modified withoutIncoming object.
    useEffect(() => {
        if(showEditModal){
            for (let [index,[ key, value]] of Object.entries(Object.entries(phases))) {
              if(saveCandidateData.phase === value){
                setPhase(Object.values(phasesWithoutIncoming)[index])
              }
            }
        }
    }, [showEditModal])

    //Iterates over phases. If match, then the old candidate+phase gets filtered out and a new candidate+next phase is added.
    const handleMoveCandidate = () => {
        for (let [index,[ elem]] of Object.entries(Object.entries(phases))) {
          if(saveCandidateData.phase === phases[elem]){
            setCandidateArray([...candidateArray.filter(can => can.candidate !== saveCandidateData.candidate), {
                candidate: saveCandidateData.candidate, 
                score: saveCandidateData.score, key: saveCandidateData.candidate, 
                phase: Object.values(phasesWithoutIncoming)[index]}] )
          }
        }
      }

    const handleRemoveCandidate = (candidateData) => {
        setCandidateArray([...candidateArray.filter(can => can.candidate !== candidateData.candidate)])
    }

    
    // Case 1: Moves Candidate from Incoming to First. Case 2: Deletes Candidate from Incoming. Case 3: Set new Score for Candidate.
    const handleApplyEdit = (e) => {
        e.preventDefault()
        switch (actionValue) {
            case 1:
                handleMoveCandidate()
                handleCloseEditCandidateModal()
                setActionValue(0)
                break;
            case 2:
                handleRemoveCandidate(saveCandidateData)
                handleCloseEditCandidateModal()
                setActionValue(0)
                break;
            case 3:
                saveCandidateData[0].score = scoreInputRef.current.value;
                saveCandidateData[0].candidate = candidateInputRef.current.value;
                handleCloseEditCandidateModal();
                setActionValue(0)
                break;
            default:
                handleCloseEditCandidateModal()
                setActionValue(0)
                break;
        }
    }
  

    return(
        <Modal show={showEditModal} onHide={handleCloseEditCandidateModal}>
            <Modal.Header>
                <Modal.Title>{selectCandidate.candidate} 
                    <Form>
                        <Form.Group>
                            <Form.Label>Edit Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                ref={candidateInputRef}
                                placeholder="Enter new Name..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Edit score</Form.Label>
                            <Form.Control 
                                ref={scoreInputRef}
                                type="number" 
                                placeholder="Enter new score..." />
                        </Form.Group>
                    </Form>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>  
                <Button variant="outline-success" onClick={() => setActionValue(action.MOVECANDIDATE)}>{phase}</Button>
                <Button variant="outline-success" onClick={() => setActionValue(action.REMOVECANDIDATE)}>Remove Candidate</Button>
                <Button variant="outline-success" onClick={() => setActionValue(action.CHANGECANDIDATE)}>Edit Name/Score</Button>
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