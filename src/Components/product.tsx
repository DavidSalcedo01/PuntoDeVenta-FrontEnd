import React, { useState, useEffect } from 'react';

const LandingPage: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [product, setProduct] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any[]>([]);

    const API_URL = "http://localhost:3010/"

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("user");
        const userInStorage = JSON.parse(userInStorageString || "null");
        setUser(userInStorage);

        if (userInStorage) {
            fetchBicycles();
        }
    }, []);

    const fetchBicycles = async () => {
        if (!user) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}api/v1/categories`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setProduct(data);
                console.log("Categories", data);
            } else {
                alert("Correo electrónico o contraseña incorrectos");
            }
        } catch (error) {
            console.log("Error Fetch", error);
        }
    };

    const handleButtonClick = (index: number) => {
        setSelectedProduct([product[index]]);
    };

    return (
        <div className="divForm">
            <div className="landingPage__container">
                <div className="landingPage__content">
                    <h1>Tienda de bicicletas</h1>
                    <p>Obten las mejores marcas en un solo lugar</p>
                    <div className="products">
                        <button onClick={() => handleButtonClick(0)}>
                            <img src="https://assets.specialized.com/i/specialized/98023-31_KENEVO-SL-EXPERT-CARBON-29-HRVGLD-OBSD_HERO-SQUARE?$scom-plp-product-image-square$&fmt=auto" alt="bicycle1" />
                        </button>
                        <button onClick={() => handleButtonClick(1)}>
                            <img src="https://cdn.shoplightspeed.com/shops/620181/files/41408363/650x650x2/bicicleta-alubike-revel-silver-sora.jpg" alt="bicycle2" />
                        </button>
                        <button onClick={() => handleButtonClick(2)}>
                            <img src="https://www.costco.com.mx/medias/sys_master/products/had/h08/140288989462558.jpg" alt="bicycle3" />
                        </button>
                        <button onClick={() => handleButtonClick(3)}>
                            <img src="https://i5.walmartimages.com.mx/mg/gm/3pp/asr/472473ba-95f2-429e-9f2b-3b8c6abfad38.916eeb249b4e47493711067dd6d21bc0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" alt="bicycle4" />
                        </button>
                    </div>
                    <div>
                        {user && selectedProduct.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedProduct.map((item: any) => (
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
        </div>
    );
};

export default LandingPage;
