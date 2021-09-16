import {Row, Col} from "react-bootstrap"

import SortDropdown from "./SortDropdown";

const Header = ({incoming, setIncoming, phases}) => {

    let headerColumns = Object.values(phases).map(phase => {
        return (
            <Col className="HeaderBorder" key={phase}>{phase}</Col>
        )
    })

    return(
        <Row className="HeaderRow">
            <SortDropdown incoming={incoming} setIncoming={setIncoming}/>
            {headerColumns}
      </Row>
    )
}

export default Header;