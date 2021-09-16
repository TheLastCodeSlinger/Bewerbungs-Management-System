import { useState } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'

import CandidateCard from "./CardItem/CardItem"
import AddCandidateModal from './Modals/AddCandidateModal'
import EditCandidateModal from './Modals/EditCandidateModal'
import Header from './Header/Header'

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

  const phases = {
    INCOMING: "Incoming",
    FIRSTCONTACT: "First contact",
    SECONDCONTACT: "Second contact",
    VERBALCOMMITMENT: "Verbal commitment",
    XCONTACT:"X contact",
  }
  let phasesWithoutIncoming = {...phases}
  delete phasesWithoutIncoming.INCOMING;



  const handleCloseAddCandidateModal = () => setShow(false);
  const handleShowAddCandidateModal = () => setShow(true);
  //Close MoveCandidateModal.js
  const handleCloseEditCandidateModal = () => setShowMove(false)
  //Opens Modal to Move/Delete/Edit Candidate and passes the candidate-object to EditCandidateModal.js
  const handleShowEditCandidateModal = (candidate) => {
    handleChangePhaseForButton(candidate.phase)
    setShowMove(true)
    setSelectCandidate(candidate)
    Object.values(phases).map(el =>{
      console.log(phase,el,firstContact.filter(ele => candidate.phase === phase));
    })
  } 

  //Change Button in Edit-Modal. Loops over phases. Object.values() is an array.
  const handleChangePhaseForButton = (candidateData) => {
    for (let [index,[ elem]] of Object.entries(Object.entries(phases))) {
      if(candidateData === phases[elem]){
        setPhase(Object.values(phasesWithoutIncoming)[index])
      }
    }
  }

  const handleRenderCol = () => {
    Object.values(phases).map(el => {
      return (
        <Col className="ColomnBorder">
          {incoming.filter(phase => phase === el) ? incoming.filter(phase => phase === el).map(inc => {
            return (
              <CandidateCard 
                name={inc.candidate} 
                score={inc.score} 
                key={inc.candidate}
                handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc)}
                />)
            }) 
            : null
          })
        </Col>
      )
    })
  }

  return (
    <>
      <Header incoming={incoming} setIncoming={setIncoming} /> 
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
          {handleRenderCol()}
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
