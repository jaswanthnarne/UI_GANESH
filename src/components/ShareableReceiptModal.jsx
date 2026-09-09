import React, { useRef, useState } from 'react';
import { X, Share2, Download, ShieldCheck, Heart, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { GaneshaLineArt } from './GaneshaLineArt';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const ShareableReceiptModal = ({ contribution, settings, onClose }) => {
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const [downloading, setDownloading] = useState(false);

  if (!contribution) return null;

  const committeeName = settings?.committeeName || 'Ganesh Utsav Celebration Committee';
  const festivalYear = settings?.festivalYear || 2026;
  const address = settings?.address || 'Royal Palms Apartment, Phase 1 & 2';

  // Format WhatsApp Text
  const shareText = encodeURIComponent(
    `🌺 *Ganesh Utsav ${festivalYear} — Official Contribution Receipt*\n\n` +
    `Dear *${contribution.contributorName}* (Flat *${contribution.flatNumber}*),\n` +
    `Thank you for your contribution of *₹${contribution.amount.toLocaleString('en-IN')}* to *${committeeName}*!\n\n` +
    `📅 Date: ${new Date(contribution.date).toLocaleDateString('en-IN')}\n` +
    `💳 Payment Mode: ${contribution.mode ? contribution.mode.toUpperCase() : 'UPI'}\n` +
    `✅ Status: Verified Treasurer Record\n\n` +
    `*Shree Ganesha Blessings / ಗಣೇಶ ಆಶೀರ್ವಾದ:*\n` +
    `ವಕ್ರತುಂಡ ಮಹಾಕಾಯ ಸೂರ್ಯಕೋಟಿ ಸಮಪ್ರಭ।\n` +
    `ನಿರ್ವಿಘ್ನಂ ಕುರು ಮೇ ದೇವ ಸರ್ವಕಾರ್ಯೇಷು ಸರ್ವದಾ॥\n\n` +
    `Ganpati Bappa Morya! 🙏`
  );

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    if (!page1Ref.current || !page2Ref.current) return;
    try {
      setDownloading(true);

      // Render Page 1 Canvas
      const canvas1 = await html2canvas(page1Ref.current, {
        scale: 2.5,
        backgroundColor: '#FAF6F0',
        useCORS: true,
        logging: false,
      });
      const imgData1 = canvas1.toDataURL('image/png');

      // Render Page 2 Canvas
      const canvas2 = await html2canvas(page2Ref.current, {
        scale: 2.5,
        backgroundColor: '#FAF6F0',
        useCORS: true,
        logging: false,
      });
      const imgData2 = canvas2.toDataURL('image/png');

      // Create PDF (A4 Portrait)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData1, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.addPage();
      pdf.addImage(imgData2, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save(`Official_Receipt_Flat_${contribution.flatNumber}_Ganesh_${festivalYear}.pdf`);
    } catch (err) {
      console.error('Failed to generate 2-Page PDF', err);
    } finally {
      setDownloading(false);
    }
  };

  const receiptDate = new Date(contribution.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#FAF6F0] dark:bg-[#1E1812] border-2 border-saffron-400 dark:border-saffron-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-saffron-100 text-saffron-800 dark:bg-stone-800 dark:text-gold-300 uppercase tracking-widest">
            OFFICIAL 2-PAGE RECEIPT & BLESSINGS DOCUMENT
          </span>
        </div>

        {/* 2-PAGE PREVIEW CONTAINER */}
        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2 no-scrollbar">
          
          {/* ═══════════════════════════════════════════════════════════════
              PAGE 1: OFFICIAL FINANCIAL RECEIPT
              ═══════════════════════════════════════════════════════════════ */}
          <div
            ref={page1Ref}
            style={{ fontFamily: 'Inter, system-ui, sans-serif', aspectRatio: '210/297' }}
            className="p-10 bg-[#FAF6F0] rounded-3xl border-2 border-saffron-300 shadow-md relative flex flex-col justify-between"
          >
            {/* Decorative Corner Borders */}
            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-saffron-400 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-saffron-400 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-saffron-400 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-saffron-400 rounded-br-lg" />

            <div>
              {/* Header */}
              <div className="text-center border-b-2 border-dashed border-saffron-300 pb-5 mb-6">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <GaneshaLineArt className="w-10 h-10 text-saffron-500" glow={false} />
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: '18px', color: '#5C2802', letterSpacing: '-0.3px' }}>
                      {committeeName}
                    </h3>
                    <p style={{ fontSize: '11px', color: '#78716c' }}>📍 {address}</p>
                  </div>
                  <GaneshaLineArt className="w-10 h-10 text-saffron-500" glow={false} />
                </div>
                <div className="flex items-center justify-center space-x-4 mt-3">
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#B05307', textTransform: 'uppercase' }}>
                    OFFICIAL CONTRIBUTION RECEIPT
                  </span>
                  <span style={{
                    fontSize: '9px', fontWeight: 800, padding: '2px 10px',
                    borderRadius: '9999px', background: '#F38B2B', color: 'white',
                    letterSpacing: '1px'
                  }}>
                    PAGE 1 / 2
                  </span>
                </div>
              </div>

              {/* Receipt ID & Festival Year Badge */}
              <div className="flex items-center justify-between mb-5">
                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#78716c' }}>
                  Receipt Ref: #{contribution._id?.slice(-8).toUpperCase()}
                </span>
                <span style={{
                  fontSize: '10px', fontWeight: 700, padding: '3px 12px',
                  borderRadius: '12px', background: '#FFF0DE', color: '#B05307',
                  border: '1px solid #FFCB91'
                }}>
                  Festival Year {festivalYear}
                </span>
              </div>

              {/* Receipt Particulars Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', borderRadius: '16px', background: 'rgba(255,240,222,0.5)', border: '1px solid #FFE1BD' }}>
                  <span style={{ fontSize: '10px', color: '#a8a29e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Flat Number</span>
                  <p style={{ fontWeight: 800, fontSize: '18px', color: '#5C2802', marginTop: '4px' }}>Flat {contribution.flatNumber}</p>
                </div>

                <div style={{ padding: '14px', borderRadius: '16px', background: 'rgba(255,240,222,0.5)', border: '1px solid #FFE1BD' }}>
                  <span style={{ fontSize: '10px', color: '#a8a29e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contributor Name</span>
                  <p style={{ fontWeight: 700, fontSize: '16px', color: '#1c1917', marginTop: '4px' }}>{contribution.contributorName}</p>
                </div>

                <div style={{ padding: '14px', borderRadius: '16px', background: 'rgba(255,240,222,0.5)', border: '1px solid #FFE1BD' }}>
                  <span style={{ fontSize: '10px', color: '#a8a29e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date Received</span>
                  <p style={{ fontWeight: 600, fontSize: '14px', color: '#44403c', marginTop: '4px' }}>{receiptDate}</p>
                </div>

                <div style={{ padding: '14px', borderRadius: '16px', background: 'rgba(255,240,222,0.5)', border: '1px solid #FFE1BD' }}>
                  <span style={{ fontSize: '10px', color: '#a8a29e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment Mode</span>
                  <p style={{ fontWeight: 700, fontSize: '14px', color: '#166534', marginTop: '4px', textTransform: 'uppercase' }}>
                    {contribution.mode || 'UPI'}
                  </p>
                </div>
              </div>

              {/* Amount Display */}
              <div style={{
                padding: '20px', borderRadius: '20px', textAlign: 'center',
                background: 'linear-gradient(135deg, #F38B2B, #D96F14)',
                boxShadow: '0 8px 24px rgba(243,139,43,0.3)'
              }}>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', color: '#FFF9C4', textTransform: 'uppercase' }}>
                  Total Contribution Amount
                </p>
                <p style={{ fontSize: '36px', fontWeight: 900, color: 'white', marginTop: '6px', fontFamily: 'Outfit, sans-serif' }}>
                  ₹{contribution.amount.toLocaleString('en-IN')}
                </p>
              </div>

              {contribution.notes && (
                <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#78716c', textAlign: 'center', marginTop: '12px' }}>
                  "{contribution.notes}"
                </p>
              )}
            </div>

            {/* Footer Seal */}
            <div style={{
              paddingTop: '16px', borderTop: '2px dashed #FFE1BD',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontSize: '11px', color: '#78716c', marginTop: '16px'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: '#166534' }}>
                <ShieldCheck style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                Treasurer Verified Ledger Entry
              </span>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 700, color: '#44403c' }}>Authorized Signature</p>
                <p style={{ fontSize: '9px', color: '#a8a29e' }}>{committeeName} {festivalYear}</p>
              </div>
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════════════════
              PAGE 2: GANESH SHLOKAS & BLESSINGS — KANNADA, HINDI, ENGLISH
              ═══════════════════════════════════════════════════════════════ */}
          <div
            ref={page2Ref}
            style={{ fontFamily: 'Inter, system-ui, sans-serif', aspectRatio: '210/297' }}
            className="p-10 bg-gradient-to-b from-[#FAF6F0] to-[#FFF8F0] rounded-3xl border-2 border-saffron-300 shadow-md relative flex flex-col justify-between text-center"
          >
            <div>
              {/* Top Badge */}
              <div className="flex items-center justify-between border-b border-saffron-200 pb-3 mb-5">
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#B05307', display: 'flex', alignItems: 'center' }}>
                  <Sparkles style={{ width: '14px', height: '14px', marginRight: '6px', color: '#E5BF00' }} />
                  DIVINE SHLOKAS & FESTIVAL BLESSINGS
                </span>
                <span style={{
                  fontSize: '9px', fontWeight: 800, padding: '2px 10px',
                  borderRadius: '9999px', background: '#F38B2B', color: 'white'
                }}>
                  PAGE 2 / 2
                </span>
              </div>

              {/* Ganesha Art */}
              <div className="my-3">
                <GaneshaLineArt className="w-24 h-24 mx-auto text-saffron-500" glow={false} />
              </div>

              <h4 style={{ fontWeight: 800, fontSize: '16px', color: '#5C2802', margin: '8px 0 6px' }}>
                श्री सिद्धिविनायक प्रसाद एवं मंगल कामनाएं
              </h4>

              <p style={{ fontSize: '11px', color: '#78716c', marginBottom: '16px' }}>
                Blessings from Lord Ganesha — The Remover of Obstacles
              </p>

              {/* Shlokas Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Sanskrit / Hindi Shloka */}
                <div style={{
                  padding: '16px', borderRadius: '16px',
                  background: 'rgba(255,255,255,0.85)', border: '1px solid #FFE1BD'
                }}>
                  <p style={{ fontSize: '9px', fontWeight: 700, color: '#B05307', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Hindi / Sanskrit Shloka (हिंदी)
                  </p>
                  <p style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', lineHeight: 1.7 }}>
                    वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br />
                    निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
                  </p>
                </div>

                {/* Kannada Shloka */}
                <div style={{
                  padding: '16px', borderRadius: '16px',
                  background: 'rgba(255,255,255,0.85)', border: '1px solid #FFE1BD'
                }}>
                  <p style={{ fontSize: '9px', fontWeight: 700, color: '#B05307', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Kannada Shloka (ಕನ್ನಡ ಶ್ಲೋಕ)
                  </p>
                  <p style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', lineHeight: 1.7 }}>
                    ವಕ್ರತುಂಡ ಮಹಾಕಾಯ ಸೂರ್ಯಕೋಟಿ ಸಮಪ್ರಭ।<br />
                    ನಿರ್ವಿಘ್ನಂ ಕುರು ಮೇ ದೇವ ಸರ್ವಕಾರ್ಯೇಷು ಸರ್ವದಾ॥
                  </p>
                </div>

                {/* English Translation & Blessing */}
                <div style={{
                  padding: '16px', borderRadius: '16px',
                  background: 'rgba(255,249,194,0.3)', border: '1px solid #FFE1BD'
                }}>
                  <p style={{ fontSize: '9px', fontWeight: 700, color: '#B05307', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                    English Translation & Blessing
                  </p>
                  <p style={{ fontStyle: 'italic', fontSize: '12px', color: '#44403c', lineHeight: 1.7 }}>
                    "O Lord Ganesha, of curved trunk and massive form,<br />
                    whose brilliance equals a million suns —<br />
                    please remove all obstacles from my endeavours,<br />
                    and bless my family with peace and prosperity, always."
                  </p>
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div style={{ marginTop: '20px' }}>
              <div style={{
                padding: '16px', borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(243,139,43,0.08), rgba(229,191,0,0.08))',
                border: '1px solid #FFE1BD'
              }}>
                <Heart style={{ width: '20px', height: '20px', margin: '0 auto 8px', color: '#F38B2B' }} />
                <p style={{ fontWeight: 700, fontSize: '13px', color: '#5C2802', marginBottom: '6px' }}>
                  Dear {contribution.contributorName},
                </p>
                <p style={{ fontSize: '11px', color: '#57534e', lineHeight: 1.7 }}>
                  Thank you for your generous contribution of <strong style={{ color: '#B05307' }}>₹{contribution.amount.toLocaleString('en-IN')}</strong> towards the Ganesh Chaturthi {festivalYear} celebrations at our beloved community. 
                  Your support helps us celebrate this divine festival with devotion, joy, and togetherness.
                </p>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#B05307', marginTop: '10px' }}>
                  🙏 Ganpati Bappa Morya! May Lord Ganesha bless your family!
                </p>
              </div>

              <div style={{ paddingTop: '12px', fontSize: '10px', color: '#a8a29e' }}>
                <span>Issued with devotion by {committeeName} • {festivalYear}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20"
          >
            <Share2 className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </button>
          
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="py-3.5 px-6 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-md shadow-saffron-500/20"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Generating 2-Page PDF...' : 'Download 2-Page PDF'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
