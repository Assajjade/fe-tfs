import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "./Axios";

const VolunteerForm = () => {
    const {trip_id} = useParams();
    const navigate = useNavigate();
    const api_base = "http://127.0.0.1:8000" //add be url
    const [data, setData] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [name, setName] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [email, setEmail] = useState("")
    const [exp, setExp] = useState("")
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            let tempAnswer = {}
          const response = await AxiosInstance.get(`trips/${trip_id}/questions/`);
          response.data.map((question) => tempAnswer[question.id] = "")
          setQuestions(response.data);
          setAnswers(tempAnswer)
          setLoading(false);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
    useEffect(() => {
        console.log("fetching" );
        fetch(`${api_base}/trips/detail/${trip_id}/`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setData(data);
        });
        fetchData()
    }, [])

    const handleSubmit = () => {

        const payload = {
            "user": 1, //belum ada authentication
            "trip": trip_id,
            "name": name,
            "phoneNum": phoneNum,
            "experience": exp,
            "email": email,
            "application_status": "applied"
        }

        console.log(JSON.stringify(payload));
        fetch(`${api_base}/trip/register/`, {  // Enter your IP address here
            method: 'POST', 
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
        }).then(
            navigate(`/volunteer/${trip_id}`, {replace: true})
        )

        // try {
        //     Object.keys(answers).map(async (key) => {
        //         const response = await AxiosInstance.post(`trips/${trip_id}/answers/${1}/`, {answers: answers[key]});
        //         console.log(response);
        //     } ) 
        //   } catch (error) {
        //     console.error('Error creating answer:', error);
        //   }
    }

    console.log(answers);

    return(
        <>
        {isShow && (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="overlay absolute inset-0 bg-gray-500 opacity-75 min-h-screen flex items-center justify-center"></div>
                <div className="bg-white p-8 rounded max-w-xl shadow-lg z-10">
                    <h2 className="text-xl font-bold mb-6">Are you sure want to submit?</h2>
                    <p className="mb-4">
                    Thank you for submitting your application for {data.island_name}! You can expect a confirmation email with further details. We will notify you of your application status (accepted or rejected) within several days. In the meantime, you can review the trip details on our platform).
                    </p>
                    <div className="action flex flex-row gap-4 justify-center">
                        <button className="bg-[#41839d] text-white px-4 py-2 rounded hover:bg-cyan-600" onClick={() => setIsShow(false)}>
                            Back to form
                        </button>
                        <button className="bg-[#41839d] text-white px-4 py-2 rounded hover:bg-cyan-600" onClick={() => handleSubmit()}>
                            Submit
                        </button>

                    </div>
                </div>
            </div>
        )}
        <div className="content flex flex-col justify-center">
            <h2 className="title font-bold text-4xl mb-10">Form Pendaftaran Volunteer {data.island_name} - {data.trip_date}</h2>
            <div className="form flex flex-col justify-center items-center gap-5">
                <div className="grid grid-cols-1 w-1/2">
                    <label className="font-bold text-xl">Full Name :</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="input px-3 py-2 border-2 text-base rounded-xl" required/>
                </div>
                <div className="grid grid-cols-1 w-1/2">
                    <label className="font-bold text-xl">Phone Number :</label>
                    <input value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} className="input px-3 py-2 border-2 text-base rounded-xl" required/>
                </div>
                <div className="grid grid-cols-1 w-1/2">
                    <label className="font-bold text-xl">Email Address :</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input px-3 py-2 border-2 text-base rounded-xl" required/>
                </div>
                {questions.map((question, index) => {
                    const id_question = question.id
                    return(
                    <div className="grid grid-cols-1 w-1/2">
                        <label className="font-bold text-xl"> {question.question_text} : </label>
                        <input value={answers[question.id]} onChange={(e) => setAnswers({
                            ...answers,
                            [id_question] : e.target.value
                        })} type="text" className="input px-3 py-2 border-2 text-base rounded-xl" required/>
                    </div>)
                })}
                
                <div className="grid grid-cols-1 w-2/3">
                    <label className="font-bold text-xl">Volunteer Experience (Optional):</label>
                    <textarea value={exp} onChange={(e) => setExp(e.target.value)} rows={4} className="input px-3 py-2 border-2 text-base rounded-xl"/>
                </div>
                <div className="flex flex-row w-2/3 items-center gap-4">
                    <input type="checkbox" />
                    <span className=" text-justify font-light text-sm">By using this platform to register for volunteer trips, you agree to be bound by these terms: eligibility for verified users only, maximum three trip applications, trip information provided by organizers, application process may involve additional questions, selection by organizers based on their criteria, automatic removal from other applications upon acceptance, participation in trips at your own risk, platform acts as facilitator only, right to modify these terms, governed by [Country/Region] law, and contact information provided for questions</span>
                </div>
                <div className="flex flex-row w-2/3 items-center gap-4">
                    <button onClick={() => setIsShow(true)} className="detail-button bg-[#41839d] w-full px-6 py-[5px] font-normal text-xl rounded-md text-white">
                        Save
                    </button>
                </div>
            </div> 
            

        </div>
        </>
        
    )
}

export default VolunteerForm