import { useState } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'

import CandidateCard from "./CardItem/CardItem"
import AddCandidateModal from './Modals/AddCandidateModal'
import EditCandidateModal from './Modals/EditCandidateModal'
import Header from './Header/Header'

import "./App.css"

function App() {
  const [incoming, setIncoming] = useState([])
  const [show, setShow] = useState(false);
  const [showMove, setShowMove] = useState(false)
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



  const handleCloseAddCandidateModal = () => setShow(false);
  const handleShowAddCandidateModal = () => setShow(true);
  const handleCloseEditCandidateModal = () => setShowMove(false)
  const handleShowEditCandidateModal = (candidate) => {
    setShowMove(true)
    setSelectCandidate(candidate)
  } 

  //Object.values(phases) returns an Array to map over. Each phase will render a Col. Each candidate has a phase property and the filter-method will output them depending on the Col.
  let renderColumns = 
    Object.values(phases).map((el, index) => {
      return(
        <Col className="ColomnBorder" key={el}>
          {incoming.filter(can => can.phase === el) ? incoming.filter(can => can.phase === el).map(inc => {
            return(
              <CandidateCard 
                name={inc.candidate} 
                score={inc.score} 
                key={inc.candidate}
                handleShowEditCandidateModal={() => handleShowEditCandidateModal(inc)}
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
        incoming={incoming} 
        setIncoming={setIncoming} 
        phases={phasesWithoutIncoming} 
        /> 
      <Container fluid="true">
        <Row className="CenterRows">
          {renderColumns}
        </Row>
      </Container>
      <AddCandidateModal 
        show={show} 
        handleCloseAddCandidateModal={handleCloseAddCandidateModal} 
        incoming={incoming}
        setIncoming={setIncoming}
          />
      <EditCandidateModal
        show={showMove} 
        handleCloseEditCandidateModal={handleCloseEditCandidateModal}
        incoming={incoming} 
        setIncoming={setIncoming}
        selectCandidate={selectCandidate}
        phases={phases}
        phasesWithoutIncoming={phasesWithoutIncoming}
        />
    </>
  );
}

export default App;
