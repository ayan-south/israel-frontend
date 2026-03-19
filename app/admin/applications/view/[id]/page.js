'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { candidateAPI } from '../../../../../lib/api';
import { getUser } from '../../../../../lib/auth';
import toast from 'react-hot-toast';

const fmt = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  return `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`;
};

const STATUS_COLORS = {
  'Pending':      { bg:'#fef3c7', color:'#92400e' },
  'Under Review': { bg:'#dbeafe', color:'#1e40af' },
  'Approved':     { bg:'#dcfce7', color:'#166534' },
  'Rejected':     { bg:'#fee2e2', color:'#991b1b' },
  'Issued':       { bg:'#f3e8ff', color:'#6b21a8' },
};

// Print visa document — image ya PDF dono properly handle karta hai
const printVisaDoc = (appNo, docBlobUrl, docType) => {
  if (!docBlobUrl) { toast.error('No document to print'); return; }

  if (docType === 'pdf') {
    const w = window.open(docBlobUrl, '_blank');
    if (!w) { toast.error('Popup blocked. Please allow popups for this site.'); return; }
    w.addEventListener('load', () => { setTimeout(() => { w.print(); }, 500); });
    setTimeout(() => { try { w.print(); } catch(e) {} }, 2000);
    return;
  }

  const w = window.open('', '_blank');
  if (!w) { toast.error('Popup blocked. Please allow popups for this site.'); return; }
  w.document.write(`<!DOCTYPE html><html><head>
    <title>Visa-${appNo || 'document'}</title>
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { background:#fff; display:flex; justify-content:center; }
      @page { margin:8mm; }
      img { max-width:100%; height:auto; display:block; }
    </style>
  </head><body>
    <img src="${docBlobUrl}" alt="Visa Document"
      onload="window.print();"
      onerror="document.body.innerHTML='<p style=color:red;padding:20px>Image load failed.</p>';" />
  </body></html>`);
  w.document.close();
  w.focus();
};

