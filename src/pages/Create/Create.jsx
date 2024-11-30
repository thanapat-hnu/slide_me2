import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';

function Create() {
    const [profileImage, setProfileImage] = useState('./img/profile.png');
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        sex: '',
        email: '',
    });
    const [animateClass, setAnimateClass] = useState('Create-fadeIn'); // ควบคุมแอนิเมชัน
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleNext = () => {
        const data = {
            profileImage,
            formData,
        };

        localStorage.setItem('userData', JSON.stringify(data));
        console.log('ข้อมูลที่บันทึก:', data);

        setAnimateClass('Create-fadeOut'); // เริ่มแอนิเมชันออก
        setTimeout(() => {
            navigate('/home'); // ไปยังหน้าถัดไปหลังแอนิเมชันเสร็จ
        }, 500);
    };

    const handleBack = () => {
        setAnimateClass('Create-fadeOut'); // เริ่มแอนิเมชันออก
        setTimeout(() => {
            navigate('/register'); // ย้อนกลับไปยัง /register หลังแอนิเมชันเสร็จ
        }, 500);
    };

    return (
        <div className={`Create-container ${animateClass}`}>
            <div className='Create-header'>
                <button className='back-btn' onClick={handleBack}>⭠</button>
                สร้างโปรไฟล์
            </div>
            <div className="profile-container">
                <label htmlFor="uploadImage">
                    <img src={profileImage} alt="Profile" className="profile-button" />
                </label>
                <input
                    type="file"
                    accept="image/*"
                    id="uploadImage"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </div>

            <div className='form-container'>
                <div>
                    <input
                        type="text"
                        id="name"
                        placeholder="ชื่อ"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="lastname"
                        placeholder="นามสกุล"
                        value={formData.lastname}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <select
                        id="sex"
                        className="form-select"
                        value={formData.sex}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>เลือกเพศ</option>
                        <option value="male">ชาย</option>
                        <option value="female">หญิง</option>
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div>
                <button className='create-next' onClick={handleNext}>
                    ถัดไป
                </button>
            </div>
        </div>
    );
}

export default Create;
