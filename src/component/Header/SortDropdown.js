import { Dropdown, Col } from "react-bootstrap"

const SortDropdown = ({incoming, setIncoming}) => {
    const sortingEnums = {
        ASCENDINGNUMBERS: 1,
        DESCENDINGNUMBERS: 2,
        ATOZNAMES: 3,
        ZTOANAMES: 4
    }
  //Copy of Incoming, because sort() mutates array.. Case 1: Descending Score. Case 2: Ascending Score. Case 3: A-Z Name. Case 4: Z-A Name.

    const handleSort = (sortType) => {
        let copyIncomingArray = [...incoming];
        switch (sortType) {
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
        <Col className="HeaderBorder">
            <Dropdown>Incoming
                <Dropdown.Toggle style={{marginLeft:"15px"}}>
                    Sort
                </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSort(sortingEnums.ASCENDINGNUMBERS) }>Desc. Score</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort(sortingEnums.DESCENDINGNUMBERS) }>Asc. Score</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort(sortingEnums.ATOZNAMES) }>A-Z Name</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort(sortingEnums.ZTOANAMES) }>Z-A Name</Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>
        </Col>)
        
}

export default SortDropdown;