import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/components/UserOrder'


const UserOrdersPage = () => {
    return (
        <div>
            <Navbar />
            <h1 className='flex justify-center text-3xl shadow-slate-800'>My Orders</h1>
            <UserOrders />
        </div>
    )
}

export default UserOrdersPage