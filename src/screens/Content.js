import Characters from "./Characters"
import Houses from "./Houses"
import {Route, Routes, Navigate} from "react-router-dom"
import HouseDetails from "./HouseDetails"


export default function Content() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="characters" />}></Route>
            <Route path="characters" element={<Characters />}></Route>
            <Route path="houses" element={<Houses />}></Route>
            <Route path="houses/:id" element={<HouseDetails />}></Route>
        </Routes>
    )
}