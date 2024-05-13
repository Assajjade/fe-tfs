import { useEffect, useState } from "react"
import AxiosInstance from "./Axios";
import { Button } from "@mui/material";
import { IoInformationCircle } from "react-icons/io5";

const AboutUsAdmin = () => {
    const [currentData, setCurrentData] = useState(null)
    const [editable, setEditable] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    const handleUpdate = () => {
        AxiosInstance.put(`about-us/update/${currentData.id}`, {...editable, created_at:new Date() }).then(() => {
            setIsEdit(false)
          });
    }
    const handleCreateNew = () => {
        setEditable({
            id: currentData.id,
            title: "",
            subtitle: "",
            vision: "",
            mision: "",
            visited: "",
            created_at: currentData.created_at
        })
        setIsEdit(true)
    }


    useEffect(() => {
        AxiosInstance.get(`about-us/latest/`)
            .then((res) => {
                setCurrentData(res.data);
                setEditable(res.data)
            })
            .catch((error) => {
                console.error('Error fetching current page data:', error);
            });
    }, [isEdit]);

    console.log(currentData);
    return(
        <div className="w-full flex flex-col gap-4">
            <span className="title text-2xl font-bold">About Us Section Management</span>
            <div className="action-box flex flex-row justify-between items-center">
                <span className="text-xl font-semibold">{isEdit? "Update Content" :"Current Content"}</span>
                {isEdit? 
                    <Button color="warning" autoFocus onClick={() => setIsEdit(false)}>
                        Cancel
                    </Button>
                    :
                    <div>
                        <Button color="primary" autoFocus onClick={() => setIsEdit(true)}>
                            Edit Content
                        </Button> 
                        {/* <Button color="success" autoFocus onClick={() => handleCreateNew()}>
                            Create New Content
                        </Button>  */}
                    </div>
                }
                
            </div>
            {isEdit?
            <div className="current flex flex-col gap-3 text-lg">
                <div className="Title flex flex-col items-start">
                    <span>Title :</span>
                    <input className="py-2 px-4 border rounded-lg w-full" value={editable.title} onChange={(e) => setEditable({...editable, title: e.target.value})} />
                </div>
                <div className="Title flex flex-col items-start">
                    <span>Subtitle :</span>
                    <textarea className="py-2 px-4 border rounded-lg w-full" value={editable.subtitle} rows={1} onChange={(e) => setEditable({...editable, subtitle: e.target.value})} />
                    <span className="text-sm text-gray-400 flex flex-row items-center gap-1"><IoInformationCircle /> For adding list, add " | " as divider between object in list</span>
                </div>
                <div className="Title flex flex-col items-start">
                    <span>Vision :</span>
                    <textarea className="py-2 px-4 border rounded-lg w-full" value={editable.vision} rows={1} onChange={(e) => setEditable({...editable, vision: e.target.value})} />
                    <span className="text-sm text-gray-400 flex flex-row items-center gap-1"><IoInformationCircle /> For adding list, add " | " as divider between object in list</span>
                </div>
                <div className="Title flex flex-col items-start">
                    <span>Mission :</span>
                    <textarea className="py-2 px-4 border rounded-lg w-full" value={editable.mision} rows={3} onChange={(e) => setEditable({...editable, mision: e.target.value})} />
                    <span className="text-sm text-gray-400 flex flex-row items-center gap-1"><IoInformationCircle /> For adding list, add " | " as divider between object in list</span>
                </div>
                <div className="Title flex flex-col items-start">
                    <span>Visited Island :</span>
                    <textarea className="py-2 px-4 border rounded-lg w-full" value={editable.visited} rows={3} onChange={(e) => setEditable({...editable, visited: e.target.value})} />
                    <span className="text-sm text-gray-400 flex flex-row items-center gap-1"><IoInformationCircle /> For adding list, add " | " as divider between object in list</span>
                </div>
                <div className="action area w-full">
                    <Button color="primary" variant="contained" fullWidth onClick={() => handleUpdate()}>
                        Save Content
                    </Button>
                </div>
                
            </div>
            :
            <div className="current flex flex-col gap-3 text-lg">
                <div className="Title flex flex-col items-start">
                    <span>Title :</span>
                    <span className=" border-b w-full text-start">{currentData?.title}</span>
                </div>
                <div className="Title flex flex-col items-start">
                    <span>Subtitle :</span>
                    <span className=" border-b w-full text-start">{currentData?.subtitle}</span>
                </div>
                <div className="Title flex flex-col items-start">
                    <span>Vision :</span>
                    {currentData?.vision.includes(" | ")? (
                    <>
                        <ul className="list-disc text-start ps-6">
                            {currentData.vision.split(" | ").map((item) => (
                                <li>{item}</li>
                            )) }
                        </ul>
                        <span className=" border-b w-full text-start"></span>
                    </>
                    ): <span className=" border-b w-full text-start">{currentData?.vision}</span>}
                </div>
                <div className="Title flex flex-col items-start">
                    <span>Mission :</span>
                    {currentData?.mision.includes(" | ")? (
                    <>
                        <ul className="list-disc text-start ps-6">
                            {currentData.mision.split(" | ").map((item) => (
                                <li>{item}</li>
                            )) }
                        </ul>
                        <span className=" border-b w-full text-start"></span>
                    </>
                    ): <span className=" border-b w-full text-start">{currentData?.mision}</span>}
                    
                </div>
                <div className="Title flex flex-col items-start">
                    <span>Visited Island :</span>
                    {currentData?.visited.includes(" | ")? (
                    <>
                        <ul className="list-disc text-start ps-6">
                            {currentData.visited.split(" | ").map((item) => (
                                <li>{item}</li>
                            )) }
                        </ul>
                        <span className=" border-b w-full text-start"></span>
                    </>
                    ): <span className=" border-b w-full text-start">{currentData?.visited}</span>}
                </div>
                
            </div>
            }
            
        </div>
    )
}

export default AboutUsAdmin