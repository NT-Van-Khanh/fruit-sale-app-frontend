import React, {useEffect, useState, useRef} from "react";
import Header  from "../component/header/Header";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from "../component/Footer";
import OrderSummary  from "../component/payment/OrderSummary";
import CustomerForm from "../component/payment/CustomerForm";
import {fetchProductSimpleInfo, fetchCheckStock} from "../service/productApi";
import {fetchAddOrder, fetchVerifyEmail} from "../service/orderApi";
import Swal from "sweetalert2";
const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const selectedCartItems = location.state?.selectedCartItems || [];
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({});
    useEffect(() => {
      const fetchSelectedProductInfo = async () => {
        const enrichedItems = await Promise.all(
          selectedCartItems.map(async (item) => {
            const product = await fetchProductSimpleInfo(item.productId);
            return {
              ...item,
              ...product,
            };
          })
        );

        setSelectedProducts(enrichedItems);
      };

      if (selectedCartItems.length > 0) {
        fetchSelectedProductInfo();
      }
    }, [selectedCartItems]);

  useEffect(() => {
    if (selectedProducts.length === 0) {
      setTotal(0);
      return;
    }
    const totalAmount = selectedCartItems.reduce((acc, selectedItem) => {
        const product = selectedProducts.find(p => p.productId === selectedItem.productId);

        if (!product) {
          return acc;
        }

        const price = Number(product.price) || 0;
        const quantity = Number(selectedItem.quantity) || 0;

        return acc + price * quantity;
      }, 0);

    setTotal(totalAmount);
  }, [selectedCartItems, selectedProducts]);

    const navigate = useNavigate();

  const handleCheckout = async() => {
    setLoading(true);
      for (const item of selectedCartItems) {
        const maxQuantity = await fetchCheckStock(item.productId);
        if (item.quantity <= 0 || item.quantity > maxQuantity) {
          alert("Số lượng sản phẩm vượt tồn kho, vui lòng kiểm tra lại.");
           setLoading(false);
          return;
        }
      }
    const isValid = formRef.current.validate(); // gọi validate() trong CustomerForm qua ref
    if (!isValid) {
        console.warn("Dữ liệu không hợp lệ");
        setLoading(false);
        return;
      }
      const orderData = {
        customer: {
          firstName: customerInfo.firstName?.trim() || "",
          lastName: customerInfo.lastName?.trim() || "",
          phone: customerInfo.phone?.trim() || "",
          email: customerInfo.email?.trim() || "",
          address: customerInfo.address?.trim() || ""
        },
      totalCost: total || 0,
      address: customerInfo.address?.trim() || "",
      payStatus: "CH", 
      shipStatus: "CB", 
      note: customerInfo.note?.trim() || "",
      createAt: new Date().toISOString(),
      items: selectedCartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };

    try {
      
      console.log(orderData.customer.email);
      await fetchVerifyEmail(orderData.customer.email);
      const otp = await Swal.fire({
        title: "Nhập mã OTP",
        input: "text",
        inputLabel: "Mã OTP đã được gửi đến email của bạn",
        inputPlaceholder: "Nhập mã OTP",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        inputValidator: (value) => {
          if (!value) {
            setLoading(false);
            return "Bạn cần nhập mã OTP!";
          }
          setLoading(false);
          return null;
        },
      });

    if (!otp.isConfirmed || !otp.value) {
      setLoading(false);
      return;
    }

    const response = await fetchAddOrder(orderData, otp.value.trim());
      Swal.fire({
        title: "Thành công!",
        text: "Đặt hàng thành công.",
        icon: "success",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      navigate("/order-detail", { state: { order: response } });
    } catch (error) {
      alert("Đặt hàng thất bại. Vui lòng thử lại.");
      console.error("Order failed:", error);
    } finally {
      setLoading(false);
    }
  };  
      
  const formRef = useRef();
    return (
      <>
         <Header />
         <main className="pt-3 pb-5  bg-gray-100 
                    flex flex-col md:flex-row justify-around w-full box-border">
          <div className="cart-list m-2 p-5 shadow-lg rounded-lg bg-white text-gray-700 md:w-3/8 w-full  box-border">
          <CustomerForm ref={formRef}  onChangeFormData={setCustomerInfo}/>
          
          </div> 
          <OrderSummary  selectedProducts={selectedProducts}
                        selectedCartItems={selectedCartItems}
                        total={total} 
                        discount={discount} 
                        onCheckout={handleCheckout}/>
         
          </main>
        <Footer />
        {loading && (
          <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.2)] flex items-center justify-center cursor-wait">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </>
    );
  };
  
  export default PaymentPage;   