export const fetchBrands = async () => {
  try {
      const response = await fetch("http://localhost:8088/api/brands/all");
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