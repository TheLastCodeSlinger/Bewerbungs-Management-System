import { useState } from 'react'
import {Container, Table, Row, Col, Button, Dropdown} from 'react-bootstrap'

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


  const handleCloseAddCandidateModal = () => setShow(false);
  const handleShowAddCandidateModal = () => setShow(true);

  //Close MoveCandidateModal.js
  const handleCloseEditCandidateModal = () => setShowMove(false)

  //Opens Modal to Move/Delete/Edit Candidate and passes the Name to MoveCandidateModal.js
  const handleShowEditCandidateModal = (candidate) => {
    setShowMove(true)
    setSelectCandidate(candidate)
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
      <Table bordered >
        <thead>
          <tr>
            <th>
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
              </Dropdown></th>
            <th>First contact</th>
            <th>Second contact</th>
            <th>Verbal comittment</th>
          </tr>
        </thead>
      </Table>
      <Container fluid="true">
        <Row className="CenterRows">
          <Col>
            {incoming ? incoming.map(inc => {
                return(
                <CandidateCard 
                  name={inc.candidate} 
                  score={inc.score} 
                  key={inc.candidate}
                  handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc.candidate)} />)
              }) 
              : null}
            <Button 
              variant="primary" 
              onClick={handleShowAddCandidateModal} 
              className="AddCandidateButton"
              >Add Candidate</Button>
          </Col>
          <Col>
            {firstContact ? firstContact.map(inc => {
              return(
                <CandidateCard 
                  name={inc.candidate} 
                  score={inc.score} 
                  key={inc.candidate}
                  handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc.candidate)} />)
              }) 
              : null}
          </Col>
          <Col>
            {secondContact ? secondContact.map(inc => {
              return(
                <CandidateCard 
                  name={inc.candidate} 
                  score={inc.score} 
                  key={inc.candidate}
                  handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc.candidate)} />)
              }) 
              : null}
          </Col>
          <Col>
            {verbalCommitment ? verbalCommitment.map(inc => {
              return(
              <CandidateCard 
                name={inc.candidate} 
                score={inc.score} 
                key={inc.candidate}
                handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc.candidate)} />)
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
        />
    </>
  );
}

export default App;
