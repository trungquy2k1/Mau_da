//thu vien
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, or, where } from 'firebase/firestore';
//Cac component khac
import { db } from '../../../firebase';
import Home from '../../Home/Home';
import TopContainer from '../../../component/Topcontainer/topContainer';
import { Table } from 'react-bootstrap';

const Tongquan = () => {
    const [data, setData] = useState([]);
    const dataOrder = async () => {
        await getDocs(collection(db, 'Order')).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, stt: index + 1 }));
            setData(newData);
        });
    };
    useEffect(() => {
        dataOrder();
        console.log('data order: ', data);
    }, []);

    return (
        <Home>
            <TopContainer
                // value={searchKeyword}
                // onChange={handleSearchKeyword}
                // onClick={handleSearch}
                title="Tổng quan"
            />
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Số tiền (VND)</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((datas) => (
                        <tr key={datas.id}>
                            <th></th>
                            <th>{datas.tongtien} </th>
                            <th></th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Home>
    );
};

export default Tongquan;
