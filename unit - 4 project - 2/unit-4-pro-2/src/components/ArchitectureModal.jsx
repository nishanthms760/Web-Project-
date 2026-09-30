function ArchitectureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const pipelineSteps = [
    {
      step: '01',
      title: 'Document & Selfie Ingestion',
      desc: 'User uploads identity document (Aadhaar, Passport, Driving License) while a browser webcam captures a verified live portrait.'
    },
    {
      step: '02',
      title: 'OCR Extraction & MRZ Syntax Check',
      desc: 'Extracts full textual payload, verifies dates, names, checksum digits, and ensures Machine Readable Zone format conforms strictly to ICAO standards.'
    },
    {
      step: '03',
      title: 'Visual Tampering & Artifact Detection',
      desc: 'Analyzes compression noise levels, font mismatch heuristics, cloned pixels, and edge boundaries to detect forged modifications.'
    },
    {
      step: '04',
      title: 'Face Biometric Similarity Match',
      desc: 'Extracts 128-d or 512-d facial feature embeddings from the document photo and calculates cosine similarity against the live selfie.'
    },
    {
      step: '05',
      title: 'SHA-256 Hashing & Risk Scoring',
      desc: 'Generates a tamper-proof SHA-256 cryptographic digest of the document and outputs a composite 0-100% fraud probability score.'
    },
    {
      step: '06',
      title: 'Immutable Audit Trail',
      desc: 'Stores screening metadata, inspection timestamp, decision confidence, and investigator notes in a secured SQLite audit database.'
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}>
              SIH 2026 • Problem Statement 26188
            </span>
            <h3>AI Fake Identity &amp; Document Screening Architecture</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ color: 'var(--text-main)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            Designed as an end-to-end verification pipeline to defend financial portals, onboarding workflows, and government KYC gates against forged documents and deepfakes.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {pipelineSteps.map((item) => (
              <div
                key={item.step}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.15rem 1.25rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start'
                }}
              >
                <div
                  style={{
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '6px',
                    flexShrink: 0
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '1rem',
              padding: '1rem 1.25rem',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px dashed rgba(99, 102, 241, 0.3)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Source code, models, and Docker container configurations available on GitHub.
            </span>
            <a
              href="https://github.com/nishanthms760/sih-26188-document-screening"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
              style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
            >
              <span>🐙</span> View Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchitectureModal;
