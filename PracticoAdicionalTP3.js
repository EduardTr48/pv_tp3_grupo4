// 🎁 Array inicial de productos (mínimo 5)
const productos = [
    { descripcion: "Auriculares", precio: 49000 },
    { descripcion: "Teclado", precio: 30000 },
    { descripcion: "Mouse Gamer", precio: 25000 },
    { descripcion: "Monitor 24''", precio: 120000 },
    { descripcion: "Webcam HD", precio: 18000 },
  ];
  
  // 1️⃣ Mostrar cada producto con forEach
  console.log("📦 Lista de productos:");
  productos.forEach(producto => {
    console.log(Producto: ${producto.descripcion} - Precio: $${producto.precio});
  });
  
  // 2️⃣ Productos con precio mayor a $20 (lo puse muy bajo para demostrarlo, pero probablemente quisiste decir $20000)
  const productosMayoresA20 = productos.filter(producto => producto.precio > 20000);
  console.log("\n💸 Productos con precio mayor a $20000:");
  console.log(productosMayoresA20);
  
  // 3️⃣ Array con precios con IVA (21%) usando map
  const productosConIVA = productos.map(producto => ({
    descripcion: producto.descripcion,
    precio: +(producto.precio * 1.21).toFixed(2)
  }));
  console.log("\n🧾 Productos con IVA (21%):");
  console.log(productosConIVA);
  
  // 4️⃣ Ordenar array original por precio (menor a mayor)
  productos.sort((a, b) => a.precio - b.precio);
  console.log("\n📊 Productos ordenados por precio (menor a mayor):");
  console.log(productos);
  
  // 5️⃣ Agregar un nuevo producto al final
  const nuevoProducto = { descripcion: "Parlante Bluetooth", precio: 59000.90 };
  productos.push(nuevoProducto);
  console.log("\n➕ Producto agregado al final:");
  console.log(productos);
  
  // 6️⃣ Eliminar el producto con el precio más bajo
  // Como está ordenado, el más barato es el primero
  const productoEliminado = productos.shift();
  console.log(\n🗑️ Producto eliminado (más barato): ${productoEliminado.descripcion} - $${productoEliminado.precio});
  console.log("🧺 Array final:");
  console.log(productos);