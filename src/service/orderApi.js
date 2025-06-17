export const fetchAddOrder = async (orderData) => {
  try {
    const response = await fetch("http://localhost:8088/api/orders/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const json = await response.json();
      console.error("Chi tiết lỗi server:", json.statusCode, json.data);
      throw new Error("Lỗi khi gửi đơn hàng");
    }
    const json = await response.json();
    
    return json.data;
  } catch (error) {
    console.error("Fetch add order error:", error);
    throw error;
  }
};