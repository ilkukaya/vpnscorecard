import React, { useState } from 'react';

interface QuizAnswers {
  purpose: string;
  devices: string;
  budget: string;
  techLevel: string;
  priority: string;
}

interface VPNRecommendation {
  primary: string;
  alternatives: string[];
  reason: string;
}

const vpnData: Record<string, { name: string; slug: string; color: string }> = {
  nordvpn: { name: 'NordVPN', slug: 'nordvpn', color: '#4687FF' },
  expressvpn: { name: 'ExpressVPN', slug: 'expressvpn', color: '#DA3940' },
  surfshark: { name: 'Surfshark', slug: 'surfshark', color: '#1DB9C3' },
  cyberghost: { name: 'CyberGhost', slug: 'cyberghost', color: '#FFCC00' },
  protonvpn: { name: 'Proton VPN', slug: 'protonvpn', color: '#6D4AFF' },
  pia: { name: 'Private Internet Access', slug: 'pia', color: '#4CBB17' },
  mullvad: { name: 'Mullvad VPN', slug: 'mullvad', color: '#FFCA5E' },
};

function calculateRecommendation(answers: QuizAnswers): VPNRecommendation {
  const scores: Record<string, number> = {
    nordvpn: 0, expressvpn: 0, surfshark: 0, cyberghost: 0,
    protonvpn: 0, pia: 0, mullvad: 0
  };

  if (answers.purpose === 'streaming') {
    scores.nordvpn += 30; scores.expressvpn += 28; scores.surfshark += 22; scores.cyberghost += 20;
  }
  if (answers.purpose === 'privacy') {
    scores.mullvad += 35; scores.protonvpn += 32; scores.nordvpn += 20; scores.pia += 18;
  }
  if (answers.purpose === 'torrenting') {
    scores.pia += 30; scores.nordvpn += 25; scores.surfshark += 22; scores.mullvad += 20;
  }
  if (answers.purpose === 'travel') {
    scores.expressvpn += 30; scores.nordvpn += 28; scores.surfshark += 22;
  }
  if (answers.purpose === 'budget') {
    scores.surfshark += 35; scores.pia += 30; scores.cyberghost += 25;
  }

  if (answers.devices === 'unlimited') { scores.surfshark += 25; scores.pia += 20; }
  if (answers.budget === 'free') {
    return { primary: 'protonvpn', alternatives: ['surfshark', 'pia'], reason: 'Only reputable VPN with a truly free, unlimited tier.' };
  }
  if (answers.budget === 'under3') { scores.surfshark += 15; scores.pia += 15; scores.cyberghost += 12; }

  if (answers.techLevel === 'beginner') { scores.cyberghost += 20; scores.nordvpn += 15; scores.expressvpn += 15; scores.mullvad -= 10; scores.pia -= 10; }
  if (answers.techLevel === 'expert') { scores.mullvad += 15; scores.pia += 12; scores.protonvpn += 10; }

  if (answers.priority === 'speed') { scores.nordvpn += 20; scores.mullvad += 18; scores.expressvpn += 15; }
  if (answers.priority === 'privacy') { scores.mullvad += 20; scores.protonvpn += 18; scores.nordvpn += 10; }
  if (answers.priority === 'ease') { scores.cyberghost += 20; scores.nordvpn += 15; scores.expressvpn += 15; }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return {
    primary: sorted[0][0],
    alternatives: sorted.slice(1, 3).map(e => e[0]),
    reason: `Best match based on your ${answers.purpose} focus, ${answers.devices} devices, and ${answers.priority} priority.`
  };
}

const questions = [
  {
    key: 'purpose',
    text: "What's your main reason for using a VPN?",
    options: [
      { value: 'streaming', label: '🎬 Streaming & Entertainment' },
      { value: 'privacy', label: '🔒 Privacy & Anonymity' },
      { value: 'torrenting', label: '⬇️ P2P & Torrenting' },
      { value: 'travel', label: '✈️ Travel & Public WiFi' },
      { value: 'budget', label: '💰 Just the cheapest option' },
    ]
  },
  {
    key: 'devices',
    text: "How many devices do you need to protect?",
    options: [
      { value: '1-2', label: '1-2 devices' },
      { value: '3-5', label: '3-5 devices' },
      { value: '6-10', label: '6-10 devices' },
      { value: 'unlimited', label: 'Unlimited (family)' },
    ]
  },
  {
    key: 'budget',
    text: "What's your budget?",
    options: [
      { value: 'free', label: 'Free' },
      { value: 'under3', label: 'Under $3/mo' },
      { value: 'under5', label: 'Under $5/mo' },
      { value: 'any', label: "Price doesn't matter" },
    ]
  },
  {
    key: 'techLevel',
    text: "How technical are you?",
    options: [
      { value: 'beginner', label: 'Beginner - keep it simple' },
      { value: 'intermediate', label: 'Intermediate - I know basics' },
      { value: 'expert', label: 'Expert - I want full control' },
    ]
  },
  {
    key: 'priority',
    text: "Which is more important to you?",
    options: [
      { value: 'speed', label: 'Fastest speeds' },
      { value: 'privacy', label: 'Strongest privacy' },
      { value: 'ease', label: 'Easiest to use' },
    ]
  }
];

export default function QuizWidget() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [result, setResult] = useState<VPNRecommendation | null>(null);

  const handleSelect = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const rec = calculateRecommendation(newAnswers as QuizAnswers);
      setResult(rec);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    const primary = vpnData[result.primary];
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-brand-dark mb-2">Your Best Match: {primary.name}</h2>
        <p className="text-gray-600 mb-6">{result.reason}</p>
        <div className="flex justify-center gap-4 mb-6">
          <a href={`/reviews/${primary.slug}`} className="px-6 py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors">
            Read {primary.name} Review
          </a>
          <a href={`/reviews/${primary.slug}`} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors" rel="nofollow noopener sponsored" target="_blank">
            Get {primary.name} →
          </a>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-3">Also consider:</p>
          <div className="flex justify-center gap-3">
            {result.alternatives.map(id => (
              <a key={id} href={`/reviews/${vpnData[id].slug}`} className="text-brand hover:underline text-sm font-medium">
                {vpnData[id].name}
              </a>
            ))}
          </div>
        </div>
        <button onClick={resetQuiz} className="mt-6 text-gray-400 hover:text-gray-600 text-sm">Retake Quiz</button>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-gray-500">Question {step + 1} of {questions.length}</span>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div className="bg-brand h-2 rounded-full transition-all duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-6">{q.text}</h2>
      <div className="grid gap-3">
        {q.options.map(opt => (
          <button
            key={opt.value}
            onClick={() => handleSelect(q.key, opt.value)}
            className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-brand hover:bg-brand/5 transition-all duration-200 font-medium text-gray-800"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
