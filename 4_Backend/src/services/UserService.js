const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        console.error("Error in findUserByEmail:", error);
        throw error;
    }
};

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        try {
            const checkUser = await findUserByEmail(email);

            if (checkUser) {
                return resolve({
                    status: 'ERROR',
                    message: 'The email is already in use',
                });
            }

            const hash = bcrypt.hashSync(password, 10);
            console.log('hash', hash);

            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            });

            if (createdUser) {
                return resolve({
                    status: 'OK',
                    message: 'ACCOUNT CREATED SUCCESSFULLY',
                    data: createdUser
                });
            }

            return resolve({
                status: 'ERROR',
                message: 'User creation failed',
            });

        } catch (e) {
            return reject(e);
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            //const checkUser = await findUserByEmail(email);
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                return resolve({
                    status: 'ERROR',
                    message: 'User not found',
                });
            }

            const comparePassword = await bcrypt.compare(password, checkUser.password);
            console.log('comparePassword', comparePassword);

            if (!comparePassword) {
                return resolve({
                    status: 'ERROR',
                    message: 'Incorrect email or password',
                });
            }

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            });

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            });

            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token,
                user:{
                    id: checkUser.id,
                    name: checkUser.name,
                    email: checkUser.email
                }
            });

        } catch (e) {
            return reject(e);
        }
    });
};

// const updateUser = async (userId, userData) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const user = await User.findByIdAndUpdate(userId, userData, { new: true });

//             if (!user) {
//                 return resolve({
//                     status: "ERROR",
//                     message: "User not found"
//                 });
//             }

//             return resolve({
//                 status: "OK",
//                 message: "User updated successfully",
//                 data: user
//             });

//         } catch (e) {
//             return reject(e);
//         }
//     });
// };
const updateUser = async (userId, userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Cập nhật người dùng trong cơ sở dữ liệu
            const user = await User.findByIdAndUpdate(userId, userData, { new: true });

            if (!user) {
                return resolve({
                    status: "ERROR",
                    message: "User not found"
                });
            }

            return resolve({
                status: "OK",
                message: "User updated successfully",
                data: user
            });

        } catch (e) {
            return reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser =  await User.findOne({
                _id: id
            })

            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "User not found"
                });
            }

            await User.findByIdAndDelete(id);

            resolve({
                status: "OK",
                message: "User deleted successfully"
            });

        } catch (e) {
            return reject(e);
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allUser 
            });

        } catch (e) {
            return reject(e);
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id);

            if (!user) {
                return resolve({
                    status: "ERROR",
                    message: "User not found"
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user
            });

        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    findUserByEmail,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
};
