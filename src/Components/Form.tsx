import "./Form.css"
import {useState} from "react"

const API_URL = "http://localhost:3010/"

const logInData = {
    email: "a22110109@ceti.mx",
    password: "12345"
}
const logIn = async ({email, password}: {email: string, password: string}) => {
    try{

        const response = await fetch(`${API_URL}api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })

        const data = await response.json()
        console.log(data)
    }catch(error){
        console.log(error)
    }
}

function Form(){
    const [email, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleInputChange = (stateUpdate: (arg0: any) => void) => {
        return (event: { target: { value: any } }) => {
            stateUpdate(event.target.value)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        logIn({email, password})
        /*if (email !== logInData.email || password !== logInData.password) {
            alert("Correo electrónico o contraseña incorrectos");
            return;
        }

        alert("Datos correctos. Puedes proceder.");*/
    };


    

    return(
        <div className="divForm">
            <form onSubmit={handleSubmit}>
                <h1>LogIn</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setUsername)} required/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)} required/>
                <button type="submit" id="btn_submit">Submit</button>
            </form>
        </div>
    )

}

export default Form;