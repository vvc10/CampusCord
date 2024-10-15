import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useState } from "react";
import Modal from "./Modal";

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
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-14 items-center">
                        <a className="flex items-center justify-center" href='/'>
                            {/* <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" /> */}
                            <span className="ml-2 text-xl font-bold">CampusCord</span>
                        </a>
                        {/* <nav className="ml-auto flex gap-4 sm:gap-6">
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                            Home
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                            Events
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                            Groups
                        </Link>
                        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                            Resources
                        </Link>
                    </nav> */}
                    </div>
                </header>
                <main className="flex-1">
                    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                        <div className="container px-4 md:px-6">
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                        Connect, Collaborate, Thrive
                                    </h1>
                                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                        Join CampusCord and unlock a world of opportunities. Connect with peers, discover events, and access
                                        resources all in one place.
                                    </p>
                                </div>
                                <div className="space-x-4">
                                    <button className="bg-purple-600 text-white hover:bg-purple-700"
                                        onClick={openModal}>

                                        Join Now

                                    </button>
                                    <button variant="outline">Learn More</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
                        <div className="container px-4 md:px-6">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Discover What's Happening</h2>
                            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <div class="card transition hover-shadow-lg">
                                    <div class="card-header">
                                        <h3 class="card-title">Trending Events</h3>
                                        <p class="card-description">Don't miss out on the hottest campus events</p>
                                    </div>
                                    <div class="card-content">
                                        <ul class="space-y-2">
                                            <li class="flex items-center">
                                                <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                <span>Annual Tech Fest</span>
                                            </li>
                                            <li class="flex items-center">
                                                <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                <span>Cultural Night</span>
                                            </li>
                                            <li class="flex items-center">
                                                <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                <span>Career Fair 2024</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="card transition hover-shadow-lg">
                                    <div class="card-header">
                                        <h3 class="card-title">Popular Groups</h3>
                                        <p class="card-description">Connect with like-minded peers</p>
                                    </div>
                                    <div class="card-content">
                                        <ul class="space-y-2">
                                            <li class="flex items-center">
                                                <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                <span>Coding Club</span>
                                            </li>
                                            <li class="flex items-center">
                                                <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                <span>Environmental Society</span>
                                            </li>
                                            <li class="flex items-center">
                                                <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                <span>Debate Team</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="card transition hover-shadow-lg">
                                    <div class="card-header">
                                        <h3 class="card-title">Latest Resources</h3>
                                        <p class="card-description">Access tools for success</p>
                                    </div>
                                    <div class="card-content">
                                        <ul class="space-y-2">
                                            <li class="flex items-center">
                                                <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                <span>Study Guides</span>
                                            </li>
                                            <li class="flex items-center">
                                                <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                <span>Scholarship Info</span>
                                            </li>
                                            <li class="flex items-center">
                                                <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                <span>Career Resources</span>
                                            </li>
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
                                <div class="w-full">
                                    <div class="tabs-list flex border-b border-gray-200">
                                        <button class="tabs-trigger px-4 py-2 text-gray-700 border-b-2 border-transparent hover:border-purple-600 focus:border-purple-600">
                                            Schedule
                                        </button>
                                        <button class="tabs-trigger px-4 py-2 text-gray-700 border-b-2 border-transparent hover:border-purple-600 focus:border-purple-600">
                                            Messages
                                        </button>
                                        <button class="tabs-trigger px-4 py-2 text-gray-700 border-b-2 border-transparent hover:border-purple-600 focus:border-purple-600">
                                            Notifications
                                        </button>
                                    </div>

                                    <div class="tabs-content mt-4">
                                        {/* <!-- Schedule Tab Content --> */}
                                        <div class="tab-panel" id="schedule">
                                            <div class="card transition hover:shadow-lg">
                                                <div class="card-header">
                                                    <h3 class="card-title">Upcoming Events</h3>
                                                    <p class="card-description">Your personalized schedule</p>
                                                </div>
                                                <div class="card-content">
                                                    <ul class="space-y-2">
                                                        <li class="flex items-center justify-between">
                                                            <span>Group Project Meeting</span>
                                                            <span class="text-sm text-gray-500">Today, 3:00 PM</span>
                                                        </li>
                                                        <li class="flex items-center justify-between">
                                                            <span>Guest Lecture: AI Ethics</span>
                                                            <span class="text-sm text-gray-500">Tomorrow, 10:00 AM</span>
                                                        </li>
                                                        <li class="flex items-center justify-between">
                                                            <span>Campus Tour</span>
                                                            <span class="text-sm text-gray-500">Friday, 2:00 PM</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Messages Tab Content --> */}
                                        <div class="tab-panel hidden" id="messages">
                                            <div class="card transition hover:shadow-lg">
                                                <div class="card-header">
                                                    <h3 class="card-title">Recent Messages</h3>
                                                    <p class="card-description">Stay connected with your peers</p>
                                                </div>
                                                <div class="card-content">
                                                    <ul class="space-y-2">
                                                        <li class="flex items-center">
                                                            <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                            <span>Sarah: Hey, are we still meeting today?</span>
                                                        </li>
                                                        <li class="flex items-center">
                                                            <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                            <span>John: Don't forget to submit the assignment!</span>
                                                        </li>
                                                        <li class="flex items-center">
                                                            <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                            <span>Emily: Thanks for your help yesterday!</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Notifications Tab Content --> */}
                                        <div class="tab-panel hidden" id="notifications">
                                            <div class="card transition hover:shadow-lg">
                                                <div class="card-header">
                                                    <h3 class="card-title">Latest Notifications</h3>
                                                    <p class="card-description">Stay updated with campus activities</p>
                                                </div>
                                                <div class="card-content">
                                                    <ul class="space-y-2">
                                                        <li class="flex items-center">
                                                            <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                            <span>New event added: Campus Clean-up Drive</span>
                                                        </li>
                                                        <li class="flex items-center">
                                                            <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                            <span>Reminder: Course registration deadline approaching</span>
                                                        </li>
                                                        <li class="flex items-center">
                                                            <svg class="mr-2 h-4 w-4 text-purple-600"> </svg>
                                                            <span>Your post in Coding Club has 5 new replies</span>
                                                        </li>
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
                                {/* <Sparkles className="h-6 w-6 text-purple-600" /> */}
                                <span className="text-lg font-bold">CampusCord</span>
                            </div>
                            <nav className="flex gap-4 sm:gap-6">
                                {/* <Link className="text-sm hover:underline underline-offset-4" href="#">
                                Terms of Service
                            </Link>
                            <Link className="text-sm hover:underline underline-offset-4" href="#">
                                Privacy Policy
                            </Link>
                            <Link className="text-sm hover:underline underline-offset-4" href="#">
                                Contact Us
                            </Link> */}
                            </nav>
                            <div className="flex items-center">
                                <input className="mr-2" placeholder="Enter your email" type="email" />
                                <button>Subscribe</button>
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