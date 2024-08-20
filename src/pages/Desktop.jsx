import React, { useEffect, useState } from 'react';
import Slidebar from '../components/Slidebar';
import Theme from '../components/Theme';
import Workspace from '../components/Workspace';
import { useLocation } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { ChevronDown } from 'lucide-react';
import { deleteMailResponse, getMailList, getMailMessages } from '../actions/actions';
import InboxEmailCard from '../components/InboxEmailCard';
import InboxHeader from '../components/InboxHeader';
import LoadingPage from '../components/LoadingPage';
import SearchBar from '../components/SearchBar';
import UserDetails from '../components/UserDetails';
import ReplySection from '../components/ReplySection';
import { Modal } from './Modal';

const Desktop = () => {
    const [currColor, setCurrColor] = useState(true);
    const [data, setData] = useState([]);
    const [singleMail, setSingleMail] = useState({});
    const [render, setRender] = useState(false);

    const location = useLocation();
    const [showEmailDesktop, setShowEmailDesktop] = useState(0);

    let token = localStorage.getItem("reachinbox-auth") || takeToken();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchData = async () => {
        try {
            console.log("Fetching data with token:", token);
            const res = await getMailList(token);
            console.log("Mail list response:", res);
    
            if (res && res.length > 0) {
                setData(res);
                const id = res[0]?.threadId;
                console.log("First thread ID:", id);
    
                if (id) {
                    const messages = await getMailMessages(id, token);
                    console.log("Mail messages:", messages);
                    setSingleMail(messages);
                } else {
                    console.log("No thread ID found in the response.");
                }
            } else {
                console.log("No emails found in the response.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    
    
    localStorage.setItem("reachinbox-auth", JSON.stringify("77b7b818-e7a3-4274-94c4-f365ab2f6348"));
    // for testing purpose 
    useEffect(() => {
        const queryToken = location.search.split("?token=")?.join("");
        console.log("Query Token from URL:", queryToken); // Check if the token is being extracted
        if (queryToken) {
            try {
                const ParseData = jwtDecode(queryToken);
                console.log("Decoded Token Data:", ParseData); // Ensure this is working
                localStorage.setItem("reachinbox-auth", JSON.stringify(queryToken));
                localStorage.setItem("reachinbox-auth-firstname", JSON.stringify(ParseData.user.firstName));
                localStorage.setItem("reachinbox-auth-lastname", JSON.stringify(ParseData.user.lastName));
                localStorage.setItem("reachinbox-auth-email", JSON.stringify(ParseData.user.email));
                 // Log after setting the token
            console.log("Stored Token in localStorage:", localStorage.getItem("reachinbox-auth"));
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else {
            console.log("Token not found in URL");
        }
        fetchData();
    }, [location.search, render]);
    
    
    function takeToken() {
        try {
            const token = localStorage.getItem("reachinbox-auth");
            console.log("Take Token Function:", token); // Add this line
            return token ? JSON.parse(token) : "";
        } catch (e) {
            console.log("Error:", e);
            return "";
        }
    }
    
   
    useEffect(() => {}, [singleMail, showEmailDesktop, isModalOpen]);

    const handleChangeEmail = (id) => {
        getMailMessages(id).then(messages => {
            setSingleMail(messages);
        }).catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "d" || event.key === "D") {
                openModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);
    

    const handleChange = (index) => setShowEmailDesktop(index);

    const deleteEmail = async () => {
        const id = singleMail[0]?.threadId;
        try {
            const res = await deleteMailResponse(id, token);
            alert(`The ${id} has been Deleted Successfully`);
            setRender(!render);
            closeModal();
        } catch (err) {
            alert("Error, Please try again");
        }
    };
    let firstName = localStorage.getItem('reachinbox-auth-firstname');
    firstName = firstName ? JSON.parse(firstName) : '';
    let lastName = localStorage.getItem('reachinbox-auth-lastname');
    lastName = lastName ? JSON.parse(lastName) : '';
    const username = firstName ? (firstName[0] + (lastName ? lastName[0] : '')) : '';

    return (
        <div className={`w-full h-full m-auto max-w-[1440px] ${currColor ? "bg-black" : "bg-white"} ${currColor ? "text-white" : "text-black"} h-10 flex`}>
            <div className='w-[56px] h-screen'>
                <Slidebar currColor={currColor} username={username} showEmailDesktop={showEmailDesktop} handleChange={handleChange} />
            </div>
            <div className='w-full max-w-[1383]'>
                <div className={`h-[64px] flex justify-between py-4 pl-8 ${currColor ? "bg-[#1F1F1F]" : "bg-white"} border ${currColor ? "border-gray-700" : "border-gray-300"}`}>
                    <p className={`w-full text-left text-xl ${currColor ? "text-white-900" : "text-black-900"}`}>Onebox</p>
                    <div className='w-[210px] h-8 mr-5 flex justify-center items-center gap-5'>
                        <Theme currColor={currColor} onClick={() => setCurrColor(!currColor)} />
                        <Workspace />
                    </div>
                </div>
                {data.length === 0 ? (
                    <LoadingPage />
                ) : (
                    <div className={`flex border ${currColor ? "border-gray-700" : "border-gray-300"}`}>
                        {/* Render email content */}
                        <div className='w-[275px] ml-5 pr-3'>
                            <InboxHeader currColor={currColor} />
                            <div className='text-left'>
                                {data.map((item) => (
                                    <div key={item.id}>
                                        <InboxEmailCard currColor={currColor} {...item} handleChangeEmail={handleChangeEmail} />
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <ReplySection currColor={currColor} singleMail={singleMail} />
                        <UserDetails currColor={currColor} />
                    </div>
                )}
            </div>
            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className='w-[440px] h-[240px] text-white'>
                        <div className='h-full'>
                            <h1 className='text-[24px] font-bold mt-8'>Are you Sure?</h1>
                            <p className='mt-8 text-[#E8E8E8]'>Your selected email will be deleted.</p>
                            <div className='mt-8 flex justify-center gap-5'>
                                <button className='w-[120px] h-12 bg-[#25262B]' onClick={closeModal}>Cancel</button>
                                <button className='w-[140px] h-12 bg-[#FA5252]' onClick={deleteEmail}>Delete</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
    
};

export default Desktop;
