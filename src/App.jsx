import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, HelpCircle, Play, Info, Award, LineChart, CheckCircle2, XCircle, Lightbulb, Maximize, Search, Settings } from 'lucide-react';

const linearProgramData = [
  {
    id: 1,
    title: "Liều 1: Phân tích bài toán thực tế",
    info: "Bác thợ mộc có một tấm ván gỗ hình vuông cạnh 12 dm. Bác muốn cắt bỏ 4 hình vuông nhỏ ở 4 góc (mỗi cạnh là x dm) rồi gập các mép lên để tạo thành một chiếc hộp không nắp. Mục tiêu: Tìm x để hộp có thể tích lớn nhất.",
    question: "Kích thước đáy của chiếc hộp sau khi gập lên sẽ là một hình vuông có cạnh bằng bao nhiêu?",
    inputType: "mcq",
    options: ["12 - x", "12 - 2x"],
    correctAnswer: "12 - 2x",
    hint: "Hãy tưởng tượng bạn dùng kéo cắt đi 2 đoạn có độ dài x ở 2 đầu trái và phải của cạnh 12dm. Chiều dài phần ở giữa còn lại là bao nhiêu?",
    successFeedback: "Chính xác! Cạnh đáy bị cắt 2 đầu nên chiều dài còn lại là 12 - 2x.",
    visualType: "blueprint"
  },
  {
    id: 2,
    title: "Liều 2: Thiết lập hàm mục tiêu",
    info: "Sau khi gập, chiếc hộp có đáy là hình vuông cạnh (12 - 2x) và chiều cao chính là phần bị gập lên, tức là x. Thể tích hộp chữ nhật được tính bằng: V = diện tích đáy × chiều cao.",
    question: "Hàm số tính Thể tích V(x) của chiếc hộp này là:",
    inputType: "mcq",
    options: ["V(x) = x(12 - 2x)", "V(x) = x(12 - 2x)²"],
    correctAnswer: "V(x) = x(12 - 2x)²",
    hint: "Đáy của hộp là một hình vuông cạnh (12 - 2x). Diện tích của hình vuông được tính bằng công thức: Cạnh nhân Cạnh (hoặc Cạnh bình phương).",
    successFeedback: "Chuẩn luôn! Ta có hàm mục tiêu V(x) = x(12 - 2x)².",
    visualType: "function-machine"
  },
  {
    id: 3,
    title: "Liều 3: Điều kiện thực tế (tập xác định)",
    info: "Để chiếc hộp tồn tại thực tế, mọi kích thước của nó phải dương. Cụ thể: chiều cao x phải dương và độ dài cạnh đáy (12 - 2x) cũng phải dương.",
    question: "Từ các ràng buộc vật lý trên, hãy giải hệ bất phương trình để tìm khoảng giá trị của x. (Nhập dưới dạng khoảng (a; b) )",
    inputType: "text",
    placeholder: "Nhập khoảng giá trị...",
    correctAnswers: ["(0;6)", "(0; 6)", "0<x<6", "0 < x < 6", "(0,6)", "(0, 6)"],
    hint: "Giải bất phương trình 12 - 2x > 0 để biết x phải nhỏ hơn bao nhiêu. Sau đó kết hợp với x > 0 để tìm khoảng chung.",
    successFeedback: "Đúng vậy! Tập xác định hợp lệ là x ∈ (0; 6).",
    visualType: "domain-search"
  },
  {
    id: 4,
    title: "Liều 4: Sử dụng công cụ đạo hàm",
    info: "Khai triển hàm số ta được: V(x) = 4x³ - 48x² + 144x. Để tìm cực trị, ta dùng công cụ mạnh nhất của Giải tích 12: đạo hàm.",
    question: "Đạo hàm V'(x) của hàm số trên là gì?",
    inputType: "mcq",
    options: ["V'(x) = 12x² - 96x + 144", "V'(x) = 4x² - 96x + 144"],
    correctAnswer: "V'(x) = 12x² - 96x + 144",
    hint: "Áp dụng quy tắc đạo hàm (xⁿ)' = n.xⁿ⁻¹. Chi tiết: (4x³)' = 3.4x² = 12x²; (-48x²)' = 2.(-48)x = -96x; (144x)' = 144. Ghép lại nhé!",
    successFeedback: "Chính xác! Bạn tính đạo hàm rất chuẩn.",
    visualType: "derivative-gear"
  },
  {
    id: 5,
    title: "Liều 5: Tìm các điểm tới hạn",
    info: "Điểm cực trị xảy ra khi đạo hàm bằng 0. Ta cần giải phương trình: V'(x) = 0.",
    question: "Hãy giải phương trình 12x² - 96x + 144 = 0 để tìm 2 điểm tới hạn. (Nhập 2 số cách nhau bởi dấu phẩy, VD: 3, 4)",
    inputType: "text",
    placeholder: "Nhập hai nghiệm...",
    correctAnswers: ["2, 6", "2,6", "6, 2", "6,2", "2; 6", "2;6"],
    hint: "Bạn có thể chia cả 2 vế cho 12 để rút gọn thành x² - 8x + 12 = 0. Sau đó nhẩm nghiệm bằng định lý Vi-ét (Tổng=8, Tích=12) hoặc bấm máy tính.",
    successFeedback: "Chính xác! Hai điểm tới hạn là x = 2 và x = 6.",
    visualType: "graph-roots-hard"
  },
  {
    id: 6,
    title: "Liều 6: Xác định thể tích cực đại",
    info: "Trong hai nghiệm x=2 và x=6, chỉ có x=2 nằm trong tập xác định (0; 6). Ta tiến hành tính thể tích tại điểm này.",
    question: "Với x = 2 dm, thể tích lớn nhất V_max của hộp là bao nhiêu dm³? (Nhập số liệu)",
    inputType: "text",
    placeholder: "Tính kết quả V(2)...",
    correctAnswers: ["128", "128dm3", "128 dm3"],
    hint: "Thay x=2 vào biểu thức V = x(12 - 2x)². Tính 12 - 4 = 8, sau đó bình phương lên rồi nhân với 2 ở ngoài.",
    successFeedback: "Xuất sắc! Thể tích cực đại đạt được là 128 dm³.",
    visualType: "graph-max"
  },
  {
    id: 7,
    title: "Liều 7: Bài toán phụ - Diện tích bề mặt",
    info: "Khi x = 2, chiếc hộp có thể tích 128 dm³. Có một sự trùng hợp bất ngờ giữa Thể tích và Diện tích trong bài toán tối ưu này.",
    question: "Hãy tính tổng diện tích bề mặt (diện tích toàn phần không nắp) của hộp khi x = 2. Bạn tìm ra kết quả là bao nhiêu?",
    inputType: "text",
    placeholder: "Nhập tổng diện tích...",
    correctAnswers: ["128", "128dm2", "128 dm2"],
    hint: "Diện tích đáy là 8 × 8. Diện tích 4 mặt bên là 4 × (8 × 2). Hãy cộng chúng lại với nhau.",
    successFeedback: "Chính xác! Diện tích toàn phần cũng là 128. Thật kỳ diệu khi V = Stp tại điểm tối ưu!",
    visualType: "magic-balance"
  }
];

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState({});
  const [animate, setAnimate] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    setAnimate(false);
    setSubmitStatus('idle');
    setInputValue('');
    setShowHint(false);
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [currentStep, hasStarted]);

  const handleCheckAnswer = () => {
    const dose = linearProgramData[currentStep];
    let isCorrect = false;

    if (dose.inputType === 'mcq') {
      isCorrect = inputValue === dose.correctAnswer;
    } else {
      isCorrect = dose.correctAnswers.some(
        ans => ans.toLowerCase().replace(/\s/g, '') === inputValue.toLowerCase().replace(/\s/g, '')
      );
    }

    if (isCorrect) {
      setSubmitStatus('correct');
      setShowHint(false);
    } else {
      setSubmitStatus('incorrect');
      if (!showHint) {
        setShowHint(true);
      }
    }
  };

  const handleNext = () => {
    setAnswers({ ...answers, [currentStep]: inputValue });
    if (currentStep < linearProgramData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReplayAnimation = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };

  // ----------------------------------------
  // INTRO SCREEN
  // ----------------------------------------
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 font-sans">
        <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          
          {/* Header */}
          <div className="bg-slate-900 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-teal-500 text-white px-5 py-1.5 rounded-full text-sm font-bold tracking-widest mb-6 shadow-lg shadow-teal-500/30">
                NHÓM 11
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Nhiệm vụ 7.2. Thiết kế ví dụ minh hoạ <br className="hidden md:block" /> về dạy học chương trình hoá
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12">
            
            <div className="mb-10 border-l-4 border-amber-400 pl-6 py-2 bg-gradient-to-r from-amber-50/80 to-transparent rounded-r-xl">
              <h3 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <CheckCircle size={16} /> Yêu cầu 2
              </h3>
              <p className="text-slate-700 font-medium leading-relaxed text-sm md:text-base">
                Hãy xây dựng một đoạn chương trình đường thẳng gồm ít nhất 7 liều (khuyến khích nhiều liều hơn) về nội dung môn toán ở trung học phổ thông.
              </p>
            </div>

            <div className="bg-teal-50/50 rounded-3xl p-8 md:p-10 text-center border border-teal-100 mb-10 shadow-inner relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 rounded-full border border-teal-100 text-xs font-bold text-teal-600 uppercase tracking-widest">
                 Tên bài học
               </div>
               <h3 className="text-2xl md:text-4xl font-extrabold text-teal-900 mt-2 mb-4">
                 Ứng dụng đạo hàm: Bài toán tối ưu hóa cắt hộp
               </h3>
               <div className="inline-block bg-white px-4 py-1.5 rounded-md border border-slate-200 text-slate-600 font-medium text-sm shadow-sm">
                 Toán học Lớp 12 - Chương trình mới
               </div>
            </div>

            <div className="flex justify-center">
               <button
                 onClick={() => setHasStarted(true)}
                 className="group bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 px-12 rounded-full transition-all text-lg shadow-lg shadow-teal-600/30 flex items-center gap-3 hover:-translate-y-1"
               >
                 <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                 Bắt đầu trải nghiệm
               </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // MAIN APP LOGIC
  // ----------------------------------------
  const currentDose = linearProgramData[currentStep];

  const getGraphPath = () => {
    let pts = [];
    for(let i=0; i<=6.5; i+=0.1){
      let v = 4*Math.pow(i,3) - 48*Math.pow(i,2) + 144*i;
      pts.push(`${50 + i*42},${250 - v*1.3}`);
    }
    return `M ${pts.join(' L ')}`;
  };

  const renderVisual = () => {
    const type = currentDose.visualType;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 p-6 relative overflow-hidden">
        <button 
          onClick={handleReplayAnimation}
          className="absolute top-4 right-4 bg-teal-50 p-2 rounded-full shadow hover:shadow-md text-teal-600 transition-all z-10 border border-teal-100"
          title="Phát lại hiệu ứng"
        >
          <Play size={20} />
        </button>

        <svg viewBox="0 0 400 300" className="w-full h-full max-h-80 drop-shadow-sm">
          <defs>
            <marker id="arrow-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#0d9488" />
            </marker>
          </defs>

          {/* Type 1: Blueprint */}
          {type === "blueprint" && (
            <g transform="translate(100, 50)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.5s'}}>
              <rect x="0" y="0" width="200" height="200" fill="#ccfbf1" stroke="#0f766e" strokeWidth="3" />
              
              <g style={{ transition: 'opacity 1s ease', opacity: animate ? 1 : 0 }}>
                <rect x="0" y="0" width="40" height="40" fill="#f87171" opacity="0.8" />
                <rect x="160" y="0" width="40" height="40" fill="#f87171" opacity="0.8" />
                <rect x="0" y="160" width="40" height="40" fill="#f87171" opacity="0.8" />
                <rect x="160" y="160" width="40" height="40" fill="#f87171" opacity="0.8" />
              </g>

              <line x1="40" y1="40" x2="160" y2="40" stroke="#0f766e" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="40" y1="160" x2="160" y2="160" stroke="#0f766e" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="40" y1="40" x2="40" y2="160" stroke="#0f766e" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="160" y1="40" x2="160" y2="160" stroke="#0f766e" strokeWidth="2" strokeDasharray="5,5" />

              <text x="100" y="-10" textAnchor="middle" fill="#0f766e" className="font-bold">12 dm</text>
              <text x="20" y="25" textAnchor="middle" fill="white" className="font-bold text-sm">x</text>
              <line x1="0" y1="-5" x2="200" y2="-5" stroke="#0f766e" strokeWidth="1" />
              
              <text x="100" y="105" textAnchor="middle" fill="#0f766e" className="font-bold text-xl" style={{ opacity: animate ? 1 : 0, transition: 'opacity 1s 1s' }}>
                {submitStatus === 'correct' ? '12 - 2x' : '?'}
              </text>
            </g>
          )}

          {/* Type 2: Function Machine */}
          {type === "function-machine" && (
            <g transform="translate(20, 100)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s ease-in-out'}}>
              <rect x="0" y="30" width="50" height="40" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
              <text x="25" y="55" textAnchor="middle" fill="#475569" className="font-bold">x</text>
              <line x1="50" y1="50" x2="100" y2="50" stroke="#0f766e" strokeWidth="3" markerEnd="url(#arrow-teal)" strokeDasharray="5,5">
                 {/* Re-added animation tag */}
                 {animate && <animate attributeName="stroke-dashoffset" values="10;0" dur="0.5s" repeatCount="indefinite" />}
              </line>

              {/* Increased rect width to 160 to prevent text overflow */}
              <rect x="100" y="10" width="160" height="80" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="3" />
              <text x="180" y="40" textAnchor="middle" fill="#0f766e" className="font-bold text-[11px] uppercase tracking-widest">Cỗ máy hàm số</text>
              
              <rect x="115" y="50" width="130" height="30" rx="6" fill="#ffffff" stroke="#0d9488" strokeWidth="1" />
              <text x="180" y="70" textAnchor="middle" fill="#0f766e" className="font-bold text-sm">
                {submitStatus === 'correct' ? 'x(12 - 2x)²' : 'V(x) = ?'}
              </text>

              <line x1="260" y1="50" x2="310" y2="50" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow-teal)" strokeDasharray="5,5">
                 {/* Re-added animation tag */}
                 {animate && <animate attributeName="stroke-dashoffset" values="10;0" dur="0.5s" repeatCount="indefinite" />}
              </line>
              <rect x="310" y="30" width="50" height="40" rx="8" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="2" />
              <text x="335" y="55" textAnchor="middle" fill="#0369a1" className="font-bold">V</text>
            </g>
          )}

          {/* Type 3: Domain Search Abstract Visual */}
          {type === "domain-search" && (
            <g transform="translate(100, 50)" style={{opacity: animate ? 1 : 0, transition: 'opacity 1s ease-in-out'}}>
               <g>
                 {/* Added hovering animation for magnifying glass */}
                 {animate && <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="3s" repeatCount="indefinite" />}
                 <circle cx="100" cy="90" r="55" fill="#f0fdfa" stroke="#14b8a6" strokeWidth="4" />
                 <line x1="140" y1="130" x2="175" y2="165" stroke="#14b8a6" strokeWidth="10" strokeLinecap="round" />
                 <circle cx="100" cy="90" r="40" fill="#ccfbf1" opacity="0.5" />
                 
                 <text x="100" y="105" textAnchor="middle" fill="#0f766e" className="font-bold text-4xl font-serif">D = ?</text>
               </g>
               <text x="100" y="210" textAnchor="middle" fill="#64748b" className="font-bold text-xs uppercase tracking-widest">
                 {submitStatus === 'correct' ? 'Đã tìm thấy tập xác định' : 'Tìm điều kiện thực tế'}
               </text>
            </g>
          )}

          {/* Type 4: Derivative Gear Abstract Visual */}
          {type === "derivative-gear" && (
            <g transform="translate(100, 50)" style={{opacity: animate ? 1 : 0, transition: 'opacity 1s ease-in-out'}}>
               {/* Spinning outer gear representation with robust SVG animation */}
               <g style={{transformOrigin: '100px 90px'}}>
                 {animate && <animateTransform attributeName="transform" type="rotate" from="0 100 90" to="360 100 90" dur="10s" repeatCount="indefinite" />}
                 <circle cx="100" cy="90" r="60" fill="#f8fafc" stroke="#94a3b8" strokeWidth="8" strokeDasharray="16 12" />
                 <circle cx="100" cy="90" r="48" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                 <circle cx="100" cy="90" r="40" fill="#ffffff" />
               </g>
               
               <text x="100" y="100" textAnchor="middle" fill="#334155" className="font-serif italic text-3xl font-bold">d/dx</text>
               <text x="100" y="195" textAnchor="middle" fill="#64748b" className="font-bold text-xs uppercase tracking-widest">
                 {submitStatus === 'correct' ? 'Đã xử lý hàm số' : 'Xử lý đạo hàm'}
               </text>
            </g>
          )}

          {/* Type 5: Graph Roots of Derivative (Parabola with TWO question marks) */}
          {type === "graph-roots-hard" && (
            <g style={{opacity: animate ? 1 : 0, transition: 'opacity 0.5s'}}>
              <line x1="30" y1="200" x2="370" y2="200" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow-teal)" />
              <line x1="50" y1="250" x2="50" y2="30" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow-teal)" />
              <text x="360" y="220" fill="#64748b" className="font-bold font-serif italic">x</text>
              <text x="30" y="40" fill="#64748b" className="font-bold font-serif italic">V'(x)</text>

              <path
                d="M 70 35 Q 210 525 350 35"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ strokeDasharray: 800, strokeDashoffset: animate ? 0 : 800, transition: 'stroke-dashoffset 1.5s ease-in-out' }}
              />
              
              <text x="210" y="150" textAnchor="middle" fill="#f43f5e" className="font-bold text-sm" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.5s 1.5s'}}>
                Đồ thị đạo hàm V'(x)
              </text>

              {/* Root 1 (x_1) */}
              <g style={{ opacity: animate ? 1 : 0, transition: 'opacity 0.5s 1.5s' }}>
                <circle cx="130" cy="200" r="6" fill="#0ea5e9" />
                <text x="130" y="225" textAnchor="middle" fill="#0ea5e9" className="font-bold text-sm">
                  {submitStatus === 'correct' ? 'x₁ = 2' : 'x₁ = ?'}
                </text>
              </g>

              {/* Root 2 (x_2) */}
              <g style={{ opacity: animate ? 1 : 0, transition: 'opacity 0.5s 1.5s' }}>
                <circle cx="290" cy="200" r="6" fill="#0ea5e9" />
                <text x="290" y="225" textAnchor="middle" fill="#0ea5e9" className="font-bold text-sm">
                  {submitStatus === 'correct' ? 'x₂ = 6' : 'x₂ = ?'}
                </text>
              </g>
            </g>
          )}

          {/* Type 6: Maximum Point Highlight (Cubic Graph) */}
          {type === "graph-max" && (
            <g style={{opacity: animate ? 1 : 0, transition: 'opacity 0.5s'}}>
              {/* Axes */}
              <line x1="50" y1="250" x2="350" y2="250" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow-teal)" />
              <line x1="50" y1="250" x2="50" y2="20" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow-teal)" />
              <text x="340" y="270" fill="#64748b" className="font-bold font-serif italic">x</text>
              <text x="30" y="30" fill="#64748b" className="font-bold font-serif italic">V(x)</text>

              {/* Ticks */}
              <text x="134" y="270" fill="#94a3b8" className="text-xs font-bold">2</text>
              {submitStatus === 'correct' && (
                <text x="25" y="88" fill="#94a3b8" className="text-xs font-bold">128</text>
              )}

              {/* Function Curve */}
              <path 
                d={getGraphPath()} 
                fill="none" 
                stroke="#0ea5e9" 
                strokeWidth="4" 
                strokeLinecap="round"
                style={{ strokeDasharray: 1000, strokeDashoffset: animate ? 0 : 1000, transition: 'stroke-dashoffset 2s ease-in-out' }}
              />

              <g style={{ opacity: animate ? 1 : 0, transition: 'opacity 1s 1s' }}>
                <line x1="50" y1="83.6" x2="134" y2="83.6" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="134" y1="250" x2="134" y2="83.6" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="134" cy="83.6" r="7" fill="#f59e0b" stroke="white" strokeWidth="2" />
                
                <rect x="144" y="60" width="80" height="30" rx="4" fill="#f59e0b" />
                <text x="184" y="80" textAnchor="middle" fill="white" className="font-bold text-sm">
                  {submitStatus === 'correct' ? 'Max: 128' : 'Max: ?'}
                </text>
              </g>
            </g>
          )}

          {/* Type 7: Magic Balance */}
          {type === "magic-balance" && (
            <g style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s'}}>
               
               {/* Left Card: Volume */}
               <g style={{
                   transform: submitStatus === 'correct' ? 'translate(60px, 90px)' : 'translate(60px, 50px)',
                   transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
               }}>
                   <rect x="0" y="0" width="110" height="130" rx="16" fill="#f0fdfa" stroke="#14b8a6" strokeWidth="3" />
                   {/* 3D Box Icon */}
                   <path d="M30 45 L55 35 L80 45 L80 75 L55 85 L30 75 Z" fill="#99f6e4" stroke="#0d9488" strokeWidth="2"/>
                   <path d="M55 35 L55 60 L80 45 M30 45 L55 60 L55 85" stroke="#0d9488" strokeWidth="2" fill="none"/>
                   
                   <text x="55" y="110" textAnchor="middle" fill="#0f766e" className="font-bold text-xl">V_max</text>
               </g>

               {/* Right Card: Surface Area */}
               <g style={{
                   transform: submitStatus === 'correct' ? 'translate(230px, 90px)' : 'translate(230px, 130px)',
                   transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
               }}>
                   <rect x="0" y="0" width="110" height="130" rx="16" fill="#fffbeb" stroke="#f59e0b" strokeWidth="3" />
                   {/* Unfolded Net Icon */}
                   <rect x="45" y="25" width="20" height="20" fill="#fde68a" stroke="#d97706" strokeWidth="2"/>
                   <rect x="25" y="45" width="20" height="20" fill="#fde68a" stroke="#d97706" strokeWidth="2"/>
                   <rect x="45" y="45" width="20" height="20" fill="#fde68a" stroke="#d97706" strokeWidth="2"/>
                   <rect x="65" y="45" width="20" height="20" fill="#fde68a" stroke="#d97706" strokeWidth="2"/>
                   <rect x="45" y="65" width="20" height="20" fill="#fde68a" stroke="#d97706" strokeWidth="2"/>
                   
                   <text x="55" y="110" textAnchor="middle" fill="#b45309" className="font-bold text-xl">S_tp</text>
               </g>

               {/* The Magic Equal Sign & Value */}
               <g style={{
                   opacity: submitStatus === 'correct' ? 1 : 0,
                   transform: submitStatus === 'correct' ? 'scale(1)' : 'scale(0.5)',
                   transformOrigin: '200px 155px',
                   transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s',
               }}>
                   <circle cx="200" cy="155" r="28" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                   <text x="200" y="165" textAnchor="middle" fill="#475569" className="font-bold text-4xl">=</text>
                   
                   <rect x="150" y="235" width="100" height="36" rx="18" fill="#10b981" />
                   <text x="200" y="260" textAnchor="middle" fill="white" className="font-bold text-xl tracking-widest">128</text>
               </g>

               {/* Dotted lines showing alignment */}
               <line x1="60" y1="155" x2="340" y2="155" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,6" style={{opacity: submitStatus === 'correct' ? 0.3 : 0, transition: 'opacity 1s 1s'}} />
            </g>
          )}

        </svg>

        <p className="mt-4 text-[11px] font-medium text-teal-600/70 italic flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-full">
          <Maximize size={12}/> Minh họa tư duy Toán học
        </p>
      </div>
    );
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-teal-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-10 text-center border-t-8 border-teal-500">
          <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Hoàn thành bài toán Tối ưu</h1>
          <p className="text-slate-600 mb-8 text-sm leading-relaxed px-4">
            Bạn đã sử dụng thành công công cụ đạo hàm để giải quyết bài toán thực tế. Hãy ghi nhớ: tại điểm tối ưu, các đại lượng thường có sự cân bằng và đối xứng kỳ diệu!
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left mb-8 max-h-64 overflow-y-auto shadow-inner">
            <h3 className="font-bold text-teal-800 mb-4 text-xs uppercase tracking-widest border-b border-teal-200 pb-2">Hồ sơ giải bài:</h3>
            <ul className="space-y-3">
              {linearProgramData.map((dose) => (
                <li key={`summary-${dose.id}`} className="flex flex-col sm:flex-row gap-2 text-[12px] border-b border-slate-100 pb-2 last:border-0">
                  <span className="font-semibold text-teal-700 min-w-[140px]">{dose.title}:</span>
                  <span className="text-slate-700 bg-white px-2 py-0.5 rounded shadow-sm italic">"{answers[dose.id - 1]}"</span>
                </li>
              ))}
            </ul>
          </div>
          <button 
            onClick={() => { setCurrentStep(0); setAnswers({}); setIsFinished(false); setHasStarted(false); }}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition-all text-[13px] shadow-lg shadow-teal-200"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[650px] border border-slate-200">
        
        <div className="w-full md:w-5/12 bg-slate-900 text-white flex flex-col relative z-10 shadow-2xl">
          <div className="h-1.5 bg-slate-800 w-full relative">
            <div 
              className="absolute top-0 left-0 h-full bg-teal-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(45,212,191,0.5)]"
              style={{ width: `${((currentStep + 1) / linearProgramData.length) * 100}%` }}
            ></div>
          </div>
          <div className="p-8 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center gap-2 text-teal-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              Toán 12 • Giải tích • Tối ưu hóa
            </div>
            <h2 className="text-xl font-bold mb-6 text-white leading-tight">{currentDose.title}</h2>
            <div className="mb-6 flex-grow">
              <h3 className="flex items-center gap-2 text-slate-300 font-semibold mb-3 text-sm italic">
                <Info size={16} className="text-teal-400" /> Thông tin:
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm">{currentDose.info}</p>
            </div>
            <div className="mt-auto pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <HelpCircle size={16} /> Câu hỏi:
                </h3>
                {submitStatus !== 'correct' && (
                  <button 
                    onClick={() => setShowHint(!showHint)}
                    className="text-[11px] font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-amber-400 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all border border-slate-700"
                  >
                    <Lightbulb size={14} className={showHint ? "text-amber-400" : ""} />
                    {showHint ? "Ẩn gợi ý" : "Gợi ý"}
                  </button>
                )}
              </div>
              <p className="text-white mb-4 text-[14px] font-medium">{currentDose.question}</p>
              
              {/* Hint Box */}
              <div className={`overflow-hidden transition-all duration-300 ${showHint ? 'max-h-40 mb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-3 text-amber-200 text-[12px] italic flex items-start gap-2">
                  <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <p>{currentDose.hint}</p>
                </div>
              </div>
              
              {submitStatus === 'incorrect' && (
                <div className="bg-rose-500/10 border border-rose-500/40 rounded-lg p-3 mb-4 flex gap-2 items-start text-rose-200 text-[12px] animate-in fade-in zoom-in duration-300">
                  <XCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  <p>Sai rồi! Bạn hãy xem lại gợi ý và thử tính toán lại nhé.</p>
                </div>
              )}
              {submitStatus === 'correct' && (
                <div className="bg-teal-500/10 border border-teal-500/40 rounded-lg p-3 mb-4 flex gap-2 items-start text-teal-200 text-[12px] animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                  <p>{currentDose.successFeedback}</p>
                </div>
              )}
              
              <div className="flex flex-col gap-3">
                {currentDose.inputType === 'mcq' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    {currentDose.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setInputValue(option); setSubmitStatus('idle'); }}
                        disabled={submitStatus === 'correct'}
                        className={`px-4 py-3 rounded-xl border text-center text-[12px] font-bold transition-all ${
                          inputValue === option ? 'bg-teal-600 border-teal-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        } ${submitStatus === 'correct' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => { setInputValue(e.target.value); setSubmitStatus('idle'); }}
                    disabled={submitStatus === 'correct'}
                    placeholder={currentDose.placeholder}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-[14px] placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all disabled:opacity-50"
                    onKeyDown={(e) => {
                      if(e.key === 'Enter' && inputValue.trim() !== '' && submitStatus !== 'correct') handleCheckAnswer();
                      if(e.key === 'Enter' && submitStatus === 'correct') handleNext();
                    }}
                  />
                )}
                
                {submitStatus === 'correct' ? (
                  <button onClick={handleNext} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-teal-500 text-white hover:bg-teal-400 shadow-lg shadow-teal-900/20 transition-all text-[14px]">
                    {currentStep === linearProgramData.length - 1 ? 'Hoàn thành bài học' : 'Chuyển sang liều tiếp theo'} 
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button onClick={handleCheckAnswer} disabled={inputValue.trim() === ''} className={`w-full py-3 rounded-xl font-bold transition-all text-[14px] ${
                    inputValue.trim() !== '' ? 'bg-amber-500 text-slate-900 hover:bg-amber-400 shadow-lg' : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  }`}>Kiểm tra đáp án</button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 bg-slate-50 p-6 md:p-10 flex items-center justify-center">
          {renderVisual()}
        </div>
      </div>
    </div>
  );
}
