import {Row, Col} from "react-bootstrap"

import SortDropdown from "./SortDropdown";

const Header = ({incoming, setIncoming}) => {
    

    return(
        <Row className="HeaderRow">
            <SortDropdown incoming={incoming} setIncoming={setIncoming}/>
        <Col className="HeaderBorder">First contact</Col>
        <Col className="HeaderBorder">Second contact</Col>
        <Col className="HeaderBorder">Verbal comittment</Col>
      </Row>
    )
}

export default Header;