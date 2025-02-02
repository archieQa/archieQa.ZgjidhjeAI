// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import ChatButton from "./components/layout/ChatButton";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import FindTutorPage from "./pages/tutoring/FindTutorPage";
import LearningPathPage from "./pages/learning/LearningPathPage";
import CalculatorPage from "./pages/calculator/CalculatorPage";
import AnswerPage from "./pages/answer/AnswerPage";
import SavedAnswerDetailPage from "./components/answer/SavedAnswerDetailPage";

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [showNavbarInput, setShowNavbarInput] = useState(false);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	useEffect(() => {
		const heroQuestionInput = document.getElementById("question-input");

		if (heroQuestionInput) {
			const observer = new IntersectionObserver(
				([entry]) => {
					// Show navbar input when hero question input is not visible
					setShowNavbarInput(!entry.isIntersecting);
				},
				{ threshold: 0 }
			);

			observer.observe(heroQuestionInput);

			return () => {
				observer.unobserve(heroQuestionInput);
			};
		}
	}, []);

	return (
		<Router>
			<div className="flex">
				<Sidebar
					isOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
					className="hidden md:block"
				/>
				<div
					className={`flex flex-col flex-grow transition-all duration-500 ease-in-out
            ${isSidebarOpen ? "md:ml-52 lg:ml-52" : "ml-0"}
          `}
				>
					<Navbar
						isSidebarOpen={isSidebarOpen}
						toggleSidebar={toggleSidebar}
						showInput={showNavbarInput}
					/>
					<main
						className={`bg-gray-50 flex-grow p-0 mt-16 transition-all duration-500 ease-in-out`}
					>
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route path="/dashboard" element={<DashboardPage />} />
							<Route path="/tutors" element={<FindTutorPage />} />
							<Route path="/learning-paths" element={<LearningPathPage />} />
							<Route path="/calculator" element={<CalculatorPage />} />
							<Route path="/answer" element={<AnswerPage />} />
							<Route
								path="/answer-detail"
								element={<SavedAnswerDetailPage />}
							/>
						</Routes>
					</main>
					<Footer />
					<div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
						<ChatButton />
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
