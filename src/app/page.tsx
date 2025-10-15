'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Lock, 
  Database, 
  Server, 
  Smartphone, 
  Download, 
  MessageCircle,
  Shield,
  Wifi,
  Cloud,
  FileText,
  Image,
  Music,
  Video,
  Play,
  Pause,
  Router,
  Network,
  Users,
  Layers,
  Package,
  CheckCircle,
  BarChart3,
  Globe2,
  MapPin,
  Smile,
  Sparkles,
  Camera,
  MessageSquare,
  Paperclip,
  DatabaseZap,
  CloudDownload,
  CloudUpload,
  Cpu,
  HardDrive
} from 'lucide-react';

// Types
interface NetworkNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  active: boolean;
  description: string;
  details: string[];
}

interface DataPacket {
  id: string;
  from: string;
  to: string;
  progress: number;
  type: string;
  contentType?: string;
  color?: string;
  icon?: React.ReactNode;
  size?: number;
  encrypted?: boolean;
  compressed?: boolean;
  priority?: number;
}

interface ParticleEffect {
  id: string;
  x: number;
  y: number;
  type: string;
  color?: string;
  size?: number;
  duration?: number;
}

interface AnimationStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  nodes: string[];
  packets: Array<{
    from: string;
    to: string;
    type: string;
    contentType?: string;
    color?: string;
    icon?: React.ReactNode;
  }>;
  effects: Array<{
    type: string;
    target: string;
    color?: string;
  }>;
}

interface ContentFlow {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  steps: AnimationStep[];
  packetTypes: {
    [key: string]: {
      color: string;
      icon: React.ReactNode;
      size: number;
      speed: number;
    };
  };
}

// Content Type Definitions
const CONTENT_TYPES = {
  text: {
    name: 'Text Messages',
    icon: <MessageCircle className="w-4 h-4" />,
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    packetColor: '#3B82F6',
    description: 'Simple text messages with emojis',
    size: 'small',
    speed: 'fast'
  },
  image: {
    name: 'Photos',
    icon: <Image className="w-4 h-4" alt="Photos icon" />,
    color: '#10B981',
    bgColor: '#ECFDF5',
    packetColor: '#10B981',
    description: 'Images and photos from gallery or camera',
    size: 'medium',
    speed: 'medium'
  },
  video: {
    name: 'Videos',
    icon: <Video className="w-4 h-4" />,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    packetColor: '#F59E0B',
    description: 'Video files and recordings',
    size: 'large',
    speed: 'slow'
  },
  gif: {
    name: 'GIFs',
    icon: <Sparkles className="w-4 h-4" />,
    color: '#8B5CF6',
    bgColor: '#F3E8FF',
    packetColor: '#8B5CF6',
    description: 'Animated GIFs and stickers',
    size: 'medium',
    speed: 'medium'
  },
  sticker: {
    name: 'Stickers',
    icon: <Smile className="w-4 h-4" />,
    color: '#EC4899',
    bgColor: '#FCE7F3',
    packetColor: '#EC4899',
    description: 'Digital stickers and emojis',
    size: 'small',
    speed: 'fast'
  },
  file: {
    name: 'Files',
    icon: <FileText className="w-4 h-4" />,
    color: '#6B7280',
    bgColor: '#F9FAFB',
    packetColor: '#6B7280',
    description: 'Documents and other files',
    size: 'medium',
    speed: 'medium'
  },
  audio: {
    name: 'Audio',
    icon: <Music className="w-4 h-4" />,
    color: '#EF4444',
    bgColor: '#FEF2F2',
    packetColor: '#EF4444',
    description: 'Voice messages and audio files',
    size: 'medium',
    speed: 'medium'
  },
  location: {
    name: 'Location',
    icon: <MapPin className="w-4 h-4" />,
    color: '#059669',
    bgColor: '#ECFDF5',
    packetColor: '#059669',
    description: 'Location sharing and maps',
    size: 'small',
    speed: 'fast'
  },
  contact: {
    name: 'Contact',
    icon: <Users className="w-4 h-4" />,
    color: '#7C3AED',
    bgColor: '#F3E8FF',
    packetColor: '#7C3AED',
    description: 'Contact information sharing',
    size: 'small',
    speed: 'fast'
  },
  poll: {
    name: 'Poll',
    icon: <BarChart3 className="w-4 h-4" />,
    color: '#0891B2',
    bgColor: '#ECFEFF',
    packetColor: '#0891B2',
    description: 'Polls and surveys',
    size: 'small',
    speed: 'fast'
  }
};

