const FAQS = [
  {
    question: 'What currency is used in Egypt?',
    answer:
      'The official currency is the Egyptian Pound (EGP). It is recommended to carry some Egyptian Pounds for smaller shops and local transportation.',
  },
  {
    question: 'What is the best time to visit Egypt?',
    answer:
      'The cooler months from October to April are generally comfortable for exploring historical sites and cities.',
  },
  {
    question: 'Do I need a guide when visiting tourist attractions?',
    answer:
      'A guide is not always required, but having a licensed guide can make historical sites easier to understand and help you get more from your visit.',
  },
  {
    question: 'What should I wear when visiting religious places?',
    answer:
      'Wear modest clothing when visiting mosques, churches, and other religious places. Covering shoulders and knees is a good general rule.',
  },
  {
    question: 'Is tipping common in Egypt?',
    answer:
      'Tipping, commonly called baksheesh, is common in many service situations. The amount depends on the service and is generally given at your discretion.',
  },
  {
    question: 'Can I use cards in Egypt?',
    answer:
      'Cards are accepted in many hotels, restaurants, and larger businesses, but carrying some cash is useful for smaller businesses and local services.',
  },
];

const WARNINGS = [
  'Agree on the price before using taxis or other services when the price is not clearly displayed.',
  'Use official or licensed guides when visiting major tourist attractions.',
  'Keep your valuables and important documents in a safe place.',
  'Respect local customs, especially when visiting religious and historical sites.',
];

const TIPS = [
  {
    icon: '💧',
    title: 'Stay Hydrated',
    text: 'Egypt can be very hot, especially during summer. Carry water with you while exploring.',
  },
  {
    icon: '💵',
    title: 'Carry Some Cash',
    text: 'Keep some Egyptian Pounds with you because smaller businesses may not accept cards.',
  },
  {
    icon: '📸',
    title: 'Check Photography Rules',
    text: 'Some attractions have restrictions on photography. Always check the rules before taking photos.',
  },
  {
    icon: '🕌',
    title: 'Respect Local Customs',
    text: 'Dress appropriately and follow local rules when visiting religious or cultural places.',
  },
];

function Ask() {
  return (
    <main className="ask-page">
      <section className="ask-hero">
        <div className="container">
          <p className="home-eyebrow">TRAVEL GUIDE 🇪🇬</p>
          <h1>Ask & Know Before You Go</h1>
          <p>
            Useful answers, important warnings, and practical tips to help you
            enjoy your trip across Egypt.
          </p>
        </div>
      </section>

      <section className="ask-section">
        <div className="container">
          <div className="ask-section-heading">
            <p className="home-eyebrow home-eyebrow-dark">FAQ</p>
            <h2>Frequently Asked Questions</h2>
            <p>
              Quick answers to common questions travelers may have before
              exploring Egypt.
            </p>
          </div>

          <div className="ask-faq-list">
            {FAQS.map((faq) => (
              <article className="ask-faq-card" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ask-warning-section">
        <div className="container">
          <div className="ask-section-heading">
            <p className="home-eyebrow">IMPORTANT</p>
            <h2>Things to Keep in Mind</h2>
            <p>
              A few simple precautions can make your trip safer and more
              comfortable.
            </p>
          </div>

          <div className="ask-warning-list">
            {WARNINGS.map((warning) => (
              <div className="ask-warning-card" key={warning}>
                <span>⚠️</span>
                <p>{warning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ask-tips-section">
        <div className="container">
          <div className="ask-section-heading">
            <p className="home-eyebrow home-eyebrow-dark">TRAVEL TIPS</p>
            <h2>Travel Smarter</h2>
          </div>

          <div className="ask-tips-grid">
            {TIPS.map((tip) => (
              <article className="ask-tip-card" key={tip.title}>
                <div className="ask-tip-icon">{tip.icon}</div>
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Ask;