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
            throw new Error("Lỗi khi lấy dữ liệu từ API.");
        }
        const maxQuantity = await response.json();
        console.log("maxQuantity",maxQuantity);
        return maxQuantity;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchProductDetailById = async(product_id) =>{
    try{
        const response = await fetch(`http://localhost:8088/api/product/${product_id}`);
        if (!response.ok) {
            throw new Error(`Lỗi lấy dữ liệu từ API với ID ${product_id}`);
        }

        const product = await response.json();
        return product;
    } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm", error);
        return null; // You can return null in case of an error
    }
}

export const fetchProductSimpleInfo = async(product_id) =>{
    try{
        const response = await fetch(`http://localhost:8088/api/product/simple/${product_id}`);
        if (!response.ok) {
            throw new Error(`Lỗi lấy dữ liệu từ API với ID ${product_id}`);
        }

        const product = await response.json();
        return product;
    } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm", error);
        return null; // You can return null in case of an error
    }
}