// Network Infrastructure Flow
const NETWORK_INFRASTRUCTURE_FLOW: ContentFlow = {
  id: 'network-infrastructure',
  name: 'Network Infrastructure',
  description: 'How data travels through network infrastructure',
  icon: <Globe2 className="w-6 h-6" />,
  color: '#3B82F6',
  bgColor: '#EFF6FF',
  steps: [
    {
      id: 'device-creation',
      title: 'Device Creation',
      description: 'User creates message on device',
      duration: 2000,
      nodes: ['clientA'],
      packets: [
        { from: 'clientA', to: 'clientA', type: 'creation', contentType: 'text' }
      ],
      effects: [
        { type: 'typing', target: 'clientA', color: '#3B82F6' }
      ]
    },
    {
      id: 'local-network',
      title: 'Local Network',
      description: 'Message travels through local router',
      duration: 2000,
      nodes: ['clientA', 'routerA'],
      packets: [
        { from: 'clientA', to: 'routerA', type: 'routing', contentType: 'text' }
      ],
      effects: [
        { type: 'connection', target: 'routerA', color: '#10B981' }
      ]
    },
    {
      id: 'isp-routing',
      title: 'ISP Routing',
      description: 'Internet Service Provider routes the message',
      duration: 2000,
      nodes: ['routerA', 'ispA'],
      packets: [
        { from: 'routerA', to: 'ispA', type: 'isp-routing', contentType: 'text' }
      ],
      effects: [
        { type: 'processing', target: 'ispA', color: '#F59E0B' }
      ]
    },
    {
      id: 'internet-backbone',
      title: 'Internet Backbone',
      description: 'Message travels through global internet infrastructure',
      duration: 3000,
      nodes: ['ispA', 'internet'],
      packets: [
        { from: 'ispA', to: 'internet', type: 'backbone', contentType: 'text' }
      ],
      effects: [
        { type: 'global', target: 'internet', color: '#8B5CF6' }
      ]
    },
    {
      id: 'server-processing',
      title: 'Server Processing',
      description: 'Chat server processes and stores the message',
      duration: 2000,
      nodes: ['internet', 'server'],
      packets: [
        { from: 'internet', to: 'server', type: 'server-processing', contentType: 'text' }
      ],
      effects: [
        { type: 'storage', target: 'server', color: '#EF4444' }
      ]
    },
    {
      id: 'return-journey',
      title: 'Return Journey',
      description: 'Message travels back to recipient',
      duration: 3000,
      nodes: ['server', 'clientB'],
      packets: [
        { from: 'server', to: 'clientB', type: 'delivery', contentType: 'text' }
      ],
      effects: [
        { type: 'notification', target: 'clientB', color: '#10B981' }
      ]
    }
  ],
  packetTypes: {
    'creation': { color: '#3B82F6', icon: <Send className="w-3 h-3" />, size: 8, speed: 1 },
    'routing': { color: '#10B981', icon: <Router className="w-3 h-3" />, size: 10, speed: 1.2 },
    'isp-routing': { color: '#F59E0B', icon: <Wifi className="w-3 h-3" />, size: 12, speed: 1.5 },
    'backbone': { color: '#8B5CF6', icon: <Globe2 className="w-3 h-3" />, size: 14, speed: 2 },
    'server-processing': { color: '#EF4444', icon: <Server className="w-3 h-3" />, size: 16, speed: 1.8 },
    'delivery': { color: '#10B981', icon: <Download className="w-3 h-3" />, size: 10, speed: 1.2 }
  }
};

