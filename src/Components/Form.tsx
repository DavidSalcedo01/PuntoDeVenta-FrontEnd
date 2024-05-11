import "./Form.css"
import {useEffect, useState} from "react"

const API_URL = "http://localhost:3010/"

const logInData = {
    email: "a22110109@ceti.mx",
    password: "12345"
}

function Form(){
    const [email, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [user, setUser] = useState<any>(null)
    const [product, setProduct] = useState<any>(null)

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("user")
        const userInStorage = JSON.parse(userInStorageString || "null")
        setUser(userInStorage)
        if(userInStorage){
            fetchBicycles()
        }
    }, [])

    const handleInputChange = (stateUpdate: (arg0: any) => void) => {
        return (event: { target: { value: any } }) => {
            stateUpdate(event.target.value)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        logIn({email, password})
    };

    const logIn = async ({email, password}: {email: string, password: string}) => {
        try{
    
            const response = await fetch(`${API_URL}api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })

            if(response.status === 200){
                const data = await response.json()
                setUser(data)
                window.localStorage.setItem("user", JSON.stringify(data))
            }
            else{
                alert("Correo electrónico o contraseña incorrectos")
            }
        }catch(error){
            console.log("Error logIn",error)
        }
    }

    const fetchBicycles = async () => {
        if (!user) {
            return;
        }
        try{
            const response = await fetch(`${API_URL}api/v1/categories`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            })

            if(response.status === 200){
                const data = await response.json()
                setProduct(data)
                console.log("Categories",data)
            }
            else{
                alert("Correo electrónico o contraseña incorrectos")
            }
        }catch(error){
            console.log("Error Fetch",error)
        }
    }
    

    return(
        <>
            {
                user && product && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product && product.map((item: any) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
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
        </>
    )

}

export default Form;