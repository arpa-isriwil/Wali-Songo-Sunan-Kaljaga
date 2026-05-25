/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ChevronRight,
  Menu,
  X,
  ExternalLink
} from "lucide-react";
import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Beranda" },
  { id: "peta", label: "Jejak Langkah" },
  { id: "pohon-warisan", label: "Pohon Warisan" },
  { id: "kuis", label: "Uji Wawasan" },
  { id: "video", label: "Galeri Video" },
];

const videos = [
  {
    id: "jLfpOpjXnio",
    title: "Kisah Perjalanan Spiritual",
    category: "Dokumenter",
    url: "https://youtu.be/jLfpOpjXnio?si=4ciXdqjHhI0p-_6F",
  },
  {
    id: "6RXvo0B2Bfg",
    title: "Makna Filosofis Lir-Ilir",
    category: "Budaya",
    url: "https://youtu.be/6RXvo0B2Bfg?si=pL7wh2i3TdLntRv9",
  },
  {
    id: "StD5ODAE1dE",
    title: "Peninggalan Kadilangu",
    category: "Sejarah",
    url: "https://youtu.be/StD5ODAE1dE?si=Di80IZsOUYpmkTUF",
  }
];

const quizQuestions = [
  {
    question: "Siapa nama asli Sunan Kalijaga?",
    options: ["Raden Said", "Raden Fattah", "Raden Patah", "Raden Paku"],
    correct: 0,
  },
  {
    question: "Siapa nama ayah Sunan Kalijaga?",
    options: ["Sunan Bonang", "Tumenggung Wilatikta", "Sunan Gunung Jati", "Raden Patah"],
    correct: 1,
  },
  {
    question: "Media apa yang utama digunakan Sunan Kalijaga untuk berdakwah secara inklusif?",
    options: ["Lukisan", "Puisi Arab", "Wayang Kulit & Gamelan", "Teater Modern"],
    correct: 2,
  },
  {
    question: "Apa makna filosofi 'Urip Iku Urup'?",
    options: ["Hidup adalah perjuangan", "Hidup itu hendaknya bermanfaat", "Hidup itu sementara", "Hidup adalah cahaya"],
    correct: 1,
  },
  {
    question: "Di mana letak makam Sunan Kalijaga?",
    options: ["Tuban", "Cirebon", "Demak, Kadilangu", "Kudus"],
    correct: 2,
  },
  {
    question: "Tembang spiritual terkenal manakah yang merupakan mahakarya Sunan Kalijaga?",
    options: ["Lir Ilir", "Bengawan Solo", "Gundul Pacul", "Tombo Ati"],
    correct: 0,
  },
  {
    question: "Masjid manakah yang pembangunannya dibantu oleh beliau menggunakan 'Soko Tatal'?",
    options: ["Masjid Istiqlal", "Masjid Menara Kudus", "Masjid Agung Demak", "Masjid Sang Cipta Rasa"],
    correct: 2,
  },
  {
    question: "Apa nama julukan Sunan Kalijaga saat beliau dikenal sebagai 'perampok budiman'?",
    options: ["Brandal Budiman", "Lokajaya", "Si Pitung", "Raden Mas Said"],
    correct: 1,
  },
  {
    question: "Siapakah wali yang membimbing Sunan Kalijaga di pinggir kali saat beliau bertobat?",
    options: ["Sunan Bonang", "Sunan Giri", "Sunan Ampel", "Sunan Kudus"],
    correct: 0,
  },
  {
    question: "Sunan Kalijaga merupakan bagian dari sembilan wali penyebar Islam yang disebut...",
    options: ["Wali Songo", "Syekh Jawi", "Mataram Islam", "Sahabat Nabi"],
    correct: 0,
  },
];

const locations = [
  {
    id: "tuban",
    name: "Tuban",
    coords: { x: "72%", y: "49%" },
    step: 1,
    title: "Kota Kelahiran",
    desc: "Lahir sebagai Raden Said, putra adipati Tuban. Di sinilah beliau menghabiskan masa muda sebelum akhirnya menjalani perjalanan spiritual yang panjang.",
    detailedDesc: "Di kota pelabuhan kuno ini, Raden Said menyaksikan kesenjangan sosial yang menggugah jiwa ksatria dan empatinya. Pengalaman hidup inilah yang membentuk kepekaan beliau terhadap penderitaan spiritual dan jasmani rakyat kecil.",
  },
  {
    id: "demak",
    name: "Demak",
    coords: { x: "50%", y: "48%" },
    step: 3,
    title: "Pusat Peradaban Islam",
    desc: "Demak merupakan pusat kegiatan dakwah Wali Songo. Sunan Kalijaga berperan penting dalam pembangunan Masjid Agung Demak yang legendaris.",
    detailedDesc: "Selain berkontribusi mendesain Soko Tatal (tiang utama dari serpihan kayu yang melambangkan persatuan), beliau juga merancang tata kota yang menyelaraskan letak Masjid, Alun-alun, dan Istana sebagai simbol keselarasan kepemimpinan para ulama, rakyat, dan pemerintah.",
  },
  {
    id: "cirebon",
    name: "Cirebon",
    coords: { x: "28%", y: "45%" },
    step: 2,
    title: "Pertalian Keilmuan",
    desc: "Sunan Kalijaga memiliki hubungan erat dengan Sunan Gunung Jati di Cirebon. Beliau sering berkunjung untuk bertukar pikiran mengenai strategi dakwah.",
    detailedDesc: "Di tanah parahyangan ini, beliau juga menyebarkan Islam menggunakan ragam kesenian setempat. Jejak dakwahnya tecermin kuat melalui rancangan motif batik Megamendung dan hiasan ukiran keraton yang bersahaja namun sarat akan makna esoteris ketuhanan.",
  },
  {
    id: "kadilangu",
    name: "Kadilangu",
    coords: { x: "57%", y: "54%" },
    step: 4,
    title: "Kediaman Terakhir",
    desc: "Wilayah Kadilangu dihadiahkan oleh Kesultanan Demak. Di sinilah beliau bermukim, mengajar, hingga akhirnya dimakamkan.",
    detailedDesc: "Tanah perdikan (bebas pajak) ini kemudian dikembangkan menjadi pusat penyebaran ajaran spiritual berakar budaya Jawa yang luhur. Di sini pula tradisi tahlilan serta sekaten dirumuskan agar masyarakat transisi dapat menerima ajaran Islam tanpa benturan budaya.",
  }
];

