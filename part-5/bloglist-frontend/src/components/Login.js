const Login = ({ username, handleUsername, password, handlePassword, handleLogin }) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                username <input value={username} onChange={handleUsername} />
            </div>
            <div>
                password <input value={password} onChange={handlePassword} />
            </div>
            <button type='Submit'>log in</button>
        </form>
    )
}

export default Login