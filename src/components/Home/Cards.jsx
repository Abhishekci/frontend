import { CiHeart } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import axios from "axios";


const Cards = ({home, setInputDiv, data, seteditData}) => {

    const headers = {
        id:localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }

    const handleComplete = async (id) => {
        try {
            const res = await axios.put(`http://localhost:1000/api/v2/update-comp-tasks/${id}`,
                {},
                {headers});
                alert(res.data.message)
                
        } catch (err) {
            console.log(err)
        }
    }

    const handleImp = async (id) => {
        try {
            const res = await axios.put(`http://localhost:1000/api/v2/update-imp-tasks/${id}`,
                {},
                {headers});
                alert(res.data.message)
                
        } catch (err) {
            console.log(err)
        }
    }
   
    const deteleTask = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:1000/api/v2/delete-tasks/${id}`,
                {headers});
                alert(res.data.message)
                
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    const handleEdit = (id, title, desc) => {
        setInputDiv("fixed")
       seteditData({id:id, title: title, desc: desc})
    }
 

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
        {data &&
            data.map((item, index) => (
                <div key={index}  className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
                    <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-300 my-2">{item.desc}</p>
                    </div>
                    <div className="mt-4 w-full flex items-center">
                        <button className={`${item.complete === false ? " bg-red-400" : "bg-green-400"} p-2 w-1/2 rounded`}
                        onClick={()=>handleComplete(item._id)}>{item.complete === true ? "complete" : "Incomplete"}</button>
                        <div className="text-white p-2 w-1/2 text-2xl font-semibold flex justify-around">
                            <button onClick={()=>handleImp(item._id)}>{item.important === true ? <FaHeart className="text-red-400"/> : <CiHeart />}</button>
                            <button onClick={()=>handleEdit(item._id, item.title, item.desc)}><FiEdit /></button>
                            <button onClick={()=>deteleTask(item._id)}><RiDeleteBin6Line /></button>
                        </div>
                    </div>
                </div>
            ))
        }
        {home === "true" && (
            <button onClick={()=>setInputDiv('fixed')} className="flex flex-col items-center justify-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-transform duration-300">
                <IoIosAddCircle className="text-5xl" />
                <h3 className="text-2xl mt-4">Add Tasks</h3>
            </button>
        )}
    </div>
  )
};
export default Cards;
