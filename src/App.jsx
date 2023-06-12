import React, { useEffect, useState } from "react"
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [users, setUsers] = useState([])

  const [allOrder, setAllOrder] = useState(0);
  const [successOrder, setSuccessOrder] = useState(0);
  const [UnSuccessOrder, setUnSuccessOrder] = useState(0);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        "https://temi-food-backend.vercel.app/showorder"

      );
      setUsers(res.data);
    } catch (error) {
      console.log("Error fetching menu items:", error);
    }
  };
  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    // Fetch menu items from the database
    setAllOrder(users.length);
    setSuccessOrder(users.filter((obj) => obj.cookstatus === 0).length);
    setUnSuccessOrder(users.filter((obj) => obj.cookstatus === 1).length);
  }, [users]);


  console.log(users);

  return (
    <div>
      <div className="grid gap-4 p-8 ">
        <div id="title-header" className="text-3xl text-center">For Cashier</div>
        <div id="tab-filter" className="flex justify-center gap-2">
          <div className="flex items-center bg-blue-200 py-2 px-4 rounded-full ">
            ออเดอร์ทั้งหมด
            <div className="flex justify-center items-center ml-2 rounded-full bg-white w-8 h-8">
              {allOrder}
            </div>
          </div>
          <div className="flex items-center bg-red-200 py-2 px-4 rounded-full">
            ยังไม่ได้ทำ
            <div className="flex justify-center items-center ml-2 rounded-full bg-white w-8 h-8">
              {successOrder}
            </div>
          </div>
          <div className="flex items-center bg-green-200 py-2 px-4 rounded-full">
            ทำแล้ว
            <div className="flex justify-center items-center ml-2 rounded-full bg-white w-8 h-8">
              {UnSuccessOrder}
            </div>
          </div>
        </div>
        <div id="tab-filter" className="flex justify-center gap-2">
          <div className="w-full">
            <div className="grid gap-4 p-2"></div>
            {users.map(user => (
              <div className="pb-6">
                <div className="border rounded-xl w-full">
                  <div className="flex justify-between p-2">
                    <div className="flex gap-8 items-center">
                      <div>{user.numoftable}</div>
                      <div>วันที่และเวลา : {user.ordertime}</div>
                      </div>
                    {/* check status */}
                    {user.cookstatus === 1 ? (
                      <div className="bg-green-200 py-2 px-4 rounded-full">ทำแล้ว</div>
                    ) : (
                      <div className="bg-red-200 py-2 px-4 rounded-full">
                        ยังไม่ได้ทำ
                      </div>
                    )}
                
                  </div>
                  <div className="flex justify-center bg-white">
                    <table className="w-full">
                      <thead className="border-y">
                        <tr>
                          <th className="w-1/4 border-r">รายการ</th>
                          <th className="w-1/4 border-r">ราคาอย่างละ</th>
                          <th className="w-1/4">จำนวน</th>
                          <th className="w-1/4">ราคารวม</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.bulkfood.map(item => (
                          <tr className="w-1/2 text-center">
                            <td className="py-2 border-r">{item.name}</td>
                            <td className="py-2 border-r">{item.price}</td>
                            <td className="py-2">{item.qty}</td>
                            <td className="py-2">{item.qty * item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="font-bold py-2 px-4 rounded-b-xl w-full text-center border-y">ราคาทั้งหมด  {user.totalprice} บาท</div>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
