export const portfolioData = {
  // Personal Information
  personal: {
    name: "Avishkar Bahirwar",
    title: "3rd year student at IIT Bombay",
    tagline: "Building systems that learn, move, and make sense",
    bio: "I’m a passionate robotics and AI/ML enthusiast with hands-on experience in building intelligent systems that interact with the physical world. I love combining perception, planning, and control to solve real-world problems through automation, autonomy, and machine learning.",
    email: "avishkarbahirwar@gmail.com",
    phone: "+91 7249604769",
    location: "Mumbai, India",
    resume: "https://drive.google.com/file/d/1d5gnJdeJMgafLZq6cZLwLDbPHnmvm-EK/view?usp=sharing",
    avatar: "https://drive.google.com/file/d/1nngl1Gxx9DyqjEeV_1kujRCE8yOT_cLT/view?usp=sharing"
  },

  // Social Links
  social: {
    github: "https://github.com/Avishkar1312",
    linkedin: "https://www.linkedin.com/in/avishkar-bahirwar/",
    //twitter: "https://twitter.com/johndoe",
    email: "mailto:avishkarbahirwar@gmail.com"
  },

  // Academic Background
  education: [
    {
      degree: "Minor in CMinds & Robotics",
      institution: "IIT Bombay",
      year: "2023-2027",
      //cgpa: "3.8/4.0",
      description: "Specialized in Machine Learning and Distributed Systems"
    },
    {
      degree: "Bachelor of Technology in Civil Engineering",
      institution: "IIT Bombay",
      year: "2023-2027",
      cgpa: "8.86/10.0",
      description: "Focus on Software Engineering and Data Structures"
    }
  ],

  // Skills
  skills: {
    Robotics: ["ROS 2","Gazebo","MoveIt2","RViz2","URDF","LIDAR","ESP32","Microcontroller Programming"],
    "Machine Learning & Data Science": ["PyTorch","Kalman Filter","Scikit-learn","Sensor Fusion","MFCC","K-Means","Logistic Regression"],
    "Web & Scripting": ["React","Next.js","Tailwind CSS","Node.js","Django","Playwright","Python"],
    "Simulation & Design": ["MATLAB","Simulink","Simscape","SolidWorks","Fusion 360","3D Printing","Laser Cutting"],
    "Tools & DevOps": ["Git","GitHub Actions","Docker","Linux","WSL","tmux"]
  },

  // Projects
  projects: [
    {
      id: 1,
      title: "6 DOF Robotic Arm",
      description: "A robotic arm with 6 degrees of freedom made out of 3D printed parts",
      longDescription: "A robotic arm with 6 degrees of freedom made out of 3D printed parts. The software stack is primarily present in a Docker container setup in Raspberry Pi OS. It consists of a ROS2 pipeline written in Python with some C++ code in the Arduino IDE for controlling the stepper motors.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["SolidWorks","Docker","Raspberry Pi 5 OS","Arduino IDE","ROS2 Foxy","RViz2"],
      github: "https://github.com/Avishkar1312/6-DOF-Robotic-Arm",
      //demo: "https://ecommerce-demo.vercel.app",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates",
      longDescription: "Real-time collaborative task management application with features like team collaboration, deadline tracking, file attachments, and progress visualization. Built with React and Socket.io for seamless real-time communication.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Socket.io", "Node.js", "MongoDB", "Material-UI"],
      github: "https://github.com/johndoe/task-manager",
      demo: "https://task-manager-demo.herokuapp.com",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A beautiful weather application with data visualization",
      longDescription: "Interactive weather dashboard providing detailed weather information, forecasts, and beautiful data visualizations. Features location-based weather, historical data, and responsive design for all devices.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Vue.js", "Chart.js", "Weather API", "SCSS"],
      github: "https://github.com/johndoe/weather-dashboard",
      demo: "https://weather-dashboard-demo.netlify.app",
      featured: false
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Analytics dashboard for social media performance tracking",
      longDescription: "Comprehensive analytics dashboard for tracking social media performance across multiple platforms. Features include engagement metrics, audience insights, content performance analysis, and automated reporting.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
      github: "https://github.com/johndoe/social-analytics",
      demo: "https://social-analytics-demo.vercel.app",
      featured: false
    }
  ],

  // Experience (optional)
  experience: [
    {
      title: "AI & BI Intern",
      company: "Tribeca Developers",
      period: "2025 - Present",
      description: "Building intelligent RAG-based chatbots using Hugging Face and Gemini Flash, developing AI-driven profile scrapers with smart filtering, and delivering insight-rich dashboards using Power BI"
    },
    {
      title: "Institute Cultural Web Nominee",
      company: "Institute Cultural Council,IIT Bombay",
      period: "2025 - Present",
      description: "Developed and maintained multiple client projects using modern web technologies."
    },
    {
      title: "Institute Technical Convenor",
      company: "Tinkerers' Laboratory, IIT Bombay",
      period: "2024 - 2025",
      description: "Developed and maintained multiple client projects using modern web technologies."
    }
  ]
};