'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/user/Header';
import styles from './track-visa.module.css';

const VISA_TYPES = [
  'Employment Visa','Work Visa','Tourist Visa','Business Visa',
  'Student Visa','Medical Visa','Family Visa','Transit Visa','Other',
];

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia',
  'Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium',
  'Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei',
  'Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada',
  'Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Brazzaville)',
  'Congo (Kinshasa)','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti',
  'Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea',
  'Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany',
  'Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras',
  'Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica',
  'Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia',
  'Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar',
  'Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico',
  'Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia',
  'Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea',
  'North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea',
  'Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda',
  'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino',
  'Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore',
  'Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan',
  'Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan',
  'Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey',
  'Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom',
  'United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam',
  'Yemen','Zambia','Zimbabwe',
];

export default function TrackFormPage() {
  const router = useRouter();
  const [form, setForm] = useState({ idNumber: '', dob: '', visaType: '', nationality: '' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.idNumber.trim()) { setError('Passport Number is required.'); return; }
    if (!form.dob)             { setError('Date of Birth is required.');   return; }
    setLoading(true);
    try {
      const body = {
        dateOfBirth:    form.dob,
        passportNumber: form.idNumber.trim().toUpperCase(),
      };
      const r    = await fetch('/api/candidates/public/track', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });
      const data = await r.json();
      if (data?.success) {
        const params = new URLSearchParams({
          id:    data.data.candidateId,
          idNum: form.idNumber.trim().toUpperCase(),
          dob:   form.dob,
        });
        router.push(`/result?${params.toString()}`);
      } else {
        setError(data?.message || 'No record found. Please check your details.');
      }
    } catch {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrap}>
      <Header />

      <div className={styles.page}>

        {/* ── Page Title ── */}
        <div className={styles.pageHead}>
          <h1 className={styles.pageTitle}>Download Visa:</h1>
        </div>

        <hr className={styles.divider} />

        {/* ── Form Card ── */}
        <div className={styles.formWrap}>
          <div className={styles.formBox}>

            {/* Error */}
            {error && (
              <div className={styles.errorBox}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#856404" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Passport Number */}
              <div className={styles.field}>
                <label>Passport Number *:</label>
                <input
                  type="text"
                  placeholder=""
                  value={form.idNumber}
                  onChange={set('idNumber')}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className={styles.field}>
                <label>Date of Birth (dd/mm/yyyy)*:</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={set('dob')}
                  required
                />
              </div>

              {/* Visa Type */}
              <div className={styles.field}>
                <label>Visa Type *:</label>
                <select value={form.visaType} onChange={set('visaType')}>
                  <option value="">Please Select</option>
                  {VISA_TYPES.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Nationality */}
              <div className={styles.field}>
                <label>Nationality *:</label>
                <select value={form.nationality} onChange={set('nationality')}>
                  <option value="">Please Select</option>
                  {COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Searching...' : 'Submit'}
              </button>

            </form>
          </div>
        </div>

        <hr className={styles.divider} />
      </div>

      
    </div>
  );
}