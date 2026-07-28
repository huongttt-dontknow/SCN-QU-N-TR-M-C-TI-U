"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, RotateCcw, Bot, Minimize2 } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function OmAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "okr" | "kpi">("general");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Position coordinates of the floating button
  const [position, setPosition] = useState({ x: 30, y: 30 }); // Distance from bottom/right
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Threshold to distinguish between click and drag
  const clickThreshold = 5;
  const isDragAction = useRef(false);

  // Load chat history & position on mount
  useEffect(() => {
    const savedHistory = sessionStorage.getItem("om_agent_chat_history");
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    } else {
      // Welcome message
      setMessages([
        {
          role: "model",
          content: "**OM Agent:** Xin chào! Tôi là **OM Agent** - Trợ lý Chiến lược và Quản trị Mục tiêu. Tôi ở đây để đồng hành (cowork) cùng bạn trong việc quản lý và xây dựng kế hoạch OKR/KPI theo định hướng Sconnect. Hãy chọn một chủ đề gợi ý hoặc hỏi tôi bất cứ điều gì nhé!"
        }
      ]);
    }

    const savedPos = localStorage.getItem("om_agent_button_position");
    if (savedPos) {
      setPosition(JSON.parse(savedPos));
    }
  }, []);

  // Save chat history when it changes
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("om_agent_chat_history", JSON.stringify(messages));
    }
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Draggable logic for Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    isDragAction.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;

      if (Math.abs(deltaX) > clickThreshold || Math.abs(deltaY) > clickThreshold) {
        isDragAction.current = true;
      }

      // Update position relative to right/bottom of viewport
      setPosition((prev) => {
        const nextX = Math.max(10, Math.min(window.innerWidth - 60, prev.x - deltaX));
        const nextY = Math.max(10, Math.min(window.innerHeight - 60, prev.y - deltaY));
        return { x: nextX, y: nextY };
      });

      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        localStorage.setItem("om_agent_button_position", JSON.stringify(position));
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position]);

  // Draggable logic for Touch Events (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    isDragAction.current = false;
    dragStart.current = { x: touch.clientX, y: touch.clientY };
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStart.current.x;
      const deltaY = touch.clientY - dragStart.current.y;

      if (Math.abs(deltaX) > clickThreshold || Math.abs(deltaY) > clickThreshold) {
        isDragAction.current = true;
      }

      setPosition((prev) => {
        const nextX = Math.max(10, Math.min(window.innerWidth - 60, prev.x - deltaX));
        const nextY = Math.max(10, Math.min(window.innerHeight - 60, prev.y - deltaY));
        return { x: nextX, y: nextY };
      });

      dragStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        localStorage.setItem("om_agent_button_position", JSON.stringify(position));
      }
    };

    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, position]);

  // Toggle Chat Panel (Only if it wasn't a drag action)
  const handleButtonClick = () => {
    if (isDragAction.current) return;
    setIsOpen(!isOpen);
  };

  // Quick questions pool
  const quickQuestions = {
    general: [
      { text: "Chiến lược Sconnect 2026 định hướng gì?", query: "Chiến lược Sconnect 2026 và triết lý vận hành?" },
      { text: "Cơ cấu Khối hỗ trợ SUs gồm những ai?", query: "Cơ cấu tổ chức Khối hỗ trợ SUs năm 2026?" }
    ],
    okr: [
      { text: "Làm sao để viết mục tiêu OKR chuẩn?", query: "Phương pháp thiết lập và viết OKR chuẩn?" },
      { text: "Điểm khác biệt chính giữa OKR và KPI?", query: "Phân biệt OKR và KPI theo quy chế của Sconnect?" }
    ],
    kpi: [
      { text: "Chiến lược Q3/2026 của BP Wolfoo?", query: "Định hướng mục tiêu Quý 3/2026 của BP Wolfoo?" },
      { text: "Nhiệm vụ của Nhóm AI năm nay?", query: "Vai trò và nhiệm vụ chiến lược của Nhóm AI trong 2026?" }
    ]
  };

  // Send message handler
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/om-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });
      const data = await res.json();
      if (data && data.reply) {
        setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: "**OM Agent:** Tôi gặp sự cố khi xử lý dữ liệu. Vui lòng thử lại sau giây lát!" }
        ]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "**OM Agent:** Kết nối máy chủ thất bại. Vui lòng kiểm tra lại mạng hoặc API Key." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat conversation history
  const handleClearHistory = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch sử trò chuyện với OM Agent?")) {
      const initMsg: Message = {
        role: "model",
        content: "**OM Agent:** Lịch sử trò chuyện đã được làm sạch. Tôi có thể hỗ trợ gì cho bạn trong quản lý mục tiêu hôm nay?"
      };
      setMessages([initMsg]);
      sessionStorage.removeItem("om_agent_chat_history");
    }
  };

  // Simple formatter helper to replace Markdown-like markers (** and \n)
  const formatMessageContent = (text: string) => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split("\n\n");
    return paragraphs.map((p, pIdx) => {
      // Split by newline for lines
      const lines = p.split("\n");
      return (
        <p key={pIdx} className="mb-2 leading-relaxed text-xs">
          {lines.map((line, lIdx) => {
            // Simple markdown bold converter
            const parts = line.split("**");
            const renderedLine = parts.map((part, partIdx) => {
              if (partIdx % 2 === 1) {
                return <strong key={partIdx} className="font-extrabold text-white">{part}</strong>;
              }
              return part;
            });
            return (
              <React.Fragment key={lIdx}>
                {renderedLine}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            );
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. FLOATING DRAGGABLE BUTTON */}
      <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleButtonClick}
        style={{
          right: `${position.x}px`,
          bottom: `${position.y}px`,
          zIndex: 9999
        }}
        className={`fixed w-11 h-11 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing border-2 border-emerald-400 hover:scale-105 active:scale-95 transition-transform duration-100 ${
          isOpen ? "ring-4 ring-emerald-500/30" : ""
        }`}
        title="OM Agent - Trợ lý Chiến lược"
      >
        <img
          src="/cute_ai_avatar.jpg"
          alt="OM Agent"
          className="w-full h-full rounded-full object-cover select-none pointer-events-none"
        />
      </button>

      {/* 2. CHAT PANEL */}
      {isOpen && (
        <div
          style={{
            right: `${position.x}px`,
            bottom: `${position.y + 60}px`,
            zIndex: 9998
          }}
          className="fixed w-[360px] h-[480px] bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-slate-900/80 px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/cute_ai_avatar.jpg"
                alt="OM Avatar"
                className="w-7 h-7 rounded-full object-cover border border-emerald-500/50"
              />
              <div>
                <h3 className="text-xs font-black text-white flex items-center gap-1">
                  OM Agent <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-slate-400">Trợ lý Chiến lược Sconnect</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition-colors hover:bg-white/5"
                title="Làm sạch hội thoại"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors hover:bg-white/5"
              >
                <Minimize2 size={14} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-slate-950 px-3 py-1.5 border-b border-white/5 flex gap-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex-1 text-[10px] font-bold py-1 rounded-md transition-all ${
                activeTab === "general"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              Chung
            </button>
            <button
              onClick={() => setActiveTab("okr")}
              className={`flex-1 text-[10px] font-bold py-1 rounded-md transition-all ${
                activeTab === "okr"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              OKR
            </button>
            <button
              onClick={() => setActiveTab("kpi")}
              className={`flex-1 text-[10px] font-bold py-1 rounded-md transition-all ${
                activeTab === "kpi"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              KPI
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "model" && (
                  <img
                    src="/cute_ai_avatar.jpg"
                    alt="Bot Avatar"
                    className="w-5.5 h-5.5 rounded-full object-cover mt-0.5 border border-emerald-500/30 flex-shrink-0"
                  />
                )}
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-slate-100 ${
                    msg.role === "user"
                      ? "bg-emerald-600/90 text-white rounded-tr-none font-medium"
                      : "bg-slate-900/95 border border-white/5 rounded-tl-none"
                  }`}
                >
                  {formatMessageContent(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start gap-2">
                <img
                  src="/cute_ai_avatar.jpg"
                  alt="Bot Avatar"
                  className="w-5.5 h-5.5 rounded-full object-cover mt-0.5 border border-emerald-500/30 flex-shrink-0"
                />
                <div className="bg-slate-900/95 border border-white/5 rounded-xl rounded-tl-none px-3.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions panel */}
          <div className="px-4 py-2 bg-slate-950/40 border-t border-white/5 space-y-1.5">
            <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Gợi ý câu hỏi nhanh:</p>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions[activeTab].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.query)}
                  disabled={isLoading}
                  className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium px-2.5 py-1 rounded-lg border border-white/5 transition-all text-left max-w-full truncate disabled:opacity-50"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 bg-slate-900/60 border-t border-white/5 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-slate-950/90 text-white text-xs px-3.5 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500/80 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl shadow transition-all disabled:opacity-50"
            >
              <Send size={14} style={{ color: "#ffffff" }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
