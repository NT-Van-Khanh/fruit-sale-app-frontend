export const fetchCategories = async () => {
  try {
      const response = await fetch("http://localhost:8088/api/categories/all");
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