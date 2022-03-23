import { useEffect, useState } from "react"
import {Table} from "react-bootstrap"
import {Link} from "react-router-dom"

export function checkAliveStatus(character) {
    if (!character.born && !character.died) {
        return "Unknown"
    } 
    if (!character.born) {
        return "No"
    }
    if (character.born && character.died) {
        console.log("born", character.born)
        console.log("died", character.died)
        const numberBornOnly = character.born.replaceAll(/[^0-9]/g, "") * 1
        console.log(numberBornOnly)
        const numberDiedOnly = character.died.replaceAll(/[^0-9]/g, "") * 1
        const ageAtDeath = numberDiedOnly - numberBornOnly
        return "No, died at " + ageAtDeath + " years old"   
    }
    if (character.born && !character.died) {
        return "Yes"
    }
}

export default function Characters() {

    const [charactersList, setCharactersList] = useState([])

    const [pageNumber, setPageNumber] = useState(1)

    function checkCultureStatus(character) {
        if (!character.culture) {
            return "Unknown"
        } else {
            return character.culture
        }
    }

    function extractAllegiancesIds (character) {
        if (!character.allegiances.length) {
            return "No allegiances"
        } else {
            return character.allegiances
                .map(link => {
                    const id = link.replaceAll(/[^0-9]/g, "")
                    return <Link to={`/houses/${id}`}>{id}</Link>
                })
        }
    }


    useEffect(() => {
        fetch(`https://anapioficeandfire.com/api/characters?pageSize=25&page=${pageNumber}`)
            .then(response => {
                return Promise.resolve(response.json())
            })
            .then(jsonResponse => {
                setCharactersList(jsonResponse) 
            })
    }, [{pageNumber}])

      

    return (
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
                    if (charactersList.length < 25) return
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
                        <th>Character</th>
                        <th>Alive</th>
                        <th>Gender</th>
                        <th>Culture</th>
                        <th>Allegiances</th>
                    </tr>
                </thead>
                <tbody>
                {charactersList.map(character => (
                    <tr key={character.url}>
                        <td>{character.name}{(character.name && character.aliases.length) && ", "} {character.aliases.join(", ")}</td>
                        <td>{checkAliveStatus(character)}</td>
                        <td>{character.gender}</td>
                        <td>{checkCultureStatus(character)}</td> 
                        <td>{extractAllegiancesIds(character)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>    
        </div>
    )
}

