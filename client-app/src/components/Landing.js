import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useState } from "react";
import Modal from "./Modal";
import { TbUnlink } from "react-icons/tb";


export default function Landing({ setLoginState, isAdmin, setIsAdmin }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    document.querySelectorAll('.tabs-trigger').forEach(button => {
        button.addEventListener('click', () => {
            const tabs = button.parentElement.parentElement;
            tabs.querySelectorAll('.tabs-trigger').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabs.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
            document.getElementById(button.textContent.toLowerCase()).classList.remove('hidden');
        });
    });

    return (

        <>
            <div className="flex flex-col w-full  min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-white">
                <header className="sticky top-0 z-50 px-4 py-2 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-14 items-center justify-between w-full">
                        <a className="flex items-center" href="/">
                            {/* Uncomment and customize the icon if needed */}
                            {/* <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" /> */}
                            <span className="ml-2 text-xl font-bold flex flow-row items-center">
                                CampusC<TbUnlink className='text-[16px]' />rd

                            </span>
                        </a>

                        <div className="w-fit ">
                            <button onClick={openModal} className="bg-purple-600 text-white font-[400] text-[16px] py-1 px-4 rounded-lg shadow hover:opacity-[80%] transition duration-200">
                                Join Now
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1">
                    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                        <div className="container px-4 md:px-6">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                        Connect, Collaborate, Thrive
                                    </h1>
                                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                        Join CampusCord and unlock a world of opportunities. Connect with peers, discover events, and access resources all in one place.
                                    </p>
                                </div>
                                <div className="space-x-4">
                                    <button onClick={openModal} className="bg-purple-600 text-white font-medium text-[16px] py-2 px-4 rounded-lg shadow hover:opacity-80 transition duration-200">
                                        Join Now
                                    </button>
                                    <button className="text-white font-medium text-[16px] py-2 px-4 rounded-lg  transition duration-200">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
                        <div className="container px-4 md:px-6">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Discover What's Happening
                            </h2>
                            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Card: Trending Events */}
                                <div className="card transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                                    <div className="card-header p-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                                        <h3 className="card-title text-lg font-semibold">Trending Events</h3>
                                        <p className="card-description text-gray-200">
                                            Don't miss out on the hottest campus events
                                        </p>
                                    </div>
                                    <div className="card-content p-6">
                                        <ul className="space-y-2">
                                            {["Annual Tech Fest", "Cultural Night", "Career Fair 2024"].map(event => (
                                                <li key={event} className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4 text-purple-600" />
                                                    <span className="text-gray-800 dark:text-gray-200">{event}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>


                                {/* Card: Popular Groups */}
                                <div className="card transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                                    <div className="card-header p-6 bg-gradient-to-r from-green-400 to-green-500 text-white">
                                        <h3 className="card-title text-lg font-semibold">Popular Groups</h3>
                                        <p className="card-description text-gray-200">
                                            Connect with like-minded peers
                                        </p>
                                    </div>
                                    <div className="card-content p-6">
                                        <ul className="space-y-2">
                                            {["Coding Club", "Environmental Society", "Debate Team"].map(group => (
                                                <li key={group} className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4 text-green-600" />
                                                    <span className="text-gray-800 dark:text-gray-200">{group}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Card: Latest Resources */}
                                <div className="card transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                                    <div className="card-header p-6 bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                                        <h3 className="card-title text-lg font-semibold">Latest Resources</h3>
                                        <p className="card-description text-gray-200">
                                            Access tools for success
                                        </p>
                                    </div>
                                    <div className="card-content p-6">
                                        <ul className="space-y-2">
                                            {["Study Guides", "Scholarship Info", "Career Resources"].map(resource => (
                                                <li key={resource} className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4 text-blue-600" />
                                                    <span className="text-gray-800 dark:text-gray-200">{resource}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>


                    <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Personal Dashboard</h2>
        <div className="mt-8">
            <div className="w-full">
                <div className="tabs-list flex border-b border-gray-300">
                    {["Schedule", "Messages", "Notifications"].map(tab => (
                        <button
                            key={tab}
                            className="tabs-trigger px-4 py-2 text-gray-700 transition-colors duration-200 border-b-2 border-transparent hover:border-purple-600 focus:border-purple-600 focus:outline-none"
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="tabs-content mt-4">
                    {/* Schedule Tab Content */}
                    <div className="tab-panel" id="schedule">
                        <div className="card transition-transform transform hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                            <div className="card-header p-6 bg-gradient-to-r from-purple-400 to-purple-600 text-white">
                                <h3 className="card-title text-lg font-semibold">Upcoming Events</h3>
                                <p className="card-description text-gray-200">Your personalized schedule</p>
                            </div>
                            <div className="card-content p-6">
                                <ul className="space-y-2">
                                    {[
                                        { name: "Group Project Meeting", time: "Today, 3:00 PM" },
                                        { name: "Guest Lecture: AI Ethics", time: "Tomorrow, 10:00 AM" },
                                        { name: "Campus Tour", time: "Friday, 2:00 PM" },
                                    ].map(event => (
                                        <li key={event.name} className="flex items-center justify-between">
                                            <span className="text-gray-800 dark:text-gray-200">{event.name}</span>
                                            <span className="text-sm text-gray-500">{event.time}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Messages Tab Content */}
                    <div className="tab-panel hidden" id="messages">
                        <div className="card transition-transform transform hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                            <div className="card-header p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                                <h3 className="card-title text-lg font-semibold">Recent Messages</h3>
                                <p className="card-description text-gray-200">Stay connected with your peers</p>
                            </div>
                            <div className="card-content p-6">
                                <ul className="space-y-2">
                                    {[
                                        "Sarah: Hey, are we still meeting today?",
                                        "John: Don't forget to submit the assignment!",
                                        "Emily: Thanks for your help yesterday!",
                                    ].map(message => (
                                        <li key={message} className="flex items-center">
                                            <svg className="mr-2 h-4 w-4 text-blue-600" />
                                            <span className="text-gray-800 dark:text-gray-200">{message}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Tab Content */}
                    <div className="tab-panel hidden" id="notifications">
                        <div className="card transition-transform transform hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                            <div className="card-header p-6 bg-gradient-to-r from-green-400 to-green-600 text-white">
                                <h3 className="card-title text-lg font-semibold">Latest Notifications</h3>
                                <p className="card-description text-gray-200">Stay updated with campus activities</p>
                            </div>
                            <div className="card-content p-6">
                                <ul className="space-y-2">
                                    {[
                                        "New event added: Campus Clean-up Drive",
                                        "Reminder: Course registration deadline approaching",
                                        "Your post in Coding Club has 5 new replies",
                                    ].map(notification => (
                                        <li key={notification} className="flex items-center">
                                            <svg className="mr-2 h-4 w-4 text-green-600" />
                                            <span className="text-gray-800 dark:text-gray-200">{notification}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

                </main>

                <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
    <div className="container px-4 md:px-6">
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
                />
                <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200">
                    Subscribe
                </button>
            </div>
        </div>
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