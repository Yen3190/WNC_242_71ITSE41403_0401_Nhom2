import React, { useEffect, useRef } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from '../../components/InputComponent/InputComponent';
import { getBase64 } from "../../untils";
import { WrapperUploadFile } from './style';
import * as ProductService from '../../services/ProductService';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent"


const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        descriptions: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''

    });

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isLoadingUpdate, setISLoadingUpdate] = useState(false);
    const user = useSelector((state) => state?.user)
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        descriptions: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
    });


    const [form] = Form.useForm();

    const mutation = useMutationHook(
        (data) => {
            const { name,
                price,
                descriptions,
                rating,
                image,
                type,
                countInStock } = data;
            const res = ProductService.createProduct({
                name, price, descriptions, rating, image, type, countInStock
            });
            return res;
        }
    );

    console.log('rowSelected', rowSelected)
    const mutationUpdate = useMutationHook( //Đã check
        (data) => {
            console.log('data', data)
            const { id, token, ...rests } = data;
            const res = ProductService.updateProduct(
                id,
                { ...rests },
                token,
            );
            return res
        }
    );

    const mutationDeleted = useMutationHook(
        (data) => {
            console.log('data', data)
            const { id, token } = data;
            const res = ProductService.deleteProduct(
                id,
                token
            );
            return res
        }
    );


    const [page, setPage] = useState(1); 
    const [limit, setLimit] = useState(6); 


    const getAllProducts_2 = async () => {
        const res = await ProductService.getAllProducts_2({
            limit,
            page: page - 1,
            search: searchText
        });
        return res;
    };



    const fetchGetDetailsProducts = async (rowSelected) => { //Đã check

        const res = await ProductService.getDetailsProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                descriptions: res?.data?.descriptions,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock
            })
        }


    }
    useEffect(() => {
        form.setFieldsValue(stateProductDetails)
    }, [form, stateProductDetails]) //Đã check
    useEffect(() => {//Đã check
        if (rowSelected) {
            setISLoadingUpdate(true)
            fetchGetDetailsProducts(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsProduct = () => { //Đã check
        // if (rowSelected) {
        //     setISLoadingUpdate(true)
        //     fetchGetDetailsProducts()
        // }
        setIsOpenDrawer(true)
    }
    const { data, isLoading, isSuccess, isError } = mutation //Đã checkcheck
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate //Đã check
    const { data: dataDeleted, isLoading: isLoadingDelete, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const queryProduct = useQuery({  //Dã check
        queryKey: ['products', page],
        queryFn: getAllProducts_2
    }); 
    const { isLoading: isLoadingProducts, data: products } = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ fontSize: "25px", color: "red", cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ fontSize: "25px", color: "green", cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = clearFilters => {
        clearFilters();
        ///setSearchText('');
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
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {

                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50

            },
        },

        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                console.log("checkrating", {value, record})
                if (value === '>=') {
                    return Number(record.rating) >= 3
                }
                return Number(record.rating) <= 3

            },

        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];

    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })

    useEffect(() => {
        if (mutation.isSuccess && data?.status === 'OK') {
            message.success();
            handleCancel();
        } else if (mutation.isError) {
            message.error();
        }
    }, [mutation.isSuccess]);

    useEffect(() => {
        if (mutation.isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success();
            handleCancelDelete();
        } else if (mutation.isErrorDeleted) {
            message.error();
        }
    }, [mutation.isSuccessDeleted]);

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated, isErrorUpdated]);


    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            descriptions: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        });
        form.resetFields();
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch();
                setIsModalOpenDelete(false);
            }
        })
    }
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateProductDetails({
            name: '',
            price: '',
            descriptions: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        });
        form.resetFields();
    };

    const onFinish = () => {

        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    };

    const handleOnChange = (e) => { //Đã check
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleOnChangeDetails = (e) => { //Đã check
        console.log('check', e.target.name, e.target.value)
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => { //Đã check
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        });
    };

    const handleOnchangeAvatarDetails = async ({ fileList }) => { //Đã check
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        });
    };
    console.log('user', user)
    const onUpdateProduct = () => { //Đã check
        console.log('Attempting to update product with ID:', rowSelected);
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }


    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}>
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {/* <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    }
                }} /> */}
                <TableComponent
                    columns={columns}
                    isLoading={isLoadingProducts}
                    data={dataTable}
                    pagination={{
                        current: page,
                        pageSize: limit,
                        total: products?.total || 0,
                        onChange: (newPage) => setPage(newPage),
                        showSizeChanger: false,
                    }}
                    onRow={(record) => ({
                        onClick: () => {
                            setRowSelected(record._id);
                        },
                    })}
                />

            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Tên sản phẩm' }]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Loại sản phẩm' }]}
                    >
                        <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />
                    </Form.Item>

                    <Form.Item
                        label="CountInStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Số sản phẩm còn lại' }]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Giá sản phẩmphẩm' }]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Đánh giá sản phẩmphẩm' }]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Mô tả sản phẩmphẩm' }]}
                    >
                        <InputComponent value={stateProduct.descriptions} onChange={handleOnChange} name="descriptions" />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Hình ảnh' }]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button>Select File</Button>
                            {stateProduct?.image && (
                                <img
                                    src={stateProduct?.image}
                                    style={{
                                        height: '80px',
                                        width: '80px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid #e76f8b',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.3s ease-in-out',
                                        marginLeft: '10px'
                                    }}
                                    alt="avatar"
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </ModalComponent>
            <DrawerComponent title="Chi tiết sản phẩm" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">

                <Form
                    name="basic"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 22 }}
                    onFinish={onUpdateProduct}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Tên sản phẩm' }]}
                    >
                        <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Loại sản phẩm' }]}
                    >
                        <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
                    </Form.Item>

                    <Form.Item
                        label="CountInStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Số sản phẩm còn lại' }]}
                    >
                        <InputComponent value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Giá sản phẩm' }]}
                    >
                        <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Đánh giá sản phẩm' }]}
                    >
                        <InputComponent value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Mô tả sản phẩm' }]}
                    >
                        <InputComponent value={stateProductDetails.descriptions} onChange={handleOnChangeDetails} name="descriptions" />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Hình ảnh sản phẩm' }]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button>Select File</Button>
                            {stateProductDetails?.image && (
                                <img
                                    src={stateProductDetails?.image}
                                    style={{
                                        height: '80px',
                                        width: '80px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid #e76f8b',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.3s ease-in-out',
                                        marginLeft: '10px'
                                    }}
                                    alt="avatar"
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>
            <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                <div>Bạn chắc chắn muốn xóa sản phẩm này chứ?</div>
            </ModalComponent>
        </div>
        
    );
};

export default AdminProduct;
