import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './history.css';

const History = () => {
    const [showSection, setShowSection] = useState(true);
    const [historyData, setHistoryData] = useState([]); // เก็บข้อมูล history
    const [isPopupOpen, setIsPopupOpen] = useState(false); // ควบคุมการแสดงผล Popup
    const [ratingItem, setRatingItem] = useState(null); // เก็บข้อมูลของรายการที่กำลังให้คะแนน
    const [rating, setRating] = useState(0); // เก็บคะแนนที่ผู้ใช้เลือก
    const navigate = useNavigate();

    // ฟังก์ชันสุ่มวันที่และเวลา
    const getRandomDateTime = () => {
        const startDate = new Date(2023, 0, 1); // 1 มกราคม 2023
        const endDate = new Date(2023, 11, 31); // 31 ธันวาคม 2023
        const randomDate = new Date(
            startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
        );

        const day = randomDate.getDate().toString().padStart(2, '0');
        const month = (randomDate.getMonth() + 1).toString().padStart(2, '0'); // เดือนเริ่มที่ 0
        const year = randomDate.getFullYear();
        const hour = Math.floor(Math.random() * 24); // สุ่มชั่วโมง 0-23
        const minute = Math.floor(Math.random() * 60); // สุ่มนาที 0-59

        return `${day}/${month}/${year} ${hour.toString().padStart(2, '0')}:${minute
            .toString()
            .padStart(2, '0')}`; // รูปแบบ DD/MM/YYYY HH:MM
    };

    // โหลดข้อมูลจากไฟล์ data.json
    useEffect(() => {
        fetch('./data.json')
            .then((response) => response.json())
            .then((data) => {
                // เพิ่มฟิลด์วันที่และเวลาสุ่มให้แต่ละรายการ
                const updatedData = data.map((item) => ({
                    ...item,
                    randomDateTime: getRandomDateTime(),
                    hasRated: false, // เพิ่มฟิลด์ hasRated เพื่อติดตามสถานะการให้คะแนน
                }));
                setHistoryData(updatedData);
            })
            .catch((error) => console.error('Error loading data:', error));
    }, []);

    const handleBackClick = () => {
        setShowSection(false); // ซ่อน section เมื่อกดปุ่ม
        setTimeout(() => {
            navigate('/list');
        }, 500); // ตั้งเวลาให้เหมือนกับระยะเวลา transition
    };

    const handleRateClick = (item) => {
        setRatingItem(item); // เก็บรายการที่เลือกไว้ใน state
        setIsPopupOpen(true); // เปิด Popup
    };

    const handleClosePopup = () => {
        // อัปเดตข้อมูลให้รายการนั้นๆมีการให้คะแนนแล้ว
        const updatedHistoryData = historyData.map((item) =>
            item.providerId === ratingItem.providerId
                ? { ...item, hasRated: true } // ตั้งค่า hasRated เป็น true
                : item
        );
        setHistoryData(updatedHistoryData);
        setIsPopupOpen(false); // ปิด Popup
        setRatingItem(null); // ล้างรายการที่เลือก
    };

    const handleStarClick = (starIndex) => {
        setRating(starIndex); // เมื่อคลิกดาว, ให้คะแนนตามดัชนี
    };

    return (
        <div className="history-container">
            <button onClick={handleBackClick} className="back-btn1">
                <FaArrowLeft />
            </button>

            {historyData.slice(1, 4).map((item) => (
                <section key={item.providerId} className={`latest-section ${showSection ? 'slide-in' : 'slide-out'}`}>
                    <div className="card">
                        <div className="card-row">
                            <div className="card-icon green-bg">
                                <i className="bi bi-truck"></i>
                            </div>
                            <div className="card-info">
                                <p className="card-date">{item.randomDateTime}</p>
                                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.providerName}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <i className="bi bi-geo-alt-fill red" style={{ fontSize: '14px' }}></i>
                                    <p>ต้นทาง: {item.locations.origin.address}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <i className="bi bi-geo-alt-fill green" style={{ fontSize: '14px' }}></i>
                                    <p>ปลายทาง: {item.locations.destination.address}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <i className="bi bi-car-front" style={{ fontSize: '14px' }}></i>
                                    <p>ประเภท: {item.towTruckType}</p>
                                </div>

                                <p className="card-status green-text">ดำเนินการเสร็จสิ้น</p>
                                <div className="card-actions">
                                    {/* ปรับปุ่มให้คะแนน */}
                                    {!item.hasRated ? (
                                        <button onClick={() => handleRateClick(item)}>ให้คะแนน</button>
                                    ) : (
                                        <p>ให้คะแนนแล้ว</p>
                                    )}
                                </div>
                            </div>
                            <div className="card-price">฿ {item.price}</div>
                        </div>
                    </div>
                </section>
            ))}

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="pcontent">
                        {/* โลโก้ที่ตรงกลาง */}
                        <div className="popup-logo">
                            <img src="public/LOGO_main.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
                        </div>
                        <h3>{ratingItem?.providerName}</h3>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                                <i
                                    key={starIndex}
                                    className={`bi bi-star${starIndex <= rating ? '-fill' : ''}`} // เปลี่ยนเป็นดาวเต็มหรือโปร่ง
                                    style={{
                                        fontSize: '24px',
                                        color: starIndex <= rating ? 'gold' : 'gold', // สีของดาว
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleStarClick(starIndex)} // ให้ผู้ใช้คลิกเพื่อให้คะแนน
                                ></i>
                            ))}
                        </div>
                        <button className="confirm-btn" onClick={handleClosePopup}>
                            ยืนยัน
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
