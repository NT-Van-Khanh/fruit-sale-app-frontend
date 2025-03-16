import React from "react";
const Cart = ({products}) =>{
    const [cart, setCart] = useState([]);
    // Lấy danh sách sản phẩm từ localStorage khi component được render
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    
    return (
        <div className="all">
            <div className="Gio hang">
                <h2>Giỏ hàng</h2>
                <div>
                    <div className="show title">
                        <input type="checkbox"></input>
                        <span>Chọn tất cả</span>
                    </div>
                    <div>
                        <label>Số lượng</label>
                    </div>
                    <div>
                        <label>Thành tiền</label>
                    </div>
                </div>
                <div className="show items">
                    <div>
                    <input type="checkbox"></input>
                    </div>
                    <div>
                        <image src=""/>
                    </div>
                    <div>
                        {/* Tên sản phẩm ở trên, giá sản phầm nằm sát hàng dưới */}
                        <span>Tên sản phẩm</span>
                        <span>Giá sản phẩm/ đơn vị</span>
                    </div>
                    <div>
                        <button>Giảm số lượng</button>
                        <span>Số lượng</span>
                        <button>Tăng số lượng</button>
                    </div>
                    <div>
                        <span>Tổng giá tiền</span>
                    </div>
                    <div>
                        <button>Icon Xóa</button>
                    </div>
                </div>
                <div>
                    <Button>Icon xóa</Button>
                    <lable>Xóa hết giỏ hàng </lable>
                </div>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product, index) => (
                            <li key={index}>{product.name} - {product.price}đ</li>
                        ))}
                    </ul>
                ) : (
                    <p>Giỏ hàng trống.</p>
                )}
            </div>
            <div>
                <h2>THÔNG TIN THANH TOÁN</h2>
                <div>
                    <div>
                        <h3>Thành tiền</h3>
                        <span></span>
                    </div>
                    <div>
                        <h3>Khuyến mãi</h3>
                        <span></span>
                    </div>
                    <div>
                        <h3>Tổng đơn hàng</h3>
                        <span></span>
                    </div>
                    <div>
                        <h3>Chính sách mua hàng</h3>
                        <span></span>
                    </div>
                    <button>THANH TOÁN</button>
                </div>
                
            </div>
        </div>
    );
};

export default Cart;