import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const slides = [
  { image: '/hero.png', title: '28 years of doing the\nimpossible' },
  { image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1600&h=800&fit=crop', title: 'Compassionate Care,\nAdvanced Technology' },
  { image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=1600&h=800&fit=crop', title: 'Leading the way in\nsurgical innovation' },
  { image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=1600&h=800&fit=crop', title: 'Creating a safe healing\nenvironment for families' }
];

const specialityDepts = [
  // Page 1
  { title: 'Anesthesiology and Critical Care', icon: '💊', desc: 'The department of anesthesiology and critical care medicine at LemiCare Hospital offe...' },
  { title: 'Cardiac Anesthesia', icon: '❤️', desc: 'The Cardiac Anesthesia Department at LemiCare Hospital specializes in providing...' },
  { title: 'Clinical Nutrition', icon: '🛡️', desc: 'Clinical Nutrition at LemiCare Hospital, Kochi, is a pioneering department with a rich history...' },
  { title: 'Craniomaxillofacial Surgery', icon: '❤️', desc: 'The Department of Craniomaxillofacial Surgery at LemiCare Institute of Medical...' },
  // Page 2
  { title: 'Dermatology', icon: '🧴', desc: 'Our dermatology department offers comprehensive care for skin, hair, and nail disorders...' },
  { title: 'Emergency Medicine', icon: '🚑', desc: 'The Emergency Medicine department operates 24/7 with state-of-the-art trauma care...' },
  { title: 'Endocrinology', icon: '🔬', desc: 'Providing advanced diagnosis and treatment for diabetes, thyroid, and hormonal disorders...' },
  { title: 'Gastroenterology', icon: '🦠', desc: 'Specialized care for diseases of the digestive system, including liver and pancreas...' }
];

const excellenceDepts = [
  { title: 'Heart Institute', icon: '🫀', desc: 'A world-class cardiothoracic centre equipped with the latest surgical technology...' },
  { title: 'Cancer Care Center', icon: '🎗️', desc: 'Comprehensive oncology services including radiation, medical, and surgical treatments...' },
  { title: 'Neuroscience Center', icon: '🧠', desc: 'Leading institute covering neurosurgery, neurology, and cognitive rehabilitation...' },
  { title: 'Organ Transplant', icon: '🫁', desc: 'A pioneering multi-organ transplant program renowned across the nation...' }
];

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [infoTab, setInfoTab] = useState('find'); // 'find' or 'booking'
  const [selectedDept, setSelectedDept] = useState('');

  // Departments Carousel State
  const [deptTab, setDeptTab] = useState('speciality');
  const [deptPage, setDeptPage] = useState(0);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (selectedDept) {
      // In a real app, you might pass the selected dept via state or query params.
      navigate('/find-doctor', { state: { department: selectedDept } });
    } else {
      navigate('/find-doctor');
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Enables smooth scrolling for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Compute active departments
  const activeDepts = deptTab === 'speciality' ? specialityDepts : excellenceDepts;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(activeDepts.length / itemsPerPage);

  // Reset to first page when changing tabs
  useEffect(() => {
    setDeptPage(0);
  }, [deptTab]);

  const displayedDepts = activeDepts.slice(deptPage * itemsPerPage, (deptPage + 1) * itemsPerPage);

  const handlePrevPage = () => {
    if (deptPage > 0) setDeptPage(deptPage - 1);
  };

  const handleNextPage = () => {
    if (deptPage < totalPages - 1) setDeptPage(deptPage + 1);
  };

  const sliderWidth = `${((deptPage + 1) / totalPages) * 100}%`;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", width: '100vw', overflowX: 'hidden', background: '#fff' }}>
      <PublicNavbar />

      {/* Hero Banner */}
      <section
        className="h-[400px] md:h-[600px] w-full relative flex items-center px-6 md:px-20"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', transition: 'background-image 1s ease-in-out' }}></div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', color: '#fff' }}>
          <h1 key={currentSlide} className="animate-fade-in text-[40px] md:text-[72px]" style={{ fontWeight: '400', lineHeight: 1.1, marginBottom: '24px', md: { marginBottom: '40px' }, fontFamily: "'Georgia', serif", whiteSpace: 'pre-line', animation: 'fadeIn 1s ease-in-out' }}>
            {slides[currentSlide].title}
          </h1>

          <Link to="/about" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px'
          }} className="hover:text-gray-200 transition-colors">
            Learn More
            <span style={{
              background: '#fff',
              color: '#000',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </Link>
        </div>

        {/* Carousel Dots */}
        <div style={{ position: 'absolute', bottom: '40px', right: '80px', display: 'flex', gap: '8px' }}>
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: index === currentSlide ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </section>

      {/* Info Strip - Dropdown Search Bars */}
      <section className="flex flex-col px-6 md:px-20 py-10 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-6 border-b border-slate-200 pb-4">
          <h3
            onClick={() => setInfoTab('find')}
            style={{
              margin: 0, fontSize: '15px', fontWeight: infoTab === 'find' ? 700 : 600,
              color: infoTab === 'find' ? '#1e293b' : '#64748b',
              cursor: 'pointer',
              borderBottom: infoTab === 'find' ? '2px solid #1e293b' : 'none',
              paddingBottom: infoTab === 'find' ? '16px' : '0',
              marginBottom: infoTab === 'find' ? '-17px' : '0'
            }}
            className={infoTab !== 'find' ? "hover:text-black transition-colors" : ""}
          >
            Find Department & Doctors
          </h3>
          <h3
            onClick={() => setInfoTab('booking')}
            style={{
              margin: 0, fontSize: '15px', fontWeight: infoTab === 'booking' ? 700 : 600,
              color: infoTab === 'booking' ? '#1e293b' : '#64748b',
              cursor: 'pointer',
              borderBottom: infoTab === 'booking' ? '2px solid #1e293b' : 'none',
              paddingBottom: infoTab === 'booking' ? '16px' : '0',
              marginBottom: infoTab === 'booking' ? '-17px' : '0'
            }}
            className={infoTab !== 'booking' ? "hover:text-black transition-colors" : ""}
          >
            Booking Assistance
          </h3>
        </div>

        {infoTab === 'find' ? (
          <div className="animate-fade-in flex flex-col md:flex-row items-stretch md:items-end gap-5">
            <div className="flex-1">
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Treatment</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '12px 16px', borderRadius: '999px', border: '1px solid #cbd5e1', outline: 'none', appearance: 'none', background: '#fff', color: '#333' }}>
                  <option>All Ailments</option>
                  <option>Heart Issues</option>
                  <option>Brain & Nerves</option>
                  <option>Cancer Care</option>
                </select>
                <svg style={{ position: 'absolute', right: '16px', top: '14px', pointerEvents: 'none', color: '#64748b' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
            <div className="flex-1">
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Department</label>
              <div style={{ position: 'relative' }}>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '999px', border: '1px solid #cbd5e1', outline: 'none', appearance: 'none', background: '#fff', color: '#333' }}
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
                <svg style={{ position: 'absolute', right: '16px', top: '14px', pointerEvents: 'none', color: '#64748b' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="hover:bg-purple-800 transition-colors w-full md:w-auto"
              style={{ padding: '12px 32px', background: '#5b21b6', color: '#fff', border: 'none', borderRadius: '999px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              Search
            </button>

            <Link to="/departments" className="hover:text-blue-800 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontSize: '13px', fontWeight: 600, textDecoration: 'none', marginLeft: '20px', paddingBottom: '12px' }}>
              <span style={{ borderBottom: '1px solid #333' }}>View all Specialities</span>
              <span style={{ background: '#333', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </Link>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#eff6ff', padding: '24px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontSize: '18px', fontWeight: 600 }}>Need help scheduling your visit?</h4>
              <p style={{ margin: 0, color: '#3b82f6', fontSize: '14px' }}>Our dedicated appointment desk is ready to assist you in getting the right care.</p>
            </div>
            <Link to="/contact" className="hover:bg-blue-700 transition-colors" style={{ padding: '12px 32px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '999px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
              Contact Booking Desk
            </Link>
          </div>
        )}
      </section>

      {/* Why Amrita Hospital Layout */}
      <section className="px-6 md:px-20 py-16 md:py-24 flex flex-col lg:flex-row gap-12 md:gap-20 bg-white">
        <div style={{ flex: 1 }}>
          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: 600, marginBottom: '24px' }}>Why LemiCare Hospital?</p>
          <h2 className="text-[32px] md:text-[42px]" style={{ fontFamily: "'Georgia', serif", color: '#1e293b', marginBottom: '40px', lineHeight: 1.2 }}>
            Our team of experts<br className="hidden md:block" />
            provides top-notch<br className="hidden md:block" />
            medical treatment<br className="hidden md:block" />
            with empathy using<br className="hidden md:block" />
            the most advanced<br className="hidden md:block" />
            technology.
          </h2>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="hover:bg-gray-50 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '999px', border: '1px solid #1e293b', background: 'transparent', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5b21b6" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M10 8l6 4-6 4z" /></svg>
              Watch our Video
            </button>
            <button className="hover:bg-gray-200 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '999px', border: 'none', background: '#f1f5f9', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Locate Us
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.8, marginBottom: '24px' }}>
            Your health is our priority. LemiCare Hospital ensures you and your family receive the best possible medical care and assistance. We strive to create a warm and safe healing environment for you and your family. Over the past decade, LemiCare has been unflinchingly devoted to improving healthcare and treatment. Medical specialists have been working diligently to conduct research and educate future generations of doctors and healthcare workers.
          </p>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.8, marginBottom: '40px' }}>
            As our entire team works toward your speedy recovery, we utilize highly-trained doctors and cutting-edge technology in the field of medical sciences.
          </p>

          <div className="flex flex-wrap gap-10 mb-10">
            <div>
              <h3 style={{ fontSize: '28px', color: '#1e293b', margin: '0 0 8px 0', fontFamily: "'Georgia', serif" }}>1300+</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: 600 }}>Bed Capacity</p>
            </div>
            <div className="hidden sm:block w-[1px] bg-slate-200"></div>
            <div>
              <h3 style={{ fontSize: '28px', color: '#1e293b', margin: '0 0 8px 0', fontFamily: "'Georgia', serif" }}>10M+</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: 600 }}>Cured Patients</p>
            </div>
            <div className="hidden sm:block w-[1px] bg-slate-200"></div>
            <div>
              <h3 style={{ fontSize: '28px', color: '#1e293b', margin: '0 0 8px 0', fontFamily: "'Georgia', serif" }}>128+</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: 600 }}>Medical Apparatus</p>
            </div>
          </div>

          <Link to="/about" className="hover:text-blue-800 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
            <span style={{ borderBottom: '1px solid #333' }}>Learn more about us</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* Our Departments & Centers */}
      <section className="px-6 md:px-20 py-16 md:py-24 bg-slate-50">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontFamily: "'Georgia', serif", color: '#1e293b', marginBottom: '32px' }}>Our Departments & Centers</h2>
            <div style={{ display: 'flex', gap: '40px', borderBottom: '1px dashed #cbd5e1', paddingBottom: '16px' }}>
              <h3
                onClick={() => setDeptTab('speciality')}
                style={{ margin: 0, fontSize: '14px', fontWeight: deptTab === 'speciality' ? 700 : 600, color: deptTab === 'speciality' ? '#1e293b' : '#64748b', cursor: 'pointer', borderBottom: deptTab === 'speciality' ? '2px solid #1e293b' : 'none', paddingBottom: deptTab === 'speciality' ? '17px' : '0', marginBottom: deptTab === 'speciality' ? '-17px' : '0' }}
              >
                Speciality Departments
              </h3>
              <h3
                onClick={() => setDeptTab('excellence')}
                style={{ margin: 0, fontSize: '14px', fontWeight: deptTab === 'excellence' ? 700 : 600, color: deptTab === 'excellence' ? '#1e293b' : '#64748b', cursor: 'pointer', borderBottom: deptTab === 'excellence' ? '2px solid #1e293b' : 'none', paddingBottom: deptTab === 'excellence' ? '17px' : '0', marginBottom: deptTab === 'excellence' ? '-17px' : '0' }}
              >
                Centres of Excellence
              </h3>
            </div>
          </div>
          <Link to="/departments" className="hover:text-blue-800 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontSize: '13px', fontWeight: 600, textDecoration: 'none', paddingBottom: '12px' }}>
            <span style={{ borderBottom: '1px solid #333' }}>View all Departments</span>
            <span style={{ background: '#333', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </Link>
        </div>

        <div className="animate-fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10" key={deptTab + deptPage}>
          {displayedDepts.map(dept => (
            <div key={dept.title} style={{ background: '#fff', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '24px', marginBottom: '24px', opacity: 0.8 }}>{dept.icon}</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', margin: '0 0 16px 0', lineHeight: 1.4 }}>{dept.title}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>{dept.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg
            onClick={handlePrevPage}
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={deptPage > 0 ? "#1e293b" : "#cbd5e1"} strokeWidth="2"
            style={{ cursor: deptPage > 0 ? 'pointer' : 'default', transition: 'stroke 0.3s' }}
          >
            <circle cx="12" cy="12" r="10" /><path d="M12 8l-4 4 4 4" />
          </svg>

          <div style={{ flex: 1, height: '2px', background: '#e2e8f0', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: sliderWidth, background: '#1e293b', transition: 'width 0.3s ease-in-out' }}></div>
          </div>

          <svg
            onClick={handleNextPage}
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={deptPage < totalPages - 1 ? "#1e293b" : "#cbd5e1"} strokeWidth="2"
            style={{ cursor: deptPage < totalPages - 1 ? 'pointer' : 'default', transition: 'stroke 0.3s' }}
          >
            <circle cx="12" cy="12" r="10" /><path d="M12 8l4 4-4 4" />
          </svg>
        </div>
      </section>

      {/* Support Services */}
      <section className="px-6 md:px-20 py-16 md:py-24 bg-gradient-to-br from-teal-800 to-blue-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <h2 style={{ fontSize: '32px', fontFamily: "'Georgia', serif", color: '#fff', margin: 0 }}>Support Services</h2>
          <Link to="/departments" className="hover:opacity-80 transition-opacity" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
            View all
            <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.4)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { img: 'https://images.unsplash.com/photo-1579154204601-58ee8707eb45?w=200&h=200&fit=crop', title: 'LemiCare Clinical Laboratory Services', desc: 'Offering the most comprehensive laboratory with the best advancements in technology.' },
            { img: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=200&h=200&fit=crop', title: 'Nursing Services', desc: 'Delivering the best possible care and treatments to patients in a morally responsible and compassionate manner.' },
            { img: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?w=200&h=200&fit=crop', title: 'The Center for Digital Health (CDH)', desc: 'Facilitating multidisciplinary medical training of international caliber.' },
            { img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=200&h=200&fit=crop', title: 'Pharmacy', desc: 'Our pharmaceutical services cater to the needs of outpatients and inpatients.' },
            { img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop', title: 'Dietary', desc: 'Skilled dieticians take care of your health by tending to its nutritional needs.' },
            { img: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=200&h=200&fit=crop', title: 'Transfusion Medicine / Blood Bank', desc: 'We collect and test your blood samples and process hematopoietic stem cells with the utmost care and in a very responsible...' },
          ].map((service, i) => (
            <div key={service.title} className="flex flex-col sm:flex-row h-auto sm:h-[160px] bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 hover:bg-white/20 transition-colors">
              <div className="w-full sm:w-[160px] h-[160px] sm:h-full flex-shrink-0">
                <img src={service.img} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, margin: '0 0 10px 0' }}>{service.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', margin: '0 0 14px 0', lineHeight: 1.6 }}>{service.desc}</p>
                <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a7f3d0', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="hover:text-white transition-colors">
                  Read more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Accreditations & Certifications */}
      <section className="px-6 md:px-20 py-16 md:py-24 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <h2 style={{ fontSize: '36px', fontFamily: "'Georgia', serif", color: '#1e293b', margin: 0 }}>Accreditations &amp; Certifications</h2>
          <Link to="/about" className="hover:opacity-80 transition-opacity" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
            View all
            <span style={{ background: '#475569', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row border border-slate-200 rounded-lg">
          {[
            { img: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/NABH_logo.jpg/220px-NABH_logo.jpg', title: 'NABH', subtitle: 'Accreditation', desc: 'LemiCare Hospital is the first university teaching hospital to get fully N...' },
            { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/ISO_Logo_%28Red_square%29.svg/200px-ISO_Logo_%28Red_square%29.svg.png', title: 'ISO', subtitle: 'Certification', desc: 'The ISO standards provide a guarantee of quality across boundaries and...' },
            { img: 'https://www.nabl-india.org/wp-content/themes/nabl/images/nabl-logo.png', title: 'NABL', subtitle: 'Accreditation', desc: 'The National Accreditation Board for Testing and Calibration Laboratories...' }
          ].map((cert, index) => (
            <div key={cert.title} className={`flex-1 p-8 md:p-10 border-b lg:border-b-0 ${index !== 2 ? 'lg:border-r border-slate-200' : ''} flex flex-col`}>
              <div style={{ height: '80px', width: '80px', marginBottom: '24px', background: '#fff', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
                <div style={{ width: '100%', height: '100%', backgroundImage: `url(${cert.img})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', filter: 'grayscale(0.5)' }}></div>
              </div>
              <div style={{ display: 'inline-block', padding: '4px 12px', border: '1px solid #cbd5e1', borderRadius: '999px', fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '16px', alignSelf: 'flex-start' }}>{cert.subtitle}</div>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#1e293b', fontWeight: 700 }}>{cert.title}</h4>
              <p style={{ margin: '0 0 32px 0', fontSize: '15px', color: '#64748b', lineHeight: 1.6, flex: 1 }}>{cert.desc}</p>
              <Link to="/about" className="hover:text-blue-800 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#333', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>
                <span style={{ borderBottom: '1px solid #333' }}>Learn more</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Our Blogs */}
      <section className="px-6 md:px-20 py-16 md:py-24 bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <h2 style={{ fontSize: '36px', fontFamily: "'Georgia', serif", color: '#1e293b', margin: 0 }}>Our Blogs</h2>
          <Link to="/about" className="hover:opacity-80 transition-opacity" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
            View all
            <span style={{ background: '#475569', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            { tag: 'Health News', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&fit=crop', title: 'Lipid Profile Test: Meaning, Uses, Normal Range...', desc: 'Your blood is mainly made of oil or wax for most people, it builds over in our time...' },
            { tag: 'Health News', img: 'https://images.unsplash.com/photo-1583912267550-d40d30bf99ce?w=800&fit=crop', title: 'INSISION: AIMS Hospital\'s New Innovation Offers Hope...', desc: 'For some people living with epilepsy, medicines may never assume a real cure but...' },
            { tag: 'Health News', img: 'https://images.unsplash.com/photo-1555252834-8c8bc3dc7e76?w=800&fit=crop', title: 'Double Marker Test (First-Trimester Combined Screen)', desc: 'Pregnancy is an important phase of life, and every prenatal screening tests assess...' }
          ].map((blog, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col shadow-sm">
              <div className="h-[220px] md:h-[260px]" style={{ backgroundImage: `url(${blog.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: '#fff', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#333' }}>{blog.tag}</div>
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#1e293b', fontWeight: 700, lineHeight: 1.4 }}>{blog.title}</h4>
                <p style={{ margin: '0 0 32px 0', fontSize: '15px', color: '#64748b', lineHeight: 1.6, flex: 1 }}>{blog.desc}</p>
                <Link to="/about" className="hover:text-blue-800 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8l4 4-4 4" /></svg>
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" style={{ cursor: 'pointer' }}><circle cx="12" cy="12" r="10" /><path d="M12 8l-4 4 4 4" /></svg>
          <div style={{ flex: 1, height: '2px', background: '#e2e8f0', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '33%', background: '#1e293b' }}></div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" style={{ cursor: 'pointer' }} className="hover:opacity-75 transition-opacity"><circle cx="12" cy="12" r="10" /><path d="M12 8l4 4-4 4" /></svg>
        </div>
      </section>

      {/* Healing for the Soul */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-white flex flex-col lg:flex-row gap-12 md:gap-24 items-center">
        <div style={{ flex: 1 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#cbd5e1" style={{ marginBottom: '32px' }}>
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <h2 className="text-[32px] md:text-[44px]" style={{ fontFamily: "'Georgia', serif", color: '#1e293b', marginBottom: '32px', lineHeight: 1.2 }}>
            Healing for the Soul,<br className="hidden md:block" />
            Unlocking the Secrets to<br className="hidden md:block" />
            Recovery
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.8 }}>
            Connect to our expert doctors, who share their insights and knowledge to help you heal and recover. From practical tips to inspiring stories, we offer a wealth of information to help you heal faster and get back to a healthy, happy life. Join us on our journey to better health.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ position: 'relative', height: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)' }}></div>
            <div className="hover:scale-105 transition-transform" style={{ position: 'absolute', bottom: '32px', left: '32px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '999px', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '14px', fontWeight: 600 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              Watch Video
            </div>
          </div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e293b', fontWeight: 700 }}>Symptoms and Precautions of Mpox</h4>
          <Link to="/about" className="hover:opacity-80 transition-opacity" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none' }}>By: T E LemiCare Health</Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" style={{ cursor: 'pointer' }}><circle cx="12" cy="12" r="10" /><path d="M12 8l-4 4 4 4" /></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" style={{ cursor: 'pointer' }} className="hover:opacity-75 transition-opacity"><circle cx="12" cy="12" r="10" /><path d="M12 8l4 4-4 4" /></svg>
          </div>
        </div>
      </section>

      {/* Patient Stories */}
      <section className="px-6 md:px-20 py-16 md:py-24 bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <h2 style={{ fontSize: '36px', fontFamily: "'Georgia', serif", color: '#1e293b', margin: 0 }}>Patient Stories</h2>
          <Link to="/about" className="hover:opacity-80 transition-opacity" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
            View all
            <span style={{ background: '#475569', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {[
            { title: 'Lincy Rajan Breast Cancer Stories', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&fit=crop' },
            { title: 'Patient Story of Yvezza Fernandez from Philippines', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&fit=crop' }
          ].map((story, i) => (
            <div key={i}>
              <div style={{ height: '400px', backgroundImage: `url(${story.img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '12px', overflow: 'hidden', position: 'relative', marginBottom: '24px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.2)' }}></div>
                <div className="hover:scale-105 transition-transform" style={{ position: 'absolute', bottom: '32px', left: '32px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '999px', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '14px', fontWeight: 600 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  Watch Video
                </div>
              </div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '20px', color: '#1e293b', fontWeight: 700 }}>{story.title}</h4>
              <Link to="/about" className="hover:text-blue-800 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>
                <span style={{ borderBottom: '1px solid #64748b', paddingBottom: '2px' }}>Watch Video</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" style={{ cursor: 'pointer' }}><circle cx="12" cy="12" r="10" /><path d="M12 8l-4 4 4 4" /></svg>
          <div style={{ flex: 1, height: '2px', background: '#e2e8f0', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', background: '#1e293b' }}></div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" style={{ cursor: 'pointer' }} className="hover:opacity-75 transition-opacity"><circle cx="12" cy="12" r="10" /><path d="M12 8l4 4-4 4" /></svg>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Landing;