const heritageItems = [
  {
    id: "wayang",
    name: "Wayang Kulit",
    brief: "Modifikasi radikal wujud figuratif demi menegakkan nilai tauhid.",
    dakwah: "Untuk menyelaraskan antara seni pertunjukan kegemaran rakyat dan hukum melukis makhluk bernyawa secara realistis, Sunan Kalijaga mereformasi wayang kulit secara kreatif. Wujud manusia yang tadinya realistis diubah menjadi pipih, dibuat miring dengan anggota tangan yang sengaja dibuat memanjang tak proporsional guna melahirkan gaya dekoratif murni abstrak. Melalui lakon 'Jamus Kalimasada' (Kalimat Syahadat), beliau menyisipkan esensi tauhid ke dalam pertunjukan legendarisnya.",
    filosofi: "Perubahan bentuk wayang melambangkan peralihan dimensi spiritual manusia dari keterikatan duniawi yang dangkal menuju kesadaran abstrak batiniah yang mengesakan Tuhan Semesta Alam.",
  },
  {
    id: "keris",
    name: "Keris Jawa",
    brief: "Transformasi senjata tajam klenik menjadi simbol penjinak hawa nafsu.",
    dakwah: "Di tangan Sunan Kalijaga, pamor keris dialihkan dari objek pemujaan magis-klenik menjadi pelengkap sandangan adat kepatutan sosial yang adiluhung. Beliau mendesain penempatan keris di belakang tubuh (punggung) pemakainya. Ini menyimbolkan bahwa senjata atau kekuatan amarah harus senantiasa ditempatkan di belakang, diredam oleh akal, akhlak, dan budi pekerti luhur di depan.",
    filosofi: "Menyelaraskan tajamnya bilah besi dengan ketajaman nurani. Bahwa kejantanan kesatria sejati diukur bukan dari kekerasan fisik, melainkan dari kemampuannya menundukkan nafsu egoistik diri sendiri.",
  },
  {
    id: "gamelan",
    name: "Gamelan Sekaten",
    brief: "Revolusi alat tabuh pemikat keramaian ritual Syahadatain.",
    dakwah: "Gamelan dimanfaatkan sebagai instrumen pengundang perhatian massal di halaman Masjid Agung. Nadanya dimodifikasi sedemikian rupa menjadi rangkaian ritme yang mengetuk relung hati. Istilah festival 'Sekaten' sendiri diserap dari kata 'Syahadatain' (dua kalimat syahadat). Sebelum menikmati keindahan gending, khalayak diajak bersama bersuci di kolam wudhu dan melafalkan kalimat tauhid tersebut.",
    filosofi: "Seni musik sebagai penggetar rasa keindahan ilahi. Nada-nada yang dihasilkan merangkul getaran kerinduan manusia akan keseimbangan batiniah dan harmoni kehidupan bersama.",
  },
  {
    id: "tembang",
    name: "Tembang Lir-Ilir",
    brief: "Untaian syair puitis penggugah siuman dari kelalaian spiritual.",
    dakwah: "Sunan Kalijaga menggubah tembang populer 'Lir-Ilir' dalam bahasa Jawa yang akrab dengan sosiokultural masyarakat pedesaan. Di dalamnya disisipkan perlambangan mendalam, seperti buah belimbing bersegi lima bercahaya hijau yang melambangkan kewajiban menegakkan shalat lima waktu demi membasuh pakaian kotor (jiwa pemenuh dosa) agar layak kembali menghadap Ilahi.",
    filosofi: "Sebuah desakan spiritual agar umat manusia segera tersadar (tangi) dari tidur kelalaian mementingkan ego duniawi sebelum ajal menjemput dan menyelimuti tubuh kita.",
  },
  {
    id: "baju",
    name: "Baju Surjan",
    brief: "Rancangan sandangan berakar budaya luhur penyangga pilar keimanan.",
    dakwah: "Sunan Kalijaga merancang baju Surjan yang memiliki makna 'sirotul mustaqim' (jalan lurus) atau 'suraksa-janma' (pemelihara manusia). Beliau mendesain baju ini dengan menambahkan 6 kancing berkait kuat di dada sebagai perlambang tegaknya Rukun Iman dalam sanubari pemakainya, serta ditunjang kerah tegak tinggi melambangkan pendirian tauhid yang tak goyah.",
    filosofi: "Busana fisik yang bercorak sederhana dan bersahaja merupakan cerminan dari kemuliaan budi batiniah. Pakaian takwa dirajut untuk membentengi jiwa dari kemegahan duniawi yang palsu.",
  }
];