// Chat Application Flow
const CHAT_APPLICATION_FLOW: ContentFlow = {
  id: 'chat-application',
  name: 'Chat Application',
  description: 'How chat applications process different content types',
  icon: <MessageCircle className="w-6 h-6" />,
  color: '#10B981',
  bgColor: '#ECFDF5',
  steps: [
    {
      id: 'user-input',
      title: 'User Input',
      description: 'User creates content in the chat interface',
      duration: 2000,
      nodes: ['clientA'],
      packets: [
        { from: 'clientA', to: 'clientA', type: 'input', contentType: 'text' }
      ],
      effects: [
        { type: 'typing', target: 'clientA', color: '#10B981' }
      ]
    },
    {
      id: 'content-processing',
      title: 'Content Processing',
      description: 'Application processes and validates content',
      duration: 2000,
      nodes: ['clientA', 'app-layer'],
      packets: [
        { from: 'clientA', to: 'app-layer', type: 'processing', contentType: 'text' }
      ],
      effects: [
        { type: 'validation', target: 'app-layer', color: '#F59E0B' }
      ]
    },
    {
      id: 'encryption',
      title: 'Encryption',
      description: 'Content is encrypted for secure transmission',
      duration: 2000,
      nodes: ['app-layer', 'security-layer'],
      packets: [
        { from: 'app-layer', to: 'security-layer', type: 'encryption', contentType: 'text' }
      ],
      effects: [
        { type: 'encryption', target: 'security-layer', color: '#8B5CF6' }
      ]
    },
    {
      id: 'protocol-handling',
      title: 'Protocol Handling',
      description: 'Communication protocols manage data transmission',
      duration: 2000,
      nodes: ['security-layer', 'protocol-layer'],
      packets: [
        { from: 'security-layer', to: 'protocol-layer', type: 'protocol', contentType: 'text' }
      ],
      effects: [
        { type: 'protocol', target: 'protocol-layer', color: '#EF4444' }
      ]
    },
    {
      id: 'server-storage',
      title: 'Server Storage',
      description: 'Content is stored on chat servers',
      duration: 2000,
      nodes: ['protocol-layer', 'server'],
      packets: [
        { from: 'protocol-layer', to: 'server', type: 'storage', contentType: 'text' }
      ],
      effects: [
        { type: 'storage', target: 'server', color: '#059669' }
      ]
    },
    {
      id: 'recipient-delivery',
      title: 'Recipient Delivery',
      description: 'Content is delivered to recipient',
      duration: 2000,
      nodes: ['server', 'clientB'],
      packets: [
        { from: 'server', to: 'clientB', type: 'delivery', contentType: 'text' }
      ],
      effects: [
        { type: 'notification', target: 'clientB', color: '#10B981' }
      ]
    }
  ],
  packetTypes: {
    'input': { color: '#10B981', icon: <MessageCircle className="w-3 h-3" />, size: 8, speed: 1 },
    'processing': { color: '#F59E0B', icon: <Cpu className="w-3 h-3" />, size: 10, speed: 1.2 },
    'encryption': { color: '#8B5CF6', icon: <Lock className="w-3 h-3" />, size: 12, speed: 1.5 },
    'protocol': { color: '#EF4444', icon: <Layers className="w-3 h-3" />, size: 14, speed: 1.8 },
    'storage': { color: '#059669', icon: <Database className="w-3 h-3" />, size: 16, speed: 1.5 },
    'delivery': { color: '#10B981', icon: <Download className="w-3 h-3" />, size: 10, speed: 1.2 }
  }
};

