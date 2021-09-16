import { useState, useEffect } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'

import CandidateCard from "./CardItem/CardItem"
import AddCandidateModal from './Modals/AddCandidateModal'
import EditCandidateModal from './Modals/EditCandidateModal'
import Header from './Header/Header'

import "./App.css"

function App() {
  const [candidateArray, setCandidateArray] = useState([])
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectCandidate, setSelectCandidate] = useState("")
  const phases = {
    INCOMING: "Incoming",
    FIRSTCONTACT: "First contact",
    SECONDCONTACT: "Second contact",
    VERBALCOMMITMENT: "Verbal commitment",
    ADDNEWPHASE:"NEW PHASE",
  }
  let phasesWithoutIncoming = {...phases}
  delete phasesWithoutIncoming.INCOMING;

  useEffect(() => {
    const saved = localStorage.getItem("candidates")
    if(JSON.parse(saved)){
      setCandidateArray(JSON.parse(saved))
    }
    
  }, [])

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidateArray))
  }, [candidateArray])

console.log(candidateArray, "ME FROM APP");

  const handleCloseAddCandidateModal = () => setShowAddModal(false);
  const handleShowAddCandidateModal = () => setShowAddModal(true);
  const handleCloseEditCandidateModal = () => setShowEditModal(false)
  const handleShowEditCandidateModal = (candidate) => {
    setShowEditModal(true)
    setSelectCandidate(candidate)
  } 

  //Object.values(phases) returns an Array to map over. Each phase will render a Col. Each candidate has a phase property and the filter-method will output them depending on the Col.
  let renderPhasesInColumns = 
    Object.values(phases).map((phase, index) => {
      return(
        <Col className="ColomnBorder" key={phase}>
          {candidateArray.filter(can => can.phase === phase) ? 
            candidateArray.filter(can => can.phase === phase).map(candidateData => {
              return(
                <CandidateCard 
                  name={candidateData.candidate} 
                  score={candidateData.score} 
                  key={candidateData.candidate}
                  handleShowEditCandidateModal={() => handleShowEditCandidateModal(candidateData)}
                  />)
              }) 
            : null
          }
          {index === 0 && 
            <Button 
            variant="primary" 
            onClick={handleShowAddCandidateModal} 
            className="AddCandidateButton"
            >Add Candidate</Button>
          }
        </Col>
        )
    })

  return (
    <>
      <Header 
        candidateArray={candidateArray} 
        setCandidateArray={setCandidateArray} 
        phases={phasesWithoutIncoming} 
        /> 
      <Container fluid="true">
        <Row className="CenterRows">
          {renderPhasesInColumns}
        </Row>
      </Container>
      <AddCandidateModal 
        showAddModal={showAddModal} 
        handleCloseAddCandidateModal={handleCloseAddCandidateModal} 
        candidateArray={candidateArray}
        setCandidateArray={setCandidateArray}
          />
      <EditCandidateModal
        showEditModal={showEditModal} 
        handleCloseEditCandidateModal={handleCloseEditCandidateModal}
        candidateArray={candidateArray} 
        setCandidateArray={setCandidateArray}
        selectCandidate={selectCandidate}
        phases={phases}
        phasesWithoutIncoming={phasesWithoutIncoming}
        />
    </>
  );
}

export default App;
