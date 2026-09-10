import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import Button from '../components/common/Button';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Success Hero Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-black mx-auto shadow-sm">
          ✓
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Order Placed Successfully!</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto font-medium">
          Thank you for shopping with Indicart! Your order has been placed and is currently being processed.
        </p>

        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#5B3DF5]/10 border border-[#5B3DF5]/20 text-[#5B3DF5] font-black text-sm rounded-full">
          <span>Order Reference:</span>
          <span>{order.orderId}</span>
        </div>
      </div>

      {/* Order Details Breakdown Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Order Placed On</span>
            <p className="text-sm font-bold text-slate-900">
              {new Date(order.orderDate).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Status</span>
            <span className="block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full w-fit mt-0.5">
              {order.status}
            </span>
          </div>
        </div>

        {/* Shipping & Payment Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 bg-[#F8F7FC] rounded-2xl border border-slate-200/80 space-y-1">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Delivery Address</h4>
            <p className="font-bold text-slate-900">{order.userName}</p>
            <p className="text-slate-600">{order.address?.address}</p>
            <p className="text-slate-600">
              {order.address?.city}, {order.address?.state} - {order.address?.postalCode}
            </p>
            <p className="text-slate-600">Phone: {order.address?.phone}</p>
          </div>

          <div className="p-4 bg-[#F8F7FC] rounded-2xl border border-slate-200/80 space-y-3">
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">Delivery Method</h4>
              <p className="text-slate-700 font-semibold mt-1">{order.deliveryMethod}</p>
            </div>
            <div className="border-t border-slate-200 pt-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">Payment Method</h4>
              <p className="text-slate-700 font-semibold mt-1">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Items Summary Table */}
        <div className="border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-[#F8F7FC]">
          <div className="bg-slate-100/70 px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Ordered Items ({order.items?.length || 0})
          </div>
          {order.items?.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain bg-white rounded border border-slate-200 p-1" />
                <div>
                  <p className="font-bold text-slate-900">{item.title}</p>
                  <p className="text-slate-500">{formatCurrency(item.price)} &times; {item.quantity}</p>
                </div>
              </div>
              <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Financial Breakdown */}
        <div className="bg-[#F8F7FC] p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span className="font-bold text-slate-900">{formatCurrency(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Coupon Discount ({order.coupon})</span>
              <span>-{formatCurrency(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-600">
            <span>Estimated Tax (18% GST)</span>
            <span className="font-bold text-slate-900">{formatCurrency(order.tax)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span className="font-bold text-slate-900">
              {order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}
            </span>
          </div>
          <div className="border-t border-slate-200/80 pt-2 flex justify-between font-black text-sm text-slate-900">
            <span>Total Paid</span>
            <span className="text-[#5B3DF5]">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={`/orders/${order.orderId}`}>
            <Button variant="outline" size="md" className="w-full sm:w-auto rounded-full font-bold border-slate-300">
              View Order Details
            </Button>
          </Link>
          <Link to="/products">
            <button
              type="button"
              className="w-full sm:w-auto btn-purple-gradient py-2.5 px-6 rounded-full font-bold text-xs text-white shadow-md cursor-pointer"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
