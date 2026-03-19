'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../../components/user/Header';
import styles from './result.module.css';

const fmt = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  return `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`;
};

const printOnlyDoc = (appNo, docUrl, visaDocType) => {
  if (!docUrl) { alert('No document to print.'); return; }

  if (visaDocType === 'pdf') {
    const w = window.open(docUrl, '_blank');
    if (!w) { alert('Popup blocked. Please allow popups for this site.'); return; }
    w.addEventListener('load', () => { setTimeout(() => { w.print(); }, 500); });
    setTimeout(() => { try { w.print(); } catch(e) {} }, 2000);
    return;
  }

  const w = window.open('', '_blank');
  if (!w) { alert('Popup blocked. Please allow popups for this site.'); return; }
  w.document.write(`<!DOCTYPE html><html><head>
    <title>Visa-${appNo || 'document'}</title>
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { background:#fff; display:flex; justify-content:center; }
      @page { margin:8mm; }
      img { max-width:100%; height:auto; display:block; }
    </style>
  </head><body>
    <img src="${docUrl}" alt="Visa Document"
      onload="window.print();"
      onerror="document.body.innerHTML='<p style=color:red;padding:20px>Image load failed. Please try again.</p>';" />
  </body></html>`);
  w.document.close();
  w.focus();
};

