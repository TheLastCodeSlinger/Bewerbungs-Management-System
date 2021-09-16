import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"

const MoveCandidateModal = ({
    handleCloseEditCandidateModal, 
    show, 
    incoming, 
    setIncoming, 
    selectCandidate,
    phases,
    phasesWithoutIncoming
    }) => {

    const [actionValue, setActionValue] = useState(0)
    const [phase, setPhase] = useState("")
    const [candidateInputName, setCandidateInputName] = useState("")
    const [candidateInputScore, setCandidateInputScore] = useState(0)
    const action = {
        MOVECANDIDATE: 1,
        REMOVECANDIDATE: 2,
        CHANGECANDIDATE: 3
    }
    let saveCandidateData = incoming.filter(candidateName => candidateName.candidate === selectCandidate.candidate);

    //Changes Edit-Modal-Button for next phase whenever the edit-button is clicked. Loops over phases-object-values to look for a match and then uses the modified withoutIncoming object.
    useEffect(() => {
        if(show){
            for (let [index,[ key, value]] of Object.entries(Object.entries(phases))) {
              if(saveCandidateData[0].phase === value){
                setPhase(Object.values(phasesWithoutIncoming)[index])
              }
            }
        }
    }, [show])

    //Iterates over phases. If match, then the old candidate+phase gets filtered out and a new candidate+next phase is added.
    const handleMoveCandidate = () => {
        for (let [index,[ elem]] of Object.entries(Object.entries(phases))) {
          if(saveCandidateData[0].phase === phases[elem]){
            setIncoming([...incoming.filter(can => can.candidate !== saveCandidateData[0].candidate), {candidate: saveCandidateData[0].candidate, score: saveCandidateData[0].score, key: saveCandidateData[0].candidate, phase: Object.values(phasesWithoutIncoming)[index]}] )
          }
        }
      }

    const handleRemoveCandidate = (candidateData) => {
        setIncoming([...incoming.filter(can => can.candidate !== candidateData[0].candidate)])
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
                saveCandidateData[0].score = candidateInputScore;
                saveCandidateData[0].candidate = candidateInputName;
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