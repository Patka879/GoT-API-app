import { useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import { Table } from "react-bootstrap"
import { checkIfDiedOut } from "./Houses"
import { checkIfHasOverlord } from "./Houses"


export default function HouseDetails () {

    const {id} = useParams()

    const [houseDetails, setHouseDetails] = useState(undefined)

    useEffect(() => {
        fetch(`/api/houses/${id}`)
            .then(response => {
                return Promise.resolve(response.json())
            })
            .then(jsonResponse => {
                setHouseDetails(jsonResponse) 
            })
    }, [id])

    if(!houseDetails) {
        return <span>No details available about house {id}</span>
    }

    return(
        <div className="table-container">
            <Table className="table">
                <thead>
                    <tr>
                        <th>Name of the house</th>
                        <th>Region</th>
                        <th>Coat of Arms</th>
                        <th>Words</th>
                        <th>Titles</th>
                        <th>Seats</th>
                        <th>Has died out</th>
                        <th>Has overlord</th>
                        <th>Number of Cadet Branches</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>{houseDetails.name}</td>
                            <td>{houseDetails.region}</td>
                            <td>{houseDetails.coatOfArms}</td>
                            <td>{houseDetails.words}</td>
                            <td>{houseDetails.titles}</td> 
                            <td>{houseDetails.seats}</td>
                            <td>{checkIfDiedOut(houseDetails)}</td>
                            <td>{checkIfHasOverlord(houseDetails)}</td>
                            <td>{houseDetails.cadetBranches.length}</td>
                        </tr>
                    </tbody>
            </Table>    
        </div>
    )
}