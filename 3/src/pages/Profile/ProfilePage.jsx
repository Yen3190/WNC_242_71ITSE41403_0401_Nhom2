import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperHeader, WrapperContentProfile, WrapperLabel, WrapperInput, WrapperUploadFile } from './style';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slides/userSlide';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../untils';

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    // Lấy thông tin người dùng từ Redux store và cập nhật vào các input field
    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    const dispatch = useDispatch();

    // Sử dụng hook mutation để gọi API cập nhật
    const mutation = useMutationHook(
        (data) => {
            const { id, access_token, ...rests } = data;
            return UserService.updateUser(id, rests, access_token);  // Thực hiện API gọi cập nhật
        }
    );

    const { data, isLoading, onSuccess, onError } = mutation;

    // useEffect xử lý khi mutation thành công hoặc có lỗi
    useEffect(() => {
        if (mutation.isSuccess) {
            message.success("Cập nhật thông tin người dùng thành công!");
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (mutation.isError) {
            message.error("Cập nhật thất bại!");
            console.error("Mutation Error:", JSON.stringify(mutation.error, null, 2));  // Log chi tiết lỗi tại đây
        }
    }, [mutation.isSuccess, mutation.isError]);

    // Hàm gọi API lấy thông tin người dùng
    const handleGetDetailsUser = (id, token) => {
        return async (dispatch) => {
            try {
                const res = await UserService.getDetailsUser(id, token);
                dispatch(updateUser({ ...res?.data, access_token: token }));
            } catch (error) {
                console.error('Failed to get user details', error);
                message.error('Không thể lấy thông tin người dùng');
            }
        };
    };

    // Các hàm handle change cho các trường input
    const handleOnchangeEmail = (e) => setEmail(e.target.value);
    const handleOnchangeName = (e) => setName(e.target.value);
    const handleOnchangePhone = (e) => setPhone(e.target.value);
    const handleOnchangeAddress = (e) => setAddress(e.target.value);
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    

    // Hàm xử lý khi bấm nút cập nhật
    const handleUpdate = async () => {
        // Kiểm tra nếu có bất kỳ trường nào trống
        if (!email || !name || !phone || !address || !avatar) {
            message.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // Gửi dữ liệu cập nhật đến API
        try {
            await mutation.mutateAsync({
                id: user?.id,
                email,
                name,
                phone,
                address,
                avatar,
                access_token: user?.access_token
            });
        } catch (error) {
            console.error('Error during update:', error);
            message.error('Cập nhật thất bại');
        }
    };

    return (
        <div style={{ margin: '100px auto', width: '1270px', height: "500px", fontFamily: "Verdana, Geneva, Tahoma, serif, sans-serif" }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>

            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                    <InputForm style={{ width: "300px" }} id="email" value={email} onChange={handleOnchangeEmail} />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                    <InputForm style={{ width: "300px" }} id="name" value={name} onChange={handleOnchangeName} />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                    <InputForm style={{ width: "300px" }} id="phone" value={phone} onChange={handleOnchangePhone} />
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='address'>Address</WrapperLabel>

                    <InputForm style={{ width: "300px" }} id="address" value={address} onChange={handleOnchangeAddress} />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </WrapperUploadFile>
                    {avatar && (
                        <img
                            src={avatar}
                            style={{
                                height: '80px',
                                width: '80px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid #e76f8b', 
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
                                transition: 'transform 0.3s ease-in-out',
                            }}
                            alt="avatar"
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} 
                        />
                    )}

                    

                </WrapperInput>

                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                        height: '30px',
                        width: 'fit-content',
                        border: '1px solid #e76f8b',
                        borderRadius: '4px',
                    }}
                    textButton={"Cập nhật"}
                    styleTextButton={{ color: '#e76f8b', fontSize: '15px', fontWeight: '700' }}
                />
            </WrapperContentProfile>
        </div>
    );
};

export default ProfilePage;
