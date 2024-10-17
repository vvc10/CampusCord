import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useState } from "react";
import Modal from "./Modal";
import { TbUnlink } from "react-icons/tb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faComments, faBell } from '@fortawesome/free-solid-svg-icons';
import url from '../url.json'
import axios from "axios";
import Message from "./ui/Message";


export default function Landing({ setLoginState, isAdmin, setIsAdmin }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Schedule');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Tab data with enhanced content and icons
    const tabs = [
        {
            name: "Schedule",
            content: (
                <div>
                    <h3 className="font-bold text-lg">Upcoming Events</h3>
                    <ul className="mt-2 list-disc list-inside">
                        <li>Meeting with team at 10 AM</li>
                        <li>Project deadline on Friday</li>
                        <li>Lunch with client at 1 PM</li>
                    </ul>
                    <button onClick={openModal} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700">
                        View Full Schedule
                    </button>
                </div>
            ),
            icon: faCalendar
        },
        {
            name: "Messages",
            content: (
                <div>
                    <h3 className="font-bold text-lg">Recent Messages</h3>
                    <ul className="mt-2">
                        <li className="border-b py-2">John: Looking forward to the meeting!</li>
                        <li className="border-b py-2">Jane: Can you send me the report?</li>
                        <li className="border-b py-2">Paul: Don't forget about our call tomorrow.</li>
                    </ul>
                    <button onClick={openModal} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700">
                        View All Messages
                    </button>
                </div>
            ),
            icon: faComments
        },
        {
            name: "Notifications",
            content: (
                <div>
                    <h3 className="font-bold text-lg">Recent Notifications</h3>
                    <ul className="mt-2 list-disc list-inside">
                        <li>New comment on your post</li>
                        <li>Your password has been updated</li>
                        <li>New follower: Sarah</li>
                    </ul>
                    <button onClick={openModal} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700">
                        Check All Notifications
                    </button>
                </div>
            ),
            icon: faBell
        },
    ];

    const handleSubscribe = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url.server}subscribe`, { email });
            setMessage(response.data.message); // Display success message
            setEmail(''); // Clear the input field
        } catch (error) {
            setMessage(error.response?.data?.message || 'Subscription failed, try again');
        }
    };


    return (

        <>
            <div className="flex flex-col w-[100%] md:w-full px-3 md:p-0  min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-white">
                <header className="hidden md:block sticky top-[0] pt-[2%] z-50 w-full mx-auto">
                    <div className="container flex items-center px-4 py-4 rounded-[20px] justify-between bg-slate-800 bg-opacity-90 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 mx-auto">
                        <a className="flex items-center" href="/">
                            {/* Uncomment and customize the icon if needed */}
                            {/* <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" /> */}
                            <span className="ml-2 text-xl font-bold flex items-center">
                                CampusC
                                <TbUnlink className="text-[16px] ml-1" />
                                rd
                            </span>
                        </a>

                        <div className="w-fit">
                            <button
                                onClick={openModal}
                                className="text-white bg-gray-900 font-[400] text-[16px] py-2 px-5 mx-4 rounded-lg shadow hover:opacity-80 transition duration-200 ease-in-out"
                            >
                                Github
                            </button>
                            <button
                                onClick={openModal}
                                className="bg-white text-black font-[400] text-[16px] py-2 px-5 rounded-lg shadow hover:opacity-80 transition duration-200 ease-in-out"
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                </header>
                <header className="block md:hidden sticky top-[0] pt-[2%] z-50 w-full mx-auto">
                    <div className="container flex items-center px-4 py-4 rounded-[20px] justify-between bg-slate-800 bg-opacity-90 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 mx-auto">
                        <a className="flex items-center" href="/">
                            {/* Uncomment and customize the icon if needed */}
                            {/* <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" /> */}
                            <span className="ml-2 text-xl font-bold flex items-center">
                                CampusC
                                <TbUnlink className="text-[16px] ml-1" />
                                rd
                            </span>
                        </a>

                        <div className="w-fit">
                            {/* <button
                                onClick={openModal}
                                className="text-white bg-gray-900 font-[400] text-[16px] py-2 px-5 mx-4 rounded-lg shadow hover:opacity-80 transition duration-200 ease-in-out"
                            >
                                Github
                            </button> */}
                            <button
                                onClick={openModal}
                                className="bg-white text-black font-[400] text-[16px] py-2 px-5 rounded-lg shadow hover:opacity-80 transition duration-200 ease-in-out"
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-1 mx-auto w-full mt-[2%]">
                    {/* Hero Section */}
                    <section className="container mx-auto rounded-[20px] py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
                        <div className="px-4 md:px-6">
                            <div className="flex flex-col items-center space-y-6 text-center">
                                <div className="space-y-4">
                                    <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
                                        Connect, Collaborate, Thrive
                                    </h1>
                                    <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                                        Join CampusCord and unlock a world of opportunities. Connect with peers, discover events, and access resources—all in one place.
                                    </p>
                                </div>
                                <div className="space-x-4">
                                    <button onClick={openModal} className="bg-white text-purple-600 font-semibold text-[16px] py-2 px-4 rounded-lg shadow hover:opacity-90 transition duration-200">
                                        Join Now
                                    </button>
                                    <button className="bg-transparent border border-white text-white font-semibold text-[16px] py-2 px-4 rounded-lg hover:bg-white hover:text-purple-600 transition duration-200">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Trending Events, Popular Groups, Latest Resources Section */}
                    <section className="container mt-[4%] mx-auto rounded-[20px] py-10 md:py-15 lg:py-20 xl:py-25 bg-white dark:bg-gray-800">
                        <div className="px-4 md:px-6 ">
                            <h2 className="text-3xl font-extrabold tracking-tight text-center sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                                Discover What's Happening
                            </h2>
                            <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                                {/* Card: Trending Events */}
                                <div className="card transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                                    <div className="card-header p-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white flex items-center">
                                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2" />
                                        </svg>
                                        <h3 className="text-lg font-semibold">Trending Events</h3>
                                    </div>
                                    <div className="card-content p-6">
                                        <ul className="space-y-2">
                                            {["Annual Tech Fest", "Cultural Night", "Career Fair 2024"].map(event => (
                                                <li key={event} className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                                                    </svg>
                                                    <span className="text-gray-800 dark:text-gray-200">{event}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Card: Popular Groups */}
                                <div className="card transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                                    <div className="card-header p-6 bg-gradient-to-r from-green-400 to-green-500 text-white flex items-center">
                                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                                        </svg>
                                        <h3 className="text-lg font-semibold">Popular Groups</h3>
                                    </div>
                                    <div className="card-content p-6">
                                        <ul className="space-y-2">
                                            {["Coding Club", "Environmental Society", "Debate Team"].map(group => (
                                                <li key={group} className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                                                    </svg>
                                                    <span className="text-gray-800 dark:text-gray-200">{group}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Card: Latest Resources */}
                                <div className="card transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                                    <div className="card-header p-6 bg-gradient-to-r from-blue-400 to-blue-500 text-white flex items-center">
                                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                                        </svg>
                                        <h3 className="text-lg font-semibold">Latest Resources</h3>
                                    </div>
                                    <div className="card-content p-6">
                                        <ul className="space-y-2">
                                            {["Study Guides", "Scholarship Info", "Career Resources"].map(resource => (
                                                <li key={resource} className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                                                    </svg>
                                                    <span className="text-gray-800 dark:text-gray-200">{resource}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="container mt-[4%] mx-auto rounded-[20px] py-10 md:py-15 lg:py-20 xl:py-25 bg-white bg-gradient-to-r from-indigo-600 to-indigo-800">
                        <div className="px-4 md:px-6">
                            {/* Header */}
                            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl md:text-5xl">
                                Your Personal Dashboard
                            </h2>

                            {/* Tabs Section */}
                            <div className="mt-12">
                                <div className="w-full">
                                    {/* Tabs */}
                                    <div className="tabs-list text-center items-center flex justify-center border-none border-indigo-400 flex-col gap-2 md:flex-row">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.name}
                                                onClick={() => setActiveTab(tab.name)} // Update active tab on click
                                                className={`tabs-trigger text-center flex items-center px-4 py-1 text-indigo-200 transition-colors duration-200 ${activeTab === tab.name
                                                    ? "border-none rounded-[50px] bg-[#736ed6]"
                                                    : "border-transparent"
                                                    } focus:outline-none`}
                                            >
                                                <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                                                {tab.name}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tab Content */}
                                    <div className="tabs-content mt-8">
                                        {tabs.map((tab) => (
                                            <div
                                                key={tab.name}
                                                className={`tab-panel transition-opacity duration-500 ease-in-out ${activeTab === tab.name ? "opacity-100 block" : "opacity-0 hidden"
                                                    }`}
                                            >
                                                <div className="card bg-white text-gray-800 rounded-lg shadow-lg p-6">
                                                    <div className="card-header text-indigo-600 font-bold">
                                                        {tab.name}
                                                    </div>
                                                    <div className="card-content mt-4">
                                                        <p>{tab.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

                <footer className="w-full pt-2 md:pt-2 lg:pt-2 text-white">
                    <div className="container w-[80vw] mx-auto my-[10px] rounded-[20px] px-[2%] py-[2%] md:py-[2%] lg:py-[2%] bg-white dark:bg-gray-800">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="flex items-center gap-2">
                                {/* Uncomment the next line to add an icon */}
                                {/* <Sparkles className="h-6 w-6 text-purple-600" /> */}
                                <span className="text-lg font-bold text-gray-800 dark:text-white">CampusCord</span>
                            </div>
                            <nav className="flex gap-4 sm:gap-6">
                                <Link className="text-sm text-gray-600 hover:underline dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" href="#">
                                    Terms of Service
                                </Link>
                                <Link className="text-sm text-gray-600 hover:underline dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" href="#">
                                    Privacy Policy
                                </Link>
                                <Link className="text-sm text-gray-600 hover:underline dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" href="#">
                                    Contact Us
                                </Link>
                            </nav>
                            <div className="flex items-center mt-4 md:mt-0">

                                <input
                                    className="mr-2 p-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
                                    placeholder="Enter your email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <button
                                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200"
                                    onClick={handleSubscribe}
                                >
                                    Subscribe
                                </button>

                            </div>
                        </div>
                        {message && <Message message={message} />}
                        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            © 2024 CampusCord. All rights reserved.
                        </div>
                    </div>
                </footer>

            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <LoginPage setLoginState={setLoginState} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            </Modal>
        </>

    )
}