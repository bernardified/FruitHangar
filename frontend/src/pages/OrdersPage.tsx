import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import type { OrderRecord } from '../types/Fruits'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders")
      setOrders(res.data.sort((a:any, b:any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } catch (error) {
      console.log("Error retrieving orders", error)
      toast.error("Failed to retrieve orders")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  },[])

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <span className="loading loading-rocket loading-lg text-primary"></span>
        <h2 className="text-xl font-black uppercase tracking-wide">Retrieving Orders...</h2>
      </div>
    );
  }

  return (
    <div className='p-8 max-w-7xl mx-auto'>
      <header className='mb-10 flex justify-between items-end border-b-2 border-base-300 pb-4'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Orders Fulfilment Center</h1>
          <p className='text-lg opacity-70'>Review and managae  outgoing shipments</p>
        </div>
        <div className='stats shadow bg-base-200'>
          <div className='stat py-2 px-4'>
            <div className='stat-title text-xs font-bold uppercase'>Total Orders</div>
            <div className='stat-value text-accent text-2xl'>{orders.length}</div>
          </div>
        </div>
      </header>

      <div className='overflow-x-auto bg-base-100 rounded-xl border border-base-300'>
        <table className='table table-zebra'>
          <thead className='bg-base-200'>
            <tr className='text-sm uppercase text-base-content'>
              <th className='text-center'>Order ID</th>
              <th className='text-center'>Customer</th>
              <th className='text-center'>Items Order</th>
              <th className='text-center'>Total Value</th>
              <th className='text-center'>Status</th>
              <th className='text-center'>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className='hover'>
                <td className='font-mono text-xs opacity-50'>{order._id.slice(-6)}</td>
                <td className='font-bold justify-center text-center'>{order.customerName}</td>
                <td className='flex flex-wrap gap-1 align-middle'>
                  {order.items.map((item: any) => (
                      <div key={item._id} className="badge badge-outline badge-sm gap-1">
                        <span className="opacity-60">Name:</span> {item.fruitName} 
                        <span className="badge badge-ghost badge-xs font-bold">x{item.quantity}</span>
                      </div>
                    ))}
                </td>
                <td className='flexfont-black text-primary text-center'>${order.totalAmount.toFixed(2)}</td>
                <td>
                  <div className={`badge badge-sm font-bold ${order.status === "Pending" ? 'badge-warning' : 'badge-success'}`}>
                    {order.status}
                  </div>
                </td>
                <td className="text-xs opacity-70 text-center">
                  {formatDate(new Date(order.createdAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 && (
        <div className="text-center py-20 bg-base-200 rounded-xl mt-4 border-2 border-dashed border-base-300">
          <p className="italic opacity-50 text-xl">No active orders</p>
        </div>
      )}
    </div>
  )
}

export default OrdersPage
