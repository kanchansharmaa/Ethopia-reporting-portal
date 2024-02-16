
import { useState,useEffect } from "react";

import DatePicker from "react-datepicker";
import axios from "axios";
import Table from "./Table";

const CheckLogs = () => {
  const [date, setDate] = useState(new Date());
  const [percent,setPercent]=useState('')

  const formatedDate = new Date(date).toISOString().split("T")[0];
  // console.log("date",formatedDate)
  const [data, setData] = useState([]);


const urll='http://localhost:8993/api/ratio'

useEffect(() => {
  const intervalId = setInterval(() => {
    axios.get('https://report.gamestation.mobi/api/ratio')
      .then(response => {
        // console.log("response", response.data);
        setPercent(response.data.ratio[0].selectRatio);
      })
      .catch(error => {
        console.error('There was an error fetching the data:', error);
      });
  }, 2000); 

  
  return () => clearInterval(intervalId);
}, []); 

  



  const fetchData = async () => {
    if (date) {
      
      const formattedDate = new Date(date).toISOString().split("T")[0];
      // console.log("formattedDate",formattedDate)


// https://report.gamestation.mobi/api/total
      try {
        const response = await axios.post("/api/totalSubs", {
          mis_date: formattedDate,
          // percent:percent
        });


        // console.log("===============",formattedDate)
        // console.log("data from api",response.data)
        setData(response.data); // Update state with response data
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  useEffect(() => {
    fetchData();

    // Use setInterval to fetch data every 3 seconds
    const intervalId = setInterval(fetchData, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [date]);

 
  return (
    
<>
<div className=" w-full mx-auto ">
<nav class="bg-purple-700 border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl  flex flex-wrap items-center  justify-center mx-auto p-4">
          <h1 className="text-white font-bold   text-4xl">GAME STATION </h1>

        </div>
      </nav>
</div>



      <div className="container px-5  flex mx-auto justify-center mt-10 00">
        <a href="#" class="block max-w-sm p-6 bg-gray-100 border shadow-lg shadow-purple-500 border-gray-200 rounded-lg  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
         <div className="flex justify-center  border border-purple-500">
         <DatePicker
       
              showIcon
              isClearable
              selected={date}
              onChange={(date) => setDate(date)}
              wrapperClassName="datePicker"
            />
         </div>
           
        

          <div className="m-2 p-2">
            {data?.length <= 0 ? (
              <h1 className=" text-3xl font-bold font-mono bg-green-500 text-white p-2 text-center rounded">
                Nothing To show
              </h1>
            ) : (
              
              <Table data={data} />
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

export default CheckLogs;
