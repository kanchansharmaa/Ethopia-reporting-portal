
import { useState ,useEffect} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TableLogs from "./TableLogs";

const CheckLogsByRatio = () => {
  const [date, setDate] = useState(new Date());
  const [percent,setPercent]=useState('')

  const formatedDate = new Date(date).toISOString().split("T")[0];
//   console.log("date",formatedDate)
  const [data, setData] = useState([]);

  const handleSelect = (event) => {
    setPercent(event.target.value);
  };
  // https://report.gamestation.mobi/api/totalSubs

  const fetchData = async () => {
      try {
        const response = await axios.post("/api/total", {
          percent: percent,
        });

        console.log("===============",percent)
        console.log("data from api",response.data)
        localStorage.setItem('myData',(percent
          ));
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
   
  };

  useEffect(() => {
    fetchData();
  }, [ percent]);


//   const queryData = useQuery(["mis", { date }], async () => {
//     if (date) {
//       const formatedDate = new Date(date).toISOString().split("T")[0];

//       const [e1, response] = await postRequest("/api/totalSubByRatio", {
//         mis_date: formatedDate,
//         percent: percent,
//       });
//       if (e1) {
//         console.log(e1);
//       }
//       // console.log("response",response
//       // )
//       setData(response); // Update state with response data
//     }
//   });

 


//   const fetchData = (e) => {
//     e.preventDefault();
//     queryData.refetch(); // Trigger refetch when the Submit button is clicked
//   };
  return (
    
<>
<div className=" w-full mx-auto ">
<nav class="bg-purple-700 border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl  flex flex-wrap items-center  justify-center mx-auto p-4">
          <h1 className="text-white font-bold   text-4xl">GAME STATION</h1>

        </div>
      </nav>
</div>



      <div className="container px-5  flex mx-auto justify-center mt-10 00">
        <a  class="block max-w-sm p-6 bg-gray-100 border shadow-lg shadow-purple-500 border-gray-200 rounded-lg  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
         <div className="flex flex-col justify-center ">
            {/* <div className="flex justify-center border border-purple-500 text-gray-600 font-bold ">
            <DatePicker
       
       showIcon
       isClearable
       selected={date}
       onChange={(date) => setDate(date)}
       wrapperClassName="datePicker"
     />
            </div> */}
       


{/* <div class="relative max-w-sm">
  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
    </svg>
  </div>
  <input datepicker type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
</div> */}


<div className="mt-5">
      <select 

      type='submit'
        id="small" 
        size='5' 
        class="block w-full p-2 py-2.5 mb-6 text-sm text-gray-500 font-bold border border-purple-500 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleSelect}
        value={percent}
      >
        <option disabled>Select Ratio</option>
        {Array.from({ length: 18 }, (_, i) => (i + 1) * 5).map(value => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </div>




         </div>
           
        

          <div className="m-2 p-2">
            {data?.length <= 0 ? (
              <h1 className=" text-3xl font-bold font-mono bg-green-500 text-white p-2 text-center rounded">
                Nothing To show
              </h1>
            ) : (
              
              <TableLogs data={data} />
            )}
          </div>

        </a>
      </div>


</>
      




      // {/* <Container>
      //   <div className=" w-full rounded  p-5 m-3">
      //     <h1
      //       className=" 
      //      bg-gray-800 p-5 rounded outline outline-violet-600
      //     text-center font-bold text-2xl font-mono text-violet-500"
      //     >
      //       GAME HUB
      //     </h1>
      //     <div className=" flex justify-center items-center space-x-5 mt-5">
      //       <DatePicker
      //         showIcon
      //         isClearable
      //         selected={date}
      //         onChange={(date) => setDate(date)}
      //         wrapperClassName="datePicker"
      //       />
      //     </div>
      //   </div>
   
      //   <div className="m-2 p-2">
      //     {data?.length <= 0 ? (
      //       <h1 className=" text-3xl font-bold font-mono bg-green-500 text-white p-2 text-center rounded">
      //         Nothing To show
      //       </h1>
      //     ) : (
      //       <Table data={data} />
      //     )}
      //   </div>
      // </Container> */}
  )
};

export default CheckLogsByRatio;
