import { data } from "react-router-dom";

export const fetchProducts = async () => {
  try {
      const response = await fetch("http://localhost:8088/api/products/homepage");
      if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu");
      }
      const json = await response.json();
      return json.data; 
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
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchCheckStock = async (product_id) => {
    try {
        const response = await fetch(`http://localhost:8088/api/products/check-stock/${product_id}`);
        if (!response.ok) {
            throw new Error("Lỗi khi lấy dữ liệu từ API.");
        }
        // const maxQuantity = await response.json();
        // console.log("maxQuantity",maxQuantity);
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchProductDetailById = async(product_id) =>{
    try{
        const response = await fetch(`http://localhost:8088/api/products/${product_id}`);
        if (!response.ok) {
            throw new Error(`Lỗi lấy dữ liệu từ API với ID ${product_id}`);
        }

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm", error);
        return null; // You can return null in case of an error
    }
}

export const fetchProductSimpleInfo = async(product_id) =>{
    try{
        const response = await fetch(`http://localhost:8088/api/products/simple/${product_id}`);
        if (!response.ok) {
            throw new Error(`Lỗi lấy dữ liệu từ API với ID ${product_id}`);
        }

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm", error);
        return null; // You can return null in case of an error
    }
}

export const fetchSearchProducts = async(keyword, categoryId, brandId, minPrice, maxPrice, pageRequest) =>{
    try{
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (categoryId) params.append("categoryId", categoryId);
        if (brandId) params.append("brandId", brandId);
        if (minPrice != null) params.append("minPrice", minPrice);
        if (maxPrice != null) params.append("maxPrice", maxPrice);
         if (pageRequest) {
            if (pageRequest.page != null) params.append("page", pageRequest.page);
            if (pageRequest.size != null) params.append("size", pageRequest.size);
            if (pageRequest.sortBy) params.append("sortBy", pageRequest.sortBy);
            if (pageRequest.direction) params.append("direction", pageRequest.direction);
        }
        const response = await fetch(`http://localhost:8088/api/products/search?${params.toString()}`,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) { throw new Error("Failed to fetch products");}
  
        const json = await response.json();
              console.log("Số lượng sản phẩm: ",json);
        return json.data;
    } catch (error) {
    console.error("Error fetching search products:", error);
    throw error;
    }
}