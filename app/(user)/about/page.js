import Header from '../../../components/user/Header';
import './about.css';

export const metadata = { title: 'About - Israel Visa Immigration Services' };

export default function AboutPage() {
  return (
    <div>

      {/* ══════════════════════════════
          HEADER
      ══════════════════════════════ */}
      <Header />

      {/* ══════════════════════════════
          BREADCRUMB BAR
      ══════════════════════════════ */}
      <div className="about-breadcrumb-bar">
        <span>1. Home</span>
      </div>

      {/* ══════════════════════════════
          INTRO PARAGRAPHS
      ══════════════════════════════ */}
      <div className="about-intro-section">
        <div className="about-wrap">
          <p>
            We are approved by the Reserve Bank of India to operate as a Full Fledged Money Changer. We offer these services
            through all our IATA offices and also at almost all major airports in India. We have all the necessary skills &amp;
            logistics in place and we are in a position to cater to all and any need of customer in respect of foreign exchange
            related requirements with speed, precision and a high degree of professionalism.
          </p>
          <p>
            Israel Travels is one of the few travel companies to have its own FOREX counter at Mumbai International Airport.
            Being a bulk dealer, we are able to offer our customers with the most competitive exchange rates. We also have a
            tie-up with Western Union, Moneygram, Transfast and Xpress Money to facilitate electronic money transfers.
          </p>
          <p>
            Currently we are associated with banks such as ICICI, HDFC, IDBI etc. for various foreign exchange services.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════
          STRONG POINTS
      ══════════════════════════════ */}
      <div className="about-strong-section">
        <div className="about-wrap">
          <div className="about-strong-heading">Strong Points:</div>
          <ul className="about-strong-list">
            <li>Most Competitive rates in the market.</li>
            <li>Israel FOREX operates in more than 70 branches PAN India.</li>
            <li>Israel FOREX is the one and Only company to operate Seven FOREX counters in T2 International Airport, Mumbai.</li>
            <li>Israel FOREX at Craftword market- sole vendor in INDIA offering forex service 24/7 365 days a year.</li>
            <li>Door Step delivery to corporates.</li>
            <li>Greater access to all major moving foreign currencies.</li>
            <li>We keep the stock of all major FOREX currency cards.</li>
            <li>Providing Western Union, MoneyGram, Transfast and Xpress money inward remittance services.</li>
            <li>Personalized consultation.</li>
            <li>Guidance in travel planning.</li>
            <li>Specialized in handling large corporate group sales.</li>
            <li>Services offered by experienced Forex Consultants.</li>
          </ul>
        </div>
      </div>

    

    </div>
  );
}