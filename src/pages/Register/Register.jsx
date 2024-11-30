import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [animateClass, setAnimateClass] = useState("Register-fadeIn"); // ควบคุมแอนิเมชันเข้า
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const rawInput = e.target.value.replace(/\D/g, "");
    if (rawInput.length <= 10) {
      const formattedNumber = rawInput
        .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
        .replace(/(\d{3})(\d{3})/, "$1-$2")
        .replace(/(\d{3})(\d{2})/, "$1-$2");
      setPhoneNumber(formattedNumber);
    }
    setErrorMessage("");
  };

  const handleNext = () => {
    const rawPhone = phoneNumber.replace(/\D/g, "");
    if (rawPhone.length !== 10) {
      setErrorMessage("กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก");
      return;
    }
    localStorage.setItem("phoneNumber", rawPhone);
    setAnimateClass("Register-fadeOut"); // เริ่มแอนิเมชันออก
    setTimeout(() => {
      navigate("/otp", { state: { from: "/register" } });
    }, 500); // รอแอนิเมชันเสร็จก่อนเปลี่ยนหน้า
  };

  const handleBack = () => {
    setAnimateClass("Register-fadeOut"); // เริ่มแอนิเมชันออก
    setTimeout(() => {
      navigate("/login");
    }, 500); // รอแอนิเมชันเสร็จก่อนเปลี่ยนหน้า
  };

  return (
    <div className={`Register-container ${animateClass}`}>
      <div className="Register-title">
        <button className="back-btn" onClick={handleBack}>⭠</button>
        สมัครสมาชิก
      </div>

      <div className="Register-form">
        <h5>เบอร์มือถือ</h5>
        <span className="country-code">🇹🇭 +66</span>
        <input
          type="text"
          className="Register-input"
          value={phoneNumber}
          onChange={handleInputChange}
          maxLength="13"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="Register-next">
        <button className="btn-next" onClick={handleNext}>
          ถัดไป
        </button>
      </div>
    </div>
  );
}

export default Register;
