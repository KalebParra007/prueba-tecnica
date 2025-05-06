import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./UserHome.css";

function UserHome() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        fetchItems();
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const response = await fetch('https://apiprueba-5688.onrender.com/Admin');
            if (!response.ok) {
                throw new Error('Error al obtener datos del administrador');
            }
            const data = await response.json();
            setAdminData(data);
        } catch (error) {
            setError('Error al cargar datos del administrador: ' + error.message);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await fetch('https://apiprueba-5688.onrender.com/Item');
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            setItems(data);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar los productos: ' + error.message);
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">{error}</div>;

    // Función para agregar producto
    const handleAddProduct = async (newProduct) => {
        try {
            const response = await fetch('https://apiprueba-5688.onrender.com/Item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            });
            
            if (!response.ok) throw new Error('Error al agregar producto');
            
            await fetchItems(); // Recargar la lista
            setShowAddModal(false);
        } catch (error) {
            setError('Error al agregar producto: ' + error.message);
        }
    };

    // Función para actualizar stock
    const handleUpdateStock = async (id, newQuantity) => {
        try {
            // Encontrar el producto actual
            const currentItem = items.find(item => item.id === id);
            
            const response = await fetch(`https://apiprueba-5688.onrender.com/Item/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...currentItem,
                    quantity: newQuantity,
                    stock: newQuantity
                })
            });
            
            if (!response.ok) throw new Error('Error al actualizar stock');
            
            await fetchItems();
            setShowUpdateModal(false);
        } catch (error) {
            setError('Error al actualizar stock: ' + error.message);
        }
    };

    // Función para exportar reporte
    const handleExportReport = () => {
        const reportData = items.map(item => ({
            Producto: item.name,
            'Valor Unitario': item.price,
            Cantidad: item.quantity,
            Estado: item.stock < 10 ? 'Bajo Stock' : 'En Stock'
        }));

        const csvContent = "data:text/csv;charset=utf-8," 
            + Object.keys(reportData[0]).join(",") + "\n"
            + reportData.map(row => Object.values(row).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "reporte_inventario.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Agregar esta nueva función para eliminar productos
    const handleDeleteProduct = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                const response = await fetch(`https://apiprueba-5688.onrender.com/Item/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                if (!response.ok) throw new Error('Error al eliminar el producto');
                
                await fetchItems(); // Recargar la lista
            } catch (error) {
                setError('Error al eliminar el producto: ' + error.message);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem('userData');
        navigate('/');
    };

    return (
        <div className="user-home">
            <section className="dashboard">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Panel de Control {adminData? adminData.username : 'Cargando...'}</h1>
                    <button 
                        className="action-button"
                        onClick={handleLogout}
                        style={{ backgroundColor: '#dc3545', color: 'white' }}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        Cerrar Sesión
                    </button>
                </div>
                <div className="inventory-overview">
                    <div className="stat-card">
                        <h3>Total Productos</h3>
                        <p className="stat-number">{items.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Bajo Stock</h3>
                        <p className="stat-number warning">
                            {items.filter(item => item.quantity < 10).length}
                        </p>
                    </div>
                    <div className="stat-card">
                        <h3>Productos Nuevos</h3>
                        <p className="stat-number success">
                            {items.filter(item => item.stock > 20).length}
                        </p>
                    </div>
                </div>

                <div className="quick-actions">
                    <button 
                        className="action-button"
                        onClick={() => setShowAddModal(true)}
                    >
                        <i className="fas fa-plus"></i>
                        Agregar Producto
                    </button>
                    <button 
                        className="action-button"
                        onClick={() => setShowUpdateModal(true)}
                    >
                        <i className="fas fa-edit"></i>
                        Actualizar Stock
                    </button>
                    <button 
                        className="action-button"
                        onClick={handleExportReport}
                    >
                        <i className="fas fa-file-export"></i>
                        Exportar Reporte
                    </button>
                </div>

                <div className="recent-products">
                    <h2>Productos Recientes</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Valor Unitario</th>
                                <th>Cantidad</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.stock < 10 ? 'Bajo Stock' : 'En Stock'}</td>
                                    <td>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDeleteProduct(item.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showAddModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Agregar Nuevo Producto</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const newProduct = {
                                    name: e.target.name.value,
                                    price: parseFloat(e.target.price.value),
                                    quantity: parseInt(e.target.quantity.value),
                                    stock: parseInt(e.target.quantity.value)
                                };
                                handleAddProduct(newProduct);
                            }}>
                                <div className="form-group">
                                    <label>Nombre del Producto:</label>
                                    <input type="text" name="name" required />
                                </div>
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <input type="number" name="price" step="0.01" required />
                                </div>
                                <div className="form-group">
                                    <label>Cantidad:</label>
                                    <input type="number" name="quantity" required />
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit">Guardar</button>
                                    <button type="button" onClick={() => setShowAddModal(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showUpdateModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Actualizar Stock</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const itemId = e.target.itemId.value;
                                const newQuantity = parseInt(e.target.quantity.value);
                                handleUpdateStock(itemId, newQuantity);
                            }}>
                                <div className="form-group">
                                    <label>Seleccionar Producto:</label>
                                    <select name="itemId" required>
                                        {items.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name} - Stock actual: {item.quantity}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Nueva Cantidad:</label>
                                    <input type="number" name="quantity" required />
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit">Actualizar</button>
                                    <button type="button" onClick={() => setShowUpdateModal(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default UserHome;
