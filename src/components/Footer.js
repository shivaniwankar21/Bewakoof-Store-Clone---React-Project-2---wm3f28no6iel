export const Footer = () => {
  return (
    <div className="bg-black text-white p-5 md:p-10 lg:p-16">
      <div className="flex flex-col md:flex-row lg:flex-row justify-around my-1">
        <div className="mb-8 md:mb-0 lg:mb-0">
          <div className="text-yellow-500">CUSTOMER SERVICE</div>
          <ul className="mt-2">
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Return Order</li>
            <li>Cancel Order</li>
          </ul>
        </div>

        <div className="mb-8 md:mb-0 lg:mb-0">
          <div className="text-yellow-500">COMPANY</div>
          <ul className="mt-2">
            <li>About Us</li>
            <li>We're Hiring</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Blog</li>
          </ul>
        </div>

        <div className="mb-8 md:mb-0 lg:mb-0">
          <div className="text-yellow-500">CONNECT WITH US</div>
          <ul className="mt-2">
            <li>4.7M People</li>
            <li>1M Followers</li>
          </ul>
        </div>

        <div className="mb-8 md:mb-0 lg:mb-0">
          <div className="text-yellow-500">DOWNLOAD THE APP</div>
          <div className="mt-2 flex gap-1">
            <img
              src="https://images.bewakoof.com/web/app_android_v1.png"
              alt="Android App"
            />
            <img
              src="https://images.bewakoof.com/web/app_ios_v1.png"
              alt="iOS App"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row lg:flex-row justify-between p-6 md:mx-6 lg:mx-6 leading-6">
        <div className="mb-4 md:mb-0 lg:mb-0">
          <div className="text-yellow-500">100% SECURE PAYMENT</div>
          <div className="mt-2 flex gap-1">
            <img
              src="https://images.bewakoof.com/web/secure-payments-image.png"
              alt="Secure Payments"
            />
          </div>
        </div>

        <div className="mb-4 md:mb-0 lg:mb-0">
          <div className="text-yellow-500">15 Days return policy*</div>
          <div className="mt-2">Cash on delivery*</div>
        </div>
      </div>
    </div>
  );
};
