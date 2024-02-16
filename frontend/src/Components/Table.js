

const Table = ({ data }) => {
//   console.log("data========",data.totalSubscriptions)
  // Assuming that the data array contains objects with keys as column names
  // console.log(data, "data in table component =>");
  // const columns = Object.keys(data[0] || {}).map((col, index) => (
  //   <Column
  //     columnKey={index}
  //     style={{ border: "1px solid gray" }}
  //     key={index}
  //     field={col}
  //     header={col}
  //   />
  // ));

  return (
    <>
    
{/* 
<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
   
   <h1 className="text-center">GAME HUB</h1>
 
  </div>
</nav> */}

      <div className=" w-full bg-white rounded py-2 px-2 mb-4">
        <div className=" flex flex-col  rounded  items-center p-3">
          <h1 className="text-purple-500 font-bold  rounded text-lg md:text-2xl ">
            Total Subscriptions 
          </h1>
          <p className="text-purple-500 font-bold rounded text-2xl">
  {data.totalSubscriptions}
</p>

          {/* <h1 className=" text-pink-500 font-bold font-mono text-2xl">
            New Sub charged: {data[0]?.new_sub_charged ?? 0}
          </h1> */}
          {/* <h1 className="text-green-500 font-bold p-2 rounded font-mono text-2xl outline-none outline-violet-600">
            Total Revenue {'=>'} {data[0]?.revenue + data[1]?.revenue ?? 0}
          </h1> */}
        </div>
      </div>
      {/* <DataTable showGridlines value={data}>
      <Column
          className=" font-mono font-bold text-blue-700"
          style={{ border: "1px solid pink" }}
          field={"mis_date"}
          header={"DATE"}
        />
        <Column
         className=" font-mono font-bold text-gray-800"
          style={{ border: "1px solid pink" }}
          field={"type_event"}
          header={"TYPE_EVENT"}
        />
        <Column
        className=" font-mono font-bold text-gray-800"
          style={{ border: "1px solid pink", }}
          field={"total"}
          header={"TOTAL NO CHARGED"}
        />
        <Column
        className=" font-mono font-bold text-gray-800"
          style={{ border: "1px solid pink" }}
          field={"revenue"}
          header={"REVENUE"}
        />
      </DataTable> */}
    </>
  );
};


export default Table;
