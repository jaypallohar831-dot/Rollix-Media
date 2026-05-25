import type { Metadata } from 'next';
import { Container } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Rollix Media services.',
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] pt-36 pb-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80 mb-6">
            <span className="h-[1px] w-6 bg-cinematic-orange/40" />
            Legal
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-light text-white mb-4">
            Terms of <span className="text-gradient-warm italic">Service</span>
          </h1>
          <p className="text-muted-foreground mb-12">Last updated: May 2025</p>

          <div className="space-y-10 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Services</h2>
              <p>Rollix Media provides digital marketing services including video editing, social media management, web development, SEO, and graphic design. All services are delivered as agreed upon in individual project contracts or proposals.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Payment Terms</h2>
              <p>A 50% advance payment is required before project commencement. The remaining balance is due upon project completion and before final delivery of assets. Prices are in Indian Rupees (INR) unless stated otherwise.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Revisions</h2>
              <p>Each project includes a set number of revisions as specified in the project proposal. Additional revisions beyond this scope will be charged at our standard hourly rate.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Intellectual Property</h2>
              <p>Upon receipt of final payment, the client owns the delivered final assets. Rollix Media retains the right to showcase the work in our portfolio and marketing materials unless a separate confidentiality agreement is in place.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Cancellation Policy</h2>
              <p>If a project is cancelled after commencement, the advance payment is non-refundable. Any completed work at the time of cancellation will be billed proportionally.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
              <p>Rollix Media is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Bhilwara, Rajasthan.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
              <p>For any questions regarding these terms, contact us at <a href="mailto:hello@rollixmedia.com" className="text-cinematic-orange hover:underline">hello@rollixmedia.com</a>.</p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
