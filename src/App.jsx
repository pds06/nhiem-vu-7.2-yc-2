import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, HelpCircle, Play, Info, Award, CheckCircle2, XCircle, AlertTriangle, GitMerge, RotateCcw, GitBranch, Maximize } from 'lucide-react';

// Dữ liệu Chương trình phân nhánh (Branched Programming)
const branchedProgramData = [
  {
    id: 1,
    type: 'question',
    isRemedial: false,
    title: "Liều 1: Nhận diện tỉ trọng",
    info: "Một nhà máy sản xuất điện thoại có hai dây chuyền: Máy I và Máy II. Trong đó, Máy I đảm nhận 60% tổng sản lượng của nhà máy, phần còn lại do Máy II sản xuất. Ta lấy ngẫu nhiên 1 chiếc điện thoại từ kho.",
    question: "Xác suất để chiếc điện thoại vừa lấy ra là do Máy I sản xuất bằng bao nhiêu?",
    inputType: "mcq",
    options: ["0.4", "0.6", "0.06", "60"],
    correctAnswer: "0.6",
    correctFeedback: "Chính xác! 60% tương đương với xác suất 0.6.",
    incorrectFeedback: "Chưa đúng rồi! Hệ thống sẽ chuyển bạn sang liều phụ đạo để ôn lại cách chuyển đổi nhé.",
    correctNext: 3,   
    incorrectNext: 2, 
    visualType: "factory-split"
  },
  {
    id: 2,
    type: 'remedial',
    isRemedial: true,
    title: "Góc phụ đạo 1: Hiểu về xác suất %",
    info: "Bạn đã nhầm lẫn khi chuyển đổi phần trăm. Trong toán học, 'phần trăm' (%) nghĩa là chia cho 100. \n\nSản lượng của Máy I là 60%. Khi quy đổi ra xác suất (thang đo từ 0 đến 1), ta lấy: 60 ÷ 100 = 0.6. \nTương tự, Máy II sản xuất 40% (vì 100% - 60% = 40%), nên xác suất của Máy II là 0.4.",
    question: "Hãy ghi nhớ: P(Máy I) = 0.6 và P(Máy II) = 0.4. Nhấn nút bên dưới để quay lại mạch kiến thức chính.",
    correctNext: 3, 
    visualType: "percent-conversion"
  },
  {
    id: 3,
    type: 'question',
    isRemedial: false,
    title: "Liều 2: Xác suất giao (quy tắc nhân)",
    info: "Ta đã có P(Máy I) = 0.6. \nBiết thêm rằng: tỉ lệ sản xuất ra điện thoại bị lỗi (phế phẩm) của Máy I là 2%. Nghĩa là nếu biết chắc điện thoại từ Máy I, xác suất lỗi là 0.02.",
    question: "Hãy tính xác suất để lấy ngẫu nhiên 1 chiếc điện thoại trong kho mà nó 'vừa thuộc Máy I, vừa bị lỗi'? (Nhập số thập phân)",
    inputType: "text",
    placeholder: "Nhập số (VD: 0.5)...",
    correctAnswers: ["0.012", "0,012"],
    correctFeedback: "Xuất sắc! Bạn đã áp dụng đúng quy tắc nhân xác suất.",
    incorrectFeedback: "Sai mất rồi. Có vẻ bạn chưa nhớ quy tắc nhân xác suất trên sơ đồ cây. Cùng xem liều phụ đạo nhé!",
    correctNext: 5,
    incorrectNext: 4,
    visualType: "tree-branch-1"
  },
  {
    id: 4,
    type: 'remedial',
    isRemedial: true,
    title: "Góc phụ đạo 2: Quy tắc nhân trên sơ đồ cây",
    info: "Để một biến cố xảy ra theo chuỗi (vừa từ Máy I -> vừa bị lỗi), ta phải dùng quy tắc nhân: \nP(Máy I ∩ Lỗi) = P(Máy I) × P(Lỗi | Máy I)\n\nCụ thể ở đây:\n- Xác suất rơi vào Máy I: 0.6\n- Xác suất bị lỗi tại Máy I: 2% = 0.02\n=> Xác suất chung: 0.6 × 0.02 = 0.012.",
    question: "Tích của các nhánh trên sơ đồ cây chính là xác suất của biến cố giao. Hãy tiếp tục để áp dụng nó!",
    correctNext: 5,
    visualType: "tree-multiplication"
  },
  {
    id: 5,
    type: 'question',
    isRemedial: false,
    title: "Liều 3: Xác suất toàn phần",
    info: "Bạn đã biết nhóm phế phẩm từ Máy I chiếm tỉ lệ 0.012 (tức 1.2% toàn nhà máy). \nGiờ xét Máy II: sản lượng chiếm 40% (0.4) và tỉ lệ làm ra lỗi của Máy II là 5% (0.05).",
    question: "Hỏi xác suất để bốc ngẫu nhiên trúng 1 chiếc điện thoại bị lỗi (bất kể từ máy nào) là bao nhiêu?",
    inputType: "text",
    placeholder: "Nhập số thập phân...",
    correctAnswers: ["0.032", "0,032"],
    correctFeedback: "Hoàn toàn chính xác! Lỗi = lỗi Máy I + lỗi Máy II = 0.012 + 0.020 = 0.032.",
    incorrectFeedback: "Đáp án chưa chuẩn. Bạn quên cộng tổng các trường hợp rồi. Mời rẽ nhánh để xem hướng dẫn.",
    correctNext: 7,
    incorrectNext: 6,
    visualType: "tree-full"
  },
  {
    id: 6,
    type: 'remedial',
    isRemedial: true,
    title: "Góc phụ đạo 3: Công thức xác suất toàn phần",
    info: "Điện thoại bị lỗi có thể xuất phát từ Máy I hoặc Máy II. Bạn cần tính xác suất của từng nhánh rồi cộng lại:\n\n1. Nhánh Máy I bị lỗi: 0.6 × 0.02 = 0.012\n2. Nhánh Máy II bị lỗi: 0.4 × 0.05 = 0.020\n\n=> Xác suất toàn phần P(Lỗi) = 0.012 + 0.020 = 0.032.",
    question: "Vậy, trung bình cứ 1000 điện thoại thì nhà máy có 32 chiếc bị lỗi. Ghi nhớ số 0.032 này nhé!",
    correctNext: 7,
    visualType: "total-prob"
  },
  {
    id: 7,
    type: 'question',
    isRemedial: false,
    title: "Liều 4: Suy luận ngược (định lý Bayes)",
    info: "Tình huống thực tế: Một khách hàng mua phải 1 chiếc điện thoại bị lỗi (biến cố lỗi đã chắc chắn xảy ra). Khách hàng muốn kiện dây chuyền sản xuất.",
    question: "Xác suất để chiếc điện thoại lỗi này có nguồn gốc từ Máy I là bao nhiêu? (Nhập dưới dạng phân số tối giản a/b, VD: 1/2)",
    inputType: "text",
    placeholder: "Nhập phân số (VD: 1/4)...",
    correctAnswers: ["3/8", "12/32", "0.375", "37.5%"],
    correctFeedback: "Tuyệt đỉnh! Bạn vừa tự mình chứng minh định lý Bayes phức tạp của Toán 12.",
    incorrectFeedback: "Rất nhiều người trả lời sai câu này do tư duy trực giác. Hãy vào nhánh phụ đạo cuối cùng để thấy sự kỳ diệu của Bayes!",
    correctNext: 9,
    incorrectNext: 8,
    visualType: "bayes-question"
  },
  {
    id: 8,
    type: 'remedial',
    isRemedial: true,
    title: "Góc phụ đạo 4: Thu hẹp không gian mẫu",
    info: "Vì chiếc điện thoại đã bị lỗi, nên không gian mẫu của chúng ta bị thu hẹp lại, không còn là 100% nhà máy nữa, mà chỉ còn là tập hợp các điện thoại lỗi (chiếm 0.032).\n\nTrong tập hợp 0.032 nhỏ bé này, phần đóng góp của Máy I là bao nhiêu? Đó là 0.012.\n\n=> Xác suất P(Máy I | Lỗi) = 0.012 / 0.032 = 12 / 32 = 3 / 8.",
    question: "Đây chính là cốt lõi của định lý Bayes: Lấy 'nhánh cần tính' chia cho 'tổng tất cả các nhánh'.",
    correctNext: 9,
    visualType: "bayes-zoom"
  },
  {
    id: 9,
    type: 'summary',
    isRemedial: false,
    title: "Hoàn thành phân nhánh",
    info: "",
    question: "",
    visualType: "celebration"
  }
];

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [submitStatus, setSubmitStatus] = useState('idle'); 
  const [learningPath, setLearningPath] = useState([1]); 
  const [animate, setAnimate] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentNode = branchedProgramData.find(node => node.id === currentNodeId) || branchedProgramData[0];
  const isFinished = currentNode.type === 'summary';

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
  }, [currentNodeId, hasStarted]);

  const handleCheckAnswer = () => {
    let isCorrect = false;

    if (currentNode.inputType === 'mcq') {
      isCorrect = inputValue === currentNode.correctAnswer;
    } else {
      isCorrect = currentNode.correctAnswers.some(
        ans => ans.toLowerCase().replace(/\s/g, '') === inputValue.toLowerCase().replace(/\s/g, '')
      );
    }

    if (isCorrect) {
      setSubmitStatus('correct');
      setShowHint(false);
    } else {
      setSubmitStatus('incorrect');
      if (!showHint) setShowHint(true);
    }
  };

  const handleNextNode = (nextId) => {
    setLearningPath([...learningPath, nextId]);
    setCurrentNodeId(nextId);
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans text-left">
        <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-amber-500 text-slate-900 px-5 py-1.5 rounded-full text-sm font-bold tracking-widest mb-6 shadow-lg shadow-amber-500/30 flex items-center gap-2">
                <GitBranch size={16}/> NHÓM 11
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Nhiệm vụ 7.2. Thiết kế ví dụ minh hoạ <br className="hidden md:block" /> về dạy học chương trình hoá
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-12 text-left">
            <div className="mb-10 border-l-4 border-indigo-500 pl-6 py-4 bg-gradient-to-r from-indigo-50/80 to-transparent rounded-r-xl">
              <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                <GitMerge size={16} /> Yêu cầu 1
              </h3>
              <p className="text-slate-700 font-medium leading-relaxed text-sm md:text-base">
                Hãy xây dựng một đoạn chương trình có phân nhánh gồm ít nhất 7 liều (khuyến khích nhiều liều hơn) về nội dung môn toán ở trung học phổ thông.
              </p>
            </div>

            <div className="bg-indigo-50/50 rounded-3xl p-8 md:p-10 text-center border border-indigo-100 mb-10 shadow-inner relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 rounded-full border border-indigo-100 text-xs font-bold text-indigo-600 uppercase tracking-widest shadow-sm">
                 Tên bài học
               </div>
               <h3 className="text-2xl md:text-4xl font-extrabold text-indigo-950 mt-2 mb-4">
                 Xác suất có điều kiện và công thức Bayes
               </h3>
               <div className="inline-block bg-white px-4 py-1.5 rounded-md border border-slate-200 text-slate-600 font-medium text-sm shadow-sm">
                 Toán học Lớp 12 - Chương trình mới (TKXS)
               </div>
            </div>

            <div className="flex justify-center">
               <button
                 onClick={() => setHasStarted(true)}
                 className="group bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-full transition-all text-lg shadow-lg shadow-indigo-600/30 flex items-center gap-3 hover:-translate-y-1"
               >
                 <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                 Bắt đầu
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // SUMMARY SCREEN
  // ----------------------------------------
  if (isFinished) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6 font-sans text-left">
        <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-10 text-center border-t-8 border-indigo-500">
          <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Hoàn thành cây xác suất!</h1>
          <p className="text-slate-600 mb-8 text-sm leading-relaxed px-4">
            Bạn đã trải nghiệm mô hình học <strong>phân nhánh (Branching)</strong>. Bằng việc chẩn đoán lỗi sai và phụ đạo kịp thời, kiến thức về định lý Bayes phức tạp đã trở nên dễ hiểu hơn rất nhiều.
          </p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left mb-8 shadow-inner">
            <h3 className="font-bold text-indigo-800 mb-4 text-xs uppercase tracking-widest border-b border-indigo-200 pb-2 flex items-center gap-2">
              <GitBranch size={14}/> Lộ trình học cá nhân hóa của bạn:
            </h3>
            <div className="flex flex-wrap gap-2 items-center text-sm font-medium">
              {learningPath.map((nodeId, index) => {
                const nodeRef = branchedProgramData.find(n => n.id === nodeId);
                const isRemedial = nodeRef?.isRemedial;
                const shortTitle = nodeRef?.title.split(':')[0] || `Liều ${nodeId}`;
                return (
                  <React.Fragment key={`path-${index}`}>
                    <span className={`px-3 py-1 rounded-full border shadow-sm ${isRemedial ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-indigo-100 border-indigo-300 text-indigo-800'}`}>
                      {shortTitle}
                    </span>
                    {index < learningPath.length - 1 && <ArrowRight size={14} className="text-slate-400" />}
                  </React.Fragment>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-slate-500 italic">
              *Các khối màu vàng là những lúc hệ thống đã đưa bạn sang nhánh phụ đạo để củng cố kiến thức trước khi đi tiếp.
            </p>
          </div>

          <button 
            onClick={() => { 
              setCurrentNodeId(1); 
              setLearningPath([1]); 
              setHasStarted(false); 
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all text-[13px] shadow-lg shadow-indigo-200 flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={16}/> Học lại từ đầu
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // SVG VISUALIZATIONS
  // ----------------------------------------
  const renderVisual = () => {
    const type = currentNode.visualType;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 rounded-2xl border border-slate-200 p-6 relative overflow-hidden shadow-inner">
        <button 
          onClick={handleReplayAnimation}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:shadow-md text-indigo-600 transition-all z-10 border border-slate-100"
          title="Phát lại hiệu ứng"
        >
          <Play size={20} />
        </button>

        <svg viewBox="0 0 400 300" className="w-full h-full max-h-80">
          <defs>
            <marker id="arrow-ind" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
            <marker id="arrow-amb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
          </defs>

          {/* Node 1: Factory Split */}
          {type === "factory-split" && (
            <g transform="translate(40, 50)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s'}}>
              <rect x="0" y="50" width="320" height="20" fill="#e2e8f0" rx="10"/>
              <rect x="0" y="50" width="192" height="20" fill="#818cf8" rx="10"/>
              <rect x="192" y="50" width="128" height="20" fill="#fcd34d" rx="10"/>
              
              <path d="M 96 40 L 96 10" stroke="#6366f1" strokeWidth="2" />
              <rect x="46" y="-20" width="100" height="30" rx="4" fill="#6366f1" />
              <text x="96" y="0" textAnchor="middle" fill="white" className="font-bold text-xs">Máy I (60%)</text>
              
              <path d="M 256 40 L 256 10" stroke="#f59e0b" strokeWidth="2" />
              <rect x="206" y="-20" width="100" height="30" rx="4" fill="#f59e0b" />
              <text x="256" y="0" textAnchor="middle" fill="white" className="font-bold text-xs">Máy II (40%)</text>

              <g style={{transform: animate ? 'translateY(0)' : 'translateY(-20px)', opacity: animate ? 1 : 0, transition: 'all 1s 0.5s'}}>
                 <circle cx="160" cy="140" r="40" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="6,6" />
                 <text x="160" y="145" textAnchor="middle" fill="#64748b" className="font-bold text-2xl">?</text>
                 <text x="160" y="195" textAnchor="middle" fill="#64748b" className="font-bold text-xs">chọn 1 sản phẩm</text>
              </g>
            </g>
          )}

          {/* Node 2: Percent Conversion */}
          {type === "percent-conversion" && (
            <g transform="translate(100, 50)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s'}}>
              <circle cx="100" cy="100" r="80" fill="#fcd34d" />
              <path d="M 100 100 L 100 20 A 80 80 0 1 1 23.5 75.3 Z" fill="#818cf8" />
              
              <rect x="20" y="10" width="60" height="24" fill="#ffffff" rx="4" />
              <text x="50" y="26" textAnchor="middle" fill="#4f46e5" className="font-bold text-sm">60%</text>
              
              <line x1="50" y1="34" x2="50" y2="80" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrow-ind)" />
              
              <rect x="25" y="85" width="50" height="30" fill="#4f46e5" rx="4" />
              <text x="50" y="105" textAnchor="middle" fill="white" className="font-bold text-lg">0.6</text>
            </g>
          )}

          {/* Node 3: Tree Branch 1 - Centered and nicely spaced */}
          {type === "tree-branch-1" && (
            <g transform="translate(30, 100)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s'}}>
              <circle cx="20" cy="50" r="10" fill="#94a3b8" />
              
              {/* Branch to Machine I */}
              <line x1="30" y1="50" x2="110" y2="10" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrow-ind)" />
              <text x="60" y="15" fill="#4f46e5" className="font-bold text-xs bg-white">0.6</text>
              
              <rect x="120" y="-10" width="60" height="30" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" rx="4" />
              <text x="150" y="10" textAnchor="middle" fill="#4f46e5" className="font-bold text-xs">Máy I</text>

              {/* Branch from Machine I to Defect */}
              <g style={{opacity: animate ? 1 : 0, transition: 'opacity 1s 1s'}}>
                <line x1="180" y1="5" x2="260" y2="5" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
                <text x="220" y="-5" textAnchor="middle" fill="#ef4444" className="font-bold text-[11px]">0.02</text>
                
                <rect x="270" y="-10" width="60" height="30" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="4" />
                <text x="300" y="10" textAnchor="middle" fill="#ef4444" className="font-bold text-sm">lỗi</text>
              </g>
            </g>
          )}

          {/* Node 4: Tree Multiplication */}
          {type === "tree-multiplication" && (
            <g transform="translate(30, 100)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s'}}>
              <circle cx="20" cy="50" r="10" fill="#94a3b8" />
              
              <line x1="30" y1="50" x2="110" y2="10" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrow-ind)" />
              <rect x="120" y="-10" width="60" height="30" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" rx="4" />
              <text x="150" y="10" textAnchor="middle" fill="#4f46e5" className="font-bold text-xs">Máy I</text>
              
              <line x1="180" y1="5" x2="260" y2="5" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
              <rect x="270" y="-10" width="60" height="30" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="4" />
              <text x="300" y="10" textAnchor="middle" fill="#ef4444" className="font-bold text-sm">lỗi</text>
              
              <rect x="60" y="50" width="240" height="40" fill="#1e293b" rx="8" />
              <text x="180" y="75" textAnchor="middle" fill="#facc15" className="font-bold tracking-widest">0.6 × 0.02 = 0.012</text>
            </g>
          )}

          {/* Node 5: Full Tree - Carefully measured to prevent overflow */}
          {type === "tree-full" && (
            <g transform="translate(20, 100)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s'}}>
              <circle cx="20" cy="50" r="10" fill="#94a3b8" />
              
              {/* Path 1 */}
              <line x1="30" y1="45" x2="110" y2="10" stroke="#6366f1" strokeWidth="2" />
              <text x="60" y="20" fill="#4f46e5" className="font-bold text-[10px]">0.6</text>
              
              <rect x="110" y="-5" width="50" height="20" fill="#e0e7ff" rx="4" />
              <text x="135" y="8" textAnchor="middle" fill="#4f46e5" className="font-bold text-[10px]">Máy I</text>
              
              <line x1="160" y1="5" x2="230" y2="5" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
              <text x="195" y="-5" textAnchor="middle" fill="#ef4444" className="font-bold text-[10px]">0.02</text>
              
              <rect x="240" y="-10" width="80" height="30" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="4" />
              <text x="280" y="10" textAnchor="middle" fill="#ef4444" className="font-bold text-[10px]">lỗi (0.012)</text>

              {/* Path 2 */}
              <line x1="30" y1="55" x2="110" y2="90" stroke="#f59e0b" strokeWidth="2" />
              <text x="60" y="90" fill="#d97706" className="font-bold text-[10px]">0.4</text>
              
              <rect x="110" y="85" width="50" height="20" fill="#fef3c7" rx="4" />
              <text x="135" y="98" textAnchor="middle" fill="#d97706" className="font-bold text-[10px]">Máy II</text>
              
              <line x1="160" y1="95" x2="230" y2="95" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
              <text x="195" y="85" textAnchor="middle" fill="#ef4444" className="font-bold text-[10px]">0.05</text>
              
              <rect x="240" y="80" width="80" height="30" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="4" />
              <text x="280" y="100" textAnchor="middle" fill="#ef4444" className="font-bold text-[10px]">lỗi (0.020)</text>

              {/* Question Box */}
              <g style={{opacity: animate ? 1 : 0, transition: 'opacity 1s 1.5s'}}>
                 <path d="M 330 5 Q 360 50 330 95" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                 <text x="350" y="58" fill="#1e293b" className="font-bold text-2xl">+</text>
              </g>
            </g>
          )}

          {/* Node 6: Total Prob */}
          {type === "total-prob" && (
            <g transform="translate(80, 80)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s'}}>
               <rect x="0" y="0" width="240" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
               <text x="120" y="30" textAnchor="middle" fill="#0f172a" className="font-bold font-serif text-lg">0.012 + 0.020</text>
               
               <line x1="120" y1="60" x2="120" y2="100" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow-ind)" />
               
               <rect x="70" y="110" width="100" height="40" rx="8" fill="#ef4444" />
               <text x="120" y="135" textAnchor="middle" fill="white" className="font-bold text-xl tracking-widest">0.032</text>
               <text x="120" y="170" textAnchor="middle" fill="#ef4444" className="font-bold text-xs uppercase tracking-widest">Tổng phế phẩm</text>
            </g>
          )}

          {/* Node 7: Bayes Question */}
          {type === "bayes-question" && (
            <g transform="translate(40, 50)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s'}}>
              <circle cx="150" cy="100" r="80" fill="#fee2e2" stroke="#ef4444" strokeWidth="4" />
              <text x="150" y="45" textAnchor="middle" fill="#ef4444" className="font-bold text-xs">Tập hợp điện thoại lỗi</text>
              
              <path d="M 150 20 A 80 80 0 0 0 80 140 A 80 80 0 0 0 220 140 Z" fill="#e0e7ff" />
              <path d="M 150 20 L 150 180" stroke="#ef4444" strokeWidth="4" />

              <text x="110" y="110" textAnchor="middle" fill="#4f46e5" className="font-bold text-xs">Máy I</text>
              <text x="110" y="125" textAnchor="middle" fill="#4f46e5" className="font-bold text-[10px]">(0.012)</text>

              <text x="190" y="110" textAnchor="middle" fill="#d97706" className="font-bold text-xs">Máy II</text>
              <text x="190" y="125" textAnchor="middle" fill="#d97706" className="font-bold text-[10px]">(0.020)</text>

              <g style={{opacity: animate ? 1 : 0, transition: 'opacity 1s 1s'}}>
                 <circle cx="110" cy="115" r="45" fill="none" stroke="#4f46e5" strokeWidth="4" strokeDasharray="8,4" />
                 <path d="M 150 115 L 240 180" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4,4" />
                 <rect x="220" y="180" width="100" height="30" fill="#4f46e5" rx="4" />
                 <text x="270" y="200" textAnchor="middle" fill="white" className="font-bold text-sm">tỉ lệ = ?</text>
              </g>
            </g>
          )}

          {/* Node 8: Bayes Zoom (Remedial) */}
          {type === "bayes-zoom" && (
            <g transform="translate(80, 80)" style={{opacity: animate ? 1 : 0, transition: 'opacity 0.8s'}}>
               <rect x="0" y="0" width="240" height="80" rx="12" fill="#1e293b" />
               <text x="120" y="30" textAnchor="middle" fill="#94a3b8" className="font-bold text-xs uppercase tracking-widest">Định lý Bayes</text>
               <text x="120" y="60" textAnchor="middle" fill="#facc15" className="font-bold font-serif text-2xl">0.012 / 0.032</text>
               
               <line x1="120" y1="90" x2="120" y2="120" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrow-ind)" />
               
               <rect x="70" y="130" width="100" height="40" rx="8" fill="#4f46e5" />
               <text x="120" y="156" textAnchor="middle" fill="white" className="font-bold text-xl tracking-widest">3 / 8</text>
            </g>
          )}

          {/* Node 9: Celebration */}
          {type === "celebration" && (
            <g transform="translate(200, 150)">
              <circle cx="0" cy="0" r="80" fill="#e0e7ff" className="animate-pulse" />
              <GitBranch x="-40" y="-40" size={80} color="#4f46e5" />
              
              <circle cx="-100" cy="-80" r="8" fill="#facc15" style={{ animation: animate ? 'bounce 2s infinite' : 'none' }} />
              <circle cx="100" cy="60" r="10" fill="#ef4444" style={{ animation: animate ? 'bounce 2s infinite 0.5s' : 'none' }} />
              <circle cx="-80" cy="80" r="6" fill="#10b981" style={{ animation: animate ? 'bounce 2s infinite 1s' : 'none' }} />
              <circle cx="110" cy="-60" r="12" fill="#8b5cf6" style={{ animation: animate ? 'bounce 2s infinite 0.2s' : 'none' }} />
              <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }`}</style>
            </g>
          )}
        </svg>

        <p className="mt-4 text-[11px] font-medium text-indigo-600/70 italic flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full">
          <Maximize size={12}/> Mô phỏng chương trình phân nhánh (Branching)
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden text-left">
      <div className="bg-white max-w-6xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[650px] border border-slate-200">
        
        <div className="w-full md:w-5/12 bg-slate-900 text-white flex flex-col relative z-10 shadow-2xl">
          <div className="h-1.5 bg-slate-800 w-full relative">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)] ${currentNode.isRemedial ? 'bg-amber-400' : 'bg-indigo-500'}`}
              style={{ width: `${(learningPath.length / 9) * 100}%` }}
            ></div>
          </div>

          <div className="p-8 md:p-10 flex flex-col h-full overflow-y-auto text-left">
            <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${currentNode.isRemedial ? 'text-amber-400' : 'text-indigo-400'}`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${currentNode.isRemedial ? 'bg-amber-400' : 'bg-indigo-400'}`}></span>
              {currentNode.isRemedial ? 'Liều phụ đạo (Remedial dose)' : 'Liều chính (Main path)'}
            </div>
            
            <h2 className="text-xl font-bold mb-6 text-white leading-tight">{currentNode.title}</h2>
            
            <div className="mb-6 flex-grow">
              <h3 className={`flex items-center gap-2 font-semibold mb-3 text-sm italic text-left ${currentNode.isRemedial ? 'text-amber-300' : 'text-slate-300'}`}>
                {currentNode.isRemedial ? <AlertTriangle size={16} /> : <Info size={16} />} Thông tin:
              </h3>
              <p className="text-slate-300 leading-relaxed text-[14px] whitespace-pre-wrap text-left">{currentNode.info}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-800">
              {currentNode.question && (
                <div className="mb-4">
                  <h3 className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-2 text-left">
                    <HelpCircle size={16} /> Câu hỏi / Yêu cầu:
                  </h3>
                  <p className="text-white text-[14px] font-medium text-left">{currentNode.question}</p>
                </div>
              )}

              {submitStatus === 'incorrect' && !currentNode.isRemedial && (
                <div className="bg-rose-500/10 border border-rose-500/40 rounded-xl p-4 mb-4 animate-in fade-in zoom-in duration-300">
                  <div className="flex items-start gap-2 text-rose-200 text-[13px] text-left">
                     <XCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                     <p>{currentNode.incorrectFeedback}</p>
                  </div>
                  <button 
                    onClick={() => handleNextNode(currentNode.incorrectNext)}
                    className="mt-3 w-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-100 py-2 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-rose-500/30"
                  >
                    Đến nhánh phụ đạo <GitBranch size={14}/>
                  </button>
                </div>
              )}

              {submitStatus === 'correct' && !currentNode.isRemedial && (
                <div className="bg-teal-500/10 border border-teal-500/40 rounded-xl p-4 mb-4 animate-in fade-in zoom-in duration-300">
                  <div className="flex items-start gap-2 text-teal-200 text-[13px] text-left">
                     <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                     <p>{currentNode.correctFeedback}</p>
                  </div>
                  <button 
                    onClick={() => handleNextNode(currentNode.correctNext)}
                    className="mt-3 w-full bg-teal-500 hover:bg-teal-400 text-white py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-900/50"
                  >
                    Đi tiếp nhánh chính <ArrowRight size={16}/>
                  </button>
                </div>
              )}

              {currentNode.type === 'question' && submitStatus === 'idle' && (
                <div className="flex flex-col gap-3">
                  {currentNode.inputType === 'mcq' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                      {currentNode.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setInputValue(option); }}
                          className={`px-4 py-3 rounded-xl border text-center text-[13px] font-bold transition-all ${
                            inputValue === option ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={currentNode.placeholder}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-[14px] placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                      onKeyDown={(e) => {
                        if(e.key === 'Enter' && inputValue.trim() !== '') handleCheckAnswer();
                      }}
                    />
                  )}
                  
                  <button 
                    onClick={handleCheckAnswer} 
                    disabled={inputValue.trim() === ''} 
                    className={`w-full py-3 rounded-xl font-bold transition-all text-[14px] mt-2 ${
                      inputValue.trim() !== '' ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/30' : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    Xác nhận đáp án
                  </button>
                </div>
              )}

              {currentNode.isRemedial && (
                <button 
                  onClick={() => handleNextNode(currentNode.correctNext)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
                >
                  Đã hiểu! Quay lại nhánh chính <GitMerge size={16}/>
                </button>
              )}

            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 bg-white p-6 md:p-10 flex items-center justify-center">
          {renderVisual()}
        </div>
      </div>
    </div>
  );
}
