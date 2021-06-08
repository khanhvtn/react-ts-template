import React ,{FunctionComponent}from "react"

type Props = {
    message?: string
}
const App: FunctionComponent<Props> = ({message})=>{
    return <h1>{message}</h1>
}

export default App;