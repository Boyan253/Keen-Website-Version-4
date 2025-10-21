import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Keen Agents',
  description: 'keenagents.ai Beta Testing Terms and Conditions',
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Spacing */}
      <div className="h-20" />

      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-keen-gray mb-4">
            Terms and Conditions
          </h1>
          
          <p className="text-lg text-keen-gray/70 mb-8">
            keenagents.ai Beta Testing Terms and Conditions
          </p>

          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                1. Introduction
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                Welcome to keenagents.ai! By participating in our beta testing phase, you agree to abide by the following Terms and Conditions. Please read them carefully before using our platform. Your participation in this beta phase indicates your acceptance of these terms.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                2. Purpose of Beta Testing
              </h2>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                keenagents.ai is currently in its beta testing phase. The platform is undergoing development and refinement. As a beta user, you acknowledge that:
              </p>
              <ul className="list-disc ml-6 text-keen-gray/80 space-y-2">
                <li>The platform may contain bugs, errors, or other issues that may not yet be resolved.</li>
                <li>Features and functionality are subject to change without notice.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                3. User Responsibilities
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-keen-gray mb-2">
                    Careful Use of CRUD Operations:
                  </h3>
                  <p className="text-keen-gray/80 leading-relaxed">
                    keenagents.ai allows users to perform Create, Read, Update, and Delete (CRUD) operations on files and databases. You are responsible for ensuring that no critical or unintended deletions or modifications occur. We strongly recommend making regular backups of your data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-keen-gray mb-2">
                    Data Security:
                  </h3>
                  <p className="text-keen-gray/80 leading-relaxed">
                    While keenagents.ai prioritizes privacy and local execution, you are responsible for ensuring that your environment is secure and that no sensitive data is shared inadvertently.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                4. Limitations of Liability
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-keen-gray mb-2">
                    No Warranties:
                  </h3>
                  <p className="text-keen-gray/80 leading-relaxed">
                    The keenagents.ai platform is provided "as-is" without warranties of any kind, either express or implied. keenagents.ai disclaims all warranties, including but not limited to, implied warranties of merchantability and fitness for a particular purpose.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-keen-gray mb-2">
                    Beta Risks:
                  </h3>
                  <p className="text-keen-gray/80 leading-relaxed">
                    keenagents.ai shall not be held liable for any loss, damage, or data corruption arising from your use of the platform during the beta phase.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                5. Feedback
              </h2>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                By participating in the beta program, you agree to provide constructive feedback about the platform. keenagents.ai reserves the right to use this feedback to improve the platform without any obligation to you.
              </p>
              <p className="text-keen-gray/80 leading-relaxed">
                Feedback submissions do not grant you ownership or compensation for any changes or features subsequently developed.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                6. Data Privacy
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                keenagents.ai does not collect or store your data during local execution. However, you are responsible for ensuring compliance with applicable laws and regulations regarding the handling of your data.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                7. Termination of Access
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                keenagents.ai reserves the right to terminate or restrict access to the beta platform at any time without prior notice.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                8. Changes to the Terms and Conditions
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                These Terms and Conditions may be updated from time to time. You will be notified of any significant changes, and your continued use of the platform signifies acceptance of those changes.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                9. Governing Law
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                These Terms and Conditions are governed by the laws of Bulgaria. Any disputes arising from these terms will be resolved in accordance with these laws.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                10. Contact Us
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at{' '}
                <a href="mailto:info@keenagents.ai" className="text-keen-blue hover:underline">
                  info@keenagents.ai
                </a>.
              </p>
            </section>

            {/* Final Statement */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-keen-gray/80 leading-relaxed font-medium">
                By using keenagents.ai during the beta testing phase, you agree to these Terms and Conditions and acknowledge the inherent risks of using a beta-stage product.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

