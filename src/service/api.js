export const fetchProducts = async () => {
  try {
      const response = await fetch("http://localhost:8088/api/products/homepage");
      if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu");
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error(error);
      return [];
  }
};

export const fetchFeaturedProducts = async () => {
    try {
        const response = await fetch("http://localhost:8088/api/products/top-5-product");
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu"); 
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchCheckStock = async (product_id) => {
    try {
        const response = await fetch(`http://localhost:8088/api/product/check-stock/${product_id}`);
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu");
        }
        const maxQuantity = await response.json();
        return maxQuantity;
    } catch (error) {
        console.error(error);
        return null;
    }
  };