export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing or using the Dabbzo platform, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions, you may not access or use our services.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
          <p className="text-gray-700 mb-3">
            To use certain features of our platform, you must register for an account. You agree to provide accurate information and keep your account details updated.
          </p>
          <p className="text-gray-700">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">3. Ordering and Payment</h2>
          <p className="text-gray-700 mb-3">
            When you place an order through our platform, you agree to pay the full amount for the items ordered, including any applicable taxes and delivery fees.
          </p>
          <p className="text-gray-700 mb-3">
            We use third-party payment processors to handle transactions. By using our service, you agree to their terms and conditions as well.
          </p>
          <p className="text-gray-700">
            All payments are final once an order has been confirmed, subject to our cancellation policy.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Delivery</h2>
          <p className="text-gray-700 mb-3">
            Delivery times are estimates and may vary based on vendor availability, traffic conditions, and other factors beyond our control.
          </p>
          <p className="text-gray-700">
            You agree to provide accurate delivery information and to be present at the delivery location to receive your order.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">5. Cancellation Policy</h2>
          <p className="text-gray-700">
            Orders may be cancelled within 30 minutes of placing them, subject to the vendor&apos;s preparation status. Once an order is in preparation, cancellations may not be possible or may incur a cancellation fee.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">6. User Conduct</h2>
          <p className="text-gray-700">
            You agree not to use our platform for any unlawful purpose or in any way that could damage, disable, or impair our service. This includes but is not limited to fraudulent orders, harassment of vendors or delivery personnel, and attempts to gain unauthorized access to our systems.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
          <p className="text-gray-700">
            Dabbzo is not liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including but not limited to food quality issues, delivery delays, or technical failures.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our platform. Your continued use of our services after any changes indicates your acceptance of the modified terms.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">9. Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms & Conditions, please contact us at legal@dabbzo.com.
          </p>
        </section>
        
        <p className="text-gray-500 text-sm">
          Last updated: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}