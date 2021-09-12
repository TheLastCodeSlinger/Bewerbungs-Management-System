import { useState } from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'

import CandidateCard from "./CardItem"
import AddCandidateModal from './AddCandidateModal'
import EditCandidateModal from './EditCandidateModal'

import "./App.css"

function App() {
  const [incoming, setIncoming] = useState([])
  const [firstContact, setFirstContact] = useState([])
  const [secondContact, setSecondContact] = useState([])
  const [verbalCommitment, setVerbalCommitment] = useState([])
  const [show, setShow] = useState(false);
  const [showMove, setShowMove] = useState(false)
  const [candidateInputName, setCandidateInputName] = useState("")
  const [candidateInputScore, setCandidateInputScore] = useState(0)
  const [selectCandidate, setSelectCandidate] = useState("")
  const [phase, setPhase] = useState("")


  const handleCloseAddCandidateModal = () => setShow(false);
  const handleShowAddCandidateModal = () => setShow(true);

  //Close MoveCandidateModal.js
  const handleCloseEditCandidateModal = () => setShowMove(false)

  //Opens Modal to Move/Delete/Edit Candidate and passes the candidate-object to EditCandidateModal.js
  const handleShowEditCandidateModal = (candidate) => {
    handleChangePhaseForButton(candidate.phase)
    setShowMove(true)
    setSelectCandidate(candidate)
  } 

  //Changes the Button in the Edit-Modal.
  const handleChangePhaseForButton = (candidateData) => {
    if(candidateData === "Incoming"){
        setPhase("First contact");
    }
    if(candidateData === "First contact"){
        setPhase("Second contact");
    }
    if(candidateData === "Second contact"){
        setPhase("Verbal commitment");
    }
}

  //Copy of Incoming, because sort() mutates array.. Case 1: Descending Score. Case 2: Ascending Score. Case 3: A-Z Name. Case 4: Z-A Name.
  const handleSort = (type) => {
    let copyIncomingArray = [...incoming];
    switch (type) {
      case 1:
        setIncoming(copyIncomingArray.sort((a,b) => b.score - a.score))
        break;
      case 2: 
        setIncoming(copyIncomingArray.sort((a,b) => a.score - b.score))
        break;
      case 3:
        setIncoming(copyIncomingArray.sort((a,b) => a.candidate > b.candidate ? 1 : -1))
        break;
      case 4:
        setIncoming(copyIncomingArray.sort((a,b) => b.candidate > a.candidate ? 1 : -1))
        break;
      default:
        break;
    }
  }


  return (
    <>
      <Row className="HeaderRow">
        <Col className="HeaderBorder">
          <Dropdown>Incoming
            <Dropdown.Toggle style={{marginLeft:"15px"}}>
                  Sort
              </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSort(1) }>Desc. Score</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort(2) }>Asc. Score</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort(3) }>A-Z Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort(4) }>Z-A Name</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
        </Col>
        <Col className="HeaderBorder">First contact</Col>
        <Col className="HeaderBorder">Second contact</Col>
        <Col className="HeaderBorder">Verbal comittment</Col>
      </Row>
      <Container fluid="true">
        <Row className="CenterRows">
          <Col className="ColomnBorder">
            {incoming ? incoming.map(inc => {
                return(
                <CandidateCard 
                  name={inc.candidate} 
                  score={inc.score} 
                  key={inc.candidate}
                  handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc)}
                  />)
              }) 
              : null}
            <Button 
              variant="primary" 
              onClick={handleShowAddCandidateModal} 
              className="AddCandidateButton"
              >Add Candidate</Button>
          </Col>
          <Col className="ColomnBorder">
            {firstContact ? firstContact.map(inc => {
              return(
                <CandidateCard 
                  name={inc.candidate} 
                  score={inc.score} 
                  key={inc.candidate}
                  handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc)} 
                  />)
              }) 
              : null}
          </Col>
          <Col className="ColomnBorder">
            {secondContact ? secondContact.map(inc => {
                return(
                  <CandidateCard 
                    name={inc.candidate} 
                    score={inc.score} 
                    key={inc.candidate}
                    handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc)}
                     />)
                }) 
                : null}
          </Col>
          <Col className="ColomnBorder">
            {verbalCommitment ? verbalCommitment.map(inc => {
                return(
                  <CandidateCard 
                    name={inc.candidate} 
                    score={inc.score} 
                    key={inc.candidate}
                    handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc)} 
                    />)
                }) 
                : null}
          </Col>
        </Row>
      </Container>
      <AddCandidateModal 
        show={show} 
        handleCloseAddCandidateModal={handleCloseAddCandidateModal} 
        candidateInputName={candidateInputName}
        setCandidateInputName={setCandidateInputName}
        candidateInputScore={candidateInputScore}
        setCandidateInputScore={setCandidateInputScore}
        incoming={incoming}
        setIncoming={setIncoming}
          />
      <EditCandidateModal 
        show={showMove} 
        handleCloseEditCandidateModal={handleCloseEditCandidateModal}
        incoming={incoming} 
        setIncoming={setIncoming}
        firstContact={firstContact}
        setFirstContact={setFirstContact}
        selectCandidate={selectCandidate}
        setCandidateInputScore={setCandidateInputScore}
        candidateInputScore={candidateInputScore}
        candidateInputName={candidateInputName}
        setCandidateInputName={setCandidateInputName}
        secondContact={secondContact}
        setSecondContact={setSecondContact}
        verbalCommitment={verbalCommitment}
        setVerbalCommitment={setVerbalCommitment}
        phase={phase}
        />
    </>
  );
}

export default App;
