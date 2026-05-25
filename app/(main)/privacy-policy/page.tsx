import type { Metadata } from 'next';
import { Container } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Rollix Media — how we collect, use, and protect your data.',
  robots: { index: true, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] pt-36 pb-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80 mb-6">
            <span className="h-[1px] w-6 bg-cinematic-orange/40" />
            Legal
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-light text-white mb-4">
            Privacy <span className="text-gradient-warm italic">Policy</span>
          </h1>
          <p className="text-muted-foreground mb-12">Last updated: May 2025</p>

          <div className="space-y-10 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
              <p>When you contact us through our website or book a service, we may collect your name, email address, phone number, and project details. We do not collect payment information directly — payments are handled by secure third-party providers.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
              <p>We use the information you provide to respond to your enquiries, deliver our services, and occasionally send relevant updates about Rollix Media. We never sell your data to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Cookies</h2>
              <p>Our website uses essential cookies to ensure proper functionality. Analytics cookies (Vercel Speed Insights) help us understand site performance. No personally identifiable data is stored in cookies.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services</h2>
              <p>We use Cloudinary for media hosting, Supabase for data storage, and Vercel for hosting. These services have their own privacy policies which govern how they handle your data.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
              <p>We retain your contact information for as long as necessary to fulfil your service request or as required by law. You may request deletion of your data at any time.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:hello@rollixmedia.com" className="text-cinematic-orange hover:underline">hello@rollixmedia.com</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
              <p>Rollix Media, Bhilwara, Rajasthan, India.<br />
              For privacy concerns: <a href="mailto:hello@rollixmedia.com" className="text-cinematic-orange hover:underline">hello@rollixmedia.com</a></p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
