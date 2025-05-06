function PanelItems() {
  return (
    <div>
      <h1>Panel de Items</h1>
      <div className="panel-items-container">
        <div className="panel-items-header">
          <h2>Items</h2>
          <button className="add-item-button">Agregar Item</button>
        </div>
        <table className="items-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí puedes mapear los items y mostrarlos en la tabla */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PanelItems;