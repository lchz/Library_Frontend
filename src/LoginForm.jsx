import { useState, useEffect } from "react"
import { LOGIN } from "./queries"
import { useMutation } from "@apollo/client"
// import { useEffect } from "react"
import { Navigate } from 'react-router-dom'


const LoginForm = ({ setToken, setError, setNotice}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.message)
        },
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login
            setToken(token)
            localStorage.setItem('library-user-token', token.value)

            setNotice('Logged in successfully')
        }
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()
        login({variables: {loginUsername: username, password}})
    }


    return (
        <div>
            { result.data &&  <Navigate to="/" /> }
            
            <div>
                <form onSubmit={submit}>
                    <div>
                        Username: <input value={username} onChange={({target}) => setUsername(target.value)} />
                    </div>
                    <div>
                        Password: <input type="password" value={password} onChange={({target}) => setPassword(target.value)} />
                    </div>
                    <button style={{backgroundColor: 'yellowgreen'}}>Log in</button>
                </form>
            </div>
        </div>

    )
}

export default LoginForm