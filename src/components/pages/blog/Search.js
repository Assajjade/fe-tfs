import react, { useState } from 'react';
import Header from '../../../image/Search2.jpg'
import { IoSearchOutline } from "react-icons/io5";
function Search() {
    const tags=[
        {
            id:1,
            name:'All',
        },
        {
            id:2,
            name:'Sulawesi',
        },
        {
            id:3,
            name:'Jakarta',
        },
        {
            id:4,
            name:'Etc.',
        }
    ]

const [activeIndex, setActiveIndex]=useState(0);


    return(
        <div className='flex flex-col justify-center'>
            <div className='flex items-center justify-center '>
                <div className='w-[75%] px-[70] md:px-[150px]'>
                    <img src={Header} className='rounded-3xl  bg-black ' />
                </div>
            </div>
            <div className='bg-white shadow-lg p-4 rounded-lg mt-[-20px] mx-[25%] flex items-center'>
                <IoSearchOutline className='text-[20px] text-gray-400'/>
                <input type='text' placeholder='search' className='outline-none ml-2 w-full' />
            </div>
            <div className='flex gap-10 justify-center mt-5'>
                {/* {tags.map((item,index)=>(
                    <ul onClick={() => setActiveIndex(index)} className={`${index==activeIndex?'bg-blue-500 text-white':null} p-1 pb-2 rounded-sm md:rounded-full cursor-pointer md: px-4
                    hover:scale-110 hover:border-[2px] border-blue-500 border-[1px]
                     transition-all ease-in-out duration-100`}>
                        <li>{item.name}</li>
                    </ul>
                ))} */}
            </div>
        </div>
    )
}

export default Search;