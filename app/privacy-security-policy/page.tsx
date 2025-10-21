import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy and Security Policy | Keen Agents',
  description: 'Privacy and Security Policy of personal data provided for processing by SPARKNES LCC through keenagents.ai',
}

export default function PrivacySecurityPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Spacing */}
      <div className="h-20" />

      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-keen-gray mb-4">
            Privacy and Security Policy
          </h1>
          
          <p className="text-lg text-keen-gray/70 mb-8">
            Privacy and Security Policy of personal data provided for processing by SPARKNES LCC, UIC: 103978990, through the website keenagents.ai
          </p>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                Dear Customers,
              </p>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                Below, you will find notifications describing the context in which we process your personal data, as well as explaining your rights and our obligations regarding the processing of your personal data. In this Privacy Policy, "we" or "us" refers to SPARKNES LCC, UIC: 103978990
              </p>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                SPARKNES LCC, UIC: 103978990 is a company registered at Varna, Bulgaria, 10 Han Asparuh Street. As the controller of your personal data, we are responsible for processing your information through this website. If you have questions regarding the use of your personal data under this Privacy Policy, please contact us at{' '}
                <a href="mailto:myrights@keenagents.ai" className="text-keen-blue hover:underline">
                  myrights@keenagents.ai
                </a>.
              </p>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                Please note that the Commission for Personal Data Protection (CPDP) is an independent state authority ensuring the protection of individuals in relation to personal data processing, access to such data, and compliance with applicable Bulgarian and European legislation on personal data protection. Additional information can be found at{' '}
                <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="text-keen-blue hover:underline">
                  www.cpdp.bg
                </a>.
              </p>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                We strive to process your personal data in full compliance with the requirements of the Bulgarian Personal Data Protection Act and Regulation (EU) 2016/679 of the European Parliament and of the Council on the protection of natural persons concerning personal data processing and the free movement of such data (General Data Protection Regulation).
              </p>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                This Privacy Policy has been prepared in accordance with the applicable Bulgarian and European legislation on personal data protection.
              </p>
              <p className="text-keen-gray/80 leading-relaxed">
                We reserve the right to update this Privacy Policy, and the updated version will be made available on this website.
              </p>
            </section>

            {/* Section I */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                SECTION I: Personal Data We Process
              </h2>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                When visiting our website to obtain more information about the services and products we offer, no registration is required, allowing you to browse anonymously. However, accessing specific services may require you to provide personal data such as an email address or Google profile.
              </p>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                We may collect various types of personal data, including:
              </p>
              <div className="ml-6 mb-4">
                <p className="text-keen-gray/80 leading-relaxed mb-2">
                  <strong>Data related to your expressed preferences:</strong>
                </p>
                <ul className="list-disc ml-6 text-keen-gray/80 space-y-2">
                  <li>Personal data provided for analyzing your usage of our website, personalizing our offers, and ensuring suggestions for the most suitable products or services.</li>
                  <li>Personal data obtained through interactions with us, including visits to our locations, our website, social media pages, meetings, calls, emails, etc.</li>
                </ul>
              </div>
              <p className="text-keen-gray/80 leading-relaxed mb-2">
                For accessing our services, you may provide the following identification and contact information:
              </p>
              <ul className="list-disc ml-6 text-keen-gray/80 space-y-2">
                <li>Email address and/or</li>
                <li>Google profile.</li>
              </ul>
            </section>

            {/* Section II */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                SECTION II: Purposes of Personal Data Processing
              </h2>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                We may collect and use your personal data to provide products or services, invoice such products or services, comply with legal obligations, offer products and services that may interest you (under lawful conditions), or communicate with you for other purposes evident from the circumstances or disclosed at the time of data collection. The primary legal bases for processing your data include your consent, contract execution, legal obligations, or our legitimate interests.
              </p>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                For example:
              </p>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                By requesting our products and services, you consent to provide personal data for processing. Using our products and services constitutes a contractual relationship. Data processing aims to personalize offers or fulfill contract terms, including communication about products/services or subsequent clarifications.
              </p>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                Personal data may also be processed to ensure compliance with national legislation, including anti-money laundering measures, tax and accounting obligations, or other regulatory requirements.
              </p>
              <p className="text-keen-gray/80 leading-relaxed">
                We may collect information about your website visits (e.g., pages visited, referring websites, and search activities) to enhance website content and gather aggregated user statistics. Cookies may be used to collect data such as domain names, internet providers, operating systems, and access times. You can manage cookie preferences in your browser settings.
              </p>
            </section>

            {/* Section III */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                SECTION III: Data Retention Period
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                We will retain your personal data for a period necessary to comply with applicable laws and regulations, fulfill contractual obligations, or support operational needs and customer relationship management. For specific queries regarding data retention, please contact us at{' '}
                <a href="mailto:myrights@keenagents.ai" className="text-keen-blue hover:underline">
                  myrights@keenagents.ai
                </a>
              </p>
            </section>

            {/* Section IV */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                SECTION IV: Legal Grounds for Data Processing
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                Personal data processing is conducted in full compliance with the Bulgarian Personal Data Protection Act and Regulation (EU) 2016/679. Legal grounds include contract performance, statutory rights and obligations, and consent verification.
              </p>
            </section>

            {/* Section V */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                SECTION V: Recipients of Personal Data
              </h2>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                We may disclose your personal data under confidentiality conditions, as necessary for our activities, obligations, or stated purposes, including to:
              </p>
              <ul className="list-disc ml-6 text-keen-gray/80 space-y-2">
                <li>Employees whose roles involve executing contractual obligations related to products/services.</li>
                <li>Financial, judicial, or law enforcement authorities, and other state bodies when required.</li>
                <li>Professionals such as lawyers, notaries, auditors, etc.</li>
              </ul>
            </section>

            {/* Section VI */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                SECTION VI: Data Transfers Outside the EEA
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                For international transfers from the European Economic Area (EEA), your data will be transferred only if the European Commission recognizes the recipient country as providing adequate data protection or if applicable derogations are in place. Safeguards such as Standard Contractual Clauses or Binding Corporate Rules will be applied where necessary.
              </p>
            </section>

            {/* Section VII */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                SECTION VII: Your Data Protection Rights
              </h2>
              <p className="text-keen-gray/80 leading-relaxed mb-4">
                Under applicable law, you have the following rights:
              </p>
              <ul className="list-disc ml-6 text-keen-gray/80 space-y-3 mb-4">
                <li><strong>Access:</strong> Obtain information about and copies of your processed personal data.</li>
                <li><strong>Correction:</strong> Request rectification of inaccurate or incomplete data.</li>
                <li><strong>Erasure:</strong> Request deletion of data where no legal basis for retention exists.</li>
                <li><strong>Restriction:</strong> Request limited data processing under certain conditions.</li>
                <li><strong>Objection:</strong> Object to data processing, including direct marketing purposes.</li>
                <li><strong>Withdrawal of Consent:</strong> Withdraw consent for data processing without affecting prior processing.</li>
                <li><strong>Data Portability:</strong> Request data transfer to a third party when lawful and technically feasible.</li>
                <li><strong>Complaints:</strong> Submit complaints to the CPDP at{' '}
                  <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="text-keen-blue hover:underline">
                    www.cpdp.bg
                  </a>.
                </li>
              </ul>
              <p className="text-keen-gray/80 leading-relaxed">
                To exercise your rights, contact us at: Sofia, Simeonovsko Shose Blvd. 85 or{' '}
                <a href="mailto:myrights@keenagents.ai" className="text-keen-blue hover:underline">
                  myrights@keenagents.ai
                </a>. Verification of identity may be required. Responses will be provided within 30 days.
              </p>
            </section>

            {/* Section VIII */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-keen-gray mb-4">
                SECTION VIII: Contact Us
              </h2>
              <p className="text-keen-gray/80 leading-relaxed">
                If you have questions regarding the use of your personal data, please contact us at{' '}
                <a href="mailto:myrights@keenagents.ai" className="text-keen-blue hover:underline">
                  myrights@keenagents.ai
                </a>
              </p>
            </section>

            {/* Dates */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-keen-gray mb-1">Effective Date:</p>
                  <p className="text-keen-gray/70">12.12.2024</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-keen-gray mb-1">Last Updated:</p>
                  <p className="text-keen-gray/70">12.12.2024</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

