'use client';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button type="button" className="btn btn-outline print-btn" onClick={() => window.print()} aria-label="Print menu">
      <Printer size={17} aria-hidden="true" /> <span className="print-btn-label">Print menu</span>
    </button>
  );
}
