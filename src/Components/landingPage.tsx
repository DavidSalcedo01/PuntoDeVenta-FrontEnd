import React, { useState, useEffect } from 'react';

// Datos estáticos de ejemplo
const logInData: User = {
    email: "a22110109@ceti.mx",
    password: "12345"
};
const product = [
    { _id: 1, name: "Producto 1", description: "Descripción del producto 1" },
    { _id: 2, name: "Producto 2", description: "Descripción del producto 2" },
    { _id: 3, name: "Producto 3", description: "Descripción del producto 3" }
];

function LandingPage() {
    const [showTable, setShowTable] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Validación de usuario con datos estáticos
        const storedUser = window.localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            window.localStorage.setItem("user", JSON.stringify(logInData));
            setUser(logInData);
        }
    }, []);

    const handleButtonClick = () => {
        setShowTable(true);
    };

    return (
        <div className="divForm">
            <div className="landingPage__container">
                <div className="landingPage__content">
                    <h1>Tienda de bicicletas</h1>
                    <p>Obten las mejores marcas en un solo lugar</p>
                    <div className="products">
                        <button onClick={handleButtonClick}>
                            <img src="https://assets.specialized.com/i/specialized/98023-31_KENEVO-SL-EXPERT-CARBON-29-HRVGLD-OBSD_HERO-SQUARE?$scom-plp-product-image-square$&fmt=auto" alt="bicycle1"/>
                        </button>
                        <button onClick={handleButtonClick}>
                            <img src="https://cdn.shoplightspeed.com/shops/620181/files/41408363/650x650x2/bicicleta-alubike-revel-silver-sora.jpg" alt="bicycle2"/>
                        </button>
                        <button onClick={handleButtonClick}>
                            <img src="https://www.costco.com.mx/medias/sys_master/products/had/h08/140288989462558.jpg" alt="bicycle3"/>
                        </button>
                        <button onClick={handleButtonClick}>
                            <img src="https://i5.walmartimages.com.mx/mg/gm/3pp/asr/472473ba-95f2-429e-9f2b-3b8c6abfad38.916eeb249b4e47493711067dd6d21bc0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" alt="bicycle4"/>
                        </button>
                    </div>
                    {user && showTable && product.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map((item: any) => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
