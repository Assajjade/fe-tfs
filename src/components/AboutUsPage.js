import { useEffect, useState } from "react";
import AxiosInstance from "./Axios";
import bg from "../image/island.png"

const AboutUsPage = () => {
    const [currentData, setCurrentData] = useState(null)
    useEffect(() => {
        AxiosInstance.get(`about-us/latest/`)
            .then((res) => {
                setCurrentData(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.error('Error fetching current page data:', error);
            });
    }, []);
    return(
        <div className="base flex flex-col">
            <div className="relative z-0">
                <div className="title-cover absolute inset-0 z-10 grid grid-cols-2 pb-[77px] pt-[273px] px-4 text-white">
                    <div className="title flex items-end">
                        <h1 className=" text-8xl font-bold text-start">{currentData?.title}</h1>
                    </div>
                    <div className="subtitle flex items-end">
                        <span className=" text-[32px] font-normal font-['Nunito'] text-start">
                            {currentData?.subtitle}
                        </span>
                    </div>
                </div>
                <img className="bg bg-black w-full" src={bg} alt="bg"/>
            </div>
            <div className="vision-mission grid grid-cols-1 gap-[110px] py-[65px]">
                <div className="vision grid grid-cols-2">
                    <div className="title flex items-start">
                        <h2 className="section-title text-[40px] font-normal">Vision</h2>
                    </div>
                    <div className="content pe-[56px] flex items-center">
                        <p className="text-start text-2xl">
                            {currentData?.vision}
                        </p>
                    </div>
                </div>
                <div className="mission grid grid-cols-2">
                    <div className="title flex items-start">    
                        <h2 className="section-title text-[40px] font-normal">Mission</h2>
                    </div>
                    <div className="content pe-[56px] flex items-center">
                        {currentData?.mision.includes(" | ")? (
                        <>
                            <ul className="text-start ps-6">
                                {currentData.mision.split(" | ").map((item) => (
                                    <li>{item}</li>
                                )) }
                            </ul>
                            <span className="  w-full text-start"></span>
                        </>
                        ): <p className="text-start text-2xl">{currentData?.mision}</p>}
                        </div>
                </div>
            </div>
            <div className="island mb-[136px]">
                <div className="w-full border-b py-[30px]">
                    <h2 className="text-start text-2xl font-bold">Our Visited Island</h2>
                </div>
                {currentData?.visited.includes(" | ")? (
                    <>
                        <ul className=" text-start ps-6">
                            {currentData.visited.split(" | ").map((item) => (
                                <div className="py-[30px] border-b grid grid-cols-5">
                                    <div></div>
                                    <span className="col-span-2 text-[40px] font-normal">{item}</span>
                                    <span className="col-span-2 text-[24px] font-normal">{"Short description of the island"}</span>
                                    
                                </div>
                            )) }
                        </ul>
                        <span className=" border-b w-full text-start"></span>
                    </>
                ): <span className=" border-b w-full text-start">{currentData?.visited}</span>}
            </div>
            <div className="history">
                <div className="w-full border-b pb-[73px]">
                    <h2 className="text-start text-[40px] font-bold">History of The Floating School</h2>
                </div>
            </div>
            <div className="founder grid grid-cols-3">
                <div className="w-full border-b pb-[73px]">
                    <h2 className="text-start text-[40px] font-bold">The Founder</h2>
                </div>
            </div>
            <div className="partner">
                Partnership
            </div>
        </div>
    )
}

export default AboutUsPage