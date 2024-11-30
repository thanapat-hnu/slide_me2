import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทาง
import './Profileedit.css';

function Profileedit() {
    const navigate = useNavigate(); // สร้างตัวแปร navigate สำหรับการนำทาง
    const [profileImage, setProfileImage] = useState('./img/profile.png');
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        sex: '',
        email: '',
        number: '',
    });
    const [isEditing, setIsEditing] = useState(false); // state สำหรับสถานะแก้ไข

    // โหลดข้อมูลจาก localStorage
    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        const phoneNumber = localStorage.getItem('phoneNumber');

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setProfileImage(parsedData.profileImage);
            setFormData({
                ...parsedData.formData,
                number: phoneNumber || '',
            });
        } else if (phoneNumber) {
            setFormData((prev) => ({
                ...prev,
                number: phoneNumber,
            }));
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = () => {
        setIsEditing(true); // เปิดโหมดแก้ไข
    };

    const handleSave = () => {
        setIsEditing(false); // ปิดโหมดแก้ไข
        // บันทึกข้อมูลใน localStorage
        localStorage.setItem(
            'userData',
            JSON.stringify({ profileImage, formData })
        );
        if (formData.number) {
            localStorage.setItem('phoneNumber', formData.number);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogout = () => {
        // นำทางไปยังหน้าล็อกอิน
        navigate('/login');
    };

    return (
        <div className="profileedit-container">
            <div className="profileedit-banner">
                <div className="profileedit-welcome">สวัสดี คุณ {formData.name}</div>

                <div className="profile-containers">
                    <label htmlFor="uploadImage">
                        <img src={profileImage} alt="Profile" className="profile-button" />
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="uploadImage"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        disabled={!isEditing}
                    />
                </div>


                <div className="profileedit-edit">
                    <button className='profileedit-button' onClick={handleEdit}>
                        <img src="./img/pencil.png" alt="" />
                    </button>
                </div>
            </div>

            <div className="form-containers">
                <div className="form-name">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </div>

                <div className="form-lastname">
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </div>

                <div className="form-numbercountry">
                    <input
                        type="text"
                        id="country"
                        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+66"
                        value={formData.country}
                        readOnly
                    />
                    <input
                        type="number"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </div>

                <div className="form-email">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </div>

                <div className="form-sex">
                    <select
                        className="form-selects"
                        name="sex"
                        value={formData.sex}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    >
                        <option value="" disabled >
                            เลือกเพศ
                        </option>
                        <option value="male">ชาย</option>
                        <option value="female">หญิง</option>
                    </select>
                </div>

                {isEditing && (
                    <div className="form-summit">
                        <button className='btn-summit' onClick={handleSave}>บันทึก</button>
                    </div>
                )}

                <div className="form-logout">
                    <button onClick={handleLogout}>ออกจากระบบ</button>
                </div>
            </div>


        </div>
    );
}

export default Profileedit;
