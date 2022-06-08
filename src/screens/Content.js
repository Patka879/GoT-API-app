import Characters from "./Characters"
import Houses from "./Houses"
import {Route, Switch,Redirect} from "react-router-dom"
import HouseDetails from "./HouseDetails"


export default function Content() {
    return (
        <Switch>
            <Route path="/" element={<Redirect to="characters" />}></Route>
            <Route path="characters" element={<Characters />}></Route>
            <Route path="houses" element={<Houses />}></Route>
            <Route path="houses/:id" element={<HouseDetails />}></Route>
        </Switch>
    )
}