function ResultContent() {
  const params = useSearchParams();
  const id     = params.get('id');
  const idType = params.get('idType') || 'passport';
  const idNum  = params.get('idNum')  || params.get('pass') || '';
  const dob    = params.get('dob');

  const [data,       setData]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [docBlobUrl, setDocBlobUrl] = useState(null);
  const [docLoading, setDocLoading] = useState(false);
  const blobUrlRef = useRef(null);

  // Sirf unmount pe blob revoke karo — [] dependency IMPORTANT
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  // Track API call
  useEffect(() => {
    if (!id) { setError('Invalid link. Please track again.'); setLoading(false); return; }
    (async () => {
      try {
        const body = { dateOfBirth: dob };
        if (idType === 'control') body.controlNumber  = idNum;
        else                       body.passportNumber = idNum;

        const r    = await fetch('/api/candidates/public/track', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(body),
        });
        const resp = await r.json();
        if (resp?.success) setData(resp.data);
        else setError(resp?.message || 'No record found.');
      } catch { setError('Server error.'); }
      finally  { setLoading(false); }
    })();
  }, [id, idType, idNum, dob]);

  // Admin page ka exact working pattern:
  // 1. fetch se rawBlob lo
  // 2. PDF detect karo (type ya filename se)
  // 3. MIME type force karo new Blob se
  // 4. iframe mein show karo (embed nahi — iframe zyada reliable hai)
  useEffect(() => {
    if (!data) return;
    const isApproved = data.status === 'Approved' || data.status === 'Issued';
    if (!isApproved || !data.hasVisaDocument) return;

    const idParam = data.identifierType === 'control'
      ? `controlNumber=${encodeURIComponent(idNum || '')}`
      : `passportNumber=${encodeURIComponent(idNum || '')}`;
    const apiUrl = `/api/candidates/public/visa-doc/${data.candidateId}?${idParam}&dateOfBirth=${encodeURIComponent(dob || '')}`;

    (async () => {
      setDocLoading(true);
      try {
        const r = await fetch(apiUrl);
        if (!r.ok) { console.error('Visa doc fetch failed:', r.status); return; }

        const rawBlob = await r.blob();

        // PDF detect — visaDocumentType, filename, ya blob MIME se
        const isPdf = data.visaDocumentType === 'pdf'
          || data.visaDocumentName?.toLowerCase().endsWith('.pdf')
          || rawBlob.type === 'application/pdf';

        // MIME type force karo — warna iframe PDF render nahi karta
        const correctType = isPdf ? 'application/pdf' : (rawBlob.type || 'image/jpeg');
        const blob = new Blob([rawBlob], { type: correctType });

        if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);

        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        setDocBlobUrl(url);
      } catch (e) {
        console.error('Visa doc load error:', e);
      } finally {
        setDocLoading(false);
      }
    })();
  }, [data, idNum, dob]);

  if (loading) return (
    <div className={styles.loadingWrap}>
      <div className={styles.spinner}/>
      <p>Loading your application details...</p>
    </div>
  );

  if (error) return (
    <div className={styles.errorWrap}>
      <div className={styles.errorIcon}>❌</div>
      <p>{error}</p>
      <a href="/track-application" className={styles.backLinkBtn}>← Go Back and Try Again</a>
    </div>
  );

  if (!data) return null;

  const isApproved = data.status === 'Approved' || data.status === 'Issued';

  const getStatusClass = (s) => {
    if (s === 'Approved' || s === 'Issued') return styles.statusApproved;
    if (s === 'Pending')      return styles.statusPending;
    if (s === 'Under Review') return styles.statusReview;
    if (s === 'Rejected')     return styles.statusRejected;
    return '';
  };

  const rows = [
    ...(data.identifierType === 'control'
      ? [
          { label: 'Control Number', value: data.controlNumber  || '—' },
          { label: 'Passport No',    value: data.passportNumber || '—' },
        ]
      : [
          { label: 'Passport No',    value: data.passportNumber || '—' },
        ]
    ),
    { label: 'Visa No',         value: data.visaNumber       || '—' },
    { label: 'Name',            value: data.fullName         || '—' },
    { label: 'Date of birth',   value: fmt(data.dateOfBirth)        },
    { label: 'Profession',      value: data.profession       || '—' },
    { label: 'Company Name',    value: data.companyName      || '—' },
    { label: 'Visa Issue Date', value: fmt(data.visaIssueDate)      },
    { label: 'Visa Expiry',     value: fmt(data.visaExpiryDate)     },
    { label: 'Visa Type',       value: data.visaType         || '—' },
    { label: 'Country',         value: data.country          || '—' },
    { label: 'Status',          value: data.status, isStatus: true  },
    { label: 'Message',         value: data.message          || '—' },
  ];

  return (
    <div className={styles.resultWrap}>

      {/* Congrats banner */}
      {isApproved && (
        <div className={styles.congratsBanner}>
          Congratulations. Dear <strong>{data.fullName}</strong>, your visa is ready.{' '}
          {docBlobUrl && (
            <span
              className={styles.printLink}
              onClick={() => printOnlyDoc(data.applicationNumber, docBlobUrl, data.visaDocumentType)}
            >
              Print it here
            </span>
          )}
        </div>
      )}

      {/* Authority bar */}
      <div className={`${styles.authorityBar} ${!isApproved ? styles.authorityBarRound : ''}`}>
        Israel Visa Immigration Services
      </div>

      {/* Details table */}
      <div className={styles.tableWrap}>
        <table className={styles.detailTable}>
          <tbody>
            {rows.map(({ label, value, isStatus }, i) => (
              <tr key={label} style={{ background: i%2===0 ? '#f9fafb' : '#fff' }}>
                <td className={styles.tdLabel}>{label}</td>
                <td className={styles.tdValue}>
                  {isStatus
                    ? <span className={getStatusClass(value)}>{value}</span>
                    : value
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visa Document Section */}
      {isApproved && data.hasVisaDocument && (
        <div className={styles.visaDocSection}>
          <div className={styles.visaDocTitle}>Your Visa Document</div>

          <div className={styles.visaDocFrame} id="user-visa-doc-area">
            {docLoading ? (
              <div style={{ textAlign:'center', padding:'40px 20px', color:'#6b7280', fontSize:13 }}>
                <div style={{ width:24, height:24, border:'3px solid #e2e8f0', borderTopColor:'#1a56db', borderRadius:'50%', animation:'spin 0.7s linear infinite', margin:'0 auto 12px' }} />
                Loading document...
              </div>
            ) : docBlobUrl ? (
              // Admin page ki tarah — PDF ke liye iframe, image ke liye img
              (data.visaDocumentType === 'pdf' || data.visaDocumentName?.toLowerCase().endsWith('.pdf')) ? (
                <iframe
                  src={docBlobUrl}
                  title="Visa Document"
                  style={{ width:'100%', height:700, border:'none', display:'block' }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={docBlobUrl}
                  alt="Visa Document"
                  className={styles.visaDocImg}
                />
              )
            ) : (
              <div style={{ textAlign:'center', padding:'30px 20px', color:'#9ca3af', fontSize:13 }}>
                ⚠️ Document load nahi ho saka. Please refresh karein.
              </div>
            )}
          </div>

          {docBlobUrl && (
            <div className={styles.printBtnWrap}>
              <button
                className={styles.printBtn}
                onClick={() => printOnlyDoc(data.applicationNumber, docBlobUrl, data.visaDocumentType)}
              >
                PRINT RESULT
              </button>
            </div>
          )}
        </div>
      )}

      {/* Approved but no doc yet */}
      {isApproved && !data.hasVisaDocument && (
        <div className={styles.noDocBox}>
          <span>📎</span>
          <p>Visa document will be available soon. Please check back later.</p>
        </div>
      )}

      {/* Not approved */}
      {!isApproved && (
        <div className={styles.statusBox}>
          <div className={styles.statusBoxIcon}>
            {data.status === 'Rejected' ? '❌' : data.status === 'Pending' ? '⏳' : data.status === 'Under Review' ? '🔍' : '📋'}
          </div>
          <div className={styles.statusBoxTitle}>
            Application Status: <span className={getStatusClass(data.status)}>{data.status}</span>
          </div>
          {data.message && <p className={styles.statusBoxMsg}>{data.message}</p>}
          <p className={styles.statusBoxNote}>
            Your visa document will be available once the status is <strong>Approved</strong>.
          </p>
        </div>
      )}

      <div className={styles.backLinkWrap}>
        <a href="/track-application" className={styles.backLink}>← Track Another Application</a>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <div style={{ fontFamily:"'Roboto',Arial,sans-serif", minHeight:'100vh', background:'#fff' }}>
      <Header />
      <div className={styles.page}>
        <Suspense fallback={<div className={styles.loadingWrap}><p>Loading...</p></div>}>
          <ResultContent />
        </Suspense>
      </div>
    </div>
  );
}