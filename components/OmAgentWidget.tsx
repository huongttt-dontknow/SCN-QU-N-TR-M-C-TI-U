"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, RotateCcw, Bot, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function OmAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
          content: "**OM AI Agent:** Xin chào! Tôi là **OM AI Agent** - Trợ lý Chiến lược và Quản trị Mục tiêu. Tôi ở đây để đồng hành (cowork) cùng bạn trong việc quản lý và xây dựng kế hoạch OKR/KPI theo định hướng Sconnect. Hãy chọn một chủ đề gợi ý hoặc hỏi tôi bất cứ điều gì nhé!"
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
      { text: "Điểm khác biệt chính giữa OKR và KPI?", query: "Phân biệt OKR và KPI theo quy chế của Sconnect?" },
      { text: "Gợi ý OKR quý 4", query: "Hãy gợi ý hoạch định OKR quý 4 cho các đơn vị dựa trên tài liệu bối cảnh chiến lược và xu hướng thị trường" },
      { text: "Đề xuất mục tiêu năm 2027", query: "Đề xuất định hướng mục tiêu năm 2027 cho các đơn vị của Sconnect" }
    ],
    kpi: [
      { text: "Chiến lược Q3/2026 của BP Wolfoo?", query: "Định hướng mục tiêu Quý 3/2026 của BP Wolfoo?" },
      { text: "Nhiệm vụ của Nhóm AI năm nay?", query: "Vai trò và nhiệm vụ chiến lược của Nhóm AI trong 2026?" },
      { text: "Gợi ý chỉ số doanh thu mục tiêu", query: "Gợi ý thiết lập chỉ số doanh thu mục tiêu và KPIs tương ứng cho kỳ tới" }
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
          { role: "model", content: "**OM AI Agent:** Tôi gặp sự cố khi xử lý dữ liệu. Vui lòng thử lại sau giây lát!" }
        ]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "**OM AI Agent:** Kết nối máy chủ thất bại. Vui lòng kiểm tra lại mạng hoặc API Key." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat conversation history
  const handleClearHistory = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch sử trò chuyện với OM AI Agent?")) {
      const initMsg: Message = {
        role: "model",
        content: "**OM AI Agent:** Lịch sử trò chuyện đã được làm sạch. Tôi có thể hỗ trợ gì cho bạn trong quản lý mục tiêu hôm nay?"
      };
      setMessages([initMsg]);
      sessionStorage.removeItem("om_agent_chat_history");
    }
  };

  // Simple formatter helper to replace Markdown-like markers (** and \n)
  const formatMessageContent = (text: string, role: "user" | "model") => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split("\n\n");
    return paragraphs.map((p, pIdx) => {
      // Split by newline for lines
      const lines = p.split("\n");
      return (
        <p key={pIdx} className="mb-2 leading-relaxed text-[13px] !text-white">
          {lines.map((line, lIdx) => {
            // Simple markdown bold converter
            const parts = line.split("**");
            const renderedLine = parts.map((part, partIdx) => {
              if (partIdx % 2 === 1) {
                if (role === "model") {
                  // On green gradient background, use yellow/gold for highlights to maximize readability
                  const isPurple = /okr|kpi|chiến lược|làm lớn|làm tròn/i.test(part);
                  const colorClass = isPurple ? "text-yellow-300 font-extrabold" : "text-lime-200 font-bold";
                  return <strong key={partIdx} className={colorClass}>{part}</strong>;
                } else {
                  // On user dark slate background, use teal-200 for highlights
                  return <strong key={partIdx} className="font-black text-teal-200">{part}</strong>;
                }
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
        className={`fixed w-[52px] h-[52px] rounded-full bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing border-2 border-emerald-400 hover:scale-105 active:scale-95 transition-transform duration-100 overflow-hidden ${
          isOpen ? "ring-4 ring-emerald-500/30" : ""
        }`}
        title="OM AI Agent - Trợ lý Chiến lược"
      >
        <img
          src="/cute_ai_avatar.png"
          alt="OM AI Agent"
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </button>

      {/* 2. CHAT PANEL */}
      {isOpen && (
        <div
          style={{
            right: `${position.x}px`,
            bottom: `${position.y + 65}px`,
            zIndex: 9998
          }}
          className={`fixed bg-white border border-slate-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 transition-all ${
            isExpanded ? "w-[560px] h-[720px]" : "w-[390px] h-[540px]"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-3 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shadow-inner flex-shrink-0">
                <img
                  src="/cute_ai_avatar.png"
                  alt="OM Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-black flex items-center gap-1" style={{ color: "#ffffff" }}>
                  OM AI Agent <span className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse"></span>
                </h3>
                <p className="text-xs text-emerald-100 font-medium">Trợ lý Chiến lược Sconnect</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-emerald-100 hover:text-white rounded-lg transition-colors hover:bg-white/10"
                title={isExpanded ? "Thu nhỏ khung chat" : "Mở rộng khung chat"}
              >
                {isExpanded ? (
                  <Minimize2 size={16} style={{ color: "#ffffff" }} />
                ) : (
                  <Maximize2 size={16} style={{ color: "#ffffff" }} />
                )}
              </button>
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-emerald-100 hover:text-red-200 rounded-lg transition-colors hover:bg-white/10"
                title="Làm sạch hội thoại"
              >
                <RotateCcw size={16} style={{ color: "#e2f8f0" }} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-100 hover:text-white rounded-lg transition-colors hover:bg-white/10"
              >
                <X size={16} style={{ color: "#ffffff" }} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-slate-50/50 px-3 py-1.5 border-b border-slate-100 flex gap-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all ${
                activeTab === "general"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              Chung
            </button>
            <button
              onClick={() => setActiveTab("okr")}
              className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all ${
                activeTab === "okr"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              OKR
            </button>
            <button
              onClick={() => setActiveTab("kpi")}
              className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all ${
                activeTab === "kpi"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              KPI
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "model" && (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-500/20 shadow-inner flex-shrink-0 mt-0.5">
                    <img
                      src="/cute_ai_avatar.png"
                      alt="Bot Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-tr-none font-medium"
                      : "bg-gradient-to-br from-emerald-600/90 to-green-600/90 text-white rounded-tl-none border-0"
                  }`}
                >
                  {formatMessageContent(msg.content, msg.role)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start gap-2.5">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-500/20 shadow-inner flex-shrink-0 mt-0.5">
                  <img
                    src="/cute_ai_avatar.png"
                    alt="Bot Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-[13px]">
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
          {messages.length <= 1 && (
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 space-y-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gợi ý câu hỏi nhanh:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions[activeTab].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q.query)}
                    disabled={isLoading}
                    className="text-xs bg-white hover:bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm transition-all text-left max-w-full truncate disabled:opacity-50"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-white text-slate-800 text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50 shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl shadow transition-all disabled:opacity-50"
            >
              <Send size={16} style={{ color: "#ffffff" }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
