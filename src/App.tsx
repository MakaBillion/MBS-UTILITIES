import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Truck,
  Wallet,
  Maximize,
  Zap,
  FileText,
  Ban,
  Eye,
  Camera,
  Send,
  CheckCircle2,
  Loader2,
  PhoneCall,
  Mail,
  ChevronRight
} from 'lucide-react';

import heroTruckImg from './assets/images/hero_industrial_truck_1793560393836.jpg';
import scrapBalesImg from './assets/images/scrap_metal_bales_1793560405388.jpg';
import workshopFloorImg from './assets/images/workshop_floor_1793560416665.jpg';
import hydraulicLiftImg from './assets/images/truck_hydraulic_lift_1793560428757.jpg';

// =========================================================
// 1. BUSINESS CONFIGURATION
// =========================================================
export const BUSINESS_CONFIG = {
  name: 'MBSUTILITIES',
  tagline: 'Free Industrial Scrap Iron, Metal & E-Waste Collection',
  location: 'Industria Road, Vaalbank, Middelburg Industrial Park, Mpumalanga, South Africa',
  serviceAreas: ['Industria', 'Vaalbank', 'Middelburg Industrial Park'],
  phoneDisplay: '+27 72 123 4567',
  phoneRaw: '27721234567',
  email: 'info@mbsutilities.co.za',
  complianceAct: 'Second-Hand Goods Act, 2009 (Act 6 of 2009)',
  whatsappDefaultMsg:
    "Hi MBSUTILITIES, I'd like to book a free scrap iron, metal or e-waste collection. Here are the details:",
  get whatsappUrl() {
    return `https://wa.me/${this.phoneRaw}?text=${encodeURIComponent(this.whatsappDefaultMsg)}`;
  },
  customWhatsappUrl(details: string) {
    const text = `${this.whatsappDefaultMsg}\n\n${details}`;
    return `https://wa.me/${this.phoneRaw}?text=${encodeURIComponent(text)}`;
  }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll detection for fixed navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate send request with short delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div id="top" className="min-h-screen bg-[#1A1A1A] text-zinc-300 font-sans relative selection:bg-[#FF6B00] selection:text-black">
      {/* =========================================================
          4.1 NAVIGATION BAR
      ========================================================= */}
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 md:h-20 flex items-center ${
          isScrolled
            ? 'bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#FF6B00]/20 shadow-xl'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="MBSUTILITIES Home"
          >
            <span className="font-heading font-black tracking-widest text-2xl md:text-4xl text-white group-hover:opacity-90 transition-opacity">
              MBS<span className="text-[#FF6B00]">UTILITIES</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <a
              href="#why-us"
              className="text-sm font-semibold tracking-wider text-zinc-300 hover:text-[#FF6B00] transition-colors uppercase"
            >
              Why Us
            </a>
            <a
              href="#compliance"
              className="text-sm font-semibold tracking-wider text-zinc-300 hover:text-[#FF6B00] transition-colors uppercase"
            >
              Compliance
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold tracking-wider text-zinc-300 hover:text-[#FF6B00] transition-colors uppercase"
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold tracking-wider text-zinc-300 hover:text-[#FF6B00] transition-colors uppercase"
            >
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={BUSINESS_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-industrial inline-flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wide cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Book Free Collection</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-[#FF6B00] focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7 text-white" />
              ) : (
                <Menu className="w-7 h-7 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#1A1A1A] border-t border-b border-[#FF6B00]/40 shadow-2xl px-5 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold tracking-wider text-zinc-200 hover:text-[#FF6B00] uppercase py-2 border-b border-zinc-800"
            >
              Why Us
            </a>
            <a
              href="#compliance"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold tracking-wider text-zinc-200 hover:text-[#FF6B00] uppercase py-2 border-b border-zinc-800"
            >
              Compliance
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold tracking-wider text-zinc-200 hover:text-[#FF6B00] uppercase py-2 border-b border-zinc-800"
            >
              How It Works
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold tracking-wider text-zinc-200 hover:text-[#FF6B00] uppercase py-2 border-b border-zinc-800"
            >
              Contact
            </a>
            <a
              href={BUSINESS_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-industrial mt-2 w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wider text-black text-center"
            >
              <MessageCircle className="w-5 h-5 stroke-[2.5]" />
              <span>Book Free Collection</span>
            </a>
          </div>
        )}
      </nav>

      {/* =========================================================
          4.2 HERO SECTION
      ========================================================= */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20 pb-16"
      >
        {/* Full-bleed background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${heroTruckImg})` }}
        />

        {/* Dual readability overlays */}
        {/* Left-to-right gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/90 to-[#1A1A1A]/40 z-10" />
        {/* Bottom-to-top gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent z-10" />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20 flex flex-col items-start justify-center">
          {/* Small mono orange section label */}
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF6B00] mb-6 font-semibold">
            SECTION_01 / HERO
          </div>

          <div className="max-w-3xl flex flex-col items-start">
            {/* Location Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#FF6B00]/40 bg-[#FF6B00]/10 mb-6 text-xs font-semibold tracking-widest text-[#FF6B00] uppercase">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>MIDDELBURG, MPUMALANGA</span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-heading font-black text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight uppercase-free mb-6">
              Free Industrial Scrap
              <br />
              Iron, Metal & E-Waste
              <br />
              <span className="text-[#FF6B00]">Collection</span>
            </h1>

            {/* Sub-paragraph */}
            <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-8">
              We clear your yard, save your space, and handle the heavy lifting. Fully compliant,{' '}
              <span className="text-white font-semibold">100% free.</span>
            </p>

            {/* Large Orange CTA Button */}
            <a
              href={BUSINESS_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-industrial inline-flex items-center gap-3 px-7 py-4 text-base md:text-lg font-bold uppercase tracking-wider mb-10 shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-6 h-6 stroke-[2.5]" />
              <span>Book a Free Collection via WhatsApp</span>
            </a>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 border-t border-zinc-800/80 w-full">
              <div className="inline-flex items-center gap-2 text-zinc-400 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-[#FF6B00] shrink-0" />
                <span>Second-Hand Goods Act Compliant</span>
              </div>
              <div className="inline-flex items-center gap-2 text-zinc-400 text-sm font-medium">
                <Truck className="w-5 h-5 text-[#FF6B00] shrink-0" />
                <span>Same-Day & Scheduled Pickups</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6px solid orange bar at the very bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FF6B00] z-30" />
      </section>

      {/* =========================================================
          4.3 WHY CHOOSE US
      ========================================================= */}
      <section
        id="why-us"
        className="py-20 md:py-28 bg-[#1A1A1A] relative scroll-mt-16"
      >
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8">
          {/* Section Marker */}
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF6B00] mb-3 font-semibold">
            SECTION_02 / WHY CHOOSE US
          </div>

          {/* Heading */}
          <h2 className="font-heading font-black text-white text-3xl md:text-5xl tracking-tight max-w-2xl mb-12 md:mb-16 leading-tight">
            Built for engineering firms,
            <br />
            <span className="text-[#FF6B00]">fabrication workshops</span> & manufacturing yards
          </h2>

          {/* Three cards in hairline-gap grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#FF6B00]/20 border border-[#FF6B00]/20 shadow-2xl">
            {/* Card 01 */}
            <div className="group bg-[#111111] hover:bg-[#222222] transition-colors duration-300 p-8 md:p-10 flex flex-col justify-between">
              <div>
                {/* Image block */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-[#111111] mb-8">
                  <img
                    src={scrapBalesImg}
                    alt="Compressed scrap iron and metal bales in an industrial recycling yard"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Bottom-up charcoal gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent pointer-events-none" />
                  {/* Large mono orange number top-right */}
                  <span className="absolute top-3 right-4 font-mono font-bold text-2xl text-[#FF6B00] tracking-wider drop-shadow-md">
                    01
                  </span>
                </div>

                {/* Icon + Heading Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center shrink-0">
                    <Wallet className="w-6 h-6 text-[#FF6B00]" />
                  </div>
                  <h3 className="font-heading font-black text-white text-xl md:text-2xl tracking-tight">
                    Zero Cost
                  </h3>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Free truck, free labor, free clearance. You pay nothing — we handle every step from loading to transport at no charge to your business.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <span>Free Clearance</span>
                <span className="text-[#FF6B00]">R0.00 Invoiced</span>
              </div>
            </div>

            {/* Card 02 */}
            <div className="group bg-[#111111] hover:bg-[#222222] transition-colors duration-300 p-8 md:p-10 flex flex-col justify-between">
              <div>
                {/* Image block */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-[#111111] mb-8">
                  <img
                    src={workshopFloorImg}
                    alt="Clean organized industrial workshop floor with cleared space"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Bottom-up charcoal gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent pointer-events-none" />
                  {/* Large mono orange number top-right */}
                  <span className="absolute top-3 right-4 font-mono font-bold text-2xl text-[#FF6B00] tracking-wider drop-shadow-md">
                    02
                  </span>
                </div>

                {/* Icon + Heading Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center shrink-0">
                    <Maximize className="w-6 h-6 text-[#FF6B00]" />
                  </div>
                  <h3 className="font-heading font-black text-white text-xl md:text-2xl tracking-tight">
                    Space Optimization
                  </h3>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Reclaim your yard. We clear the clutter so your workshop stays compliant, hazard-free, and fully operational without scrap piling up.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <span>Safety First</span>
                <span className="text-[#FF6B00]">Hazard Prevention</span>
              </div>
            </div>

            {/* Card 03 */}
            <div className="group bg-[#111111] hover:bg-[#222222] transition-colors duration-300 p-8 md:p-10 flex flex-col justify-between">
              <div>
                {/* Image block */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-[#111111] mb-8">
                  <img
                    src={hydraulicLiftImg}
                    alt="Drop-side truck hydraulic lift mechanism in safety orange"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Bottom-up charcoal gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent pointer-events-none" />
                  {/* Large mono orange number top-right */}
                  <span className="absolute top-3 right-4 font-mono font-bold text-2xl text-[#FF6B00] tracking-wider drop-shadow-md">
                    03
                  </span>
                </div>

                {/* Icon + Heading Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-[#FF6B00]" />
                  </div>
                  <h3 className="font-heading font-black text-white text-xl md:text-2xl tracking-tight">
                    Local & Fast
                  </h3>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Based right near Industria Road. Same-day or scheduled pickups across Middelburg Industrial Park and Vaalbank — we're already next door.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <span>Fast Dispatch</span>
                <span className="text-[#FF6B00]">Middelburg Hub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4.4 COMPLIANCE & SAFETY (Split White Section)
      ========================================================= */}
      <section
        id="compliance"
        className="relative bg-white text-[#1A1A1A] py-20 md:py-28 scroll-mt-16 border-t-2 border-[#FF6B00]"
      >
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (5 columns on desktop) */}
            <div className="lg:col-span-5 flex flex-col items-start">
              {/* Mono orange marker */}
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF6B00] mb-3 font-semibold">
                SECTION_03 / COMPLIANCE
              </div>

              {/* Solid orange block badge, tilted -1 deg */}
              <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-black font-black uppercase text-xs md:text-sm tracking-wider px-3.5 py-1.5 mb-6 shadow-md -rotate-1 select-none">
                <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
                <span>VERIFIED COMPLIANT</span>
              </div>

              {/* H2 */}
              <h2 className="font-heading font-black text-[#1A1A1A] text-3xl md:text-5xl tracking-tight leading-tight mb-6">
                Compliance & Safety
                <br />
                <span className="text-[#FF6B00]">isn't optional.</span>
              </h2>

              {/* Paragraph */}
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8">
                Corporate clients trust us because we strictly follow the{' '}
                <strong className="text-[#1A1A1A] font-black">
                  Second-Hand Goods Act
                </strong>
                . We maintain clear digital records and operate with zero cash handling — ensuring total legal transparency at every step.
              </p>

              {/* Quote Block with 2px orange left border */}
              <div className="w-full border-l-2 border-[#FF6B00] pl-5 py-2 bg-zinc-50/80">
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 mb-1">
                  Act Reference
                </div>
                <div className="font-heading font-black text-[#1A1A1A] text-base md:text-lg">
                  Second-Hand Goods Act, 2009 (Act 6 of 2009)
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  Republic of South Africa Statutory Standard
                </div>
              </div>
            </div>

            {/* Right Column (7 columns on desktop) */}
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-px bg-zinc-200 border border-zinc-200 shadow-sm">
                {/* Row 1: Clear Digital Records */}
                <div className="bg-white hover:bg-zinc-50 transition-colors duration-200 p-6 md:p-8 flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-[#1A1A1A] text-lg md:text-xl tracking-tight mb-2">
                      Clear Digital Records
                    </h3>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      Every collection is documented with a digital manifest — date, weight, source, and destination — giving you a verifiable audit trail.
                    </p>
                  </div>
                </div>

                {/* Row 2: Zero Cash Handling */}
                <div className="bg-white hover:bg-zinc-50 transition-colors duration-200 p-6 md:p-8 flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center shrink-0">
                    <Ban className="w-6 h-6 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-[#1A1A1A] text-lg md:text-xl tracking-tight mb-2">
                      Zero Cash Handling
                    </h3>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      We operate entirely cashless. No money changes hands, eliminating risk and ensuring full financial transparency for your records.
                    </p>
                  </div>
                </div>

                {/* Row 3: Total Legal Transparency */}
                <div className="bg-white hover:bg-zinc-50 transition-colors duration-200 p-6 md:p-8 flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-[#1A1A1A] text-lg md:text-xl tracking-tight mb-2">
                      Total Legal Transparency
                    </h3>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      Full compliance with the Second-Hand Goods Act means your business is protected. Every transaction is traceable, accountable, and lawful.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout from Compliance */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-zinc-100 border border-zinc-200">
                <span className="text-xs md:text-sm text-zinc-700 font-medium">
                  Need a compliance manifest or official collection certificate?
                </span>
                <a
                  href={BUSINESS_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#FF6B00] hover:bg-[#FF7D1F] px-4 py-2 self-start sm:self-auto transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4.5 HOW IT WORKS
      ========================================================= */}
      <section
        id="how-it-works"
        className="py-20 md:py-28 bg-[#1A1A1A] relative scroll-mt-16"
      >
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8">
          {/* Section Marker */}
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF6B00] mb-3 font-semibold">
            SECTION_04 / HOW IT WORKS
          </div>

          {/* Heading */}
          <h2 className="font-heading font-black text-white text-3xl md:text-5xl tracking-tight mb-12 md:mb-16">
            Book it. <span className="text-[#FF6B00]">We clear it.</span>
          </h2>

          {/* Three-step hairline-grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#FF6B00]/20 border border-[#FF6B00]/20 shadow-2xl mb-12 md:mb-16">
            {/* Step 01 */}
            <div className="group bg-[#111111] hover:bg-[#222222] transition-colors duration-300 p-8 md:p-10 relative flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-8">
                  {/* 56px solid orange square holding black 28px icon */}
                  <div className="w-14 h-14 bg-[#FF6B00] flex items-center justify-center shrink-0">
                    <Camera className="w-7 h-7 text-black stroke-[2.2]" />
                  </div>

                  {/* Huge mono number in orange at 20% opacity */}
                  <span className="font-mono font-black text-5xl text-[#FF6B00]/20 group-hover:text-[#FF6B00]/40 transition-colors duration-300 select-none">
                    01
                  </span>
                </div>

                {/* Step Heading */}
                <h3 className="font-heading font-black text-white text-xl md:text-2xl tracking-tight mb-3">
                  Snap a Photo
                </h3>

                {/* Step Description */}
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Not sure what you've got? Snap a quick photo of your scrap pile. It tells us the type and rough volume — so we know exactly which truck and equipment to bring.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Step 1: Visual Assessment
              </div>
            </div>

            {/* Step 02 */}
            <div className="group bg-[#111111] hover:bg-[#222222] transition-colors duration-300 p-8 md:p-10 relative flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-8">
                  {/* 56px solid orange square holding black 28px icon */}
                  <div className="w-14 h-14 bg-[#FF6B00] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-7 h-7 text-black stroke-[2.2]" />
                  </div>

                  {/* Huge mono number in orange at 20% opacity */}
                  <span className="font-mono font-black text-5xl text-[#FF6B00]/20 group-hover:text-[#FF6B00]/40 transition-colors duration-300 select-none">
                    02
                  </span>
                </div>

                {/* Step Heading */}
                <h3 className="font-heading font-black text-white text-xl md:text-2xl tracking-tight mb-3">
                  Book Us
                </h3>

                {/* Step Description */}
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Message us on WhatsApp with your photos, location and preferred time. We'll confirm your pickup slot immediately.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Step 2: Instant Confirmation
              </div>
            </div>

            {/* Step 03 */}
            <div className="group bg-[#111111] hover:bg-[#222222] transition-colors duration-300 p-8 md:p-10 relative flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-8">
                  {/* 56px solid orange square holding black 28px icon */}
                  <div className="w-14 h-14 bg-[#FF6B00] flex items-center justify-center shrink-0">
                    <Truck className="w-7 h-7 text-black stroke-[2.2]" />
                  </div>

                  {/* Huge mono number in orange at 20% opacity */}
                  <span className="font-mono font-black text-5xl text-[#FF6B00]/20 group-hover:text-[#FF6B00]/40 transition-colors duration-300 select-none">
                    03
                  </span>
                </div>

                {/* Step Heading */}
                <h3 className="font-heading font-black text-white text-xl md:text-2xl tracking-tight mb-3">
                  We Clear It Out
                </h3>

                {/* Step Description */}
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Our drop-side truck arrives on schedule. Our crew handles all the loading and heavy lifting — you pay nothing, we leave your yard clean.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Step 3: Free Yard Clearance
              </div>
            </div>
          </div>

          {/* Centred Orange CTA Button */}
          <div className="flex justify-center">
            <a
              href={BUSINESS_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-industrial inline-flex items-center gap-3 px-8 py-4 text-base md:text-lg font-bold uppercase tracking-wider shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 stroke-[2.5]" />
              <span>Book Your Free Collection</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          4.6 CONTACT + FOOTER
      ========================================================= */}
      <section
        id="contact"
        className="pt-20 md:pt-28 bg-[#1A1A1A] relative scroll-mt-16"
      >
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8 mb-20 md:mb-28">
          {/* Section Marker */}
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF6B00] mb-3 font-semibold">
            SECTION_05 / CONTACT
          </div>

          {/* H2 */}
          <h2 className="font-heading font-black text-white text-3xl md:text-5xl tracking-tight mb-12 md:mb-16">
            Book your <span className="text-[#FF6B00]">free collection</span>
          </h2>

          {/* Two columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* LEFT COLUMN: FORM */}
            <div className="bg-[#111111] p-6 sm:p-8 md:p-10 border border-zinc-800">
              <h3 className="font-heading font-black text-white text-lg tracking-widest uppercase mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
                <span>SEND A REQUEST</span>
                <span className="font-mono text-xs text-[#FF6B00] tracking-widest lowercase">
                  [dispatch desk]
                </span>
              </h3>

              {isSubmitted ? (
                /* Success Confirmation Panel */
                <div className="border border-[#FF6B00]/40 bg-[#FF6B00]/5 p-6 sm:p-8 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 bg-[#FF6B00]/20 border border-[#FF6B00] flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-[#FF6B00]" />
                  </div>
                  <h4 className="font-heading font-black text-white text-xl">
                    Request received!
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    We'll be in touch shortly to confirm your collection. For a faster response, message us on WhatsApp.
                  </p>
                  <a
                    href={BUSINESS_CONFIG.customWhatsappUrl(
                      `Name: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nLocation: Middelburg\nDetails: ${formData.message}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-industrial inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black mt-2"
                  >
                    <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                    <span>Message on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs text-zinc-400 underline hover:text-white mt-3 cursor-pointer"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  {/* Row 1: Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5"
                      >
                        Name <span className="text-[#FF6B00]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className={`w-full bg-[#111111] text-white px-4 py-3 text-sm border focus:outline-none focus:border-[#FF6B00] transition-colors ${
                          errors.name ? 'border-red-500' : 'border-zinc-700'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-xs text-red-400 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Company / workshop"
                        className="w-full bg-[#111111] text-white px-4 py-3 text-sm border border-zinc-700 focus:outline-none focus:border-[#FF6B00] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5"
                      >
                        Email <span className="text-[#FF6B00]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.co.za"
                        className={`w-full bg-[#111111] text-white px-4 py-3 text-sm border focus:outline-none focus:border-[#FF6B00] transition-colors ${
                          errors.email ? 'border-red-500' : 'border-zinc-700'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-400 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+27 ..."
                        className="w-full bg-[#111111] text-white px-4 py-3 text-sm border border-zinc-700 focus:outline-none focus:border-[#FF6B00] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Textarea: Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5"
                    >
                      Message <span className="text-[#FF6B00]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your scrap — type (iron, metal, e-waste), approximate volume, and your location in Middelburg."
                      className={`w-full bg-[#111111] text-white px-4 py-3 text-sm border focus:outline-none focus:border-[#FF6B00] transition-colors resize-y ${
                        errors.message ? 'border-red-500' : 'border-zinc-700'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-xs text-red-400 mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-industrial w-full flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wider text-black disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-black" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                        <span>Send Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-zinc-500 text-center">
                    All collections are 100% free of charge and verified compliant.
                  </p>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: REACH US DIRECTLY */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-black text-white text-lg tracking-widest uppercase mb-6 pb-4 border-b border-zinc-800">
                  REACH US DIRECTLY
                </h3>

                {/* Detail Rows */}
                <div className="flex flex-col gap-6">
                  {/* Row 1: WhatsApp / Mobile (first one solid orange with black icon) */}
                  <a
                    href={BUSINESS_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 bg-[#111111] border border-zinc-800/80 hover:border-[#FF6B00]/40 transition-colors"
                  >
                    <div className="w-11 h-11 bg-[#FF6B00] flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-black stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-0.5">
                        WhatsApp / Mobile
                      </div>
                      <div className="font-heading font-bold text-white text-lg group-hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                        <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                        <ChevronRight className="w-4 h-4 text-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-xs text-zinc-400">
                        Fastest response · Instant booking
                      </span>
                    </div>
                  </a>

                  {/* Row 2: Email */}
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="group flex items-start gap-4 p-4 bg-[#111111] border border-zinc-800/80 hover:border-[#FF6B00]/40 transition-colors"
                  >
                    <div className="w-11 h-11 bg-zinc-800 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-0.5">
                        Email
                      </div>
                      <div className="font-heading font-bold text-white text-lg group-hover:text-[#FF6B00] transition-colors">
                        {BUSINESS_CONFIG.email}
                      </div>
                      <span className="text-xs text-zinc-400">
                        Official manifests & documentation
                      </span>
                    </div>
                  </a>

                  {/* Row 3: Operational Area */}
                  <div className="flex items-start gap-4 p-4 bg-[#111111] border border-zinc-800/80">
                    <div className="w-11 h-11 bg-zinc-800 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-0.5">
                        Operational Area
                      </div>
                      <div className="font-heading font-bold text-white text-base leading-snug">
                        {BUSINESS_CONFIG.location}
                      </div>
                      <span className="text-xs text-zinc-400">
                        Middelburg industrial zone & surrounding yards
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Areas Section */}
                <div className="mt-8 pt-8 border-t border-zinc-800">
                  <div className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4 font-semibold">
                    SERVICE AREAS
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {BUSINESS_CONFIG.serviceAreas.map((area) => (
                      <div
                        key={area}
                        className="px-3.5 py-2 font-mono text-xs uppercase tracking-wider border border-[#FF6B00] bg-[#FF6B00]/5 text-[#FF6B00] font-medium"
                      >
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct callout box */}
              <div className="mt-8 p-4 border border-zinc-800 bg-[#161616] flex items-center justify-between">
                <div>
                  <span className="block text-xs uppercase font-mono text-zinc-400">
                    Need emergency scrap clearing?
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Our drop-side trucks operate Mon - Sat.
                  </span>
                </div>
                <a
                  href={BUSINESS_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider text-black bg-[#FF6B00] px-3 py-2 shrink-0 hover:bg-[#FF7D1F]"
                >
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            FOOTER BAR
        ========================================================= */}
        <footer className="border-t border-zinc-800 bg-[#111111] py-8">
          <div className="w-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            {/* Left: Wordmark with 36px solid orange square containing black "M" */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#FF6B00] text-black font-heading font-black text-xl flex items-center justify-center shrink-0">
                M
              </div>
              <span className="font-heading font-black tracking-widest text-xl text-white">
                MBS<span className="text-[#FF6B00]">UTILITIES</span>
              </span>
            </div>

            {/* Centre: Copyright & Info */}
            <div className="text-zinc-500 text-xs sm:text-sm">
              © {currentYear} MBSUTILITIES · Free Scrap Iron, Metal & E-Waste Collection · Middelburg, Mpumalanga
            </div>

            {/* Right: Compliance Act Mono */}
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              Second-Hand Goods Act Compliant
            </div>
          </div>
        </footer>
      </section>

      {/* =========================================================
          4.7 FLOATING WHATSAPP BUTTON (Mobile Only)
      ========================================================= */}
      <a
        href={BUSINESS_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="md:hidden fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#FF6B00] flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,107,0,0.5)] active:scale-95 transition-transform"
      >
        <MessageCircle className="w-7 h-7 stroke-[2.5] text-black" />
      </a>
    </div>
  );
}