// Create Content Type Specific Flows
const createContentTypeFlow = (contentType: keyof typeof CONTENT_TYPES): ContentFlow => {
  const contentInfo = CONTENT_TYPES[contentType];
  
  return {
    id: `content-${contentType}`,
    name: `${contentInfo.name} Flow`,
    description: `How ${contentInfo.name.toLowerCase()} travel through the system`,
    icon: contentInfo.icon,
    color: contentInfo.color,
    bgColor: contentInfo.bgColor,
    steps: [
      {
        id: 'content-creation',
        title: `${contentInfo.name} Creation`,
        description: `User creates ${contentInfo.name.toLowerCase()}`,
        duration: 2000,
        nodes: ['clientA'],
        packets: [
          { from: 'clientA', to: 'clientA', type: 'creation', contentType, color: contentInfo.packetColor, icon: contentInfo.icon }
        ],
        effects: [
          { type: 'creation', target: 'clientA', color: contentInfo.packetColor }
        ]
      },
      {
        id: 'content-validation',
        title: 'Content Validation',
        description: `Validating ${contentInfo.name.toLowerCase()} format and size`,
        duration: 2000,
        nodes: ['clientA', 'validation-layer'],
        packets: [
          { from: 'clientA', to: 'validation-layer', type: 'validation', contentType, color: contentInfo.packetColor, icon: contentInfo.icon }
        ],
        effects: [
          { type: 'validation', target: 'validation-layer', color: contentInfo.packetColor }
        ]
      },
      {
        id: 'content-compression',
        title: 'Content Compression',
        description: `Compressing ${contentInfo.name.toLowerCase()} for transmission`,
        duration: 2000,
        nodes: ['validation-layer', 'compression-layer'],
        packets: [
          { from: 'validation-layer', to: 'compression-layer', type: 'compression', contentType, color: contentInfo.packetColor, icon: contentInfo.icon }
        ],
        effects: [
          { type: 'compression', target: 'compression-layer', color: contentInfo.packetColor }
        ]
      },
      {
        id: 'content-encryption',
        title: 'Content Encryption',
        description: `Encrypting ${contentInfo.name.toLowerCase()} for security`,
        duration: 2000,
        nodes: ['compression-layer', 'encryption-layer'],
        packets: [
          { from: 'compression-layer', to: 'encryption-layer', type: 'encryption', contentType, color: contentInfo.packetColor, icon: contentInfo.icon }
        ],
        effects: [
          { type: 'encryption', target: 'encryption-layer', color: contentInfo.packetColor }
        ]
      },
      {
        id: 'content-transmission',
        title: 'Content Transmission',
        description: `Transmitting ${contentInfo.name.toLowerCase()} through network`,
        duration: 3000,
        nodes: ['encryption-layer', 'network-layer'],
        packets: [
          { from: 'encryption-layer', to: 'network-layer', type: 'transmission', contentType, color: contentInfo.packetColor, icon: contentInfo.icon }
        ],
        effects: [
          { type: 'transmission', target: 'network-layer', color: contentInfo.packetColor }
        ]
      },
      {
        id: 'content-storage',
        title: 'Content Storage',
        description: `Storing ${contentInfo.name.toLowerCase()} on server`,
        duration: 2000,
        nodes: ['network-layer', 'server'],
        packets: [
          { from: 'network-layer', to: 'server', type: 'storage', contentType, color: contentInfo.packetColor, icon: contentInfo.icon }
        ],
        effects: [
          { type: 'storage', target: 'server', color: contentInfo.packetColor }
        ]
      },
      {
        id: 'content-delivery',
        title: 'Content Delivery',
        description: `Delivering ${contentInfo.name.toLowerCase()} to recipient`,
        duration: 2000,
        nodes: ['server', 'clientB'],
        packets: [
          { from: 'server', to: 'clientB', type: 'delivery', contentType, color: contentInfo.packetColor, icon: contentInfo.icon }
        ],
        effects: [
          { type: 'notification', target: 'clientB', color: contentInfo.packetColor }
        ]
      }
    ],
    packetTypes: {
      'creation': { color: contentInfo.packetColor, icon: contentInfo.icon, size: 8, speed: 1 },
      'validation': { color: contentInfo.packetColor, icon: <CheckCircle className="w-3 h-3" />, size: 10, speed: 1.2 },
      'compression': { color: contentInfo.packetColor, icon: <Package className="w-3 h-3" />, size: 12, speed: 1.5 },
      'encryption': { color: contentInfo.packetColor, icon: <Lock className="w-3 h-3" />, size: 14, speed: 1.8 },
      'transmission': { color: contentInfo.packetColor, icon: <Wifi className="w-3 h-3" />, size: 16, speed: 2 },
      'storage': { color: contentInfo.packetColor, icon: <Database className="w-3 h-3" />, size: 18, speed: 1.5 },
      'delivery': { color: contentInfo.packetColor, icon: <Download className="w-3 h-3" />, size: 10, speed: 1.2 }
    }
  };
};

