import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Terminal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to John Doe\'s Terminal Portfolio v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'prompt', content: '' }
  ]);
  const [currentPath, setCurrentPath] = useState('~');
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: {
      description: 'Show available commands',
      action: () => [
        'Available commands:',
        '  whoami       - Display user information',
        '  about        - Show detailed bio',
        '  projects     - List all projects',
        '  skills       - Display technical skills',
        '  education    - Show academic background',
        '  contact      - Get contact information',
        '  social       - Show social media links',
        '  resume       - Download resume',
        '  clear        - Clear terminal',
        '  exit         - Close terminal',
        '  ls           - List directory contents',
        '  cat <file>   - Display file contents',
        '  pwd          - Show current directory'
      ]
    },
    whoami: {
      description: 'Display user information',
      action: () => [
        `${portfolioData.personal.name}`,
        `${portfolioData.personal.title}`,
        `Location: ${portfolioData.personal.location}`,
        `Email: ${portfolioData.personal.email}`
      ]
    },
    about: {
      description: 'Show detailed bio',
      action: () => [
        `About ${portfolioData.personal.name}:`,
        '',
        portfolioData.personal.bio,
        '',
        `"${portfolioData.personal.tagline}"`
      ]
    },
    projects: {
      description: 'List all projects',
      action: () => {
        const projectList = portfolioData.projects.map((project, index) => 
          `${index + 1}. ${project.title} - ${project.description}`
        );
        return ['My Projects:', '', ...projectList, '', 'Use "cat project<number>" for details'];
      }
    },
    skills: {
      description: 'Display technical skills',
      action: () => {
        const skillsList = Object.entries(portfolioData.skills).map(([category, skills]) => 
          `${category}: ${skills.join(', ')}`
        );
        return ['Technical Skills:', '', ...skillsList];
      }
    },
    education: {
      description: 'Show academic background',
      action: () => {
        const eduList = portfolioData.education.map(edu => 
          `${edu.degree} - ${edu.institution} (${edu.year}) ${edu.cgpa ? `CGPA: ${edu.cgpa}` : ''}`
        );
        return ['Education:', '', ...eduList];
      }
    },
    contact: {
      description: 'Get contact information',
      action: () => [
        'Contact Information:',
        '',
        `Email: ${portfolioData.personal.email}`,
        `Phone: ${portfolioData.personal.phone}`,
        `Location: ${portfolioData.personal.location}`,
        '',
        'Feel free to reach out!'
      ]
    },
    social: {
      description: 'Show social media links',
      action: () => [
        'Social Media:',
        '',
        `GitHub: ${portfolioData.social.github}`,
        `LinkedIn: ${portfolioData.social.linkedin}`,
        `Twitter: ${portfolioData.social.twitter}`,
        `Email: ${portfolioData.social.email}`
      ]
    },
    resume: {
      description: 'Download resume',
      action: () => {
        window.open(portfolioData.personal.resume, '_blank');
        return ['Opening resume...'];
      }
    },
    clear: {
      description: 'Clear terminal',
      action: () => {
        setHistory([{ type: 'prompt', content: '' }]);
        return [];
      }
    },
    exit: {
      description: 'Close terminal',
      action: () => {
        onClose();
        return ['Goodbye!'];
      }
    },
    ls: {
      description: 'List directory contents',
      action: () => [
        'total 8',
        'drwxr-xr-x  2 john john 4096 Dec 15 10:30 projects/',
        '-rw-r--r--  1 john john 1024 Dec 15 10:25 about.txt',
        '-rw-r--r--  1 john john  512 Dec 15 10:25 skills.txt',
        '-rw-r--r--  1 john john  256 Dec 15 10:25 contact.txt',
        '-rw-r--r--  1 john john 2048 Dec 15 10:25 resume.pdf'
      ]
    },
    pwd: {
      description: 'Show current directory',
      action: () => [`/home/john/${currentPath}`]
    }
  };

  // Handle dynamic cat commands
  const handleCatCommand = (args) => {
    const file = args[0];
    switch (file) {
      case 'about.txt':
        return commands.about.action();
      case 'skills.txt':
        return commands.skills.action();
      case 'contact.txt':
        return commands.contact.action();
      case 'resume.pdf':
        return ['This is a binary file. Use "resume" command to download.'];
      default:
        if (file && file.startsWith('project')) {
          const projectNum = parseInt(file.replace('project', '')) - 1;
          const project = portfolioData.projects[projectNum];
          if (project) {
            return [
              `Project: ${project.title}`,
              '',
              `Description: ${project.description}`,
              `Technologies: ${project.tech.join(', ')}`,
              `GitHub: ${project.github}`,
              `Demo: ${project.demo}`,
              '',
              project.longDescription || 'No additional details available.'
            ];
          }
        }
        return [`cat: ${file}: No such file or directory`];
    }
  };

  const executeCommand = (cmd) => {
    const [command, ...args] = cmd.trim().toLowerCase().split(' ');
    
    if (command === '') return [];
    
    if (command === 'cat') {
      return handleCatCommand(args);
    }
    
    if (commands[command]) {
      return commands[command].action();
    }
    
    return [`Command not found: ${command}. Type "help" for available commands.`];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [
      ...history.slice(0, -1), // Remove the current prompt
      { type: 'input', content: `${currentPath} $ ${input}` },
    ];

    const output = executeCommand(input);
    
    if (input.trim().toLowerCase() !== 'clear') {
      output.forEach(line => {
        newHistory.push({ type: 'output', content: line });
      });
      newHistory.push({ type: 'prompt', content: '' });
      setHistory(newHistory);
    }

    setInput('');
  };

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

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
          animate={{ 
            scale: isMinimized ? 0.3 : 1, 
            opacity: 1,
            y: isMinimized ? 300 : 0 
          }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={`bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden ${
            isMinimized ? 'w-64 h-16' : 'w-full max-w-4xl h-96 md:h-[500px]'
          }`}
        >
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center ml-4">
                <TerminalIcon size={16} className="text-gray-400 mr-2" />
                <span className="text-gray-300 text-sm font-mono">
                  john@portfolio:~
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          {!isMinimized && (
            <div className="h-full flex flex-col">
              <div
                ref={terminalRef}
                className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-gray-900 text-green-400"
              >
                {history.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line.type === 'input' && (
                      <div className="text-blue-400">{line.content}</div>
                    )}
                    {line.type === 'output' && (
                      <div className="text-green-400 whitespace-pre-wrap">{line.content}</div>
                    )}
                    {line.type === 'prompt' && index === history.length - 1 && (
                      <form onSubmit={handleSubmit} className="flex items-center">
                        <span className="text-blue-400 mr-2">{currentPath} $</span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="flex-1 bg-transparent text-green-400 outline-none font-mono"
                          autoComplete="off"
                          spellCheck="false"
                        />
                      </form>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Terminal;