export default function ViewDetailsPage() {
  const { id }  = useParams();
  const router  = useRouter();
  const user    = getUser();

  const [data,       setData]      = useState(null);
  const [loading,    setLoading]   = useState(true);
  const [newStatus,  setNewStatus] = useState('');
  const [updating,   setUpdating]  = useState(false);
  const [docBlobUrl, setDocBlobUrl] = useState(null);

  // ── FIX: blob URL ref mein track karo ──
  const blobUrlRef = useRef(null);

  const canEdit     = user?.role === 'admin' || user?.role === 'superadmin' || user?.permissions?.canEdit;
  const canDownload = user?.role === 'admin' || user?.role === 'superadmin' || user?.permissions?.canDownload;

  useEffect(() => { load(); }, [id]);

  // ── FIX: [] — sirf unmount pe cleanup, [docBlobUrl] nahi ──
  // Pehle wala bug: useEffect cleanup [docBlobUrl] dependency ke saath tha
  // Jab bhi docBlobUrl state set hoti thi, React pehle effect ka cleanup
  // run karta tha — matlab NAYA blob URL bhi foran revoke ho jaata tha
  // isiliye image/PDF thodi der dikhke hat jaati thi!
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []); // ← IMPORTANT: empty array

  const load = async () => {
    setLoading(true);
    try {
      const r = await candidateAPI.get(id);
      if (r?.success) {
        setData(r.data);
        setNewStatus(r.data.status);
        if (r.data.visaDocument) {
          loadDocBlob(r.data);
        }
      } else {
        toast.error('Record not found');
        router.push('/admin/applications');
      }
    } catch { toast.error('Server error'); }
    finally  { setLoading(false); }
  };

  // ── FIX: blob ka type force karo — server se content-type nahi aata toh embed kaam nahi karta ──
  const loadDocBlob = async (candidate) => {
    try {
      const token = localStorage.getItem('token');
      const r = await fetch(`/api/candidates/admin/download/${candidate._id}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        credentials: 'same-origin',
      });
      if (!r.ok) {
        console.error('Doc fetch failed:', r.status);
        return;
      }

      const rawBlob = await r.blob();

      // PDF detect karo — type ya filename se
      const isPdf = candidate.visaDocumentType === 'pdf'
        || candidate.visaDocumentName?.toLowerCase().endsWith('.pdf')
        || rawBlob.type === 'application/pdf';

      // Blob ka MIME type force karo — warna <embed> PDF render nahi karta
      const correctType = isPdf ? 'application/pdf' : (rawBlob.type || 'image/jpeg');
      const blob = new Blob([rawBlob], { type: correctType });

      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);

      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      setDocBlobUrl(url);
    } catch (e) {
      console.error('loadDocBlob error:', e);
    }
  };

  const handleStatusUpdate = async () => {
    if (newStatus === data.status) { toast('Status same hai'); return; }
    setUpdating(true);
    try {
      const fd = new FormData();
      fd.append('status', newStatus);
      const r = await candidateAPI.update(id, fd);
      if (r?.success) {
        toast.success(`Status: "${newStatus}"`);
        setData(r.data);
        setNewStatus(r.data.status);
      } else toast.error(r?.message || 'Failed');
    } catch { toast.error('Error'); }
    finally  { setUpdating(false); }
  };

  const handleDownload = async () => {
    try {
      await candidateAPI.downloadPdf(id, data.applicationNumber);
    } catch {
      toast.error('No document uploaded.');
    }
  };

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'50vh', flexDirection:'column', gap:14 }}>
      <div style={{ width:28, height:28, border:'3px solid #e2e8f0', borderTopColor:'#1a56db', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
      <p style={{ color:'#6b7280', fontSize:14 }}>Loading…</p>
    </div>
  );

  if (!data) return null;

  const sc = STATUS_COLORS[data.status] || { bg:'#f3f4f6', color:'#374151' };
  const isApproved = data.status === 'Approved' || data.status === 'Issued';
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
    { label: 'Visa No',          value: data.visaNumber       || '—' },
    { label: 'Name',             value: data.fullName         || '—' },
    { label: 'Date of birth',    value: fmt(data.dateOfBirth)        },
    { label: 'Profession',       value: data.profession       || '—' },
    { label: 'Company Name',     value: data.companyName      || '—' },
    { label: 'Visa Issue Date',  value: fmt(data.visaIssueDate)      },
    { label: 'Visa Expiry Date', value: fmt(data.visaExpiryDate)     },
    { label: 'Visa Type',        value: data.visaType         || '—' },
    { label: 'Country',          value: data.country          || '—' },
    { label: 'Status',           value: data.status, isStatus: true  },
    { label: 'Message',          value: data.message          || '—' },
  ];

  return (
    <div className="fade">

      {/* ── Breadcrumb ── */}
      <div className="breadcrumb" style={{ marginBottom:16 }}>
        <Link href="/admin/applications">All Applications</Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">View: {data.applicationNumber}</span>
      </div>

      {/* ── Top action bar ── */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center', marginBottom:20 }}>
        {canEdit && (
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fff', border:'1px solid #e5e7eb', borderRadius:8, padding:'10px 14px' }}>
            <span style={{ fontSize:13, fontWeight:600, color:'#374151', whiteSpace:'nowrap' }}>Update Status:</span>
            <select className="sel" value={newStatus} onChange={e => setNewStatus(e.target.value)} style={{ minWidth:140 }}>
              {['Pending','Under Review','Approved','Rejected','Issued'].map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="btn btn-primary" onClick={handleStatusUpdate} disabled={updating || newStatus === data.status}>
              {updating ? <><div className="spin" style={{ width:13, height:13 }} /> Saving…</> : 'Update'}
            </button>
          </div>
        )}
        <div style={{ display:'flex', gap:8, marginLeft:'auto' }}>
          {canEdit && (
            <Link href={`/admin/applications/edit/${id}`} className="btn btn-secondary">✏️ Edit</Link>
          )}
          {canDownload && data.visaDocument && (
            <button className="btn btn-primary" onClick={handleDownload}>
              ⬇️ Download Doc
            </button>
          )}
          <Link href="/admin/applications" className="btn btn-secondary">← Back</Link>
        </div>
      </div>

      {/* ═══════════════════════════════
          CENTRED DETAILS + DOC CARD
      ═══════════════════════════════ */}
      <div style={{ maxWidth:800, margin:'0 auto' }}>

        {/* Congrats banner */}
        {isApproved && (
          <div style={{ background:'linear-gradient(90deg,#166534 0%,#1a56db 55%)', color:'#fff', padding:'12px 20px', borderRadius:'6px 6px 0 0', fontSize:14, fontWeight:500, textAlign:'center' }}>
            Visa Approved. Dear <strong>{data.fullName}</strong> — document ready for print.
          </div>
        )}

        {/* Authority bar */}
        <div style={{
          background: 'linear-gradient(90deg,#1e3a8a 0%,#d97706 100%)',
          color:'#fff', padding:'9px 20px', textAlign:'center', fontSize:13, fontWeight:700,
          borderRadius: isApproved ? 0 : '6px 6px 0 0',
        }}>
          South Africa Visa Immigration Services
        </div>

        {/* ── Details table ── */}
        <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderTop:'none', overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <tbody>
              {rows.map(({ label, value, isStatus }, i) => (
                <tr key={label} style={{ background: i%2===0 ? '#f9fafb' : '#fff' }}>
                  <td style={{ padding:'12px 24px', width:'44%', fontWeight:500, fontSize:13.5, color:'#374151', borderBottom: i < rows.length-1 ? '1px solid #f0f0f0' : 'none' }}>
                    {label}
                  </td>
                  <td style={{ padding:'12px 24px', fontSize:13.5, color:'#111', borderBottom: i < rows.length-1 ? '1px solid #f0f0f0' : 'none' }}>
                    {isStatus
                      ? <span style={{ background:sc.bg, color:sc.color, padding:'3px 12px', borderRadius:20, fontSize:12.5, fontWeight:700 }}>{value}</span>
                      : value
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Uploaded Visa Document ── */}
        <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderTop:'none', borderRadius:'0 0 8px 8px', padding:'24px 20px' }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#0f172a', marginBottom:16, borderBottom:'2px solid #1a56db', paddingBottom:8 }}>
            Visa Document {data.visaDocument ? `(${data.visaDocumentName || 'uploaded'})` : '— Not uploaded yet'}
          </div>

          {docBlobUrl ? (
            <div id="admin-visa-doc-area" style={{ textAlign:'center' }}>
              {(data.visaDocumentType === 'pdf' || data.visaDocumentName?.toLowerCase().endsWith('.pdf')) ? (
                // iframe — sabse reliable cross-browser PDF renderer hai
                <iframe
                  src={docBlobUrl}
                  title="Visa Document PDF"
                  style={{ width:'100%', height:750, border:'1px solid #ddd', borderRadius:4, display:'block' }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={docBlobUrl} alt="Visa Document" style={{ maxWidth:'100%', height:'auto', border:'1px solid #ddd', borderRadius:4 }} />
              )}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'30px 20px', color:'#9ca3af', fontSize:13, background:'#f8fafc', borderRadius:6 }}>
              {data.visaDocument
                ? '⏳ Loading document...'
                : '📎 No document uploaded. Go to Edit to upload visa document (image or PDF).'
              }
            </div>
          )}

          {/* Print button */}
          {docBlobUrl && (
            <div style={{ textAlign:'center', marginTop:20 }}>
              <button
                onClick={() => printVisaDoc(data.applicationNumber, docBlobUrl, data.visaDocumentType)}
                style={{ background:'#1565c0', color:'#fff', border:'none', padding:'13px 60px', fontSize:15, fontWeight:700, cursor:'pointer', borderRadius:4, letterSpacing:'1px' }}
              >
                PRINT RESULT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Status History ── */}
      {data.statusHistory?.length > 0 && (
        <div className="card" style={{ maxWidth:800, margin:'20px auto 0' }}>
          <div className="card-head">Status History</div>
          <table>
            <thead><tr><th>Status</th><th>Changed By</th><th>Date</th></tr></thead>
            <tbody>
              {[...data.statusHistory].reverse().map((h, i) => {
                const hc = STATUS_COLORS[h.status] || { bg:'#f3f4f6', color:'#374151' };
                return (
                  <tr key={i}>
                    <td><span style={{ background:hc.bg, color:hc.color, padding:'3px 10px', borderRadius:20, fontSize:11.5, fontWeight:700 }}>{h.status}</span></td>
                    <td style={{ color:'#6b7280', fontSize:13 }}>{h.changedBy || 'Admin'}</td>
                    <td style={{ color:'#6b7280', fontSize:12.5 }}>{h.createdAt ? new Date(h.createdAt).toLocaleString('en-GB') : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}