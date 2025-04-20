import React,  {useEffect, useState} from "react";

const ProductDetail = ({ productId, onAddToCart })=>{
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8088/api/product/${productId}`);
                if (!response.ok) throw new Error("Không thể lấy dữ liệu sản phẩm");
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (error) return <p>Lỗi: {error}</p>;
    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    return (
        <div className="flex flex-col w-[90%] max-w-4xl p-6 rounded-xl shadow-lg bg-white mx-auto">
            <h2 className="pl-2 pb-5 text-gray-600
                        text-left font-bold text-[25px]">Thông tin sản phẩm</h2>
            <div className="flex flex-col md:flex-row items-center gap-6 pl-3">
                <div className="rounded-lg shadow-md overflow-hidden w-100">
                    <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                </div>
                <div className="flex flex-col gap-1 ml-2 text-left text-gray-800 w-full">
                    <h2 className="text-2xl font-bold text-orange-400">{product.name}</h2>
                    <p className="text-lg text-gray-500">
                        Xuất sứ: {product.category}</p>
                    <p className="text-lg text-gray-500 font-medium pt-2">
                        Giá: {product.price.toLocaleString()} VND/{product.unit} </p>
                    <div className="flex items-center mt-4">
                        <label className="text-lg text-gray-600 mr-2">Thêm vào giỏ:</label>
                        <button
                            className="px-3 py-[2px] border rounded bg-gray-200"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        >-</button>
                        <span className="px-4">{quantity}</span>
                        <button
                            className="px-3 py-[2px] border rounded bg-gray-200"
                            onClick={() => setQuantity((q) => q + 1)}
                        >+</button>
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-400
                                    text-white rounded"
                        onClick={() => onAddToCart(product, quantity)}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
            <div className="product-detail items-left pt-5">
                <label className="text-[15px] text-left mt-3">{product.detail}</label>
            </div>
        </div>
    );

};


export default ProductDetail;