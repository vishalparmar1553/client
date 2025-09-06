import React from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/PolicyStyles.css";

const Policy = () => {
  const policies = [
    {
      title: "1. Information We Collect",
      content: `We may collect the following types of information:
- Personal Information: Name, email, phone, address, or other details.
- Non-Personal Information: Browser type, device, IP, website usage data.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information to:
- Respond to inquiries.
- Improve products/services/website.
- Send updates or promotions (if opted in).
- Comply with legal obligations.`,
    },
    {
      title: "3. Cookies & Tracking Technologies",
      content: `We use cookies and similar technologies to enhance user experience, analyze traffic, and improve performance.`,
    },
    {
      title: "4. Sharing of Information",
      content: `We do not sell or trade personal information. We may share with:
- Service Providers for hosting/analytics/communication.
- Legal Authorities if required.`,
    },
    {
      title: "5. Data Security",
      content: `We implement measures to safeguard your information, but no method of transmission over the Internet is 100% secure.`,
    },
    {
      title: "6. Third-Party Links",
      content: `Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.`,
    },
    {
      title: "7. Your Rights",
      content: `You may have rights to access, correct, or request deletion of your data. Contact us for these rights.`,
    },
    {
      title: "8. Changes to this Policy",
      content: `We may update this Privacy Policy periodically. Updates will be posted on this page with “Last Updated” date.`,
    },
  ];

  return (
    <Layout title="Privacy Policy">
      <div className="policy-container" style={{marginTop:'90px'}}>
        <div className="policy-image">
          <img
            src="/images/contactus.jpeg"
            alt="Privacy Policy"
            className="policy-img"
          />
        </div>
        <div className="policy-content">
          {policies.map((policy, index) => (
            <div className="policy-card" key={index}>
              <h4 className="policy-title">{policy.title}</h4>
              <p className="policy-text">{policy.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
