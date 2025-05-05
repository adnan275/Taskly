import { useState, useEffect } from 'react';
import CalendarApp from './Components/CalendarApp';
import './Components/CalendarApp.css';
import Image from './assets/image.png';
import Logo from './assets/Logo.png';
import TodayTasks from './Components/TodayTasks';
import { TaskProvider } from './TaskContext.jsx';
import { CalendarProvider } from './Components/CalendarContext.jsx';
import PendingTasks from './Components/PendingTasks'; 
import AboutPage from './Components/About'; 

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'featured';
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <TaskProvider>
      <CalendarProvider>
        <div className={`app-container ${isMobile ? 'mobile' : ''}`}>
          <nav className="navbar">
            <div className="navbar-brand">
              <img src={Logo} alt="Calendar Logo" className="logo" />
              <span>Taskly</span>
            </div>
            
            <div className="navbar-links">
              <button 
                className={`nav-link ${activeTab === 'today' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('today');
                  localStorage.setItem('activeTab', 'today');
                }}
              >
                Today's Tasks
              </button>
              <button 
                className={`nav-link ${activeTab === 'featured' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('featured');
                  localStorage.setItem('activeTab', 'featured');
                }}
              >
                Future Tasks
              </button>
              <button 
                className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('pending');
                  localStorage.setItem('activeTab', 'pending');
                }}
              >
                Pending
              </button>
              <button 
                className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('about');
                  localStorage.setItem('activeTab', 'about');
                }}
              >
                About
              </button>
            </div>
            
            <div className="profile-section">
              <img 
                src={Image} 
                alt="Profile" 
                className="profile-pic" 
              />
            </div>
          </nav>

          <main className="main-content">
            {activeTab === 'today' && <TodayTasks />}
            {activeTab === 'featured' && <CalendarApp />}
            {activeTab === 'pending' && <PendingTasks />}
            {activeTab === 'about' && <AboutPage />}
          </main>
        </div>
      </CalendarProvider>
    </TaskProvider>
  );
};


export default App;