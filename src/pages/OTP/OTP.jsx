import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OTP.css';

function OTP() {
    const navigate = useNavigate();
    const location = useLocation();
    const [otpCode, setOtpCode] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isOtpReady, setIsOtpReady] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [animateClass, setAnimateClass] = useState("");

    const otpInputRef = useRef(null);
    const phoneNumber = localStorage.getItem("phoneNumber");

    // ฟังก์ชันสำหรับปุ่มย้อนกลับ
    const handleBack = () => {
        const fromPath = location.state?.from;
        navigate(fromPath || "/inputphone");
    };

    // ฟังก์ชันสร้าง OTP
    const generateOtp = () => {
        const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setOtpCode(randomOtp);
        setIsOtpReady(true);
        setShowOtpPopup(true);
    };

    // เริ่มนับเวลาถอยหลัง
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    generateOtp();
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // ปิด popup หลังจาก 5 วินาที
    useEffect(() => {
        if (showOtpPopup) {
            const popupTimeout = setTimeout(() => {
                setShowOtpPopup(false);
            }, 5000);

            return () => clearTimeout(popupTimeout);
        }
    }, [showOtpPopup]);

    // ตรวจสอบ OTP และนำทางไปหน้าถัดไป
    const handleNext = () => {
        if (!inputCode) {
            setErrorMessage("กรุณากรอก OTP");
        } else if (inputCode === otpCode) {
            setAnimateClass("OTP-fadeOut"); // เริ่มแอนิเมชันออก
            setTimeout(() => {
                const fromPath = location.state?.from;
                if (fromPath === "/register") {
                    navigate("/create");
                } else {
                    navigate("/home");
                }
            }, 500); // รอให้แอนิเมชันเสร็จก่อนเปลี่ยนหน้า
        } else {
            setErrorMessage("รหัส OTP ไม่ถูกต้อง กรุณาลองอีกครั้ง");
            setInputCode("");
            otpInputRef.current.focus();
        }
    };
    return (
        <div className={`otp-container ${animateClass}`}>
            <div className="otp-title">
                <button className="back-btn-OTP" onClick={handleBack}>⭠</button>
                <p className="otp-text">กรอกรหัส 6 หลักที่ส่งไปให้เบอร์ +66</p>
                <p className="otp-number">{phoneNumber}</p>
            </div>
    
            {/* Popup สำหรับ OTP */}
            {showOtpPopup && (
                <div className="otp-popup">
                    <p>รหัส OTP ของคุณคือ: {otpCode}</p>
                </div>
            )}
    
            <div className="input-OTP">
                <input
                    ref={otpInputRef}
                    type="number"
                    className="otp-input"
                    value={inputCode}
                    onChange={(e) => {
                        const value = e.target.value.slice(0, 6);
                        setInputCode(value);
                        setErrorMessage("");
                    }}
                />
            </div>
    
            {/* แสดงข้อความ error */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
    
            <div className="otp-footer">
                <p>ยังไม่ได้รับ OTP ใช่หรือไหม?</p>
                <button className="otp-btn" onClick={generateOtp}>ขอรหัสใหม่</button>
            </div>
    
            <div className="otp-next">
                <button className="otp-next-btn" onClick={handleNext}>ถัดไป</button>
            </div>
        </div>
    );
    
}

export default OTP;
