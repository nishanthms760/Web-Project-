import { useLocation, Link, useNavigate } from 'react-router-dom';

function RegistrationSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="compact-page">
        <div className="empty-box">
          <h3>No Registration Found</h3>
          <p>Please complete the registration form first.</p>
          <Link to="/" className="submit-btn" style={{ display: 'inline-block', textAlign: 'center', marginTop: '1rem' }}>
            Go to Form
          </Link>
        </div>
      </div>
    );
  }

  // Masked Aadhaar
  const rawAadhaar = (data.aadhaar || '').replace(/\s+/g, '');
  const maskedAadhaar = rawAadhaar.length === 12
    ? `XXXX XXXX ${rawAadhaar.slice(8)}`
    : data.aadhaar;

  return (
    <div className="compact-page">
      <div className="receipt-card">
        <div className="receipt-header">
          <div className="receipt-icon">✓</div>
          <div>
            <h2>KYC Registration Verified</h2>
            <p>Reference: <strong>{data.refId}</strong> &bull; Completed at {data.time}</p>
          </div>
        </div>

        <div className="receipt-grid">
          <div className="receipt-avatar">
            {data.avatar ? (
              <img src={data.avatar} alt="Profile" />
            ) : (
              <div className="avatar-ph">{data.fullName?.charAt(0).toUpperCase()}</div>
            )}
            <h3>{data.fullName}</h3>
            <span>{data.email}</span>
            <div className="receipt-id-pills">
              <span className="id-pill">UIDAI Verified</span>
              <span className="id-pill">ITD PAN Match</span>
            </div>
          </div>

          <div className="receipt-table">
            <div className="r-row">
              <span className="lbl">Mobile</span>
              <span className="val">+91 {data.phone}</span>
            </div>
            <div className="r-row">
              <span className="lbl">Date of Birth</span>
              <span className="val">{data.dob}</span>
            </div>
            <div className="r-row">
              <span className="lbl">Aadhaar (Masked)</span>
              <span className="val font-mono">{maskedAadhaar}</span>
            </div>
            <div className="r-row">
              <span className="lbl">PAN Card</span>
              <span className="val font-mono">{data.pan}</span>
            </div>
            <div className="r-row">
              <span className="lbl">State &amp; District</span>
              <span className="val">{data.state} / {data.district}</span>
            </div>
            <div className="r-row">
              <span className="lbl">City &amp; Pincode</span>
              <span className="val">{data.city} - <span className="font-mono">{data.pincode}</span></span>
            </div>
            <div className="r-row">
              <span className="lbl">Verification Status</span>
              <span className="val text-success">✓ 100% Validated &bull; Active</span>
            </div>
          </div>
        </div>

        <div className="receipt-actions">
          <button onClick={() => window.print()} className="secondary-btn">
            🖨️ Print Receipt
          </button>
          <button onClick={() => navigate('/')} className="primary-action-btn">
            Register Another &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccessPage;
