import { useState } from 'react';
import axios from 'axios';
import './styles/App.css';

import Hero from './components/Hero';
import AuditForm from './components/AuditForm';
import ErrorMessage from './components/ErrorMessage';
import Report from './components/Report';
import Footer from './layouts/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/audit`,
        { url },
        { timeout: 30000 }
      );

      setReport(response.data.data);
    } catch (err) {
      const apiError = err.response?.data?.error;

      if (apiError) {
        setError(
          apiError.hint
            ? `${apiError.message} (${apiError.hint})`
            : apiError.message
        );
      } else if (err.code === 'ERR_NETWORK') {
        setError(
          'Cannot reach the Page Pulse API. Make sure the backend is running.'
        );
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Hero />

      <AuditForm
        url={url}
        setUrl={setUrl}
        loading={loading}
        onSubmit={handleSubmit}
      />

      <ErrorMessage error={error} />

      <Report report={report} />

      <Footer />
    </div>
  );
}