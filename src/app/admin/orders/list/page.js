export const metadata = {
  title: 'Order List', 
}

export default function OrderListPage() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-200 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Order List</h1>
      <p className="text-gray-600">
        Order history table will be displayed here.
      </p>
    </div>
  );
}