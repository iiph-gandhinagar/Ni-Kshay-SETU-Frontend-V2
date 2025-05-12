import React from 'react';
import Footer from '../../components/Layouts/Footer';
import { Navbar } from '../../components/Layouts/Navbar';
export const PrivacyPolicy = () => {
  return (
    <React.Fragment>
      <Navbar
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
      <section className='pt-[48px] pb-20'>
        <div className='container mx-auto'>
          <h2 className='text-3xl md:text-[48px] font-bold -tracking-[0.32px] md:leading-[60px] text-center'>
            Ni-kshay SETU Privacy Policy
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: `
      <p>Ni-kshay Setu is a web and mobile application that values and prioritizes the privacy of its users. This Privacy Policy outlines how the app collects, uses, and safeguards your information, including email addresses, phone numbers, and other data you may provide while using its services. By using the Ni-kshay Setu platform, you agree to the terms outlined in this policy.</p>
      <h2 style="color: #000000; font-weight: bold;">1. Accuracy and Legal Use Disclaimer</h2>
      <p>All efforts have been made to ensure the accuracy of the content on this platform. However, this content should not be construed as a statement of law or used for legal purposes. This information available through the app is meant for capacity building and is built on the basis of NTEP program guidelines. While all efforts have been made to ensure alignment with these guidelines, the guidelines itself is the original source of truth/ instruction.</p>
      <p>The developers, Indian Institute of Public Health Gandhinagar (IIPHG), and partners accept no responsibility for the accuracy, completeness, or usefulness of the information provided. Users are advised to seek professional and medical advice before acting on any information obtained through this website or mobile application.</p>

      <h2 style="color: #000000; font-weight: bold;">2. Collection of Personal Information</h2>
      <p>We collect the following personal information from users for the purpose of providing our services:</p>
      <ul style="padding-left: 20px;">
        <li><strong>Email Address:</strong> Used for communication and notifications related to the application.</li>
        <li><strong>Phone Number:</strong> Used to facilitate services and communication, including sending OTPs for registration and password recovery, with explicit user consent.</li>
        <li><strong>Cadre and Geographic Details:</strong> To serve localized content that is relevant to your region and professional role.</li>
        <li><strong>Profile Picture:</strong> If uploaded, used for personalizing your user profile and is not shared with any third party. This image is collected only when users voluntarily provide it during registration or while using specific features.</li>
      </ul>

      <h2 style="color: #000000; font-weight: bold;">3. Use of Personal Information</h2>
      <p>The personal information you provide will be used for:</p>
      <ul style="padding-left: 20px;">
        <li>Sending notifications, updates, OTPs, and other service-related communications.</li>
        <li>Mapping users to appropriate health facilities for TB-related services, where applicable.</li>
        <li>Displaying user’s summary/usage data for features such as leaderboard, if applicable.</li>
        <li>Personalized content and services based on your interactions and preferences.</li>
      </ul>
      <p>We will not use your information for any purpose not explicitly stated in this policy without your prior consent.</p>

      <h2 style="color: #000000; font-weight: bold;">4. Account Deletion Option</h2>
      <p>Users have the right to delete their account at any time. By using the "Delete Account" option within the application, users can permanently remove their personal information, including email addresses and phone numbers, from our system. Once an account is deleted:</p>
      <ul style="padding-left: 20px;">
        <li>All user data including usage or any other transactional data will be permanently removed from our active databases of Ni-kshay SETU.</li>
        <li>Limited backup data may remain in compliance with legal or regulatory requirements, but it will no longer be used for operational purposes.</li>
      </ul>

      <h2 style="color: #000000; font-weight: bold;">5. Data Protection and Security</h2>
      <p>We implement strict measures to ensure the security of your personal information. This includes:</p>
      <ul style="padding-left: 20px;">
        <li>Encryption of sensitive data.</li>
        <li>Secure data storage.</li>
        <li>Restricted access to personal information by authorized personnel only.</li>
      </ul>
      <p><strong>Temporary Storage for Clinical Queries:</strong> For our healthcare users, such as low-level nurses and doctors, we temporarily store images and documents submitted via our query module until the consultation is resolved. These files are used solely for facilitating expert responses and are not processed for any other purposes.</p>

      <h2 style="color: #000000; font-weight: bold;">6. Special Considerations for Healthcare Providers</h2>
      <ul style="padding-left: 20px;">
        <li><strong>Handling of Clinical Data:</strong> Selected Healthcare providers use our platform to consult on patient case scenarios. They may need to share photos or documents related to the patients for the purpose of consultations. These will be temporarily stored for a month to be used for the purpose of solving the individual consultation and will be permanently deleted once the query is resolved.</li>
        <li><strong>Non-storage of Patient-Centric Information:</strong> We do not store any patient-centric identified information submitted through optional fields, ensuring that patient confidentiality is maintained in compliance with healthcare regulations. We advise the users not to fill, not to upload or hide personal identifying information (obtained by users from the persons) in the application or in any of the functionality.</li>
        <li><strong>Prescription Transfers:</strong> Health workers can generate and send suggestive prescription PDFs (retrieved based on their self - entered input data) directly via WhatsApp Or Email within the app. These documents are not stored in our system but are transmitted securely to ensure patient confidentiality.</li>
      </ul>

      <h2 style="color: #000000; font-weight: bold;">7. Cookies and Tracking</h2>
      <p>The platform uses cookies to enhance user experience. Cookies help track user activity for statistical purposes, including:</p>
      <ul style="padding-left: 20px;">
        <li>Pages visited and other features usage and activity.</li>
        <li>Storing user authentication tokens, app preferences, and user ID for personalized settings.</li>
      </ul>
      <p>We do not use cookies to collect personally identifiable information without your consent. For more information, please check the cookies sections to read about our policy. <a href="https://nikshay-setu.in/cookie-policy" target="_blank">Learn more</a>.</p>

      <h2 style="color: #000000; font-weight: bold;">8. Audio Recording</h2>
      <p>We do not collect audio data unless explicitly triggered by the user for specific features, such as voice commands. The data is not stored or shared beyond its immediate purpose.</p>

      <h2 style="color: #000000; font-weight: bold;">9. Site Visit Data</h2>
      <p>We collect non-personal site visit data for statistical purposes, such as:</p>
      <ul style="padding-left: 20px;">
        <li>Server address.</li>
        <li>Browser type and version.</li>
        <li>App error and crash reports.</li>
        <li>Pages accessed and time spent on them.</li>
      </ul>
      <p>This information is anonymized and used solely to improve the platform’s functionality and to calculate users' performance into the leaderboard.</p>

      <h2 style="color: #000000; font-weight: bold;">10. User Responsibilities</h2>
      <p>By using Ni-kshay Setu, users agree to:</p>
      <ul style="padding-left: 20px;">
        <li>Provide accurate and truthful information.</li>
        <li>Use the platform solely for its intended purpose.</li>
        <li>Avoid any actions that may impair the performance or integrity of the platform.</li>
        <li>Avoid considering the responses and resource materials for the final outcome of the patient management, consult professionals or seek medical doctors for taking critical clinical decisions.</li>
        <li>Do not share patient-centric data to third parties for commercial purposes. If any confidential information obtained through the app, it is only meant for the direct recipient and is not to be shared externally.</li>
      </ul>

      <h2 style="color: #000000; font-weight: bold;">11. Rights of Users</h2>
      <p>Users have the following rights concerning their personal information:</p>
      <ul style="padding-left: 20px;">
        <li><strong>Access and Update:</strong> Users can access and update their personal information at any time.</li>
        <li><strong>Account Deletion:</strong> Users can delete their account and personal data through the app’s settings.</li>
        <li><strong>Inquiries:</strong> Users can contact us for inquiries about data use or any concerns regarding this policy.</li>
      </ul>

      <h2 style="color: #000000; font-weight: bold;">12. Notifications and Communication</h2>
      <p>By providing your email and phone number, you consent to receive relevant notifications, OTPs, and communication from Ni-kshay Setu developers or health staff regarding our services and your account.</p>

      <h2 style="color: #000000; font-weight: bold;">13. Modifications to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page, and users are encouraged to review the policy periodically to stay informed.</p>

      <p>For questions about this Cookie Policy, please contact us via <a href="https://nikshay-setu.in/about-us#contact-us" target="_blank">https://nikshay-setu.in/about-us#contact-us</a>.</p>
    `,
            }}
            style={{
              marginTop: '1.5rem', // mt-6 equivalent
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem', // space-y-4 equivalent
            }}
          />
        </div>
      </section>
      <Footer
        logoTitle='Ni-kshay SETU'
        logoSubtitle='Support to End TUberculosis (SETU)'
      />
    </React.Fragment>
  );
};