const getHeritageIcon = (id: string, className = "w-12 h-12 stroke-gold-400 fill-none") => {
  switch (id) {
    case "wayang":
      return (
        <svg fill="none" stroke="currentColor" className={className} viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v3M9 5c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5" />
          <path d="M6 10c0-2.5 2.5-4 6-4s6 1.5 6 4" />
          <path d="M4 14l3-2h10l3 2" />
          <circle cx="7" cy="12" r="1" fill="currentColor" />
          <circle cx="17" cy="12" r="1" fill="currentColor" />
          <path d="M7 13v6l-2 3M17 13v6l2 3" />
          <path d="M12 8v14" strokeWidth="2" />
        </svg>
      );
    case "keris":
      return (
        <svg fill="none" stroke="currentColor" className={className} viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20l1.5-2.5M12.5 17.5l-1-2M11.5 15.5l1.5-2.5M13 13l-1-2M12 11l1.5-2.5M13.5 8.5l-1-2M12.5 6.5l1.5-2.5M14 4h-2.5c-.5 0-.8-.3-.8-.8V2.5" />
          <path d="M9 19c0-1.5 2.5-1.5 3-2.5 .5 1 3 1 3 2.5v1H9z" />
          <path d="M12 20h1a1 1 0 0 1 1 1v1H10l1-2" fill="currentColor" />
        </svg>
      );
    case "gamelan":
      return (
        <svg fill="none" stroke="currentColor" className={className} viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="14" width="20" height="6" rx="1" />
          <circle cx="7" cy="10" r="3" />
          <circle cx="17" cy="10" r="3" />
          <circle cx="7" cy="10" r="1" fill="currentColor" />
          <circle cx="17" cy="10" r="1" fill="currentColor" />
          <path d="M7 7V14M17 7V14" />
          <path d="M5 20v2M19 20v2" />
        </svg>
      );
    case "tembang":
      return (
        <svg fill="none" stroke="currentColor" className={className} viewBox="0 0 100 100" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
          {/* S-curve staff and G-clef swirl */}
          <path 
            d="M 52,18 
               C 38,24 28,34 28,48 
               C 28,62 38,72 48,72 
               C 58,72 65,64 65,54 
               C 65,42 52,42 52,52 
               C 52,55 54,58 57,58 
               C 55,61 51,62 48,62 
               C 42,62 38,57 38,48 
               C 38,34 48,22 54,12 
               L 54,82 
               C 54,88 50,94 42,94 
               C 34,94 30,88 30,82 
               C 30,76 36,71 42,71 
               C 45,71 48,73 49,76" 
          />
          {/* Subtle note-head at the bottom */}
          <circle cx="42" cy="82" r="7" fill="currentColor" stroke="none" />
        </svg>
      );
    case "baju":
      return (
        <svg fill="none" stroke="currentColor" className={className} viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2M4 6h3.5L9 8h6l1.5-2H20M4 6v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6" />
          <path d="M12 8v13" />
          <circle cx="12" cy="9" r="1" fill="currentColor" />
          <circle cx="12" cy="11.2" r="1" fill="currentColor" />
          <circle cx="12" cy="13.4" r="1" fill="currentColor" />
          <circle cx="12" cy="15.6" r="1" fill="currentColor" />
          <circle cx="12" cy="17.8" r="1" fill="currentColor" />
          <circle cx="12" cy="20" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [activeArtifact, setActiveArtifact] = useState(heritageItems[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const playChime = () => {
    // Peking instrument chime tone number 3 for beautiful transition feedback
    const url = "https://raw.githubusercontent.com/ridoansaleh/gamelan-player/master/public/sounds/peking/3.mp3";
    const audio = new Audio(url);
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Audio play blocked", e));
  };

  const playSound = (isCorrect: boolean) => {
    const url = isCorrect 
      ? "https://raw.githubusercontent.com/ridoansaleh/gamelan-player/master/public/sounds/peking/1.mp3"
      : "https://raw.githubusercontent.com/ridoansaleh/gamelan-player/master/public/sounds/peking/6.mp3";
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play blocked", e));
  };

  const handleAnswer = (index: number) => {
    if (isAnswering) return;
    setIsAnswering(true);
    setSelectedAnswer(index);
    const isCorrect = index === quizQuestions[currentQuestion].correct;
    
    if (isCorrect) setScore(s => s + 1);
    playSound(isCorrect);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelectedAnswer(null);
        setIsAnswering(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswering(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-dark-900/90 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-400 font-sans font-bold mb-1">Wali Songo Series</span>
            <h1 className="text-2xl tracking-tighter font-medium font-serif">Sunan Kalijaga</h1>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-4 items-center">
            {sections.map((sec) => (
              <a 
                key={sec.id} 
                href={`#${sec.id}`}
                className="px-4 py-2 border border-white/10 text-white/80 font-sans text-[10px] uppercase tracking-widest hover:border-gold-400 hover:bg-gold-400 hover:text-black transition-all duration-300"
              >
                {sec.label}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gold-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-dark-900 p-8 flex flex-col justify-center items-center md:hidden"
        >
          {sections.map((sec) => (
            <a 
              key={sec.id} 
              href={`#${sec.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-serif py-4 text-white"
            >
              {sec.label}
            </a>
          ))}
        </motion.div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-7xl md:text-[120px] font-serif text-white leading-[0.9] mb-8 font-light">
              Sunan <br /> <span className="italic text-gold-400">Kalijaga</span>
            </h1>
            <p className="font-serif text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
              Sang penjaga harmoni antara spiritualitas Islam dan kekayaan budaya Nusantara.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#peta" className="group flex items-center gap-4 bg-gold-400 text-black px-8 py-4 font-sans text-[11px] uppercase tracking-widest hover:bg-white transition-all font-bold">
                Jelajahi Peta
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#peta" className="flex items-center gap-4 text-white/50 hover:text-white font-sans text-[11px] uppercase tracking-[0.3em] transition-all">
                <div className="w-8 h-[1px] bg-gold-400"></div>
                Lihat Lokasi
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-white/20" />
        </motion.div>
      </section>

      {/* Peta Interaktif Section */}
      <section id="peta" className="py-24 md:py-32 bg-dark-800 leading-tight border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Left Panel: Info */}
            <div className="md:col-span-4 flex flex-col justify-center">
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-[1px] bg-gold-400"></div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-400 font-bold">Lokasi: {activeLocation.name}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif italic font-light tracking-tight text-white">{activeLocation.title}</h2>
                <p className="text-lg text-white/50 leading-relaxed font-serif italic">
                  {activeLocation.desc}
                </p>
                {showDetail && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm md:text-base text-white/40 leading-relaxed font-serif italic border-t border-white/10 pt-4"
                  >
                    {activeLocation.detailedDesc}
                  </motion.p>
                )}
                <div className="pt-4">
                  <button 
                    onClick={() => setShowDetail(!showDetail)}
                    className="px-6 py-2 border border-gold-400 text-gold-400 font-sans text-[10px] uppercase tracking-widest hover:bg-gold-400 hover:text-black transition-all"
                  >
                    {showDetail ? "Sembunyikan Detail" : "Lihat Detail Sejarah"}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Panel: Interactive Map */}
            <div className="md:col-span-8 relative flex items-center justify-center min-h-[400px]">
              <div className="relative w-full max-w-2xl bg-white/[0.02] p-8 md:p-12 rounded-[60px] border border-white/5 backdrop-blur-sm">
                
                {/* Map Inner Wrapper with locked 8:3 aspect-ratio matching the 800x300 SVG island */}
                <div className="relative w-full aspect-[8/3]">
                  {/* SVG Java Background */}
                  <svg viewBox="0 0 800 300" className="absolute inset-0 w-full h-full opacity-20 fill-white">
                    <path d="M50,150 Q100,100 200,120 T350,130 T500,140 T650,135 T750,150 L750,170 Q700,185 600,180 T450,190 T300,185 T150,195 T50,170 Z" />
                  </svg>

                  {/* Connection Lines (Alur Perjalanan) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ecc94b" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#ecc94b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ecc94b" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    
                    {/* Static route path */}
                    <path 
                      d="M 72 49 Q 50 35, 28 45 Q 39 46.5, 50 48 Q 53.5 51, 57 54"
                      fill="none"
                      stroke="#ecc94b"
                      strokeWidth="0.3"
                      strokeDasharray="1.5, 2.5"
                      opacity="0.3"
                    />

                    {/* Highlight dynamic path under active/glowing animation */}
                    <path 
                      d="M 72 49 Q 50 35, 28 45 Q 39 46.5, 50 48 Q 53.5 51, 57 54"
                      fill="none"
                      stroke="url(#flowGradient)"
                      strokeWidth="0.4"
                      strokeDasharray="4, 12"
                      className="animate-route-flow"
                    />

                    {/* Traveling Energy Marker (Gold) */}
                    <circle r="0.6" fill="#ecc94b">
                      <animateMotion
                        path="M 72 49 Q 50 35, 28 45 Q 39 46.5, 50 48 Q 53.5 51, 57 54"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>

                  {/* Interactive Points */}
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setActiveLocation(loc);
                        setShowDetail(false);
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all"
                      style={{ left: loc.coords.x, top: loc.coords.y }}
                    >
                      {/* Pulsing Marker */}
                      <div className={`relative flex items-center justify-center ${activeLocation.id === loc.id ? 'scale-125' : 'scale-100'} transition-transform duration-500`}>
                        <div className={`absolute w-8 h-8 rounded-full ${activeLocation.id === loc.id ? 'bg-gold-400 animate-ping opacity-20' : 'bg-white opacity-0 group-hover:opacity-10'} transition-all`} />
                        
                        {/* Base Dot / Ring with Step Number */}
                        <div className={`w-6 h-6 rounded-full border border-gold-400 flex items-center justify-center text-[9px] font-sans font-extrabold ${activeLocation.id === loc.id ? 'bg-gold-400 text-black' : 'bg-dark-900 text-gold-400 group-hover:bg-gold-400 group-hover:text-black'} transition-all`}>
                          {loc.step}
                        </div>
                        
                        {/* Label */}
                        <span className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-widest whitespace-nowrap ${activeLocation.id === loc.id ? 'text-gold-400 opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'} transition-all duration-300 font-bold`}>
                          {loc.name}
                        </span>

                        {/* Arrow/Indicator */}
                        <motion.div 
                          animate={{ y: activeLocation.id === loc.id ? [0, -4, 0] : 0 }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`absolute -top-6 ${activeLocation.id === loc.id ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                        >
                          <ChevronRight className="rotate-90 text-gold-400 w-4 h-4" />
                        </motion.div>
                      </div>
                    </button>
                  ))}
                </div>

              </div>
              
              {/* Artistic Background Text */}
              <div className="absolute -z-10 text-[180px] font-bold text-white/[0.02] pointer-events-none font-serif tracking-tighter -bottom-10 right-0">
                JAVA
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pohon Warisan Budaya Section (Interactive Heritage Tree) */}
      <section id="pohon-warisan" className="py-24 md:py-36 bg-dark-900 border-b border-white/5 relative overflow-hidden">
        {/* Fine gold lines / particle mesh background effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400/[0.03] via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-400 font-bold mb-4 block">Pohon Warisan Budaya</span>
            <h2 className="text-5xl md:text-7xl font-serif italic mb-6 text-white font-light tracking-tighter">Pohon Warisan</h2>
            <p className="text-lg text-white/55 font-serif italic leading-relaxed">
              Sentuh dan saksikan untaian warisan pusaka keluhuran budi pekerti garapan Sunan Kalijaga. Kaji rahasia modifikasi kearifan lokal di balik setiap cabang dakwah beliau.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            {/* Left Column: Interactive Golden Heritage Tree Canvas */}
            <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-[48px] p-6 md:p-8 relative flex flex-col items-center justify-center min-h-[460px] md:min-h-[520px] overflow-hidden">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />
              
              <div className="relative w-full max-w-[450px] aspect-square mx-auto my-auto select-none">
                {/* SVG Majestic Golden Silhouette Tree */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500" fill="none">
                  <defs>
                    {/* Gradients for different parts of the golden tree */}
                    <linearGradient id="goldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#92400e" />
                      <stop offset="50%" stopColor="#ecc94b" />
                      <stop offset="100%" stopColor="#fef08a" />
                    </linearGradient>

                    <linearGradient id="highlightWood" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#fef08a" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
                    </linearGradient>

                    <linearGradient id="leafSoftHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ecc94b" stopOpacity="0.15" />
                    </linearGradient>

                    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ecc94b" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#ecc94b" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ecc94b" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#ecc94b" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Celestial Ambient Glow Background */}
                  <circle cx="250" cy="220" r="210" fill="url(#sunGlow)" />
                  <circle cx="250" cy="220" r="140" stroke="rgba(236, 201, 75, 0.04)" strokeDasharray="3 6" />

                  {/* ==== BASE SOIL & ROOTS (Bottom) ==== */}
                  <ellipse cx="250" cy="460" rx="140" ry="25" fill="url(#goldGlow)" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.4" />
                  <ellipse cx="250" cy="460" rx="120" ry="15" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
                  
                  {/* Sprawling Organic Roots exactly like in the picture */}
                  <path d="M 210,455 Q 170,465 110,460 Q 150,450 200,448" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.7" />
                  <path d="M 230,455 Q 190,470 140,474 Q 180,460 215,450" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.7" />
                  <path d="M 250,455 Q 250,478 245,482 Q 248,460 252,450" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.7" />
                  <path d="M 270,455 Q 310,470 360,474 Q 320,460 285,450" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.7" />
                  <path d="M 290,455 Q 330,465 390,462 Q 350,450 300,448" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.7" />
                  
                  {/* ==== GOLD FILIGREE FOLIAGE CROWNS - BACKDROP LAYER ==== */}
                  <path d="M 170,180 C 130,130 80,180 90,230 C 60,260 70,320 110,330 C 140,360 220,340 230,290 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.25" />
                  <path d="M 330,180 C 370,130 420,180 410,230 C 440,260 430,320 390,330 C 360,360 280,340 270,290 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.25" />
                  
                  {/* Left-Mid Crown Backdrop */}
                  <path d="M 70,280 C 40,240 50,180 100,160 C 120,130 180,140 190,180 C 220,200 200,260 170,280 C 140,310 90,310 70,280 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.25" />
                  
                  {/* Right-Mid Crown Backdrop */}
                  <path d="M 430,280 C 460,240 450,180 400,160 C 380,130 320,140 310,180 C 280,200 300,260 330,280 C 360,310 410,310 430,280 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.25" />

                  {/* ==== ORGANIC TRUNK & BRANCHES (Main Structure) ==== */}
                  {/* Thick Main Trunk curving elegantly up */}
                  <path d="M 200,450 L 300,450 C 280,410 270,360 275,320 C 280,300 300,280 330,260 C 300,260 280,280 265,300 C 255,310 245,310 235,300 C 220,280 200,260 170,260 C 200,280 220,300 225,320 C 230,360 220,410 200,450 Z" stroke="url(#goldGrad)" strokeWidth="2.5" fill="url(#goldGlow)" opacity="0.8" />
                  
                  {/* Central Vertical Trunk Line */}
                  <path d="M 235,300 L 265,300 C 260,260 255,220 260,180 C 265,150 280,130 300,110 C 275,120 260,140 255,160 C 250,160 245,160 245,160 C 240,140 225,120 200,110 C 220,130 235,150 240,180 C 245,220 240,260 235,300 Z" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" opacity="0.7" />

                  {/* Branches reaching out for specific Interactive Nodes coordinates */}
                  {/* Branch to Lower-Left Wayang (120, 310) */}
                  <path d="M 220,380 C 190,380 150,350 120,315 C 140,325 180,355 210,355" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 160,345 C 140,335 125,320 115,310" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />

                  {/* Branch to Mid-Left Keris (140, 180) */}
                  <path d="M 230,280 C 200,250 160,210 142,185 C 160,205 190,235 220,255" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 180,225 C 160,205 150,195 140,180" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />

                  {/* Branch to Lower-Right Gamelan (380, 310) */}
                  <path d="M 280,380 C 310,380 350,350 380,315 C 360,325 320,355 290,355" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 340,345 C 360,335 375,320 385,310" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />

                  {/* Branch to Mid-Right Baju Surjan (360, 180) */}
                  <path d="M 270,280 C 300,250 340,210 358,185 C 340,205 310,235 280,255" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 320,225 C 340,205 350,195 360,180" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.8" />

                  {/* Branch to Top Tembang Lir-Ilir (250, 100) */}
                  <path d="M 245,170 C 242,130 246,110 250,102 C 254,110 258,130 255,170" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />

                  {/* Golden/Amber highlight lines wrapping the wood core to give rich woody texture */}
                  <path d="M 215,445 Q 240,410 248,340 T 240,250 T 248,150" stroke="url(#highlightWood)" strokeWidth="2.5" fill="none" opacity="0.6" />
                  <path d="M 285,445 Q 260,410 254,340 T 260,250 T 252,150" stroke="url(#highlightWood)" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <path d="M 205,380 Q 155,360 125,322" stroke="url(#highlightWood)" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M 295,380 Q 345,360 375,322" stroke="url(#highlightWood)" strokeWidth="1.5" fill="none" opacity="0.5" />

                  {/* ==== GOLD FILIGREE FOLIAGE CROWNS - MIDDLE & FOREGROUND LAYERS ==== */}
                  {/* Group 1: Lower Left (Wayang Area) */}
                  <path d="M 70,330 C 40,310 30,250 70,210 C 100,190 140,200 160,230 C 180,260 170,310 140,330 C 120,345 90,345 70,330 Z" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M 80,310 C 60,300 55,270 80,240 C 100,220 120,230 135,250 C 150,270 145,305 125,320 C 110,325 95,320 80,310 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.6" />
                  
                  {/* Group 2: Mid Left (Keris Area) */}
                  <path d="M 110,210 C 80,190 85,130 120,110 C 145,90 185,100 200,130 C 215,160 200,210 170,220 C 150,225 130,220 110,210 Z" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M 125,190 C 105,180 110,145 130,130 C 145,115 175,125 185,145 C 195,165 185,195 165,200 C 150,205 135,200 125,190 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.6" />

                  {/* Group 3: Lower Right (Gamelan Area) */}
                  <path d="M 430,330 C 460,310 470,250 430,210 C 400,190 360,200 340,230 C 320,260 330,310 360,330 C 380,345 410,345 430,330 Z" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M 420,310 C 440,300 445,270 420,240 C 400,220 380,230 365,250 C 350,270 355,305 375,320 C 390,325 405,320 420,310 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.6" />

                  {/* Group 4: Mid Right (Baju Area) */}
                  <path d="M 390,210 C 420,190 415,130 380,110 C 355,90 315,100 300,130 C 285,160 300,210 330,220 C 350,225 370,220 390,210 Z" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M 375,190 C 395,180 390,145 370,130 C 355,115 325,125 315,145 C 305,165 315,195 335,200 C 350,205 365,200 375,190 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.6" />

                  {/* Group 5: Splendid Top Giant Crown (Tembang Area) */}
                  <path d="M 250,140 C 180,140 160,80 200,40 C 230,10 270,10 300,40 C 340,80 320,140 250,140 Z" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M 250,120 C 200,120 185,85 215,55 C 235,35 265,35 285,55 C 315,85 300,120 250,120 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.6" />
                  
                  {/* Extra Dense Leaves at Center Bottom of the crown for layered depth */}
                  <path d="M 210,180 C 180,160 170,130 200,110 C 230,90 270,90 300,110 C 330,130 320,160 290,180 C 260,195 240,195 210,180 Z" stroke="url(#goldGrad)" strokeWidth="1.2" fill="none" opacity="0.4" />
                  <path d="M 220,160 C 200,150 190,130 210,115 C 230,100 270,100 290,115 C 310,130 300,150 280,160 C 260,170 240,170 220,160 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="url(#goldGlow)" opacity="0.6" />

                  {/* Foliage Highlights & Leafy Filigree overlays exactly representing the illuminated tree leaf clusters */}
                  <path d="M 85,310 C 72,290 80,270 95,265 C 110,260 120,275 115,295 C 110,315 100,320 85,310 Z" fill="url(#leafSoftHighlight)" opacity="0.3" />
                  <path d="M 415,310 C 428,290 420,270 405,265 C 390,260 380,275 385,295 C 390,315 400,320 415,310 Z" fill="url(#leafSoftHighlight)" opacity="0.3" />
                  <path d="M 130,180 C 115,160 125,140 140,135 C 155,130 165,145 160,165 C 155,185 145,190 130,180 Z" fill="url(#leafSoftHighlight)" opacity="0.3" />
                  <path d="M 370,180 C 385,160 375,140 360,135 C 345,130 335,145 340,165 C 345,185 355,190 370,180 Z" fill="url(#leafSoftHighlight)" opacity="0.3" />
                  <path d="M 240,90 C 220,70 230,50 250,45 C 270,40 280,55 275,75 C 270,95 260,100 240,90 Z" fill="url(#leafSoftHighlight)" opacity="0.4" />

                  {/* Playful Floating Amber Sparks / Wisdom Leaves around the tree */}
                  <circle cx="160" cy="80" r="3.5" fill="#ecc94b" className="animate-pulse" opacity="0.7" />
                  <circle cx="340" cy="80" r="2.5" fill="#ecc94b" className="animate-pulse" opacity="0.5" />
                  <circle cx="100" cy="220" r="3" fill="#ecc94b" className="animate-pulse" opacity="0.6" />
                  <circle cx="400" cy="220" r="4" fill="#ecc94b" className="animate-pulse" opacity="0.8" />
                  <circle cx="210" cy="380" r="2.5" fill="#ecc94b" className="animate-pulse" opacity="0.5" />
                  <circle cx="290" cy="380" r="3" fill="#ecc94b" className="animate-pulse" opacity="0.6" />
                </svg>

                {/* Overlaid Interactive Nodes with Percentage Coordinates */}
                {[
                  { id: "wayang", cx: 120, cy: 310, label: "Wayang Kulit" },
                  { id: "keris", cx: 140, cy: 180, label: "Keris Jawa" },
                  { id: "gamelan", cx: 380, cy: 310, label: "Gamelan Sekaten" },
                  { id: "tembang", cx: 250, cy: 100, label: "Tembang Lir-Ilir" },
                  { id: "baju", cx: 360, cy: 180, label: "Baju Surjan" },
                ].map((node) => {
                  const isActive = activeArtifact.id === node.id;
                  const item = heritageItems.find((h) => h.id === node.id);
                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        if (item) {
                          setActiveArtifact(item);
                          setIsFlipped(false);
                          playChime();
                        }
                      }}
                      style={{ left: `${(node.cx / 500) * 100}%`, top: `${(node.cy / 500) * 100}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                    >
                      {/* Outer pulsing gold waves */}
                      <div className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                        isActive 
                          ? "bg-gold-400/20 scale-125 animate-pulse" 
                          : "bg-white/0 group-hover:bg-white/5 opacity-0 group-hover:opacity-100"
                      }`} />
                      
                      {/* Inner Circular Node */}
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 shadow-lg ${
                        isActive 
                          ? "bg-gold-400 text-black border-gold-300" 
                          : "bg-dark-900 border-white/10 text-white/70 group-hover:border-gold-400 group-hover:text-gold-400"
                      }`}>
                        {getHeritageIcon(node.id, `w-7 h-7 ${isActive ? 'stroke-black' : 'stroke-gold-400 group-hover:stroke-gold-400'}`)}
                      </div>

                      {/* Tooltip Label */}
                      <span className={`absolute left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap bg-black/90 border border-white/15 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest transition-all duration-300 ${
                        isActive 
                          ? "opacity-100 scale-100 text-gold-400 border-gold-400/35 shadow-[0_0_12px_rgba(236,201,75,0.05)]" 
                          : "opacity-40 group-hover:opacity-100 scale-95"
                      }`}>
                        {node.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Decorative instructions on base */}
              <div className="mt-8 text-center text-[10px] font-sans tracking-widest text-white/30 uppercase">
                Sentuh Simbol Warisan Pada Cabang Pohon
              </div>
            </div>

            {/* Right Column: Elegant Interactive Flip-Card Showcase */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="relative w-full h-full min-h-[500px] [perspective:1500px]">
                <motion.div
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="relative w-full h-full min-h-[500px]"
                >
                  {/* FRONT SIDE (Dakwah / Siasat Modifikasi) */}
                  <div
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    className="absolute inset-0 w-full h-full bg-[#111111]/80 border border-white/10 rounded-[48px] p-8 md:p-12 backdrop-blur-md flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                        <div>
                          <span className="text-[10px] font-sans text-gold-400 font-bold tracking-[0.3em] uppercase block mb-1">
                            Metode Syiar Budaya
                          </span>
                          <h3 className="text-3xl font-serif text-white tracking-tight">{activeArtifact.name}</h3>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-gold-400/5 border border-gold-400/10 flex items-center justify-center p-3 font-bold text-gold-400">
                          {getHeritageIcon(activeArtifact.id, "w-8 h-8 stroke-gold-400 text-gold-400")}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <span className="font-sans text-[10px] tracking-widest text-gold-400/60 uppercase font-bold flex items-center gap-2">
                            SIASAT & MODIFIKASI
                          </span>
                          <p className="text-base md:text-lg text-white/85 leading-relaxed font-serif italic pl-5 border-l border-gold-400/30">
                            {activeArtifact.dakwah}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <span className="text-[10px] font-sans tracking-widest text-white/35 uppercase">
                        Sembunyi rahasia? Balikkan kartu →
                      </span>
                      <button
                        onClick={() => {
                          setIsFlipped(true);
                          playChime();
                        }}
                        className="self-start sm:self-auto px-6 py-3 rounded-full bg-gold-400 text-black text-xs font-sans uppercase tracking-[0.15em] font-bold hover:bg-gold-300 hover:shadow-[0_0_20px_rgba(236,201,75,0.2)] transition-all cursor-pointer flex items-center gap-2"
                      >
                        Selami Filosofi Batin →
                      </button>
                    </div>
                  </div>

                  {/* BACK SIDE (Spiritual Philosophy) */}
                  <div
                    style={{ 
                      backfaceVisibility: "hidden", 
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                    className="absolute inset-0 w-full h-full bg-gold-500/[0.02] border border-gold-400/35 rounded-[48px] p-8 md:p-12 backdrop-blur-md flex flex-col justify-between shadow-[inset_0_0_40px_rgba(236,201,75,0.03),0_0_50px_rgba(0,0,0,0.5)]"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-6 border-b border-gold-400/20 mb-8">
                        <div>
                          <span className="text-[10px] font-sans text-gold-400 font-bold tracking-[0.3em] uppercase block mb-1">
                            Dimensi Kebatinan & Tasawuf
                          </span>
                          <h3 className="text-3xl font-serif text-white tracking-tight">{activeArtifact.name}</h3>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-gold-400/5 border border-gold-400/10 flex items-center justify-center p-3 text-gold-400">
                          {getHeritageIcon(activeArtifact.id, "w-8 h-8 stroke-gold-400 text-gold-400")}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <span className="font-sans text-[10px] tracking-widest text-[#ecc94b] uppercase font-bold flex items-center gap-2">
                            FILOSOFI & TASAWUF
                          </span>
                          <p className="text-base md:text-lg text-white/90 leading-relaxed font-serif italic pl-5 border-l border-[#ecc94b]">
                            {activeArtifact.filosofi}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gold-400/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <span className="text-[10px] font-sans tracking-widest text-gold-400/50 uppercase">
                        ← Kembali ke tinjauan metode siasat
                      </span>
                      <button
                        onClick={() => {
                          setIsFlipped(false);
                          playChime();
                        }}
                        className="self-start sm:self-auto px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-gold-400 hover:border-gold-400 text-xs font-sans uppercase tracking-[0.15em] font-bold transition-all cursor-pointer flex items-center gap-2"
                      >
                        ← Kembalikan Kartu
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="kuis" className="py-24 md:py-40 bg-dark-900 overflow-hidden relative border-b border-white/5">
        <div className="absolute inset-0 bg-gold-400/[0.02] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-400 font-bold mb-4 block">Asah Pengetahuan</span>
            <h2 className="text-5xl md:text-7xl font-serif italic mb-6 text-white font-light tracking-tighter">Uji Wawasan</h2>
            <p className="text-lg text-white/40 font-serif italic max-w-2xl mx-auto">
              Sejauh mana Anda mengenal jejak dan filosofi Sunan Kalijaga? Selesaikan 10 tantangan ini.
            </p>
          </motion.div>

          <div className="bg-white/[0.02] border border-white/10 p-10 md:p-16 rounded-[40px] backdrop-blur-sm min-h-[500px] flex flex-col justify-center">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="flex justify-between items-center mb-12">
                  <span className="text-[10px] font-sans text-gold-400 font-bold tracking-[0.3em]">SOAL {currentQuestion + 1} / {quizQuestions.length}</span>
                  <div className="flex gap-1">
                    {quizQuestions.map((_, i) => (
                      <div key={i} className={`h-1 w-4 rounded-full transition-colors ${i <= currentQuestion ? 'bg-gold-400' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-serif italic text-white mb-12 leading-snug">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizQuestions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={isAnswering}
                      className={`group p-6 text-left border transition-all duration-300 ${
                        selectedAnswer === idx
                          ? idx === quizQuestions[currentQuestion].correct
                            ? "bg-gold-400/20 border-gold-400 text-gold-400"
                            : "bg-red-500/10 border-red-500/50 text-red-400"
                          : "bg-white/5 border-white/10 hover:border-white/30 text-white/70 hover:text-white"
                      } ${isAnswering && idx === quizQuestions[currentQuestion].correct && selectedAnswer !== idx ? "border-gold-400/50 text-gold-400" : ""}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-serif italic text-lg">{option}</span>
                        <div className={`w-2 h-2 rounded-full transition-colors ${selectedAnswer === idx ? 'bg-current' : 'bg-white/10 group-hover:bg-white/30'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="inline-block p-10 rounded-full border border-gold-400/20 mb-8 relative">
                   <div className="absolute inset-0 border border-gold-400/10 rounded-full animate-ping" />
                   <span className="text-6xl font-serif italic text-gold-400">{score * 10}%</span>
                </div>
                <h3 className="text-4xl font-serif italic text-white mb-4">Selesai Menempuh Ujian</h3>
                <p className="text-white/50 font-serif italic mb-12">
                  {score >= 8 ? "Luar biasa! Pengetahuan Anda tentang sang penjaga budaya sangat mendalam." : 
                   score >= 5 ? "Bagus! Anda memiliki pemahaman yang baik tentang sejarah peradaban ini." : 
                   "Teruslah belajar dan menyelami jejak langkah sang bijaksana."}
                </p>
                <button 
                  onClick={resetQuiz}
                  className="px-10 py-4 bg-gold-400 text-black font-sans text-xs uppercase tracking-widest font-bold hover:bg-white transition-all"
                >
                  Mulai Ulang Kuis
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section id="video" className="py-24 md:py-40 bg-dark-800 leading-tight border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div {...fadeIn} className="text-center max-w-4xl mx-auto mb-24">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-400 font-bold mb-4 block">Visualisasi Sejarah</span>
            <h2 className="text-5xl md:text-8xl font-serif mb-8 italic text-white font-light tracking-tighter">Galeri Video</h2>
            <p className="text-xl text-white/50 font-serif italic">
              Kumpulan dokumentasi dan ulasan visual mengenai perjuangan serta karya Sunan Kalijaga.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                className="group bg-white/5 overflow-hidden border border-white/10 hover:border-gold-400/50 transition-all duration-500"
              >
                <div className="relative aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark-900 to-transparent opacity-40" />
                </div>
                <div className="p-8 flex flex-col justify-between min-h-[180px]">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-400 mb-3 block font-bold">
                      {video.category}
                    </span>
                    <h3 className="text-2xl font-serif italic text-white group-hover:text-gold-400 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <a 
                      href={video.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-gold-400/80 hover:text-gold-400 font-sans tracking-widest uppercase font-bold transition-colors"
                    >
                      Buka di YouTube 
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <a 
              href="https://www.youtube.com/results?search_query=kisah+sunan+kalijaga" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-4 text-white/40 hover:text-gold-400 font-sans text-[11px] uppercase tracking-[0.3em] transition-all group"
            >
              Cari Lebih Banyak di YouTube
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-dark-900 text-center border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-12">
            <span className="text-[10px] font-sans text-white/30 uppercase tracking-[0.5em] mb-4">Makam Kadilangu, Demak</span>
            <div className="w-1 h-1 bg-gold-400 rounded-full mb-8"></div>
            <h3 className="text-2xl font-serif italic text-white/80 tracking-widest">Memayu Hayuning Bawana</h3>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
            <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-white/40">
              Sunan Kalijaga &copy; {new Date().getFullYear()} / Wali Songo Series
            </p>
            <div className="flex gap-8">
              {sections.map(s => (
                <a key={s.id} href={`#${s.id}`} className="text-[10px] font-sans uppercase tracking-widest text-white/40 hover:text-gold-400 transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>


      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes route-flow {
          from { stroke-dashoffset: 40; }
          to { stroke-dashoffset: 0; }
        }
        .animate-route-flow {
          animation: route-flow 6s linear infinite;
        }
      `}} />
    </div>
  );
}
