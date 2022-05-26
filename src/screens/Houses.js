import { useEffect, useState } from "react"
import {Table} from "react-bootstrap"


export function checkIfDiedOut(houseList) {
    if (!houseList.diedOut) {
        return "Yes"
    } else {
        return "No"
    }
}

export function checkIfHasOverlord(houseList) {
    if (!houseList.overlord) {
        return "No"
    } else {
        return "Yes"
    }
}

export default function Houses({columns, data}) {


    const [houseList, setHouseList] = useState([])
    const [pageNumber, setPageNumber] = useState(1)


    useEffect(() => {
        fetch(`/api/houses?pageSize=25&page=${pageNumber}`)
            .then(response => {
                return Promise.resolve(response.json())
            })
            .then(jsonResponse => {
                setHouseList(jsonResponse) 
            })
        }, [pageNumber])

    return(
        <div className="table-container">
            <button
                onClick={() => {
                    setPageNumber(1)
                }}
                className="button"
            >❮❮ First
            </button>
            <button 
                onClick={() => {
                    if (pageNumber === 1) return
                    setPageNumber(pageNumber - 1)
                }} 
                className="button"
            >❮ Prev</button>
            <span>{pageNumber}</span>
            <button 
                onClick={() => {
                    if (houseList.length < 25) return
                    setPageNumber(pageNumber + 1)
                }} 
                className="button"
            >Next ❯</button>
            <button
                onClick={() => {
                    setPageNumber(86)
                }}
                className="button"
            >Last ❯❯
            </button>
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
                {houseList.map(house => (
                    <tbody key={house.name}>
                        <tr>
                            <td>{house.name}</td>
                            <td>{house.region}</td>
                            <td>{house.coatOfArms}</td>
                            <td>{house.words}</td>
                            <td>{house.titles}</td> 
                            <td>{house.seats}</td>
                            <td>{checkIfDiedOut(house)}</td>
                            <td>{checkIfHasOverlord(house)}</td>
                            <td>{house.cadetBranches.length}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>    
        </div>
    

    )
}