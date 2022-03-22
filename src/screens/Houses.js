import { useEffect, useState } from "react"
import {Table} from "react-bootstrap"
import { useTable, usePagination } from "react-table"

export default function Houses({columns, data}) {

    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     footerGroups,
    //     page,
    //     prepareRow,
    //   } = useTable(
    //     {
    //       columns,
    //       data,
    //     },
    //     usePagination
    //   )

    const [houseList, setHouseList] = useState([])

    function checkIfDiedOut(houseList) {
        if (!houseList.diedOut) {
            return "Yes"
        } else {
            return "No"
        }
    }

    function checkIfHasOverlord(houseList) {
        if (!houseList.overlord) {
            return "No"
        } else {
            return "Yes"
        }
    }

    useEffect(() => {
        fetch("https://anapioficeandfire.com/api/houses")
            .then(response => {
                return Promise.resolve(response.json())
            })
            .then(jsonResponse => {
                setHouseList(jsonResponse) 
            })
        }, [])

    return(
        <div className="table-container">
            <Table>
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
                    <tbody>
                        <tr>
                            <td>{house.name}</td>
                            <td>{house.region}</td>
                            <td>{house.coatOfArms}</td>
                            <td>{house.words}</td>
                            <td>{house.titles}</td> 
                            <td>{house.seats}</td>
                            <td>{checkIfDiedOut}</td>
                            <td>{checkIfHasOverlord}</td>
                            <td>{house.cadetBranches.length}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>    
        </div>
    

    )
}