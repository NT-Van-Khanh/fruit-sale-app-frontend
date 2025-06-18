import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const CustomerForm = forwardRef(({ onChangeFormData }, ref) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Họ không được để trống";
    } else if (!/^[\p{L}\s'-]+$/u.test(formData.lastName)) {
      newErrors.lastName = "Họ chỉ được chứa chữ cái và khoảng trắng";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Tên không được để trống";
    } else if (!/^[\p{L}\s'-]+$/u.test(formData.firstName)) {
      newErrors.firstName = "Tên chỉ được chứa chữ cái và khoảng trắng";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải bắt đầu bằng 0 và đủ 10 chữ số";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Địa chỉ quá ngắn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // expose validate ra ngoài qua ref
  useImperativeHandle(ref, () => ({
    validate,
  }));

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  useEffect(() => {
    onChangeFormData(formData);
  }, [formData, onChangeFormData]);

  return (
    <div>
      <h2 className="text-[23px] text-left font-bold pl-3 pt-2 pb-5 text-gray-600">
        Thông tin khách hàng
      </h2>
      <form noValidate>
        <div className="flex items-center justify-between gap-4 py-3 pl-6 pr-5">
          <label className="block mb-1 font-medium" htmlFor="lastName">
            Họ:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <label className="block mb-1 font-medium" htmlFor="firstName">
            Tên:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex items-center justify-around gap-4 py-3 pl-6 pr-5">
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
          )}
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
          )}
          </div>
        <div className="flex flex-col gap-2 py-3 pl-6 pr-5">
          <label className="block mb-1 text-left font-medium" htmlFor="phone">
            Số điện thoại:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 py-3 pl-6 pr-5">
          <label className="block mb-1 text-left font-medium" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 py-3 pl-6 pr-5">
          <label className="block mb-1 text-left font-medium" htmlFor="address">
            Địa chỉ:
          </label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.address && (
            <p className="text-red-600 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 py-3 pl-6 pr-5">
          <label className="block mb-1 font-medium text-left" htmlFor="note">
            Ghi chú:
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={2}
          />
        </div>
      </form>
    </div>
  );
});

export default CustomerForm;