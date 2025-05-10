const productos = [
    { descripcion: "Auriculares", precio: 49000 },
    { descripcion: "Teclado", precio: 30000 },
    { descripcion: "Mouse", precio: 15000 },
    { descripcion: "Monitor", precio: 80000 },
    { descripcion: "Webcam", precio: 25000 }
];

// 1 - Mostrar en consola cada producto
console.log("1 - Mostrar en consola cada producto:");
productos.forEach(producto => {
    console.log(`Producto: ${producto.descripcion} - Precio: $${producto.precio}`);
});

// 2 - Crear un nuevo array con los productos cuyo precio sea mayor a $20
const productosMayorA20 = productos.filter(producto => producto.precio > 20000);
console.log("\n2 - Productos con precio mayor a $20000:");
productosMayorA20.forEach(producto => {
    console.log(`Producto: ${producto.descripcion} - Precio: $${producto.precio}`);
});

// 3 - Crear un array con los productos, pero con el precio con IVA incluido (21%)
const productosConIVA = productos.map(producto => {
    return {
        descripcion: producto.descripcion,
        precio: producto.precio * 1.21
    };
});
console.log("\n3 - Productos con IVA incluido (21%):");
productosConIVA.forEach(producto => {
    console.log(`Producto: ${producto.descripcion} - Precio: $${producto.precio.toFixed(2)}`);
});

// 4 - Ordenar el array original de productos por precio de menor a mayor
productos.sort((a, b) => a.precio - b.precio);
console.log("\n4 - Array de productos ordenado por precio (menor a mayor):");
productos.forEach(producto => {
    console.log(`Producto: ${producto.descripcion} - Precio: $${producto.precio}`);
});

// 5 - Agregar un nuevo producto al final del array
productos.push({ descripcion: "Parlante Bluetooth", precio: 59000.90 });
console.log("\n5 - Nuevo producto agregado:");
productos.forEach(producto => {
    console.log(`Producto: ${producto.descripcion} - Precio: $${producto.precio}`);
});

// 6 - Eliminar el producto con el precio más bajo del array
productos.shift(); // Elimina el primer elemento (que ahora es el más barato después de ordenar)
console.log("\n6 - Producto con el precio más bajo eliminado:");
productos.forEach(producto => {
    console.log(`Producto: ${producto.descripcion} - Precio: $${producto.precio}`);
});
