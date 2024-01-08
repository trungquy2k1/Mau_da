import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// import { currentUser } from 'firebase/auth';
import { getAuth, deleteUser } from 'firebase/auth';
import Modal from 'react-modal';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-modal/style.css';

import { db, auth } from '../../../firebase';
import config from '../../../configRoute';
import Home from '../../Home/Home';
import '../style/style.css';
import EditUser from './UpdateUser/Updateuser';
import AddUser from './AddUser/AddUser';
const User = () => {
    const [user, setUser] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [idchon, setIdchon] = useState();
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedUsername, setSelectedUsername] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernamenhap, setUsername] = useState('');
    const [passwordnhap, setPassword] = useState('');

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedUser, setSelectedUser] = useState(null);
    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };
    const fetchUser = async () => {
        await getDocs(collection(db, 'User')).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, usename: doc.username }));
            setUser(newData);
            // console.log('user:', user, 'Newdata: ', newData);
        });
    };

    const deleteUserID = async (userId) => {
        // const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tài khoản?');
        // if (confirmDelete) {
        //     // TODO: Xóa tài khoản tại đây
        try {
            //         // Xóa tài khoản trong Firebase Authentication
            // const user = await auth.currentUser; // Lấy thông tin người dùng hiện tại
            // if (user) {
            //     await user.delete(); // Xóa tài khoản người dùng
            // }

            //         // await deleteDoc(doc(db, 'Product', productId));
            //         await deleteDoc(doc(db, 'User', userId));
            //         console.log('Document successfully deleted!');
            //         // Gọi lại fetchPost để cập nhật danh sách user sau khi xóa
            //         fetchUser();
            //     } catch (error) {
            //         console.error('Error removing document: ', error);
            //     }
            // }
            // try {
            // Xóa tài khoản trong Firebase Authentication
            // const user = await auth.currentUser; // Lấy thông tin người dùng hiện tại
            // if (user) {
            //     await user.delete(); // Xóa tài khoản người dùng
            // }
            // await auth.deleteUser(userId);
            // await deleteDoc(doc(db, 'Product', productId));
            const auth = getAuth();
            const user = auth.currentUser;
            deleteUser(user)
                .then(() => {
                    // User deleted.
                    alert('đã xóa');
                })
                .catch((error) => {
                    // An error ocurred
                    console.log('Lỗi: ', error);
                    // ...
                });

            await deleteDoc(doc(db, 'User', userId));
            console.log('Document successfully deleted!');
            // Gọi lại fetchPost để cập nhật danh sách user sau khi xóa
            fetchUser();
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    };

    // const updatedUser = async (userid) => {
    //     const Update = doc(db, 'User', userid);
    //     // Set the "capital" field of the city 'DC'
    //     await updateDoc(Update, {
    //         // capital: true,
    //         email: email,
    //         username: usernamenhap,
    //         password: passwordnhap,
    //     });
    //     fetchUser();
    //     setEmail('');
    //     setUsername('');
    //     setPassword('');
    //     alert('thành công');
    // };
    // const openModal = (email, ten, mk) => {
    //     setModalIsOpen(true);
    //     setSelectedEmail(email);
    //     setSelectedUsername(ten);
    //     setSelectedPassword(mk);
    // };
    const openModal = (userID2) => {
        const selectedProduct = user.find((uses) => uses.id === userID2);
        if (selectedProduct) {
            setModalIsOpen(true);
            setIdchon(userID2);
            // console.log('id được chọn: ', userID2);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    // const handleEditUser = (username, password) => {
    //     setSelectedUser(username);
    //     setSelectedPass(password);
    // };

    useEffect(() => {
        fetchUser();
        console.log('id được chọn: ', idchon);

        // openModal();
    }, [idchon]);

    return (
        <Home>
            {/* Giao diện màn hình user */}
            <div>
                <div className="adminhead">
                    <h2>Use</h2>
                    <div style={{ display: 'flex' }}>
                        <input placeholder="Search" />
                        <button className="btnsearch">Search</button>
                    </div>
                    <NavLink to={config.routes.adduser}>
                        <button className="btnsearch">Thêm</button>
                    </NavLink>
                    {/* <button className="btnsearch" onClick={() => openModal()}>
                        Thêm
                    </button> */}
                    {/* <AddUser /> */}
                    {/* <AddUser isOpen={modalIsOpen} onRequestClose={closeModal} /> */}
                    {/* <button className="btnsearch">Thêm</button> */}
                </div>
                <div>
                    {/* <div
                        style={{
                            // display: 'flex',
                            // justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px',
                        }}
                    > */}
                    <Table striped bordered hover style={{ backgroundColor: 'blue' }}>
                        <thead>
                            <tr>
                                <th>Emai</th>
                                <th>Tên người dùng</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        {user.map((users, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{users.email}</td>
                                    <td>{users.username}</td>
                                    <td>
                                        <div>
                                            <div style={{ flex: '1', marginBottom: 10 }}>
                                                <button className="btnsearch" onClick={() => deleteUserID(users.id)}>
                                                    <span>delete</span>
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    className="btnsearch"
                                                    onClick={() => openModal(users.id)}
                                                    // onClick={() => openModal(users.email, users.username, users.password)}
                                                >
                                                    sửa
                                                </button>
                                                <EditUser
                                                    isOpen={modalIsOpen}
                                                    onRequestClose={closeModal}
                                                    userID1={idchon}
                                                    fetchupdate={fetchUser()}
                                                    // selectedUser={selectedUsername}
                                                    // selectedPassword={selectedPassword}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    {/* <h3>passwword</h3>
                        <button>
                            <span>delete</span>
                        </button> */}
                </div>
            </div>
            {/* </div> */}
        </Home>
    );
};

export default User;
