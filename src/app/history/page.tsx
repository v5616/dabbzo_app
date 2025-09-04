import Link from 'next/link';
import { ApiOrder } from '@/types/ApiOrder';

async function fetchOrderHistory(userId: string): Promise<{ orders?: ApiOrder[]; error?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/order-history?user_id=${userId}`, {
      cache: 'no-store', // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return { orders: data || [] };
  } catch (error) {
    console.error('Error fetching order history:', error);
    return { error: error instanceof Error ? error.message : 'Failed to fetch order history' };
  }
}

export default async function OrderHistory() {
  // Get user ID from cookies or use static fallback
  // In a real app, you'd get this from authentication
  const userId = '26ee0f1c-09db-42c9-b3dd-2df094a6d7af';
  
  const { orders, error } = await fetchOrderHistory(userId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  function getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      
      {!orders || orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-4">
            You haven&apos;t placed any orders yet. Start ordering delicious tiffin meals now!
          </p>
          
          <Link href="/" className="btn-primary inline-block">
            Browse Vendors
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <div key={order.order_id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order.order_id}</h2>
                    <p className="text-gray-500 text-sm">
                      Ordered on {formatDate(order.created_at)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Subscription: {order.subscription_type}
                    </p>
                  </div>
                  
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
                      order.order_status
                    )}`}
                  >
                    {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
                    <div>
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="font-medium">{order.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="font-medium">₹{order.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Delivery Date</p>
                      <p className="font-medium">{formatDate(order.delivery_date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <p className={`font-medium ${
                        order.payment_status === 'paid' 
                          ? 'text-green-600' 
                          : order.payment_status === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                    <p className="font-medium">{order.delivery_address}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="text-lg font-bold">Total: ₹{order.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}