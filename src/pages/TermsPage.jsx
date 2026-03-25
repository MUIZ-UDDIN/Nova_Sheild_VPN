import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white text-xl font-bold">Terms of Service</h1>
      </div>

      <div className="px-5 space-y-6 text-sm leading-relaxed">
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
          <p className="text-slate-400">
            <span className="text-white font-semibold">Last updated:</span> March 25, 2026
          </p>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">1. Acceptance of Terms</h2>
            <p className="text-slate-400">
              By using NovaSHIELD VPN, you agree to these Terms of Service. If you do not agree with any part of these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">2. Description of Service</h2>
            <p className="text-slate-400">
              NovaSHIELD VPN provides a free virtual private network service that encrypts your internet connection and routes it through our global servers to protect your online privacy and security.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">3. Acceptable Use</h2>
            <p className="text-slate-400">You agree not to use NovaSHIELD VPN for:</p>
            <ul className="list-disc list-inside text-slate-400 mt-2 space-y-1">
              <li>Any illegal activities or unlawful purposes</li>
              <li>Distributing malware, viruses, or harmful code</li>
              <li>Harassment, abuse, or harm to others</li>
              <li>Unauthorized access to other systems or networks</li>
              <li>Spamming or sending unsolicited communications</li>
              <li>Violating intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">4. Free Service & Advertisements</h2>
            <p className="text-slate-400">
              NovaSHIELD VPN is provided free of charge. To sustain the service, we display advertisements through Google AdSense. By using our service, you agree to the display of these advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">5. Service Availability</h2>
            <p className="text-slate-400">
              We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We may modify, suspend, or discontinue the service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">6. Limitation of Liability</h2>
            <p className="text-slate-400">
              NovaSHIELD VPN is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use or inability to use our service, including but not limited to data loss, connection failures, or security breaches beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">7. Intellectual Property</h2>
            <p className="text-slate-400">
              The NovaSHIELD VPN name, logo, and all related branding are our property. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">8. Termination</h2>
            <p className="text-slate-400">
              We reserve the right to terminate or restrict access to our service for any user who violates these terms without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">9. Changes to Terms</h2>
            <p className="text-slate-400">
              We may update these terms at any time. Continued use of NovaSHIELD VPN after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">10. Contact</h2>
            <p className="text-slate-400">
              For questions about these Terms of Service, contact us at{' '}
              <span className="text-cyan-400">support@novashield-vpn.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
