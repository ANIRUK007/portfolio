// Mock data for Anirudh's Portfolio

export const personalInfo = {
  name: "ANIRUDH KOTLA",
  tagline: "FULLSTACK DEVELOPER & AI/ML ENTHUSIAST",
  bio: "Computer Science Engineering student passionate about building intelligent systems and exploring the intersection of web technologies and artificial intelligence. Currently leading IEEE student chapter and working on cutting-edge projects in LLMs and sustainable AI.",
  email: "kotlaanirudh05@gmail.com",
  phone: "+91 99666 91635",
  github: "ANIRUK007",
  linkedin: "kotla-anirudh",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anirudh",
  available: true,
  resumeLink: "#"
};

export const githubStats = {
  username: "ANIRUK007",
  contributions: 847,
  streak: 42,
  repos: 28,
  stars: 156
};

export const spotifyData = {
  currentlyPlaying: "Coding Focus Mix",
  artist: "Lo-fi Beats",
  playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
  albumArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop"
};

export const projects = [
  {
    id: 1,
    title: "CONVOMAP",
    description: "Multi-platform chat intelligence system using Discord bot and ML models to extract, tag, and semantically organize conversations with federated architecture.",
    tech: ["Python", "TensorFlow", "Discord API", "NLP"],
    category: "AI/ML",
    tags: ["Machine Learning", "LLM", "Chatbots"],
    github: "#",
    colab: "#",
    demo: null,
    color: "orange",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "TERRAIN MAPPING DRONE",
    description: "Research project at IIT Tirupati for disaster management using autonomous drones for terrain mapping and guidance in emergency situations.",
    tech: ["Python", "Computer Vision", "ROS", "OpenCV"],
    category: "Research",
    tags: ["Robotics", "AI", "Disaster Management"],
    github: "#",
    colab: "#",
    demo: null,
    color: "blue",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "PORTFOLIO WEBSITE",
    description: "Modern portfolio website built with React and FastAPI, featuring responsive design and smooth animations.",
    tech: ["React", "JavaScript", "CSS", "FastAPI"],
    category: "Web",
    tags: ["Frontend", "Design", "Web Development"],
    github: "#",
    demo: "#",
    color: "pink",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    title: "LLM RESEARCH TOOLKIT",
    description: "Toolkit for experimenting with Large Language Models focusing on explainability and sustainable AI practices.",
    tech: ["Python", "PyTorch", "Hugging Face", "Jupyter"],
    category: "AI/ML",
    tags: ["Research", "LLM", "Explainable AI"],
    github: "#",
    colab: "#",
    color: "purple",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    title: "BLOCKCHAIN NETWORK DEMO",
    description: "Implementation of blockchain concepts in computer networks for secure and decentralized communication.",
    tech: ["Python", "Networking", "Cryptography"],
    category: "Research",
    tags: ["Blockchain", "Security", "Networks"],
    github: "#",
    color: "green",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    title: "DATA VISUALIZATION DASHBOARD",
    description: "Interactive dashboard for visualizing complex datasets using modern web technologies and data science libraries.",
    tech: ["React", "Python", "Pandas", "Matplotlib"],
    category: "Web",
    tags: ["Data Science", "Visualization", "Dashboard"],
    github: "#",
    demo: "#",
    color: "orange",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  }
];

export const skills = {
  languages: ["Python", "JavaScript", "C", "HTML", "CSS", "MySQL"],
  frameworks: ["React.js", "TensorFlow", "FastAPI", "Node.js"],
  libraries: ["Pandas", "NumPy", "Matplotlib", "OpenCV"],
  tools: ["Git", "Linux", "Windows", "VS Code", "Jupyter"],
  research: ["Explainable AI", "Large Language Models", "Blockchain in Networks", "Sustainable AI"]
};

export const experience = [
  {
    id: 1,
    role: "Research Intern",
    organization: "IIT Tirupati",
    duration: "May 2025 - July 2025",
    type: "Research",
    description: "Terrain Mapping Guidance Drone in Disaster Management",
    achievements: [
      "Developed autonomous drone navigation system",
      "Implemented computer vision for terrain mapping",
      "Collaborated with research team on disaster management solutions"
    ],
    color: "blue"
  },
  {
    id: 2,
    role: "Software Developer Intern",
    organization: "VHV Digital Solutions",
    duration: "February 2025 - July 2025",
    type: "Development",
    description: "Website Development",
    achievements: [
      "Built responsive websites using modern frameworks",
      "Collaborated with design team on UI/UX improvements",
      "Implemented backend APIs and database integration"
    ],
    color: "orange"
  },
  {
    id: 3,
    role: "Chair",
    organization: "IEEE MCET Student Branch",
    duration: "April 2024 - Present",
    type: "Leadership",
    description: "Leading IEEE student chapter activities",
    achievements: [
      "Organized technical events and workshops",
      "Coordinated Intelli-sense and Sensor Beyond events",
      "Managed team of student volunteers"
    ],
    color: "purple"
  },
  {
    id: 4,
    role: "Vice-Secretary",
    organization: "IEEE MCET Student Branch",
    duration: "June 2024 - February 2025",
    type: "Leadership",
    description: "Supporting IEEE chapter operations",
    achievements: [
      "Coordinated with IEEE Sensor Council",
      "Organized technical seminars",
      "Maintained chapter documentation"
    ],
    color: "pink"
  },
  {
    id: 5,
    role: "Logistics Head",
    organization: "Street Cause MCET",
    duration: "September 2023 - June 2024",
    type: "Community",
    description: "Community service and social initiatives",
    achievements: [
      "Managed logistics for community events",
      "Coordinated volunteer activities",
      "Led social awareness campaigns"
    ],
    color: "green"
  }
];

export const education = [
  {
    id: 1,
    degree: "B.E in Computer Science Engineering",
    institution: "Methodist College of Engineering and Technology",
    duration: "Expected August 2027",
    color: "blue"
  },
  {
    id: 2,
    degree: "Intermediate in MPC",
    institution: "Sarath Junior College",
    duration: "Completed May 2023",
    percentage: "81%",
    color: "orange"
  },
  {
    id: 3,
    degree: "High School",
    institution: "Sri Sai Public School",
    duration: "Completed May 2021",
    percentage: "88%",
    color: "purple"
  }
];

export const achievements = [
  {
    id: 1,
    title: "Smart India Hackathon 2025",
    type: "Hackathon",
    description: "Participated in national-level hackathon",
    color: "orange"
  },
  {
    id: 2,
    title: "Hacknovate 2025",
    type: "Event Organization",
    description: "Organized and coordinated college hackathon",
    color: "blue"
  },
  {
    id: 3,
    title: "IEEE Event Coordinator",
    type: "Leadership",
    description: "Coordinated Intelli-sense and Sensor Beyond events",
    color: "purple"
  }
];

export const researchInterests = [
  "Explainable and Sustainable Artificial Intelligence",
  "Large Language Models",
  "Implementation of Blockchain in Computer Networks",
  "Computer Vision and Robotics",
  "Natural Language Processing"
];