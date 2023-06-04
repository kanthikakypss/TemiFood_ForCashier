import React, { useEffect, useState } from "react"
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [users, setUsers] = useState([])

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

  return (
    <div>
      <div className="grid gap-4 p-8 ">
        <div id="title-header" className="text-3xl text-center">For Cashier</div>
        <div id="tab-filter" className="flex justify-center gap-2">
          <div className="w-full">
            <div className="grid gap-4 p-2"></div>
            {users.map(user => (
              <div className="pb-6">
                <div className="border rounded-xl w-full">
                  <div className="flex justify-between p-2">
                    <div className="flex gap-8 items-center">
                      <div>โต๊ะ : {user.numoftable}</div>
                      <div>วันที่และเวลา : {user.ordertime}</div>
                    </div>
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
                  <div className="font-bold py-2 px-4 rounded-b-xl w-full text-center border-y  bg-blue-300">ราคาทั้งหมด  {user.totalprice} บาท</div>
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
