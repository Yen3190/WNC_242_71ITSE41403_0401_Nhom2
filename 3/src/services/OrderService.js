import { axiosJWT } from "./UserService";

export const createOrder = async (access_token, data) => {
    if (!access_token) {
        throw new Error("Thiếu token xác thực");
    }

    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/create`,
        data,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
