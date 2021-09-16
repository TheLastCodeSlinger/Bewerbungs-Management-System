import {Card, Button, } from "react-bootstrap"

import "./CardItem.css"

const CardItem = ({name, score, handleShowEditCandidateModal}) => {

    return(
        <Card className="CardSize" key={name}>
            <Card.Title>
                {name} ({score})
            </Card.Title>
            <Card.Body>
                <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleShowEditCandidateModal} >Edit</Button>
            </Card.Body>
      </Card>
    )
}

export default CardItem;