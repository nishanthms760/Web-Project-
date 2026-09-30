import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCATION_DATA, validatePincodeForState } from '../data/locationData';

function RegistrationPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    aadhaar: '',
    pan: '',
    dob: '',
    state: '',
    district: '',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Password checks
  const pwdChecks = [
    { label: '8+ chars', valid: form.password.length >= 8 },
    { label: 'Number', valid: /\d/.test(form.password) },
    { label: 'Symbol', valid: /[^A-Za-z0-9]/.test(form.password) }
  ];
  const strength = pwdChecks.filter((c) => c.valid).length;
  const strengthLabels = ['Empty', 'Weak', 'Good', 'Strong'];
  const strengthClasses = ['str-none', 'str-weak', 'str-good', 'str-strong'];

  // Form validation function
  const validate = (vals) => {
    const errs = {};
    
    // Full Name
    if (!vals.fullName.trim()) {
      errs.fullName = 'Full name is required';
    } else if (vals.fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters';
    }

    // Email
    if (!vals.email.trim() || !/^\S+@\S+\.\S+$/.test(vals.email)) {
      errs.email = 'Valid email is required';
    }

    // Phone (10 digits starting with 6-9)
    if (!/^[6-9]\d{9}$/.test(vals.phone.replace(/[\s-]/g, ''))) {
      errs.phone = '10-digit mobile number starting with 6-9';
    }

    // 1. Aadhaar Number Validation (12 digits, cannot start with 0 or 1)
    const rawAadhaar = vals.aadhaar.replace(/\s+/g, '');
    if (!rawAadhaar) {
      errs.aadhaar = '12-digit Aadhaar number is required';
    } else if (!/^[2-9]\d{11}$/.test(rawAadhaar)) {
      errs.aadhaar = 'Must be 12 digits and cannot start with 0 or 1';
    }

    // 2. PAN Card Validation (10 chars: 5 uppercase letters, 4 digits, 1 uppercase letter)
    const rawPan = vals.pan.trim().toUpperCase();
    if (!rawPan) {
      errs.pan = 'PAN card number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(rawPan)) {
      errs.pan = 'Enter valid 10-character PAN (e.g. ABCDE1234F)';
    }

    // 3. Date of Birth (DOB) Validation (Must be at least 18 years old)
    if (!vals.dob) {
      errs.dob = 'Date of birth is required';
    } else {
      const birthDate = new Date(vals.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (birthDate > today) {
        errs.dob = 'Date cannot be in the future';
      } else if (age < 18) {
        errs.dob = `Must be at least 18 years old (current: ${age < 0 ? 0 : age})`;
      }
    }

    // State, District, City, Pincode
    if (!vals.state) errs.state = 'Select state';
    if (!vals.district) errs.district = 'Select district';
    if (!vals.city.trim()) errs.city = 'Enter city';
    if (!vals.pincode.trim()) {
      errs.pincode = 'Enter pincode';
    } else {
      const pCheck = validatePincodeForState(vals.pincode.trim(), vals.state);
      if (!pCheck.valid) errs.pincode = pCheck.message;
    }

    // Password & Confirm Password
    if (vals.password.length < 8) errs.password = 'At least 8 characters required';
    if (vals.confirmPassword !== vals.password) errs.confirmPassword = 'Passwords do not match';
    
    // Terms
    if (!vals.terms) errs.terms = 'Please accept terms';

    return errs;
  };

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let nextVal = type === 'checkbox' ? checked : value;

    // Auto-format Aadhaar with spaces (XXXX XXXX XXXX)
    if (name === 'aadhaar') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 12);
      const chunks = digitsOnly.match(/.{1,4}/g) || [];
      nextVal = chunks.join(' ');
    }

    // Auto-uppercase PAN
    if (name === 'pan') {
      nextVal = value.toUpperCase().slice(0, 10);
    }

    setForm((prev) => ({
      ...prev,
      [name]: nextVal
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleStateChange = (e) => {
    const st = e.target.value;
    setForm((prev) => ({
      ...prev,
      state: st,
      district: '',
      city: '',
      pincode: ''
    }));
    setTouched((prev) => ({ ...prev, state: true }));
  };

  const handleDistrictChange = (e) => {
    const dist = e.target.value;
    setForm((prev) => ({ ...prev, district: dist, city: '' }));
    setTouched((prev) => ({ ...prev, district: true }));
  };

  const handleFileChange = (e) => {
    setAvatarError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setAvatarError('Only JPG, PNG or WEBP allowed');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError('Photo exceeds 2MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => setAvatar(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const curErrors = validate(form);
    if (Object.keys(curErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/success', {
        state: {
          ...form,
          avatar,
          refId: 'REG-' + Math.floor(100000 + Math.random() * 900000),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      });
    }, 600);
  };

  const districts = form.state ? Object.keys(LOCATION_DATA[form.state]?.districts || {}) : [];
  const cities = form.district ? LOCATION_DATA[form.state]?.districts[form.district] || [] : [];

  // Mask Aadhaar for preview card
  const rawAadhaarDigits = form.aadhaar.replace(/\s+/g, '');
  const maskedAadhaar = rawAadhaarDigits.length === 12
    ? `•••• •••• ${rawAadhaarDigits.slice(8)}`
    : form.aadhaar || '•••• •••• ••••';

  return (
    <div className="compact-page">
      <div className="compact-grid">
        
        {/* Left Side: Overview & Live Card */}
        <aside className="compact-aside">
          <div className="aside-header">
            <span className="pill-tag">KYC &bull; Unit 4 Pro 1</span>
            <h2>User Registration</h2>
            <p>Form with real-time validation, Aadhaar (12-digit), PAN (10-char), and Age (18+) checks.</p>
          </div>

          <div className="features-checklist">
            <div className="chk-row"><span>✓</span> <strong>Aadhaar</strong> 12-digit format check</div>
            <div className="chk-row"><span>✓</span> <strong>PAN</strong> 10-char alphanumeric check</div>
            <div className="chk-row"><span>✓</span> <strong>DOB</strong> age requirement (18+)</div>
            <div className="chk-row"><span>✓</span> <strong>Location</strong> State &rarr; District &rarr; City</div>
            <div className="chk-row"><span>✓</span> <strong>Pincode</strong> geographic verification</div>
            <div className="chk-row"><span>✓</span> <strong>Password</strong> entropy meter</div>
          </div>

          {/* Live ID Card Preview */}
          <div className="mini-id-card">
            <div className="card-top">
              <span className="card-sub">VERIFIED IDENTITY BADGE</span>
              <span className="status-live">LIVE</span>
            </div>
            <div className="card-body">
              <div className="avatar-box">
                {avatar ? (
                  <img src={avatar} alt="Avatar" />
                ) : (
                  <span>{form.fullName ? form.fullName.charAt(0).toUpperCase() : '?'}</span>
                )}
              </div>
              <div className="card-info">
                <h4>{form.fullName || 'Citizen Name'}</h4>
                <p>{form.email || 'user@domain.com'}</p>
                <div className="location-tag">
                  {form.city ? `${form.city}, ` : ''}{form.state || 'Location Pending'}
                </div>
              </div>
            </div>

            <div className="card-id-details">
              <div className="id-detail-item">
                <span className="id-k">Aadhaar:</span>
                <span className="id-v font-mono">{maskedAadhaar}</span>
              </div>
              <div className="id-detail-item">
                <span className="id-k">PAN:</span>
                <span className="id-v font-mono">{form.pan || '—'}</span>
              </div>
              <div className="id-detail-item">
                <span className="id-k">DOB:</span>
                <span className="id-v">{form.dob || '—'}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side: Form */}
        <main className="form-container">
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Row 1: Full Name & Email */}
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Nishanth Mohan"
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('fullName')}
                  className={touched.fullName && errors.fullName ? 'err' : ''}
                />
                {touched.fullName && errors.fullName && <span className="err-msg">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@email.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  className={touched.email && errors.email ? 'err' : ''}
                />
                {touched.email && errors.email && <span className="err-msg">{errors.email}</span>}
              </div>
            </div>

            {/* Row 2: Phone & Date of Birth (Age Validation) */}
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="phone">Mobile Phone (10 Digits) *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength="10"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur('phone')}
                  className={touched.phone && errors.phone ? 'err' : ''}
                />
                {touched.phone && errors.phone && <span className="err-msg">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth (18+ Required) *</label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  onBlur={() => handleBlur('dob')}
                  className={touched.dob && errors.dob ? 'err' : ''}
                />
                {touched.dob && errors.dob && <span className="err-msg">{errors.dob}</span>}
              </div>
            </div>

            {/* Row 3: Aadhaar Number & PAN Card Number */}
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="aadhaar">
                  Aadhaar Number (12 Digits) *
                </label>
                <input
                  id="aadhaar"
                  name="aadhaar"
                  type="text"
                  maxLength="14"
                  placeholder="XXXX XXXX XXXX"
                  value={form.aadhaar}
                  onChange={handleChange}
                  onBlur={() => handleBlur('aadhaar')}
                  className={touched.aadhaar && errors.aadhaar ? 'err' : ''}
                />
                {touched.aadhaar && errors.aadhaar && <span className="err-msg">{errors.aadhaar}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="pan">
                  PAN Card (10 Characters) *
                </label>
                <input
                  id="pan"
                  name="pan"
                  type="text"
                  maxLength="10"
                  placeholder="e.g. ABCDE1234F"
                  value={form.pan}
                  onChange={handleChange}
                  onBlur={() => handleBlur('pan')}
                  className={touched.pan && errors.pan ? 'err' : ''}
                />
                {touched.pan && errors.pan && <span className="err-msg">{errors.pan}</span>}
              </div>
            </div>

            {/* Row 4: Dependent Location (State & District) */}
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={form.state}
                  onChange={handleStateChange}
                  onBlur={() => handleBlur('state')}
                  className={touched.state && errors.state ? 'err' : ''}
                >
                  <option value="">Select State</option>
                  {Object.keys(LOCATION_DATA).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                {touched.state && errors.state && <span className="err-msg">{errors.state}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="district">District *</label>
                <select
                  id="district"
                  name="district"
                  value={form.district}
                  onChange={handleDistrictChange}
                  onBlur={() => handleBlur('district')}
                  disabled={!form.state}
                  className={touched.district && errors.district ? 'err' : ''}
                >
                  <option value="">{form.state ? 'Select District' : 'Choose State First'}</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {touched.district && errors.district && <span className="err-msg">{errors.district}</span>}
              </div>
            </div>

            {/* Row 5: City & Pincode */}
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="city">City / Locality *</label>
                <input
                  id="city"
                  name="city"
                  list="city-options"
                  placeholder={form.district ? 'Type or select city' : 'Choose district first'}
                  value={form.city}
                  onChange={handleChange}
                  onBlur={() => handleBlur('city')}
                  disabled={!form.district}
                  className={touched.city && errors.city ? 'err' : ''}
                />
                <datalist id="city-options">
                  {cities.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
                {touched.city && errors.city && <span className="err-msg">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="pincode">
                  Pincode {form.state && <small>({LOCATION_DATA[form.state]?.pincodePrefix}xxxx)</small>} *
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  maxLength="6"
                  placeholder="6 digits"
                  value={form.pincode}
                  onChange={handleChange}
                  onBlur={() => handleBlur('pincode')}
                  className={touched.pincode && errors.pincode ? 'err' : ''}
                />
                {touched.pincode && errors.pincode && <span className="err-msg">{errors.pincode}</span>}
              </div>
            </div>

            {/* Row 6: Password & Confirm Password */}
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="password">Password (8+ Chars) *</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  className={touched.password && errors.password ? 'err' : ''}
                />
                {touched.password && errors.password && <span className="err-msg">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={touched.confirmPassword && errors.confirmPassword ? 'err' : ''}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="err-msg">{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            {/* Password Strength Meter */}
            {form.password && (
              <div className="compact-strength">
                <div className="strength-header">
                  <span>Strength: <strong className={strengthClasses[strength]}>{strengthLabels[strength]}</strong></span>
                  <div className="checks-inline">
                    {pwdChecks.map((c, i) => (
                      <span key={i} className={`chk-chip ${c.valid ? 'met' : ''}`}>
                        {c.valid ? '✓' : '○'} {c.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bar-track">
                  <div className={`bar-fill ${strengthClasses[strength]}`} style={{ width: `${(strength / 3) * 100}%` }}></div>
                </div>
              </div>
            )}

            {/* Photo Upload */}
            <div className="form-group">
              <label>Profile Photo</label>
              <div className="compact-upload">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="upload-btn"
                >
                  📷 Choose Image (&lt; 2MB)
                </button>
                {avatar && (
                  <button
                    type="button"
                    onClick={() => { setAvatar(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="clear-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
              {avatarError && <span className="err-msg">{avatarError}</span>}
            </div>

            {/* Terms */}
            <div className="terms-row">
              <label className="checkbox-lbl">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  onBlur={() => handleBlur('terms')}
                />
                <span>I confirm that the entered personal, Aadhaar, PAN, and location details are accurate.</span>
              </label>
              {touched.terms && errors.terms && <span className="err-msg">{errors.terms}</span>}
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? 'Verifying & Registering...' : 'Complete Registration →'}
            </button>
          </form>
        </main>

      </div>
    </div>
  );
}

export default RegistrationPage;
