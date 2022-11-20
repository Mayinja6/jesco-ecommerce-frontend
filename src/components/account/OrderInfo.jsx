function OrderItem({ index, date, totalPrice, totalItems, progress }) {
  return (
    <tr>
      <td className="border border-[#ededed] min-w-[150px] border-r-[#ededed] border-r capitalize p-[10px] text-center">
        {index}
      </td>
      <td className="border border-[#ededed] min-w-[150px] border-r-[#ededed] border-r capitalize p-[10px] text-center">
        {date}
      </td>
      <td className="border border-[#ededed] min-w-[150px] border-r-[#ededed] border-r capitalize p-[10px] text-center">
        <span className="success">{progress}</span>
      </td>
      <td className="border border-[#ededed] min-w-[150px] border-r-[#ededed] border-r capitalize p-[10px] text-center">
        {`$${totalPrice} for ${totalItems} item${totalItems > 1 ? "s" : ""}`}
      </td>
      <td className="border border-[#ededed] min-w-[150px] border-r-[#ededed] border-r capitalize p-[10px] text-center">
        <a href="cart.html" className="text-blue-600 hover:text-[#fb5d5d]">
          view
        </a>
      </td>
    </tr>
  );
}

const OrderInfo = () => {
  return (
    <div className="block w-full overflow-scroll md:overflow-hidden">
      <h4 className="text-[18px] sm:text-[24px] capitalize mb-[15px] font-semibold">
        Orders
      </h4>
      <table className="sm:w-full border-collapse border border-[#ededed]">
        <thead className="bg-[#f2f2f2]">
          <tr>
            <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
              Order
            </th>
            <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
              Date
            </th>
            <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
              Status
            </th>
            <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
              Total
            </th>
            <th className="text-[#24262B] border-b-[3px] border-b-[#fb5d5d] border-r-[1px] border-r-[#ededed] text-[16px] capitalize p-[10px] text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <OrderItem
            index={1}
            date={"21 May, 2022"}
            totalPrice={29.61}
            totalItems={4}
            progress={"Completed"}
          />
          <OrderItem
            index={2}
            date={"21 october, 2022"}
            totalPrice={9.2}
            totalItems={1}
            progress={"pending"}
          />
          <OrderItem
            index={3}
            date={"May 10, 2018"}
            totalPrice={25.0}
            totalItems={1}
            progress={"completed"}
          />
          <OrderItem
            index={4}
            date={"May 10, 2018"}
            totalPrice={17.0}
            totalItems={1}
            progress={"Processing"}
          />
        </tbody>
      </table>
    </div>
  );
};

export default OrderInfo;
