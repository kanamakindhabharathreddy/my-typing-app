import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, BookOpen, Target, Zap, User, Crown, Medal, Award } from 'lucide-react'; // Trophy icon removed

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
  const [isStarted, setIsStarted] = useState(false);

  // User scores (persisted locally for best score)
  const [userScores, setUserScores] = useState([]);
  // showLeaderboard state removed
  // State to hold the best score for the current session (or overall from local storage)
  const [bestScore, setBestScore] = useState({ wpm: 0, accuracy: 0 });

  const inputRef = useRef(null);

  // Load scores from local storage on component mount
  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('typingAppScores') || '[]');
    setUserScores(savedScores);
  }, []);

  // Save scores to local storage whenever userScores changes
  useEffect(() => {
    localStorage.setItem('typingAppScores', JSON.stringify(userScores));
  }, [userScores]);

  // Effect to update best score when userScores changes
  // This will now calculate the overall best score from all saved scores
  useEffect(() => {
    const best = getUserBestScore(); // Call without userId as there's no current user
    setBestScore(best);
  }, [userScores]);


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
      // Automatically save score if time runs out
      saveScore(calculateWPM(), calculateAccuracy());
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

  // Save score function - now saves under a generic 'guest' user
  const saveScore = (finalWpm, finalAccuracy) => {
    const newScore = {
      id: Date.now(),
      userId: 'guest', // Hardcoded ID for guest user
      username: 'Guest', // Hardcoded username for guest user
      wpm: finalWpm,
      accuracy: finalAccuracy,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    const updatedScores = [...userScores, newScore];
    setUserScores(updatedScores);
  };

  // Function to start the test
  const startTest = () => {
    setIsStarted(true);
    setIsActive(true);
    setTimeLeft(60); // Ensure timer starts fresh
    setUserInput(''); // Clear input on start
    setIsCompleted(false); // Reset completion status
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setTotalChars(0);
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]); // Get new text
    inputRef.current?.focus(); // Focus input field
  };

  // Function to submit the test early
  const submitTest = () => {
    setIsActive(false);
    setIsCompleted(true);
    setTimeLeft(0); // Stop the timer immediately

    const finalWpm = calculateWPM();
    const finalAccuracy = calculateAccuracy();

    setWpm(finalWpm);
    setAccuracy(finalAccuracy);
    saveScore(finalWpm, finalAccuracy);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    // Only start timer if test is active and user starts typing
    if (isStarted && !isActive && value.length > 0) {
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

    // Update WPM and Accuracy as user types
    setAccuracy(calculateAccuracy());
    setWpm(calculateWPM());

    // If user types the entire text correctly
    if (value === text) {
      setIsActive(false);
      setIsCompleted(true);
      setTimeLeft(0); // Ensure timer stops
      saveScore(calculateWPM(), calculateAccuracy());
    }
  };

  const resetTest = () => {
    setUserInput('');
    setIsActive(false);
    setTimeLeft(60);
    setIsCompleted(false);
    setIsStarted(false); // Reset started state, waiting for manual start
    setWpm(0);
    setAccuracy(100);
    setCurrentWordIndex(0);
    setCorrectChars(0);
    setTotalChars(0);
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    inputRef.current?.blur(); // Blur input until Start is clicked
  };

  // getUserBestScore now calculates the overall best score from all userScores
  const getUserBestScore = () => {
    return userScores.reduce((best, current) => {
      return current.wpm > best.wpm ? current : best;
    }, { wpm: 0, accuracy: 0 });
  };

  // getLeaderboard function removed as it's no longer needed for display

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
        {/* Header with user info (simplified for guest) */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Typing Speed Test</h1>
            <p className="text-gray-600">Test your typing speed and accuracy</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-semibold text-gray-800">Welcome, Guest!</div>
              {/* Display overall best score from local storage */}
              <div className="text-sm text-gray-600">
                Best: {bestScore.wpm} WPM
              </div>
            </div>
          </div>
        </div>

        {/* Navigation tabs (Leaderboard button removed) */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => { setShowTips(false); }} // showLeaderboard state removed
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !showTips ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Speed Test
          </button>
          <button
            onClick={() => { setShowTips(true); }} // showLeaderboard state removed
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              showTips ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tips & Guide
          </button>
          {/* Leaderboard button removed */}
        </div>

        {/* Conditional rendering adjusted: now only checks for showTips */}
        {showTips ? (
          <div className="space-y-6">
            {/* Tips content */}
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
                placeholder={isStarted ? "Start typing..." : "Click Start to begin"}
                disabled={!isStarted || isCompleted}
                value={userInput}
                onChange={handleInputChange}
                autoFocus
              />
              {/* Start and Submit Buttons */}
              <div className="flex gap-4 mt-4 justify-center">
                {!isStarted && (
                  <button
                    onClick={startTest}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
                  >
                    <Play size={20} className="inline-block mr-2" /> Start
                  </button>
                )}
                {isStarted && !isCompleted && (
                  <button
                    onClick={submitTest}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
                  >
                    <Zap size={20} className="inline-block mr-2" /> Submit
                  </button>
                )}
              </div>
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
                <p className="text-md mt-2">Your score has been saved locally.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingApp;
