export default function Footer() {
  const offices = [
    {
      city: "New Delhi",
      email: "delhi@israelgovcovisa.com",
    },
    {
      city: "Mumbai",
      email: "mumbai@israelgovcovisa.com",
    },
    {
      city: "Bangalore",
      email: "bangalore@isarelgovcovisa.com",
    },
  ];

  return (
    <>
      <footer className="pf-root" style={{ background: '#2e2e2e', borderTop: '3px solid #555' }}>

        {/* ── CONTACT OFFICES ── */}
        <div className="pf-contact">
          <div className="pf-contact-header">
            <div className="pf-contact-header-dot" style={{ background: '#aaa' }} />
            <span className="pf-contact-header-label" style={{ color: '#ccc', letterSpacing: '0.15em' }}>Feel free to contact us</span>
            <div className="pf-contact-header-line" style={{ background: '#555' }} />
          </div>

          <div className="pf-offices-grid">
            {offices.map((o) => (
              <div className="pf-office-card" key={o.city} style={{ borderColor: '#444' }}>
                <div className="pf-office-city" style={{ color: '#e0e0e0' }}>{o.city}</div>
                <div className="pf-office-enquiry" style={{ color: '#aaa' }}>
                  <strong className="pf-office-phone">{o.phone}</strong>
                  <br />
                  Mon – Fri 
                  <br />
                  <em style={{ fontSize: 11, color: '#666' }}>except public holidays</em>
                </div>
                <span className="pf-email-btn" style={{ color: '#bbb', borderColor: '#555' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                  {o.email}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── INFO GRID ── */}
        <div className="pf-info-grid" style={{ borderColor: '#444' }}>
          <div className="pf-info-block">
            <div className="pf-info-block-title" style={{ color: '#e0e0e0' }}>Important Notice</div>
            <p style={{ color: '#aaa' }}>
              Physically challenged applicants are requested to contact our helpline prior to
              visiting our centre so that we may offer the best possible assistance. All
              applicants are required to read the security guidelines carefully to increase
              convenience at Israel Visa Services.
            </p>
          </div>

          <div className="pf-info-block" style={{ paddingLeft: 40, borderColor: '#444' }}>
            <div className="pf-info-block-title" style={{ color: '#e0e0e0' }}>Visa Disclaimer</div>
            <div className="pf-quote-block" style={{ background: '#3a3a3a', borderLeftColor: '#777' }}>
              <span className="pf-quote-mark" style={{ color: '#888' }}>&ldquo;</span>
              <p style={{ color: '#aaa' }}>
                Acceptance of your form for processing and payment of fees does not guarantee
                grant of a visa. The granting of the visa is entirely at the discretion of the
                Embassy / Consul of Israel, and no reasons will be given for delay or denial.
              </p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="pf-bottom" style={{ borderTopColor: '#444' }}>
          <div>
            <span className="pf-copyright" style={{ color: '#666' }}>© 2014–{new Date().getFullYear()} Israel Visa Services. All rights reserved.</span>
          </div>

          <div className="pf-bottom-links">
            <a href="/unavailable" style={{ color: '#888' }}>Useful Links</a>
            <span className="sep" style={{ color: '#555' }}>·</span>
            <a href="/unavailable" style={{ color: '#888' }}>Disclaimer</a>
            <span className="sep" style={{ color: '#555' }}>·</span>
            <a href="/unavailable" style={{ color: '#888' }}>Contact Us</a>
            <span className="sep" style={{ color: '#555' }}>·</span>
            <a href="/unavailable" style={{ color: '#888' }}>Feedback / Complaints</a>
          </div>
        </div>
      </footer>
    </>
  );
}