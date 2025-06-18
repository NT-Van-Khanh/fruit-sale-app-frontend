export const fetchAddOrder = async (orderData, otp) => {
  try {
    const response = await fetch(`http://localhost:8088/api/orders/add?otp=${encodeURIComponent(otp)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const json = await response.json();

    if (!response.ok) {
      console.error("Chi tiết lỗi server:", json.statusCode, json.data);
      throw new Error("Lỗi khi gửi đơn hàng");
    }

    return json.data;
  } catch (error) {
    console.error("Fetch add order error:", error);
    throw error;
  }
};

export const fetchVerifyEmail = async (email) => {
  try {
    const response = await fetch("http://localhost:8088/api/orders/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), 
    });

    const json = await response.json();

    if (!response.ok) {
      console.error("Chi tiết lỗi server:", json.statusCode, json.data);
      throw new Error("Lỗi khi gửi OTP xác thực email");
    }

    return json.data;
  } catch (error) {
    console.error("Lỗi gửi OTP:", error);
    throw error;
  }
};