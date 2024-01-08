import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, or } from 'firebase/firestore';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { db } from '../../../../firebase';
import TopContainer from '../../../../component/Topcontainer/topContainer';
import Home from '../../../Home/Home';
const Order = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [order, setOrder] = useState([]);
    const fetchOrder = async () => {
        await getDocs(collection(db, 'Order')).then((querySnapshot) => {
            // const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            // setProduct(newData);
            const newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, stt: index + 1 }));
            // setCategoryData(newData);
            setOrder(newData);
            // console.log('category:', order);
        });
    };
    useEffect(() => {
        fetchOrder();
        console.log('data order: ', order, 'type: ', typeof order);
    }, []);
    const handleSearch = () => {
        const filteredCategory = order.filter((order) =>
            order.username.toLowerCase().includes(searchKeyword.toLowerCase()),
        );
        // setSearchResult(filteredProducts);

        setOrder(filteredCategory);
    };
    const handleSearchKeyword = (event) => {
        setSearchKeyword(event.target.value);
    };
    return (
        <Home>
            <TopContainer
                value={searchKeyword}
                onChange={handleSearchKeyword}
                onClick={handleSearch}
                title="Order List"
                // to
            />
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Username</th>
                            <th>Tên người nhận</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Ngày đặt</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>

                    {order.map((orders) => (
                        <tbody key={orders.id}>
                            <tr>
                                <td>{orders.stt} </td>
                                <td>{orders.username}</td>
                                <td>{orders.tennguoinhan}</td>
                                <td>{orders.sodienthoai}</td>
                                <td>{orders.diachi}</td>
                                <td>{orders.ngaydat.toDate().toLocaleDateString()}</td>
                                {/* <td>ngay thang</td> */}
                                <td>{orders.tongtien}</td>
                                <td>
                                    <div>
                                        {orders.state == 'Đang giao hàng' ? (
                                            <div
                                                style={{
                                                    backgroundColor: 'rgb(170, 60, 60)',
                                                    borderRadius: 40,
                                                }}
                                            >
                                                <span style={{ color: '#fff', marginLeft: 10, fontSize: 24 }}>
                                                    {orders.state}
                                                </span>
                                            </div>
                                        ) : (
                                            <div style={{ backgroundColor: '#52de70', borderRadius: 40 }}>
                                                <span style={{ color: '#fff', marginLeft: 10, fontSize: 24 }}>
                                                    {orders.state}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <button
                                            className="btnsearch"
                                            // onClick={() => openModal(users.id)}
                                            // onClick={() => openModal(users.email, users.username, users.password)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </div>
        </Home>
    );
};
export default Order;
