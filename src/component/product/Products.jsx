const products = [
    { id: 1, name: "Táo đỏ", price: "100.000đ", image: "/apple.jpg" },
    { id: 2, name: "Cam Mỹ", price: "80.000đ", image: "/orange.jpg" },
    { id: 3, name: "Chuối chín", price: "50.000đ", image: "/banana.jpg" },
  ];
  
  const Products = () => {
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-lg text-center">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-red-500">{product.price}</p>
            <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded">Thêm vào giỏ</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default Products;