import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, BookOpen, Target, Zap, User, Trophy, LogOut, Crown, Medal, Award } from 'lucide-react';

// Login Modal Component (moved outside TypingApp and manages its own form state)
const LoginModal = ({ showLogin, setShowLogin, onLoginSubmit, loginError, setLoginError, setShowRegister, setShowForgotPasswordModal }) => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    setLoginError(''); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit(loginForm.username, loginForm.password);
  };

  // Effect to reset form when modal is shown/hidden
  useEffect(() => {
    if (showLogin) {
      setLoginForm({ username: '', password: '' });
      setLoginError(''); // Clear error when modal opens
    }
  }, [showLogin]); // Only run when showLogin changes

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{loginError}</span>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={loginForm.username}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              required
              autoFocus // Ensures focus when modal opens
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => { setShowLogin(false); setLoginError(''); }} // Clear error when closing modal
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => { setShowLogin(false); setLoginError(''); setShowRegister(true); }} // Clear login error when switching to register
            className="text-blue-600 hover:underline"
          >
            Register here
          </button>
        </p>
        <p className="text-center mt-2 text-gray-600">
          <button
            onClick={() => { setShowLogin(false); setLoginError(''); setShowForgotPasswordModal(true); }}
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </p>
      </div>
    </div>
  );
};

// Register Modal Component (moved outside TypingApp and manages its own form state)
const RegisterModal = ({ showRegister, setShowRegister, onRegisterSubmit, registerError, setRegisterError, setShowLogin }) => {
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    setRegisterError(''); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit(registerForm.username, registerForm.email, registerForm.password);
  };

  // Effect to reset form when modal is shown/hidden
  useEffect(() => {
    if (showRegister) {
      setRegisterForm({ username: '', email: '', password: '' });
      setRegisterError(''); // Clear error when modal opens
    }
  }, [showRegister]); // Only run when showRegister changes

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {registerError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{registerError}</span>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={registerForm.username}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              required
              autoFocus // Ensures focus when modal opens
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={registerForm.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={registerForm.password}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => { setShowRegister(false); setRegisterError(''); }} // Clear error when closing modal
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => { setShowRegister(false); setRegisterError(''); setShowLogin(true); }} // Clear register error when switching to login
            className="text-blue-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

