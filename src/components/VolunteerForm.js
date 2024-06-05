import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AxiosInstance from "./Axios";
import "../css/styles.css";
import { useAuth } from "../context/authContext"; // Import useAuth to get current user

const VolunteerForm = () => {
  const { trip_id, language } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get current user
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [exp, setExp] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let tempAnswer = {};
      const response = await AxiosInstance.get(`trips/${trip_id}/questions/`);
      response.data.forEach((question) => (tempAnswer[question.id] = ""));
      setQuestions(response.data);
      setAnswers(tempAnswer);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchUserData = async () => {
    if (currentUser?.uid) {
      try {
        const response = await AxiosInstance.get(`user/detail/${currentUser.uid}`);
        const userData = response.data;
        setName(userData.name);
        setPhoneNum(userData.phone_numbers);
        setEmail(userData.email);
        setExp(userData.experience);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/trips/detail/${trip_id}/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    fetchData();
    fetchUserData(); // Fetch user data to autofill the form
  }, [trip_id, currentUser]);

  const handleSubmit = () => {
    if (!currentUser) {
      setModalMessage(language === "en" ? "You must be logged in to apply." : "Anda harus masuk untuk melamar.");
      setIsModalVisible(true);
      return;
    }

    if (!currentUser.emailVerified) {
      setModalMessage(
        language === "en"
          ? "You have to verify your email first."
          : "Anda harus memverifikasi email Anda terlebih dahulu."
      );
      setIsModalVisible(true);
      return;
    }

    setIsShow(true);
  };

  const handleFinalSubmit = async () => {
    const payload = {
      user: parseInt(1), // Ensure user ID is an integer
      trip: parseInt(trip_id, 10), // Ensure trip ID is an integer
      name: name,
      phoneNum: phoneNum,
      email: email,
      experience: exp, // Include experience in the payload
      application_status: "applied",
    };

    try {
      const response = await AxiosInstance.post(`/trip/register/${trip_id}/`, payload);
      console.log("Response data:", response.data);
      navigate(`/volunteer/${trip_id}/${language}`, { replace: true });
    } catch (error) {
      console.error("Failed to submit application:", error);
      setModalMessage(
        language === "en"
          ? "Failed to submit application. Please try again."
          : "Gagal mengirim aplikasi. Silakan coba lagi."
      );
      setIsModalVisible(true);
    }
  };

  return (
    <>
      {isModalVisible && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="overlay absolute inset-0 bg-gray-500 opacity-75 min-h-screen flex items-center justify-center"></div>
          <div className="bg-white p-8 rounded max-w-xl shadow-lg z-10">
            <h2 className="text-xl font-bold mb-6">
              {language === "en" ? "Important Notice" : "Pemberitahuan Penting"}
            </h2>
            <p className="mb-4">{modalMessage}</p>
            {modalMessage.includes("edit") && (
              <div className="action flex flex-row gap-4 justify-center">
                <Link to={`/edit-profile`} className="bg-[#41839d] text-white px-4 py-2 rounded hover:bg-cyan-600">
                  {language === "en" ? "Edit Profile" : "Edit Profil"}
                </Link>
              </div>
            )}
            <div className="action flex flex-row gap-4 justify-center mt-4">
              <button
                className="bg-[#41839d] text-white px-4 py-2 rounded hover:bg-cyan-600"
                onClick={() => setIsModalVisible(false)}
              >
                {language === "en" ? "Close" : "Tutup"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isShow && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="overlay absolute inset-0 bg-gray-500 opacity-75 min-h-screen flex items-center justify-center"></div>
          <div className="bg-white p-8 rounded max-w-xl shadow-lg z-10">
            <h2 className="text-xl font-bold mb-6">{language === "en" ? "Are you sure you want to submit?" : "Apakah Anda yakin ingin mengirim?"}</h2>
            <p className="mb-4">
              {language === "en"
                ? `Thank you for submitting your application for ${data.island_name}! You can expect a confirmation email with further details. We will notify you of your application status (accepted or rejected) within several days. In the meantime, you can review the trip details on our platform.`
                : `Terima kasih telah mengirimkan aplikasi Anda untuk ${data.island_name}! Anda dapat mengharapkan email konfirmasi dengan detail lebih lanjut. Kami akan memberi tahu Anda tentang status aplikasi Anda (diterima atau ditolak) dalam beberapa hari. Sementara itu, Anda dapat meninjau detail perjalanan di platform kami.`}
            </p>
            <div className="action flex flex-row gap-4 justify-center">
              <button
                className="bg-[#41839d] text-white px-4 py-2 rounded hover:bg-cyan-600"
                onClick={() => setIsShow(false)}
              >
                {language === "en" ? "Back to form" : "Kembali ke formulir"}
              </button>
              <button
                className="bg-[#41839d] text-white px-4 py-2 rounded hover:bg-cyan-600"
                onClick={handleFinalSubmit}
              >
                {language === "en" ? "Submit" : "Kirim"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="content flex flex-col justify-center bg-gray-100 min-h-screen p-6">
        <h2 className="title font-bold text-4xl mb-10 text-center">
          {language === "en" ? `Volunteer Registration Form for ${data.island_name} - ${data.trip_date}` : `Formulir Pendaftaran Relawan untuk ${data.island_name} - ${data.trip_date}`}
        </h2>
        <div className="form flex flex-col justify-center items-center gap-5">
          <div className="grid grid-cols-1 w-full max-w-2xl">
            <label className="font-bold text-xl">{language === "en" ? "Full Name" : "Nama Lengkap"} :</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input px-3 py-2 border-2 text-base rounded-xl"
              required
            />
          </div>
          <div className="grid grid-cols-1 w-full max-w-2xl">
            <label className="font-bold text-xl">{language === "en" ? "Phone Number" : "Nomor Telepon"} :</label>
            <input
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              className="input px-3 py-2 border-2 text-base rounded-xl"
              required
            />
          </div>
          <div className="grid grid-cols-1 w-full max-w-2xl">
            <label className="font-bold text-xl">{language === "en" ? "Email Address" : "Alamat Email"} :</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input px-3 py-2 border-2 text-base rounded-xl"
              required
            />
          </div>
          {questions.map((question, index) => {
            const id_question = question.id;
            return (
              <div key={index} className="grid grid-cols-1 w-full max-w-2xl">
                <label className="font-bold text-xl">{question.question_text} :</label>
                <input
                  value={answers[question.id]}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [id_question]: e.target.value,
                    })
                  }
                  type="text"
                  className="input px-3 py-2 border-2 text-base rounded-xl"
                  required
                />
              </div>
            );
          })}
          <div className="grid grid-cols-1 w-full max-w-2xl">
            <label className="font-bold text-xl">
              {language === "en" ? "Volunteer Experience (Optional)" : "Pengalaman Relawan (Opsional)"} :
            </label>
            <textarea
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              rows={4}
              className="input px-3 py-2 border-2 text-base rounded-xl"
            />
          </div>
          <div className="flex flex-row w-full max-w-2xl items-start gap-4">
            <input type="checkbox" />
            <span className="text-justify font-light text-sm">
              {language === "en"
                ? `By using this platform to register for volunteer trips, you agree to be bound by these terms: eligibility for verified users only, maximum three trip applications, trip information provided by organizers, application process may involve additional questions, selection by organizers based on their criteria, automatic removal from other applications upon acceptance, participation in trips at your own risk, platform acts as facilitator only, right to modify these terms, governed by [Country/Region] law, and contact information provided for questions.`
                : `Dengan menggunakan platform ini untuk mendaftar perjalanan sukarela, Anda setuju untuk terikat oleh syarat-syarat ini: kelayakan hanya untuk pengguna terverifikasi, maksimum tiga aplikasi perjalanan, informasi perjalanan yang disediakan oleh penyelenggara, proses aplikasi mungkin melibatkan pertanyaan tambahan, pemilihan oleh penyelenggara berdasarkan kriteria mereka, penghapusan otomatis dari aplikasi lain setelah diterima, partisipasi dalam perjalanan atas risiko Anda sendiri, platform bertindak sebagai fasilitator saja, hak untuk mengubah syarat-syarat ini, diatur oleh hukum [Negara/Wilayah], dan informasi kontak yang disediakan untuk pertanyaan.`}
            </span>
          </div>
          <div className="flex flex-row w-full max-w-2xl items-center gap-4">
            <button
              onClick={handleSubmit}
              className="detail-button bg-[#41839d] w-full px-6 py-[5px] font-normal text-xl rounded-md text-white"
            >
              {language === "en" ? "Save" : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerForm;