// Generate all content type flows
const CONTENT_FLOWS: ContentFlow[] = [
  NETWORK_INFRASTRUCTURE_FLOW,
  CHAT_APPLICATION_FLOW,
  ...Object.keys(CONTENT_TYPES).map(key => createContentTypeFlow(key as keyof typeof CONTENT_TYPES))
];

export default function ComprehensiveChatVisualization() {
  const [selectedFlow, setSelectedFlow] = useState<ContentFlow>(NETWORK_INFRASTRUCTURE_FLOW);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const [particleEffects, setParticleEffects] = useState<ParticleEffect[]>([]);
  const [connectionPulses, setConnectionPulses] = useState<{id: string, from: string, to: string, progress: number}[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showTechnicalView, setShowTechnicalView] = useState(false);
  
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const packetRef = useRef<NodeJS.Timeout | null>(null);
  const effectRef = useRef<NodeJS.Timeout | null>(null);

  // Network nodes configuration
  const networkNodes: NetworkNode[] = [
    {
      id: 'clientA',
      label: 'Sender Device',
      icon: <Smartphone className="w-8 h-8" />,
      position: { x: 10, y: 50 },
      active: currentStep >= 0,
      description: 'User Device',
      details: [
        'Mobile app or web interface',
        'Creates and encrypts messages',
        'Establishes WebSocket connection',
        'Handles user authentication'
      ]
    },
    {
      id: 'routerA',
      label: 'Local Router',
      icon: <Router className="w-6 h-6" />,
      position: { x: 20, y: 50 },
      active: currentStep >= 1,
      description: 'Home/Office Network',
      details: [
        'Routes local network traffic',
        'Assigns local IP addresses',
        'Connects to ISP',
        'Manages WiFi/Ethernet connections'
      ]
    },
    {
      id: 'ispA',
      label: 'ISP Network',
      icon: <Wifi className="w-7 h-7" />,
      position: { x: 30, y: 50 },
      active: currentStep >= 2,
      description: 'Internet Service Provider',
      details: [
        'Provides internet connectivity',
        'Routes traffic through backbone',
        'Assigns public IP addresses',
        'Manages bandwidth and QoS'
      ]
    },
    {
      id: 'internet',
      label: 'Internet Backbone',
      icon: <Globe2 className="w-10 h-10" />,
      position: { x: 50, y: 50 },
      active: currentStep >= 3,
      description: 'Global Network Infrastructure',
      details: [
        'Fiber optic cables worldwide',
        'Satellite connections',
        'Undersea data cables',
        'Network exchange points'
      ]
    },
    {
      id: 'server',
      label: 'Chat Server',
      icon: <Server className="w-10 h-10" />,
      position: { x: 70, y: 50 },
      active: currentStep >= 4,
      description: 'Application Server',
      details: [
        'Processes incoming messages',
        'Manages user sessions',
        'Handles message routing',
        'Stores chat history'
      ]
    },
    {
      id: 'clientB',
      label: 'Receiver Device',
      icon: <Smartphone className="w-8 h-8" />,
      position: { x: 85, y: 50 },
      active: currentStep >= 5,
      description: 'Recipient Device',
      details: [
        'Receives and decrypts messages',
        'Displays notifications',
        'Updates chat interface',
        'Stores local cache'
      ]
    },
    // Application layer nodes
    {
      id: 'app-layer',
      label: 'App Layer',
      icon: <MessageCircle className="w-6 h-6" />,
      position: { x: 25, y: 30 },
      active: currentStep >= 1,
      description: 'Application Layer',
      details: [
        'User interface processing',
        'Content validation',
        'Format conversion',
        'UI state management'
      ]
    },
    {
      id: 'security-layer',
      label: 'Security Layer',
      icon: <Shield className="w-6 h-6" />,
      position: { x: 40, y: 30 },
      active: currentStep >= 2,
      description: 'Security & Encryption',
      details: [
        'End-to-end encryption',
        'Message authentication',
        'Key management',
        'Security protocols'
      ]
    },
    {
      id: 'protocol-layer',
      label: 'Protocol Layer',
      icon: <Layers className="w-6 h-6" />,
      position: { x: 55, y: 30 },
      active: currentStep >= 3,
      description: 'Communication Protocols',
      details: [
        'WebSocket management',
        'HTTP/HTTPS handling',
        'Real-time communication',
        'Protocol negotiation'
      ]
    },
    {
      id: 'validation-layer',
      label: 'Validation Layer',
      icon: <CheckCircle className="w-6 h-6" />,
      position: { x: 25, y: 70 },
      active: currentStep >= 1,
      description: 'Content Validation',
      details: [
        'File format validation',
        'Size limit checking',
        'Content filtering',
        'Spam detection'
      ]
    },
    {
      id: 'compression-layer',
      label: 'Compression Layer',
      icon: <Package className="w-6 h-6" />,
      position: { x: 40, y: 70 },
      active: currentStep >= 2,
      description: 'Content Compression',
      details: [
        'File compression',
        'Media optimization',
        'Bandwidth optimization',
        'Format conversion'
      ]
    },
    {
      id: 'encryption-layer',
      label: 'Encryption Layer',
      icon: <Lock className="w-6 h-6" />,
      position: { x: 55, y: 70 },
      active: currentStep >= 3,
      description: 'Content Encryption',
      details: [
        'Data encryption',
        'Key generation',
        'Secure transmission',
        'Privacy protection'
      ]
    },
    {
      id: 'network-layer',
      label: 'Network Layer',
      icon: <Network className="w-6 h-6" />,
      position: { x: 70, y: 70 },
      active: currentStep >= 4,
      description: 'Network Transmission',
      details: [
        'Packet routing',
        'Network protocols',
        'Data transmission',
        'Connection management'
      ]
    }
  ];

  // Animation functions
  const startAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    animateStep(0);
  };

  const stopAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setDataPackets([]);
    setParticleEffects([]);
    setConnectionPulses([]);
    
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    if (packetRef.current) {
      clearTimeout(packetRef.current);
    }
    if (effectRef.current) {
      clearTimeout(effectRef.current);
    }
  };

  const animateStep = (stepIndex: number) => {
    if (stepIndex >= selectedFlow.steps.length) {
      setIsPlaying(false);
      return;
    }

    const step = selectedFlow.steps[stepIndex];
    setCurrentStep(stepIndex);

    // Create data packets for this step
    step.packets.forEach((packet, index) => {
      setTimeout(() => {
        createDataPacket(packet.from, packet.to, packet.type, packet.contentType, packet.color, packet.icon);
      }, index * 500);
    });

    // Create particle effects
    step.effects.forEach((effect, index) => {
      setTimeout(() => {
        createParticleEffect(effect.target, effect.type, effect.color);
      }, index * 300);
    });

    // Move to next step
    animationRef.current = setTimeout(() => {
      animateStep(stepIndex + 1);
    }, step.duration / animationSpeed);
  };

  const createDataPacket = (
    from: string, 
    to: string, 
    type: string, 
    contentType?: string, 
    color?: string, 
    icon?: React.ReactNode
  ) => {
    const packetType = selectedFlow.packetTypes[type];
    const contentInfo = contentType ? CONTENT_TYPES[contentType as keyof typeof CONTENT_TYPES] : null;
    
    const newPacket: DataPacket = {
      id: `packet-${Date.now()}-${Math.random()}`,
      from,
      to,
      progress: 0,
      type,
      contentType,
      color: color || packetType?.color || '#3B82F6',
      icon: icon || packetType?.icon || <Send className="w-3 h-3" />,
      size: packetType?.size || 10,
      encrypted: type === 'encryption',
      compressed: type === 'compression',
      priority: contentType === 'text' ? 1 : 2
    };

    setDataPackets(prev => [...prev, newPacket]);

    // Animate packet movement
    const duration = 2000 / animationSpeed;
    const steps = 60;
    let currentStep = 0;

    const moveInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setDataPackets(prev => 
        prev.map(p => 
          p.id === newPacket.id 
            ? { ...p, progress }
            : p
        )
      );

      if (currentStep >= steps) {
        clearInterval(moveInterval);
        setTimeout(() => {
          setDataPackets(prev => prev.filter(p => p.id !== newPacket.id));
        }, 500);
      }
    }, duration / steps);
  };

  const createParticleEffect = (target: string, type: string, color?: string) => {
    const targetNode = networkNodes.find(node => node.id === target);
    if (!targetNode) return;

    const particles: ParticleEffect[] = [];
    const particleCount = type === 'encryption' ? 8 : type === 'processing' ? 6 : 4;

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = type === 'encryption' ? 40 : 30;
      
      particles.push({
        id: `particle-${Date.now()}-${i}`,
        x: targetNode.position.x,
        y: targetNode.position.y,
        type,
        color: color || selectedFlow.color,
        size: type === 'encryption' ? 4 : 3,
        duration: 1500
      });
    }

    setParticleEffects(prev => [...prev, ...particles]);

    // Remove particles after animation
    setTimeout(() => {
      setParticleEffects(prev => 
        prev.filter(p => !particles.some(np => np.id === p.id))
      );
    }, 1500);
  };

  // Get packet position based on progress
  const getPacketPosition = (packet: DataPacket) => {
    const fromNode = networkNodes.find(node => node.id === packet.from);
    const toNode = networkNodes.find(node => node.id === packet.to);
    
    if (!fromNode || !toNode) return { x: 0, y: 0 };

    const x = fromNode.position.x + (toNode.position.x - fromNode.position.x) * packet.progress;
    const y = fromNode.position.y + (toNode.position.y - fromNode.position.y) * packet.progress;

    return { x, y };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Chat Application Content Flow Visualizer
          </h1>
          <p className="text-lg text-slate-600">
            Explore how different content types flow through chat applications and network infrastructure
          </p>
        </div>

        {/* Main Flow Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Select Main Flow Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedFlow(NETWORK_INFRASTRUCTURE_FLOW)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedFlow.id === 'network-infrastructure'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Globe2 className="w-8 h-8 text-blue-500" />
                <span className="text-sm font-medium">Network Infrastructure</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedFlow(CHAT_APPLICATION_FLOW)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedFlow.id === 'chat-application'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <MessageCircle className="w-8 h-8 text-green-500" />
                <span className="text-sm font-medium">Chat Application</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Select Content Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(CONTENT_TYPES).map(([key, content]) => (
              <button
                key={key}
                onClick={() => setSelectedFlow(createContentTypeFlow(key as keyof typeof CONTENT_TYPES))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedFlow.id === `content-${key}`
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: content.bgColor }}
                  >
                    <div style={{ color: content.color }}>
                      {content.icon}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-center">{content.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Flow Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: selectedFlow.bgColor }}
              >
                <div style={{ color: selectedFlow.color }}>
                  {selectedFlow.icon}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {selectedFlow.name}
                </h2>
                <p className="text-sm text-slate-600">
                  {selectedFlow.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-700">Speed:</label>
                <select
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
              <button
                onClick={() => setShowTechnicalView(!showTechnicalView)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showTechnicalView
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {showTechnicalView ? 'Technical View' : 'Simple View'}
              </button>
            </div>
          </div>

          {/* Animation Controls */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={isPlaying ? stopAnimation : startAnimation}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                isPlaying
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Stop Animation</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start Animation</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Progress</span>
              <span>{currentStep + 1} / {selectedFlow.steps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentStep + 1) / selectedFlow.steps.length) * 100}%`,
                  backgroundColor: selectedFlow.color
                }}
              />
            </div>
          </div>

          {/* Current Step Info */}
          {currentStep < selectedFlow.steps.length && (
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-800 mb-1">
                {selectedFlow.steps[currentStep].title}
              </h3>
              <p className="text-sm text-slate-600">
                {selectedFlow.steps[currentStep].description}
              </p>
            </div>
          )}
        </div>

        {/* Network Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Network Visualization</h2>
          <div className="relative h-96 bg-slate-50 rounded-lg overflow-hidden">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {selectedFlow.steps[currentStep]?.packets.map((packet, index) => {
                const fromNode = networkNodes.find(node => node.id === packet.from);
                const toNode = networkNodes.find(node => node.id === packet.to);
                if (!fromNode || !toNode) return null;

                const x1 = (fromNode.position.x / 100) * 100;
                const y1 = (fromNode.position.y / 100) * 100;
                const x2 = (toNode.position.x / 100) * 100;
                const y2 = (toNode.position.y / 100) * 100;

                return (
                  <line
                    key={index}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={packet.color || selectedFlow.color}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                );
              })}
            </svg>

            {/* Network Nodes */}
            {networkNodes.map(node => (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  node.active ? 'opacity-100 scale-100' : 'opacity-50 scale-90'
                }`}
                style={{
                  left: `${node.position.x}%`,
                  top: `${node.position.y}%`
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`relative p-3 rounded-full border-2 transition-all ${
                  node.active 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'border-gray-300 bg-white'
                }`}>
                  <div className={`${node.active ? 'text-blue-600' : 'text-gray-400'}`}>
                    {node.icon}
                  </div>
                  {node.active && (
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping" />
                  )}
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <p className="text-xs font-medium text-slate-700">{node.label}</p>
                </div>
              </div>
            ))}

            {/* Data Packets */}
            {dataPackets.map(packet => {
              const position = getPacketPosition(packet);
              return (
                <div
                  key={packet.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`
                  }}
                >
                  <div 
                    className="p-2 rounded-full shadow-lg border-2 border-white animate-pulse"
                    style={{ 
                      backgroundColor: packet.color,
                      width: `${packet.size}px`,
                      height: `${packet.size}px`
                    }}
                  >
                    <div className="text-white text-xs">
                      {packet.icon}
                    </div>
                  </div>
                  {packet.encrypted && (
                    <div className="absolute -top-1 -right-1">
                      <Lock className="w-3 h-3 text-yellow-500" />
                    </div>
                  )}
                  {packet.compressed && (
                    <div className="absolute -bottom-1 -right-1">
                      <Package className="w-3 h-3 text-blue-500" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Particle Effects */}
            {particleEffects.map(particle => (
              <div
                key={particle.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-ping"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`
                }}
              >
                <div 
                  className="rounded-full"
                  style={{
                    backgroundColor: particle.color,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Steps Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Animation Steps</h2>
          <div className="space-y-3">
            {selectedFlow.steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  index === currentStep
                    ? 'border-blue-500 bg-blue-50'
                    : index < currentStep
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === currentStep
                      ? 'bg-blue-500 text-white'
                      : index < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                  <div className="text-sm text-slate-500">
                    {step.duration}ms
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}