// Forgot Password Modal Component
const ForgotPasswordModal = ({ showForgotPasswordModal, setShowForgotPasswordModal, onForgotPasswordSubmit, forgotPasswordMessage, setForgotPasswordMessage }) => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setForgotPasswordMessage(''); // Clear message on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onForgotPasswordSubmit(email);
  };

  useEffect(() => {
    if (showForgotPasswordModal) {
      setEmail(''); // Clear email when modal opens
      setForgotPasswordMessage(''); // Clear message when modal opens
    }
  }, [showForgotPasswordModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          {forgotPasswordMessage && (
            <div className={`px-4 py-3 rounded relative mb-4 ${forgotPasswordMessage.includes('exists') || forgotPasswordMessage.includes('sent') ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`} role="alert">
              <span className="block sm:inline">{forgotPasswordMessage}</span>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Enter your registered Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              required
              autoFocus
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Password
            </button>
            <button
              type="button"
              onClick={() => { setShowForgotPasswordModal(false); setForgotPasswordMessage(''); }}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const TypingApp = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  // Authentication and user data
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // New state for forgot password modal
  const [users, setUsers] = useState([]);
  const [userScores, setUserScores] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // State for displaying login/register errors
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState(''); // New state for forgot password messages


  const inputRef = useRef(null);

  // Load data from memory on component mount
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('typingAppUsers') || '[]');
    const savedScores = JSON.parse(localStorage.getItem('typingAppScores') || '[]');
    const savedCurrentUser = JSON.parse(localStorage.getItem('typingAppCurrentUser') || 'null');

    setUsers(savedUsers);
    setUserScores(savedScores);
    setCurrentUser(savedCurrentUser);
  }, []);

  // Save data to memory whenever it changes
  useEffect(() => {
    localStorage.setItem('typingAppUsers', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('typingAppScores', JSON.stringify(userScores));
  }, [userScores]);

  useEffect(() => {
    localStorage.setItem('typingAppCurrentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const typingTips = [
    {
      title: "Proper Posture",
      icon: <Target className="w-5 h-5" />,
      description: "Sit up straight with feet flat on floor. Keep wrists floating above keyboard, not resting on desk.",
      details: "Your back should be straight, shoulders relaxed, and elbows at 90-degree angles. This prevents strain and improves accuracy."
    },
    {
      title: "Home Row Position",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Left fingers on ASDF, right fingers on JKL;. This is your base position for all typing.",
      details: "Your index fingers should rest on F and J keys (they have small bumps). Return to this position after each keystroke."
    },
    {
      title: "Touch Typing",
      icon: <Zap className="w-5 h-5" />,
      description: "Don't look at the keyboard! Use muscle memory to find keys. Start slow and build speed gradually.",
      details: "Each finger is responsible for specific keys. Practice the finger-key assignments until they become automatic."
    },
    {
      title: "Rhythm & Flow",
      icon: <Target className="w-5 h-5" />,
      description: "Type at a steady pace rather than bursts. Consistent rhythm is better than sporadic speed.",
      details: "Focus on smooth, even keystrokes. Don't rush - speed comes naturally with practice and accuracy."
    },
    {
      title: "Accuracy First",
      icon: <BookOpen className="w-5 h-5" />,
      description: "It's better to type slowly and accurately than fast with errors. Speed follows accuracy.",
      details: "Every mistake you make costs time to correct. Build muscle memory for correct movements first."
    },
    {
      title: "Use All Fingers",
      icon: <Zap className="w-5 h-5" />,
      description: "Don't rely on just index fingers. Train all 10 fingers to work together efficiently.",
      details: "Proper finger placement: Pinkies for Q/A/Z and P/;/? keys, ring fingers for W/S/X and O/L/. keys, etc."
    }
  ];

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once, making it perfect for typing practice.",
    "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future.",
    "Practice makes perfect when it comes to typing. The more you type, the faster and more accurate you become. Consistency is key to improvement.",
    "In the digital age, typing skills are essential for productivity. Whether you're writing emails, coding, or creating content, speed and accuracy matter.",
    "The art of touch typing involves using all ten fingers without looking at the keyboard. This skill can significantly increase your typing speed and efficiency."
  ];

  useEffect(() => {
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const calculateWPM = () => {
    const timeElapsed = 60 - timeLeft;
    const wordsTyped = correctChars / 5;
    return timeElapsed > 0 ? Math.round((wordsTyped / timeElapsed) * 60) : 0;
  };

  const calculateAccuracy = () => {
    return totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
  };

  const saveScore = (finalWpm, finalAccuracy) => {
    if (!currentUser) return;

    const newScore = {
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      wpm: finalWpm,
      accuracy: finalAccuracy,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    const updatedScores = [...userScores, newScore];
    setUserScores(updatedScores);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    if (!isActive && value.length > 0) {
      setIsActive(true);
    }

    let correct = 0;
    let total = value.length;

    for (let i = 0; i < value.length; i++) {
      if (i < text.length && value[i] === text[i]) {
        correct++;
      }
    }
    setCorrectChars(correct);
    setTotalChars(total);

    const currentAccuracy = calculateAccuracy();
    const currentWpm = calculateWPM();

    setAccuracy(currentAccuracy);
    setWpm(currentWpm);

    if (value === text) {
      setIsActive(false);
      setIsCompleted(true);
      saveScore(currentWpm, currentAccuracy);
    }
  };

  const resetTest = () => {
    setUserInput('');
    setIsActive(false);
    setTimeLeft(60);
    setIsCompleted(false);
    setWpm(0);
    setAccuracy(100);
    setCurrentWordIndex(0);
    setCorrectChars(0);
    setTotalChars(0);
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    inputRef.current?.focus();
  };

  // Handles user login - now receives username and password from LoginModal
  const handleLoginSubmit = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setShowLogin(false);
      setLoginError(''); // Clear any previous login errors
    } else {
      setLoginError('Invalid username or password.'); // Set error message for display in modal
    }
  };

  // Handles user registration - now receives username, email, and password from RegisterModal
  const handleRegisterSubmit = (username, email, password) => {
    if (users.find(u => u.username === username)) {
      setRegisterError('Username already exists. Please choose a different username.');
      return;
    }
    if (users.find(u => u.email === email)) {
      setRegisterError('Email already exists. Please use a different email or login.');
      return;
    }

    const newUser = {
      id: Date.now(),
      username: username,
      email: email,
      password: password,
      joinDate: new Date().toISOString()
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setShowRegister(false);
    setRegisterError(''); // Clear any previous registration errors
  };

  // Handles forgot password submit
  const handleForgotPasswordSubmit = (email) => {
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      // In a real application, you would send a password reset email here.
      // For this local storage based app, we'll just simulate it.
      setForgotPasswordMessage('If an account with that email exists, a password reset link has been sent.');
      console.log(`Simulated password reset for email: ${email}`);
      // Optionally, you could change the password to a default one for testing:
      // const updatedUsers = users.map(user =>
      //   user.email === email ? { ...user, password: 'newpassword123' } : user
      // );
      // setUsers(updatedUsers);
    } else {
      setForgotPasswordMessage('No account found with that email address.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    resetTest();
  };

  const getUserBestScore = (userId) => {
    const userScoresList = userScores.filter(score => score.userId === userId);
    return userScoresList.reduce((best, current) => {
      return current.wpm > best.wpm ? current : best;
    }, { wpm: 0, accuracy: 0 });
  };

  const getLeaderboard = () => {
    const userBestScores = users.map(user => {
      const bestScore = getUserBestScore(user.id);
      return {
        username: user.username,
        wpm: bestScore.wpm,
        accuracy: bestScore.accuracy,
        userId: user.id
      };
    }).filter(score => score.wpm > 0)
      .sort((a, b) => b.wpm - a.wpm)
      .slice(0, 10);

    return userBestScores;
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'text-gray-600';

      if (index < userInput.length) {
        className = userInput[index] === char ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
      } else if (index === userInput.length) {
        className = 'text-gray-800 bg-blue-200 animate-pulse';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header with user info */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Typing Speed Test</h1>
            <p className="text-gray-600">Test your typing speed and accuracy</p>
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-800">Welcome, {currentUser.username}!</div>
                  <div className="text-sm text-gray-600">
                    Best: {getUserBestScore(currentUser.id).wpm} WPM
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <User size={16} />
                  Login
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => { setShowTips(false); setShowLeaderboard(false); }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !showTips && !showLeaderboard ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Speed Test
          </button>
          <button
            onClick={() => { setShowTips(true); setShowLeaderboard(false); }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              showTips ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tips & Guide
          </button>
          <button
            onClick={() => { setShowLeaderboard(true); setShowTips(false); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
              showLeaderboard ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Trophy size={16} />
            Leaderboard
          </button>
        </div>

        {/* Leaderboard Section */}
        {showLeaderboard ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">🏆 Leaderboard</h2>
              <p className="text-gray-600">Top 10 fastest typists</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
              {getLeaderboard().length > 0 ? (
                <div className="space-y-4">
                  {getLeaderboard().map((user, index) => (
                    <div key={user.userId} className={`flex items-center gap-4 p-4 rounded-lg ${
                      index === 0 ? 'bg-yellow-100 border-2 border-yellow-300' :
                        index === 1 ? 'bg-gray-100 border-2 border-gray-300' :
                          index === 2 ? 'bg-orange-100 border-2 border-orange-300' :
                            'bg-white border border-gray-200'
                      }`}>
                      <div className="text-2xl">
                        {index === 0 ? <Crown className="text-yellow-600" size={32} /> :
                          index === 1 ? <Medal className="text-gray-600" size={32} /> :
                            index === 2 ? <Award className="text-orange-600" size={32} /> :
                              <span className="font-bold text-gray-600 text-xl">#{index + 1}</span>}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{user.username}</div>
                        <div className="text-sm text-gray-600">{user.wpm} WPM • {user.accuracy}% accuracy</div>
                      </div>
                      {currentUser && user.userId === currentUser.id && (
                        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          You
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Trophy size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No scores yet. Be the first to complete a test!</p>
                </div>
              )}
            </div>
          </div>
        ) : showTips ? (
          <div className="space-y-6">
            {/* Tips content (keeping existing tips section) */}
            <div className="flex justify-center gap-2 mb-6">
              {typingTips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTip(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTip ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  {typingTips[currentTip].icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{typingTips[currentTip].title}</h3>
              </div>
              <p className="text-lg text-gray-700 mb-4">{typingTips[currentTip].description}</p>
              <p className="text-gray-600">{typingTips[currentTip].details}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentTip(Math.max(0, currentTip - 1))}
                disabled={currentTip === 0}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentTip(Math.min(typingTips.length - 1, currentTip + 1))}
                disabled={currentTip === typingTips.length - 1}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            {/* Visual keyboard layout */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Visual Keyboard & Finger Positions</h3>

              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-center gap-1 mb-1">
                  {[
                    { key: 'Q', color: 'bg-pink-400' },
                    { key: 'W', color: 'bg-red-400' },
                    { key: 'E', color: 'bg-orange-400' },
                    { key: 'R', color: 'bg-yellow-400' },
                    { key: 'T', color: 'bg-yellow-400' },
                    { key: 'Y', color: 'bg-green-400' },
                    { key: 'U', color: 'bg-green-400' },
                    { key: 'I', color: 'bg-blue-400' },
                    { key: 'O', color: 'bg-indigo-400' },
                    { key: 'P', color: 'bg-purple-400' }
                  ].map((item, index) => (
                    <div key={index} className={`${item.color} text-white w-10 h-10 rounded flex items-center justify-center font-bold text-sm shadow-lg`}>
                      {item.key}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-1 mb-1">
                  {[
                    { key: 'A', color: 'bg-pink-400', home: true },
                    { key: 'S', color: 'bg-red-400', home: true },
                    { key: 'D', color: 'bg-orange-400', home: true },
                    { key: 'F', color: 'bg-yellow-400', home: true },
                    { key: 'G', color: 'bg-yellow-400' },
                    { key: 'H', color: 'bg-green-400' },
                    { key: 'J', color: 'bg-green-400', home: true },
                    { key: 'K', color: 'bg-blue-400', home: true },
                    { key: 'L', color: 'bg-indigo-400', home: true },
                    { key: ';', color: 'bg-purple-400', home: true }
                  ].map((item, index) => (
                    <div key={index} className={`${item.color} text-white w-10 h-10 rounded flex items-center justify-center font-bold text-sm shadow-lg relative ${item.home ? 'ring-2 ring-white' : ''}`}>
                      {item.key}
                      {item.home && <div className="absolute bottom-0 w-2 h-1 bg-white rounded-full"></div>}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-1 mb-2">
                  {[
                    { key: 'Z', color: 'bg-pink-400' },
                    { key: 'X', color: 'bg-red-400' },
                    { key: 'C', color: 'bg-orange-400' },
                    { key: 'V', color: 'bg-yellow-400' },
                    { key: 'B', color: 'bg-yellow-400' },
                    { key: 'N', color: 'bg-green-400' },
                    { key: 'M', color: 'bg-green-400' },
                    { key: ',', color: 'bg-blue-400' },
                    { key: '.', color: 'bg-indigo-400' },
                    { key: '/', color: 'bg-purple-400' }
                  ].map((item, index) => (
                    <div key={index} className={`${item.color} text-white w-10 h-10 rounded flex items-center justify-center font-bold text-sm shadow-lg`}>
                      {item.key}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <div className="bg-gray-600 text-white w-64 h-8 rounded flex items-center justify-center font-bold text-sm shadow-lg">
                    SPACE (Both thumbs)
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Left Hand Fingers</h4>
                  <div className="space-y-2">
                    {[
                      { color: 'bg-pink-400', label: 'Pinky (LP)' },
                      { color: 'bg-red-400', label: 'Ring (LR)' },
                      { color: 'bg-orange-400', label: 'Middle (LM)' },
                      { color: 'bg-yellow-400', label: 'Index (LI)' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-4 h-4 ${item.color} rounded`}></div>
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Right Hand Fingers</h4>
                  <div className="space-y-2">
                    {[
                      { color: 'bg-green-400', label: 'Index (RI)' },
                      { color: 'bg-blue-400', label: 'Middle (RM)' },
                      { color: 'bg-indigo-400', label: 'Ring (RR)' },
                      { color: 'bg-purple-400', label: 'Pinky (RP)' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-4 h-4 ${item.color} rounded`}></div>
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-gray-500 text-sm">
                This visual guide helps you understand which finger is responsible for which keys.
                The highlighted keys (F and J) are the home row keys.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Typing test section */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="text-center mb-4">
                <span className="text-5xl font-extrabold text-blue-600">{timeLeft}</span>
                <span className="text-xl text-gray-600">s</span>
              </div>
              <div className="text-area-container mb-6 bg-white p-6 rounded-lg shadow-inner border border-gray-300 min-h-[120px] flex items-center justify-center">
                <p className="text-xl leading-relaxed font-mono tracking-wide">
                  {renderText()}
                </p>
              </div>
              <input
                ref={inputRef}
                type="text"
                className="w-full p-4 rounded-lg border-2 border-blue-400 focus:outline-none focus:border-blue-600 text-lg shadow-md font-mono"
                placeholder={isActive ? "Start typing..." : "Click reset to begin"}
                value={userInput}
                onChange={handleInputChange}
                disabled={isCompleted}
                autoFocus
              />
            </div>

            <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-md border border-gray-200">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-green-600">{wpm}</span>
                <span className="text-lg text-gray-600">WPM</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-purple-600">{accuracy}%</span>
                <span className="text-lg text-gray-600">Accuracy</span>
              </div>
              <button
                onClick={resetTest}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                <RotateCcw size={20} />
                Reset Test
              </button>
            </div>

            {isCompleted && (
              <div className="text-center bg-green-50 p-6 rounded-xl border-2 border-green-300 text-green-800">
                <h3 className="text-2xl font-bold mb-2">Test Completed! 🎉</h3>
                <p className="text-lg">Your final WPM: <span className="font-extrabold text-green-700">{wpm}</span></p>
                <p className="text-lg">Your accuracy: <span className="font-extrabold text-green-700">{accuracy}%</span></p>
                {currentUser && (
                  <p className="text-md mt-2">Your score has been saved. Check the leaderboard!</p>
                )}
                {!currentUser && (
                  <p className="text-md mt-2">Login to save your score and compete on the leaderboard!</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {showLogin && (
        <LoginModal
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          onLoginSubmit={handleLoginSubmit} // New prop name for clarity
          loginError={loginError}
          setLoginError={setLoginError}
          setShowRegister={setShowRegister}
          setShowForgotPasswordModal={setShowForgotPasswordModal} // Pass new prop
        />
      )}
      {showRegister && (
        <RegisterModal
          showRegister={showRegister}
          setShowRegister={setShowRegister}
          onRegisterSubmit={handleRegisterSubmit} // New prop name for clarity
          registerError={registerError}
          setRegisterError={setRegisterError}
          setShowLogin={setShowLogin}
        />
      )}
      {showForgotPasswordModal && (
        <ForgotPasswordModal
          showForgotPasswordModal={showForgotPasswordModal}
          setShowForgotPasswordModal={setShowForgotPasswordModal}
          onForgotPasswordSubmit={handleForgotPasswordSubmit}
          forgotPasswordMessage={forgotPasswordMessage}
          setForgotPasswordMessage={setForgotPasswordMessage}
        />
      )}
    </div>
  );
};

export default TypingApp;
