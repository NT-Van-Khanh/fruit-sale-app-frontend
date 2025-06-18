import Header  from "../component/header/Header";
import { useLocation } from 'react-router-dom';
import Footer from "../component/Footer";
import { fetchProductDetailById} from "../service/productApi";
const OrderDetailPage = () => {
  const location = useLocation();
    const order = location.state?.order;
    console.log(order);
    if (!order) return (
        <>
            <Header />
            <div className="text-center  py-10">Không tìm thấy đơn hàng</div>
            <Footer />
        </>
    );
    return (
      <>
        <Header />
        <main className="pt-3 pb-5  bg-gray-100  flex flex-col md:flex-row justify-around w-full box-border">            
          <div className="mx-30 my-2 px-10 pt-10 pb-43 shadow-lg rounded-lg bg-white text-gray-700 
                          flex flex-col  w-full  box-border">
            <h2 className="text-xl font-bold mb-4 text-center text-green-700">
                Đặt hàng thành công! </h2>

            <div className="space-y-2 text-base text-left pl-10">
                <p><strong>Mã đơn hàng: </strong> {order.id}</p>
                <p><strong>Họ tên khách: </strong> {order.customer.firstName} {order.customer.lastName}</p>
                <p><strong>Số điện thoại: </strong> {order.customer.phone}</p>
                <p><strong>Email: </strong> {order.customer.email}</p>
                <p><strong>Địa chỉ giao hàng: </strong> {order.address}</p>
                <p>
                  <strong>Trạng thái thanh toán: </strong> 
                  {order.payStatus === 'CH' ? 'Chưa thanh toán' : 'Đã thanh toán'}
                </p>
                <p>
                  <strong>Trạng thái giao hàng: </strong> 
                  {order.shipStatus === 'CB' ? 'Chuẩn bị' : 
                  order.shipStatus === 'DG' ? 'Đang giao' : 
                  order.shipStatus === 'HT' ? 'Hoàn tất' : 
                  'Không xác định'}
                </p>
                <p><strong>Tổng tiền:</strong> {order.totalCost.toLocaleString()}₫</p>
                <p><strong>Ngày đặt:</strong> {order.formattedCreateAt}</p>
                <p><strong>Ghi chú:</strong> {order.note || "Không có"}</p>

                <div className="pt-4">
                    <h3 className="font-semibold text-lg">Sản phẩm đã đặt:</h3>
                    <ul className="space-y-3 mt-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex gap-4 border-b pb-2">
                          <img
                            src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                          <div className="min-w-8/10 pr-10">
                            <p><strong>{item.product.name}</strong></p>
                            <div className="flex justify-between py-2">
                                <p>Đơn vị: {item.product.unit}</p>
                                <p>Đơn giá: {item.price.toLocaleString()}₫</p>
                                <p>Đơn vị: {item.product.unit}</p>
                            </div>
                            
                          </div>
                        </li>
                      ))}
                    </ul>
                </div>
            </div>

          </div> 
        </main>
      <Footer />
      </>
    );
  };
  
  export default OrderDetailPage ;   

//       const order = {

//     id: "HD000015",
//     customer: {
//       lastName: "Nguyễn",
//       firstName: "An",
//       phone: "0351540419",
//       email: "an.nguyen@example.com",
//       address: "123 Đường Lê Lợi, Quận 1, TP.HCM"
//     },
//     totalCost: 150000,
//     address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
//     payStatus: "CH", // Chưa thanh toán
//     shipStatus: "CB", // Chuẩn bị hàng
//     createAt: "2025-06-17T23:58:43.933256",
//     lastUpdate: "2025-06-17T23:58:43.933256",
//     note: "Giao trong giờ hành chính",
//     items: [
//       {
//         productId: "SP000001",
//         productName: "Vải thiều Lục Ngạn",
//         price: 50000,
//         quantity: 2,
//         totalPrice: 100000
//       },
//       {
//         productId: "SP000005",
//         productName: "Xoài cát Hòa Lộc",
//         price: 25000,
//         quantity: 2,
//         totalPrice: 50000
//       }
//     ],
//     formattedCreateAt: "23:58 17/06/2025",
//     formattedLastUpdate: "23:58 17/06/2025"
  
// };