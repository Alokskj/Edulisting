import React from "react";

const PrivacyPolicy = () => {
  const currentDate = "11-8-2023";
  const contactEmail = "support@edulisting.in";
  const contactMobile = "+917814650277";

  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p>Last Updated: <span className="font-semibold">{currentDate}</span></p>

    <p className="mt-4">Welcome to Edulisting ("us", "we", or "our"). We are committed to protecting your privacy. This Privacy Policy
      explains how we collect, use, disclose, and safeguard your information when you use our services, including but not
      limited to our website, mobile applications, and any related services (collectively, the "Services"). Please read this
      Privacy Policy carefully. By accessing or using our Services, you agree to the practices described in this Privacy
      Policy.</p>

    <h2 className="text-xl font-semibold mt-6">Information We Collect</h2>
    <p>We may collect information that you provide directly to us, such as when you create an account, post content, interact
      with other users, or communicate with us. This information may include:</p>
    <ul className="list-disc ml-6 mt-4">
      <li>Personal Information: Your name, email address, postal address, phone number, and other similar identifiers.</li>
      <li>User Content: Any content you choose to submit, such as posts, comments, reviews, or other interactions with the
        Services.</li>
      <li>Payment Information: If you make purchases through our Services, your payment information (e.g., credit card details)
        may be collected, processed, and stored by our payment processors.</li>
      <li>Location Information: Your approximate location based on IP address or other data if you grant us access to your
        device's location services.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6">How We Use Your Information</h2>
    <p>We may use the information we collect for various purposes, including:</p>
    <ul className="list-disc ml-6 mt-4">
      <li>Provide and Improve Services: To provide, maintain, and improve our Services, and to develop new features and
        functionalities.</li>
      <li>Communications: To communicate with you, respond to your inquiries, and provide you with important updates,
        promotions, and news.</li>
      <li>Personalization: To personalize your experience on our Services and present content that is relevant to you.</li>
      <li>Analytics: To analyze usage trends, monitor the effectiveness of our Services, and gather demographic information
        about our user base.</li>
      <li>Legal and Security: To comply with legal obligations, protect the rights and safety of users, and enforce our Terms
        of Use.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6">Disclosure of Your Information</h2>
    <p>We may share your information with third parties in various circumstances, including:</p>
    <ul className="list-disc ml-6 mt-4">
      <li>With Service Providers: We may share your information with third-party service providers who help us with various
        aspects of our Services, such as hosting, payment processing, and customer support.</li>
      <li>Legal Requirements: We may disclose your information to comply with applicable laws, regulations, legal processes,
        or enforceable governmental requests.</li>
      <li>Business Transfers: In the event of a merger, acquisition, or other transfer of all or part of our assets, your
        information may be transferred as part of that transaction.</li>
      <li>With Your Consent: We may share your information with third parties if you give us your explicit consent to do
        so.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6">Your Choices</h2>
    <p>You have certain rights and choices regarding your information:</p>
    <ul className="list-disc ml-6 mt-4">
      <li>Access: You can access and update certain information you've provided to us.</li>
      <li>Opt-Out: You can opt-out of receiving promotional communications from us by following the instructions provided in
        those communications.</li>
      <li>Delete Account: You can request the deletion of your account by contacting us at <a href="mailto:${contactEmail}">{contactEmail}</a> or <span className="font-semibold">{contactMobile}</span>.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6">Security</h2>
    <p>We take reasonable measures to protect your information from loss, theft, misuse, and unauthorized access. However,
      please note that no data transmission over the internet or storage method is 100% secure.</p>

    <h2 className="text-xl font-semibold mt-6">Changes to this Privacy Policy</h2>
    <p>We may update this Privacy Policy to reflect changes in our practices. We encourage you to review this Privacy Policy
      periodically to stay informed about how we are protecting your information.</p>

    <h2 className="text-xl font-semibold mt-6">Contact Us</h2>
    <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our practices, please contact us at
      <a href="mailto:${contactEmail}">{contactEmail}</a> or <span className="font-semibold">{contactMobile}</span>.</p>
  </div>
  );
};

export default PrivacyPolicy;
