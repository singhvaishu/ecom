import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/components/authSlice";

import { fetchLoggedInUserOrderAsync, selectUserOrders } from "../components/userSlice";

export default function UserOrders() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const orders = useSelector(selectUserOrders);

    useEffect(() => {
        dispatch(fetchLoggedInUserOrderAsync(user.id));
        console.log(orders);
    }, [dispatch, user.id]);

    return (
        <>
            {orders.map((order) => (
                <div>
                    <div className="mx-auto mt-8 bg-white max-w-7xl py-4 px-4 sm:px-6 lg-px-8">
                        <h1 className="text-3xl my-5 font-bold tracking-tight text-gray-900">
                            {" "}
                            Order No: {order.id}
                        </h1>
                        <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900">
                            {" "}
                            Order Status: {order.status}
                        </h3>
                        <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {order.items.map((item) => (
                                        <li key={item.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.imageAlt}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={item.href}>{item.title}</a>
                                                        </h3>
                                                        {item.discountPrice && (
                                                            <p className="line-through text-gray-700">
                                                                Rs.{item.price}
                                                            </p>
                                                        )}
                                                        {item.discountPrice ? (
                                                            <p className="ml-2">Rs. {item.discountPrice}</p>
                                                        ) : (
                                                            <p className="ml-2 strike-through">
                                                                Rs.{item.price}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.brand}
                                                    </p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="text-gray-500 mx-50">
                                                        <label
                                                            htmlFor="password"
                                                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Quantity : {item.quantity}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-sm text-gray-900">
                                <p>Shipping Cost</p>
                                <p>Rs. {order.shippingCost}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>Rs. {order.totalAmount}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total Items in Cart</p>
                                <p>{order.totalItems} items</p>
                            </div>

                            <div className="flex gap-x-6  mt-3 py-5 border-y-2">
                                <div className="min-w-0 flex-auto gap-x-2 ">
                                    <p className="mt-1 font-semibold text-sm text-gray-500">
                                        Address :
                                    </p>
                                    <p className="mt-1 text-sm font-semibold leading-5 text-gray-900">
                                        {order.selectedAddress.name.toUpperCase()}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                                        {order.selectedAddress.phone}
                                    </p>
                                </div>
                                <div className=" gap-x-2">
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {order.selectedAddress.street}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {order.selectedAddress.city}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {order.selectedAddress.pinCode}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}