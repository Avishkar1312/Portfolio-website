import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Code, Gamepad2, Zap, X } from 'lucide-react';

const RoboticArmGame = () => {
  const canvasRef = useRef(null);
  const [angle1, setAngle1] = useState(45);
  const [angle2, setAngle2] = useState(45);
  const length1 = 100;
  const length2 = 80;
  const center = { x: 200, y: 200 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, 400, 400);

    // Calculate joint positions
    const rad1 = (Math.PI / 180) * angle1;
    const jointX = center.x + length1 * Math.cos(rad1);
    const jointY = center.y + length1 * Math.sin(rad1);

    const rad2 = (Math.PI / 180) * (angle1 + angle2);
    const endX = jointX + length2 * Math.cos(rad2);
    const endY = jointY + length2 * Math.sin(rad2);

    // Draw base
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(center.x, center.y, 6, 0, Math.PI * 2);
    ctx.fill();

    // Draw first arm
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(jointX, jointY);
    ctx.stroke();

    // Draw joint
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(jointX, jointY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw second arm
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(jointX, jointY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Draw end effector
    ctx.fillStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.arc(endX, endY, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [angle1, angle2]);

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-gray-500 rounded-lg bg-gray-800"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Base Joint Angle</label>
          <input
            type="range"
            min={0}
            max={180}
            value={angle1}
            onChange={(e) => setAngle1(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Elbow Joint Angle</label>
          <input
            type="range"
            min={-90}
            max={90}
            value={angle2}
            onChange={(e) => setAngle2(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // idle, playing, paused, gameOver
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const gameLoopRef = useRef(null);

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    ctx.fillStyle = '#10b981';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
    });

    // Draw food
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
  }, [snake, food]);

  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
      y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
    };
    setFood(newFood);
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameState('idle');
    generateFood();
  };

  const gameLoop = () => {
    setSnake(currentSnake => {
      if (direction.x === 0 && direction.y === 0) return currentSnake;

      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || 
          head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
        setGameState('gameOver');
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('gameOver');
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, 150);
    } else {
      clearInterval(gameLoopRef.current);
    }

    return () => clearInterval(gameLoopRef.current);
  }, [gameState, direction, food]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameState]);

  const startGame = () => {
    if (gameState === 'idle' || gameState === 'gameOver') {
      resetGame();
      setDirection({ x: 1, y: 0 });
    }
    setGameState('playing');
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="text-lg font-bold text-gray-900 dark:text-white">
          Score: {score}
        </div>
        <div className="flex space-x-2">
          {gameState === 'playing' ? (
            <button
              onClick={pauseGame}
              className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <Pause size={16} />
            </button>
          ) : (
            <button
              onClick={startGame}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Play size={16} />
            </button>
          )}
          <button
            onClick={resetGame}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-800"
        />
        
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
            <div className="text-center text-white">
              <div className="text-2xl font-bold mb-2">Game Over!</div>
              <div className="text-lg mb-4">Final Score: {score}</div>
              <button
                onClick={startGame}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
            <div className="text-center text-white">
              <div className="text-2xl font-bold mb-4">Paused</div>
              <button
                onClick={startGame}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Resume
              </button>
            </div>
          </div>
        )}

        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
            <div className="text-center text-white">
              <div className="text-xl font-bold mb-2">Snake Game</div>
              <div className="text-sm mb-4">Use arrow keys to control</div>
              <button
                onClick={startGame}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CodeEditor = () => {
  const [code, setCode] = useState(`// Interactive JavaScript Playground
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Try changing the number below
const result = fibonacci(8);
console.log('Fibonacci result:', result);

// Create a simple animation
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
let colorIndex = 0;

setInterval(() => {
  document.body.style.background = colors[colorIndex % colors.length];
  colorIndex++;
}, 1000);`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    try {
      // Create a safe execution environment
      const originalLog = console.log;
      let capturedOutput = '';
      
      console.log = (...args) => {
        capturedOutput += args.join(' ') + '\n';
      };

      // Execute the code
      eval(code);
      
      setTimeout(() => {
        console.log = originalLog;
        setOutput(capturedOutput || 'Code executed successfully!');
        setIsRunning(false);
      }, 100);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">Code Editor</h4>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Play size={16} className="mr-1" />
              {isRunning ? 'Running...' : 'Run'}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-3 bg-gray-900 text-green-400 font-mono text-sm rounded-lg border border-gray-600 resize-none"
            spellCheck="false"
          />
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Output</h4>
          <div className="w-full h-64 p-3 bg-gray-800 text-gray-300 font-mono text-sm rounded-lg border border-gray-600 overflow-y-auto whitespace-pre-wrap">
            {output || 'Click "Run" to execute your code...'}
          </div>
        </div>
      </div>
    </div>
  );
};

const ParticleAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(31, 41, 55, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
            ctx.stroke();
          }
        });
      });

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      animate();
    } else {
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Particle Animation</h4>
        <button
          onClick={toggleAnimation}
          className={`flex items-center px-3 py-1 rounded-lg transition-colors ${
            isPlaying 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isPlaying ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-800"
      />
    </div>
  );
};

const ProjectPlayground = ({ isOpen, onClose }) => {
  const [activeDemo, setActiveDemo] = useState('snake');

  const demos = {
    snake: {
      title: 'Snake Game',
      icon: Gamepad2,
      component: SnakeGame,
      description: 'Classic snake game built with HTML5 Canvas'
    },
    code: {
      title: 'Code Editor',
      icon: Code,
      component: CodeEditor,
      description: 'Interactive JavaScript playground'
    },
    particles: {
      title: 'Particle System',
      icon: Zap,
      component: ParticleAnimation,
      description: 'Animated particle system with physics'
    },
    roboticarm: {
      title: 'Robotic Arm Game',
      icon: Zap, // or use a custom SVG for a robotic arm
      component: RoboticArmGame,
      description: 'Control a robotic arm with keyboard or sliders'
    },
    
  };

  if (!isOpen) return null;

  const ActiveComponent = demos[activeDemo].component;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Project Playground</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex h-[600px]">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Interactive Demos</h3>
              <div className="space-y-2">
                {Object.entries(demos).map(([key, demo]) => {
                  const IconComponent = demo.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveDemo(key)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeDemo === key
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <IconComponent size={18} className="mr-2" />
                        <span className="font-medium">{demo.title}</span>
                      </div>
                      <p className="text-xs opacity-80">{demo.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {demos[activeDemo].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {demos[activeDemo].description}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <ActiveComponent />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectPlayground;