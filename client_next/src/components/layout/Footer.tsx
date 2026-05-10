export default function Footer() {
  return (
    <footer className="mt-8 py-6 text-center text-sm" style={{ borderTop: '0.5px solid var(--border)', color: 'var(--text-secondary)' }}>
      <p>
        © {new Date().getFullYear()}{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>InterviewReady</span>.
        Designed with passion to empower future engineers.
      </p>
    </footer>
  );
}
