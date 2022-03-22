import { useEffect, useState } from "react"
import {Table} from "react-bootstrap"


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

    function checkCultureStatus(character) {
        if (!character.culture) {
            return "Unknown"
        } else {
            return character.culture
        }
    }


    useEffect(() => {
        fetch("https://anapioficeandfire.com/api/characters")
            .then(response => {
                return Promise.resolve(response.json())
            })
            .then(jsonResponse => {
                setCharactersList(jsonResponse) 
            })
    }, [])


    return (
        <div className="table-container">
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
                        <td>{character.allegiances.length}</td>
                    </tr>
                ))}
                </tbody>
            </Table>    
        </div>
    )
}

