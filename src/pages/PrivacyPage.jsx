import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white text-xl font-bold">Privacy Policy</h1>
      </div>

      <div className="px-5 space-y-6 text-sm leading-relaxed">
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4">
          <p className="text-slate-400">
            <span className="text-white font-semibold">Last updated:</span> March 25, 2026
          </p>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">1. Information We Collect</h2>
            <p className="text-slate-400">
              NovaSHIELD VPN is committed to your privacy. We operate under a strict <span className="text-cyan-400 font-medium">no-logs policy</span>. We do not collect, store, or share any of the following:
            </p>
            <ul className="list-disc list-inside text-slate-400 mt-2 space-y-1">
              <li>Browsing history or traffic data</li>
              <li>DNS queries</li>
              <li>IP addresses connected to VPN</li>
              <li>Connection timestamps or session duration</li>
              <li>Network traffic or data content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">2. Minimal Data</h2>
            <p className="text-slate-400">
              We may collect anonymous, aggregate statistics solely for the purpose of improving our service, such as total number of active connections (not linked to individuals). No personally identifiable information is gathered.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">3. Third-Party Services</h2>
            <p className="text-slate-400">
              Our app uses Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on your prior visits. You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">4. Cookies</h2>
            <p className="text-slate-400">
              NovaSHIELD VPN itself does not use cookies. However, third-party advertising partners (Google AdSense) may use cookies to serve relevant ads. Please refer to Google's privacy policy for more information.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">5. Data Security</h2>
            <p className="text-slate-400">
              All VPN connections are encrypted using <span className="text-cyan-400 font-medium">AES-256 military-grade encryption</span>. We use secure protocols including WireGuard, OpenVPN, and IKEv2 to ensure your data remains private.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">6. Children's Privacy</h2>
            <p className="text-slate-400">
              Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">7. Changes to This Policy</h2>
            <p className="text-slate-400">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">8. Contact Us</h2>
            <p className="text-slate-400">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <span className="text-cyan-400">support@novashield-vpn.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
