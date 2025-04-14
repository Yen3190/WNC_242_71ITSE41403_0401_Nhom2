import { WrapperHeader } from "./style";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Space } from 'antd';
import * as UserService from '../../services/UserService';
import InputComponent from '../../components/InputComponent/InputComponent';
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import { getBase64 } from "../../untils";
import * as message from '../../components/Message/Message';
import { useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import { WrapperUploadFile } from './style';
const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [stateUser, setStateUser] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,

    });

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isLoadingUpdate, setISLoadingUpdate] = useState(false);
    const user = useSelector((state) => state?.user)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
 
    });


    const [form] = Form.useForm();



    console.log('rowSelected', rowSelected)
    const mutationUpdate = useMutationHook( //Đã check
        (data) => {
            console.log('data', data)
            const { id, token, ...rests } = data;
            const res = UserService.updateUser(
                id,
                { ...rests }, token,
            );
            return res
        }
    );

    const mutationDeleted = useMutationHook(
        (data) => {
            console.log('data', data)
            const { id, token } = data;
            const res = UserService.deleteUser(
                id,
                token
            );
            return res
        }
    );


    const getAllUsers = async () => { //Đã check
        const res = await UserService.getAllUsers(user?.access_token);
        console.log('rés', res)
        return res;
    };

    const fetchGetDetailsUsers = async (rowSelected) => { //Đã check

        const res = await UserService.getDetailsUser(rowSelected)
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
            })
        }


    }
    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails]) //Đã check
    useEffect(() => {//Đã check
        if (rowSelected) {
            setISLoadingUpdate(true)
            fetchGetDetailsUsers(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsUser = () => { //Đã check
        // if (rowSelected) {
        //     setISLoadingUpdate(true)
        //     fetchGetDetailsUsers()
        // }
        setIsOpenDrawer(true)
    }
    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isSuccess,
        isError,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated
    } = mutationUpdate;

    //const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate //Đã check
    const { data: dataDeleted, isLoading: isLoadingDelete, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const queryUser = useQuery({  //Dã check
        queryKey: ['user'],
        queryFn: getAllUsers
    }); //Đã check
    const { isLoading: isLoadingUsers, data: users } = queryUser
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ fontSize: "25px", color: "red", cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ fontSize: "25px", color: "green", cursor: 'pointer' }} onClick={handleDetailsUser} />
            </div>
        )
    } //Đã check
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = clearFilters => {
        clearFilters();
    };
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => {
                        var _a;
                        return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
                    }, 100);
                }
            },
        },
        // render: text =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                },
            ],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },

    ];

    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return { ...user, key: user._id, isAdmin: user.isAdmin ? 'True' : 'False' }
    })



    useEffect(() => {
        if (mutationDeleted.isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success();
            handleCancelDelete();
        } else if (mutationDeleted.isErrorDeleted) {
            message.error();
        }
    }, [mutationDeleted.isSuccessDeleted]);

    // useEffect(() => {
    //     if (mutationUpdate.isSuccessUpdated && dataUpdated?.status === 'OK') {
    //         message.success();
    //         handleCloseDrawer();
    //     } else if (mutationUpdate.isErrorUpdated) {
    //         message.error();
    //     }
    // }, [mutationUpdate.isSuccessUpdated]);
    useEffect(() => {
        if (isSuccess && dataUpdated?.status === 'OK') {
            message.success();
            handleCloseDrawer();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateUser({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        });
        form.resetFields();
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleDeleteUser = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch();
                setIsModalOpenDelete(false);
            }
        })
    }
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        });
        form.resetFields();
    };



    const handleOnChange = (e) => { //Đã check
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value
        });
    };

    const handleOnChangeDetails = (e) => { //Đã check
        console.log('check', e.target.name, e.target.value)
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => { //Đã check
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUser({
            ...stateUser,
            image: file.preview
        });
    };

    const handleOnchangeAvatarDetails = async ({ fileList }) => { //Đã check
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            image: file.preview
        });
    };
    console.log('user', user)
    const onUpdateUser = () => { //Đã check
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    return (

        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    }
                }} />
            </div>

            <DrawerComponent title="Chi tiết Người dùng" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">

                <Form
                    name="basic"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 22 }}
                    onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Tên người dùng' }]}
                    >
                        <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Nhập email' }]}
                    >
                        <InputComponent value={stateUserDetails.email} onChange={handleOnChangeDetails} name="email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Số điện thoại' }]}
                    >
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>
            <ModalComponent title="Xóa tài khoản" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
                <div>Bạn chắc chắn muốn xóa tài khoản này chứ?</div>
            </ModalComponent>

        </div>
    )

}
export default AdminUser;