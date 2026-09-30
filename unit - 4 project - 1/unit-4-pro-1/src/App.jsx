import { useState, useRef } from 'react';
import './App.css';

const LOCATIONS = {
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai']
};

export default function App() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', aadhaar: '', pan: '',
    dob: '', state: '', city: '', pincode: '', password: '', confirm: '', terms: false
  });
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();

  const validate = (data = form) => {
    const err = {};
    if (!data.name.trim()) err.name = 'Full name required';
    if (!/^\S+@\S+\.\S+$/.test(data.email)) err.email = 'Valid email required';
    if (!/^[6-9]\d{9}$/.test(data.phone)) err.phone = '10 digits starting 6-9';
    if (!/^[2-9]\d{11}$/.test(data.aadhaar.replace(/\s/g, ''))) err.aadhaar = '12 digits (no 0/1 start)';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan)) err.pan = '10-char PAN (ABCDE1234F)';
    
    if (!data.dob) {
      err.dob = 'DOB required';
    } else {
      const age = new Date().getFullYear() - new Date(data.dob).getFullYear();
      if (age < 18) err.dob = 'Must be 18+ years old';
    }

    if (!data.state) err.state = 'Select state';
    if (!data.city) err.city = 'Select city';
    if (!/^\d{6}$/.test(data.pincode)) err.pincode = '6 digits required';
    if (data.password.length < 8) err.password = 'Min 8 characters';
    if (data.password !== data.confirm) err.confirm = 'Passwords do not match';
    if (!data.terms) err.terms = 'Must accept declaration';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;
    if (name === 'aadhaar') val = value.replace(/\D/g, '').slice(0, 12).replace(/(\d{4})/g, '$1 ').trim();
    if (name === 'pan') val = value.toUpperCase().slice(0, 10);
    const updated = { ...form, [name]: val };
    setForm(updated);
    if (touched[name]) validate(updated);
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    validate();
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) setAvatar(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(all);
    if (validate()) setSubmitted(true);
  };

  const strength = [form.password.length >= 8, /\d/.test(form.password), /[^A-Za-z0-9]/.test(form.password)].filter(Boolean).length;
  const progress = Math.round((Object.entries(form).filter(([k, v]) => k !== 'terms' && Boolean(v)).length / 10) * 100);

  if (submitted) {
    return (
      <div className="container">
        <div className="card receipt">
          <div className="receipt-header">
            <div className="avatar-preview">{avatar ? <img src={avatar} alt="User" /> : form.name.charAt(0)}</div>
            <div>
              <h2>Registration Verified</h2>
              <p className="sub">Ref ID: REG-{Math.floor(100000 + Math.random() * 900000)} &bull; <span className="badge">Active Member</span></p>
            </div>
          </div>
          <div className="receipt-list">
            <div><strong>Full Name:</strong> {form.name}</div>
            <div><strong>Email Address:</strong> {form.email}</div>
            <div><strong>Mobile Phone:</strong> +91 {form.phone}</div>
            <div><strong>Date of Birth:</strong> {form.dob} (Age 18+)</div>
            <div><strong>Aadhaar Number:</strong> XXXX-XXXX-{form.aadhaar.replace(/\s/g, '').slice(-4)}</div>
            <div><strong>PAN Card:</strong> {form.pan}</div>
            <div><strong>Location:</strong> {form.city}, {form.state} - {form.pincode}</div>
          </div>
          <div className="btn-group">
            <button className="btn" onClick={() => window.print()}>Print Receipt</button>
            <button className="btn secondary" onClick={() => setSubmitted(false)}>Back to Form</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-top">
          <div>
            <h2>Citizen Registration Portal</h2>
            <p className="sub">Unit 4 Project 1 &bull; Aadhaar, PAN, Age 18+ &amp; Cascading Location</p>
          </div>
          <div className="avatar-upload" onClick={() => fileRef.current.click()} title="Upload photo">
            {avatar ? <img src={avatar} alt="Avatar" /> : <span>+ Photo</span>}
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} hidden />
          </div>
        </div>

        {/* Live Completion Progress */}
        <div className="progress-wrap">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="progress-txt">{progress}% Complete</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="field">
              <label>Full Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} placeholder="John Doe" className={touched.name && errors.name ? 'err-border' : ''} />
              {touched.name && errors.name && <span className="err">{errors.name}</span>}
            </div>
            <div className="field">
              <label>Email Address *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="john@example.com" className={touched.email && errors.email ? 'err-border' : ''} />
              {touched.email && errors.email && <span className="err">{errors.email}</span>}
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Mobile Phone *</label>
              <input type="tel" name="phone" maxLength="10" value={form.phone} onChange={handleChange} onBlur={handleBlur} placeholder="9876543210" className={touched.phone && errors.phone ? 'err-border' : ''} />
              {touched.phone && errors.phone && <span className="err">{errors.phone}</span>}
            </div>
            <div className="field">
              <label>Date of Birth (18+) *</label>
              <input type="date" name="dob" value={form.dob} onChange={handleChange} onBlur={handleBlur} className={touched.dob && errors.dob ? 'err-border' : ''} />
              {touched.dob && errors.dob && <span className="err">{errors.dob}</span>}
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Aadhaar (12 Digits) *</label>
              <input type="text" name="aadhaar" maxLength="14" value={form.aadhaar} onChange={handleChange} onBlur={handleBlur} placeholder="1234 5678 9012" className={touched.aadhaar && errors.aadhaar ? 'err-border' : ''} />
              {touched.aadhaar && errors.aadhaar && <span className="err">{errors.aadhaar}</span>}
            </div>
            <div className="field">
              <label>PAN Card (10 Chars) *</label>
              <input type="text" name="pan" maxLength="10" value={form.pan} onChange={handleChange} onBlur={handleBlur} placeholder="ABCDE1234F" className={touched.pan && errors.pan ? 'err-border' : ''} />
              {touched.pan && errors.pan && <span className="err">{errors.pan}</span>}
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>State *</label>
              <select name="state" value={form.state} onChange={(e) => { const st = e.target.value; setForm({ ...form, state: st, city: '' }); validate({ ...form, state: st, city: '' }); }} onBlur={handleBlur} className={touched.state && errors.state ? 'err-border' : ''}>
                <option value="">Select State</option>
                {Object.keys(LOCATIONS).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {touched.state && errors.state && <span className="err">{errors.state}</span>}
            </div>
            <div className="field">
              <label>City *</label>
              <select name="city" value={form.city} onChange={handleChange} onBlur={handleBlur} disabled={!form.state} className={touched.city && errors.city ? 'err-border' : ''}>
                <option value="">Select City</option>
                {form.state && LOCATIONS[form.state].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {touched.city && errors.city && <span className="err">{errors.city}</span>}
            </div>
            <div className="field">
              <label>Pincode *</label>
              <input type="text" name="pincode" maxLength="6" value={form.pincode} onChange={handleChange} onBlur={handleBlur} placeholder="6 digits" className={touched.pincode && errors.pincode ? 'err-border' : ''} />
              {touched.pincode && errors.pincode && <span className="err">{errors.pincode}</span>}
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Password (Min 8) *</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} onBlur={handleBlur} className={touched.password && errors.password ? 'err-border' : ''} />
              {form.password && (
                <div className="meter">
                  <div className={`bar strength-${strength}`}></div>
                  <small>Strength: {['Weak', 'Fair', 'Strong'][strength - 1] || 'Too Weak'}</small>
                </div>
              )}
              {touched.password && errors.password && <span className="err">{errors.password}</span>}
            </div>
            <div className="field">
              <label>Confirm Password *</label>
              <input type="password" name="confirm" value={form.confirm} onChange={handleChange} onBlur={handleBlur} className={touched.confirm && errors.confirm ? 'err-border' : ''} />
              {touched.confirm && errors.confirm && <span className="err">{errors.confirm}</span>}
            </div>
          </div>

          <div className="terms">
            <label>
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} onBlur={handleBlur} />
              <span>I certify that all details, Aadhaar, PAN &amp; location data are valid</span>
            </label>
            {touched.terms && errors.terms && <div className="err">{errors.terms}</div>}
          </div>

          <button type="submit" className="btn">Submit Registration &rarr;</button>
        </form>
      </div>
    </div>
  );
}
