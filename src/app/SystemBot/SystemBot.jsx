"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal, Cpu, Shield, Activity, Wifi, Database, Command, Send,
    Mic, Server, Lock, FolderOpen, Layers, Globe, Zap, Settings,
    Code, FileCode, HardDrive, MessageSquare, Power
} from 'lucide-react';

export default function SystemBot() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, type: 'system', text: 'System Bot v1.0 Initialized.', timestamp: new Date() },
        { id: 2, type: 'system', text: 'Accessing core modules... A-Z capabilities loaded.', timestamp: new Date() },
        { id: 3, type: 'bot', text: 'System Bot Online. I have full access to system controls. What would you like me to do?', timestamp: new Date() }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('terminal');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsProcessing(true);

        try {
            const res = await fetch('/api/system-bot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: userMsg.text }),
            });
            const data = await res.json();

            const responseMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: data.response || "System processed request.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, responseMsg]);
        } catch (error) {
            const errorMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: "Error connecting to System API. Check console.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsProcessing(false);
        }
    };

    const modules = [
        { name: 'App Control', icon: <Layers size={18} />, status: 'Active' },
        { name: 'Database', icon: <Database size={18} />, status: 'Connected' },
        { name: 'File System', icon: <FolderOpen size={18} />, status: 'Ready' },
        { name: 'Network', icon: <Wifi size={18} />, status: 'Secure' },
        { name: 'Security', icon: <Shield size={18} />, status: 'Scanning' },
        { name: 'Terminal', icon: <Terminal size={18} />, status: 'Idle' },
    ];

    const systemStats = [
        { label: 'CPU Load', value: '12%', color: 'bg-green-500' },
        { label: 'Memory', value: '4.2GB / 16GB', color: 'bg-blue-500' },
        { label: 'Network', value: '1.2 Gbps', color: 'bg-purple-500' },
        { label: 'Uptime', value: '42h 15m', color: 'bg-orange-500' },
    ];

    return (
        <div className="flex h-screen w-full bg-[#0a0a0a] text-gray-100 font-sans overflow-hidden">
            {/* Sidebar / System Panel */}
            <div className="w-80 bg-[#111] border-r border-[#333] flex flex-col hidden md:flex">
                <div className="p-6 border-b border-[#333] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-wider text-white">SYSTEM BOT</h1>
                        <div className="flex items-center gap-2 text-xs text-green-500">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            ONLINE
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Status Section */}
                    <div className="space-y-3">
                        <h2 className="text-xs font-bold text-gray-500 tracking-widest uppercase">System Status</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {systemStats.map((stat, idx) => (
                                <div key={idx} className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333] hover:border-blue-500/50 transition-colors">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-400">{stat.label}</span>
                                        <span className="text-xs font-mono font-bold text-blue-400">{stat.value}</span>
                                    </div>
                                    <div className="w-full h-1 bg-[#333] rounded-full overflow-hidden">
                                        <div className={`h-full ${stat.color} w-3/4 opacity-80 shadow-[0_0_10px_currentColor]`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active Modules */}
                    <div className="space-y-3">
                        <h2 className="text-xs font-bold text-gray-500 tracking-widest uppercase">Active Modules (A-Z)</h2>
                        <div className="space-y-1">
                            {modules.map((mod, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-[#1a1a1a] group cursor-pointer transition-colors">
                                    <div className="flex items-center gap-3 text-gray-300 group-hover:text-white">
                                        <span className="text-gray-500 group-hover:text-blue-400 transition-colors">{mod.icon}</span>
                                        <span className="text-sm">{mod.name}</span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-900/30 text-green-400 border border-green-900/50">
                                        {mod.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-[#333]">
                    <button className="w-full py-2 bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 rounded flex items-center justify-center gap-2 transition-all">
                        <Power size={16} />
                        <span className="text-sm font-medium">Emergency Shutdown</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-[#0d0d0d] relative">
                {/* Top Header */}
                <div className="h-16 border-b border-[#333] flex items-center justify-between px-6 bg-[#111]/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-400 hover:text-white">
                            <Command size={20} />
                        </button>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="text-blue-500">root</span>
                            <span className="text-gray-600">/</span>
                            <span>system-bot</span>
                            <span className="text-gray-600">/</span>
                            <span className="text-white">terminal</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#222] rounded-full text-gray-400 hover:text-white transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Chat / Terminal Area */}
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth" ref={scrollRef}>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`max-w-[80%] flex items-start gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>

                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.type === 'user'
                                        ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                                        : msg.type === 'system'
                                            ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                                            : 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                                        }`}>
                                        {msg.type === 'user' ? <MessageSquare size={14} /> : msg.type === 'system' ? <Terminal size={14} /> : <Zap size={14} />}
                                    </div>

                                    {/* Content */}
                                    <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`py-3 px-4 rounded-2xl ${msg.type === 'user'
                                            ? 'bg-[#2a2a2a] text-white rounded-tr-sm'
                                            : msg.type === 'system'
                                                ? 'bg-transparent text-yellow-500 font-mono text-xs w-full pl-0 pt-1'
                                                : 'bg-[#1a1a1a] text-gray-200 rounded-tl-sm border border-[#333]'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-gray-600 mt-1 px-1">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        ))}

                        {isProcessing && (
                            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                                <div className="max-w-[80%] flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 border border-blue-600/30 flex items-center justify-center">
                                        <Activity size={14} className="animate-spin" />
                                    </div>
                                    <div className="flex items-center gap-1 h-10 px-2">
                                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-[#333] bg-[#0d0d0d]">
                    <div className="max-w-4xl mx-auto relative">
                        <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-lg -z-10"></div>
                        <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all shadow-lg">
                            <Terminal size={18} className="text-gray-500" />
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Enter system command..."
                                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none font-medium"
                                autoFocus
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className={`p-2 rounded-lg transition-all ${input.trim()
                                    ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)] hover:bg-blue-500'
                                    : 'bg-[#222] text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-[10px] text-gray-600">Target System: LOCALHOST • Access Level: ROOT • Encryption: AES-256</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
