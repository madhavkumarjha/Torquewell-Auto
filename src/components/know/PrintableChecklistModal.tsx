import { useState } from 'react';
import { usePrefs } from '@/store/prefs';
import { Button } from '@/components/ui/Button';

interface PrintableChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrintableChecklistModal({ isOpen, onClose }: PrintableChecklistModalProps) {
  const { locale: language } = usePrefs();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const questions = [
    {
      num: '1',
      title: {
        en: 'Can you show me the photographic/video evidence and the exact micrometer measurement?',
        hi: 'क्या आप मुझे फोटो/वीडियो साक्ष्य और सटीक माइक्रोमीटर माप दिखा सकते हैं?'
      },
      why: {
        en: 'Ensures replacement is verified against manufacturer discard thickness limits, not guesswork.',
        hi: 'यह सुनिश्चित करता है कि बदलाव अनुमान पर नहीं, बल्कि निर्माता की न्यूनतम सीमा के आधार पर हो।'
      }
    },
    {
      num: '2',
      title: {
        en: 'Is this item an immediate safety hazard (Now), advisory (Soon), or can it safely wait (Watch)?',
        hi: 'क्या यह तत्काल सुरक्षा खतरा है (Now), निकट भविष्य की सलाह (Soon), या सुरक्षित रूप से रुक सकता है (Watch)?'
      },
      why: {
        en: 'Prevents non-urgent advisory wear items from being conflated with critical safety emergencies.',
        hi: 'गैर-जरूरी सलाहों को आपातकालीन स्थिति बताकर अनावश्यक खर्च कराने से रोकता है।'
      }
    },
    {
      num: '3',
      title: {
        en: 'Will you provide a binding written estimate before any spanner is turned?',
        hi: 'क्या आप कोई भी काम शुरू करने से पहले एक बाध्यकारी लिखित कोटेशन देंगे?'
      },
      why: {
        en: 'Guarantees no surprise labour or parts additions appear on your final invoice without written consent.',
        hi: 'बिना लिखित सहमति के अंतिम बिल में कोई अतिरिक्त लेबर या पार्ट्स शुल्क न जुड़ना सुनिश्चित करता है।'
      }
    },
    {
      num: '4',
      title: {
        en: 'What parts tier and warranty duration are you fitting to my vehicle?',
        hi: 'आप मेरी गाड़ी में किस ब्रांड के पार्ट्स और कितनी वारंटी अवधि लगा रहे हैं?'
      },
      why: {
        en: 'Clarifies whether you are receiving Original Equipment (OE), Tier-1 OE-Equivalent, or Aftermarket parts.',
        hi: 'यह स्पष्ट करता है कि आपको ओरिजिनल (OE), टियर-1 समतुल्य या आफ्टरमार्केट पार्ट्स मिल रहे हैं।'
      }
    },
    {
      num: '5',
      title: {
        en: 'Can you place the old worn replaced parts in my boot for collection inspection?',
        hi: 'क्या आप बदले गए पुराने घिसे हुए पार्ट्स गाड़ी में जांच के लिए रख सकते हैं?'
      },
      why: {
        en: 'A transparent workshop is always happy to return old components for customer inspection.',
        hi: 'एक ईमानदार वर्कशॉप पुराने बदले गए पार्ट्स ग्राहक को दिखाने में हमेशा खुश होती है।'
      }
    }
  ];

  const handleCopy = () => {
    const text = questions.map(q => `${q.num}. ${language === 'hi' ? q.title.hi : q.title.en}\n   Reason: ${language === 'hi' ? q.why.hi : q.why.en}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checklist-title"
        className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              {language === 'hi' ? 'उपभोक्ता सुरक्षा चेकलिस्ट' : 'Consumer Protection Checklist'}
            </span>
            <h2 id="checklist-title" className="text-xl md:text-2xl font-bold font-serif mt-1">
              {language === 'hi' ? 'किसी भी मैकेनिक से पूछने वाले 5 जरूरी सवाल' : '5 Questions to Ask Any Mechanic'}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {language === 'hi' ? 'काम को मंजूरी देने से पहले इन सवालों के स्पष्ट जवाब मांगें।' : 'Take this checklist to your repair authorization appointment.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-sunken)] rounded-lg text-lg"
          >
            ✕
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.num} className="p-4 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-subtle)] space-y-1.5">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {q.num}
                </span>
                <p className="font-semibold text-sm text-[var(--text)]">
                  {language === 'hi' ? q.title.hi : q.title.en}
                </p>
              </div>
              <p className="text-xs text-[var(--text-muted)] pl-9">
                <span className="font-medium text-[var(--accent)]">{language === 'hi' ? 'कारण:' : 'Why ask:'} </span>
                {language === 'hi' ? q.why.hi : q.why.en}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <Button variant="secondary" onClick={handleCopy} className="w-full sm:w-auto text-xs">
              {copied ? (language === 'hi' ? '✓ कॉपी हो गया!' : '✓ Copied!') : (language === 'hi' ? 'क्लिपबोर्ड पर कॉपी करें' : 'Copy to Clipboard')}
            </Button>
            <Button variant="secondary" onClick={handlePrint} className="w-full sm:w-auto text-xs">
              {language === 'hi' ? '🖨️ A4 प्रिंट करें' : '🖨️ Print A4 Sheet'}
            </Button>
          </div>
          <Button variant="primary" onClick={onClose} className="w-full sm:w-auto text-xs font-semibold">
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </Button>
        </div>
      </div>
    </div>
  );
}
