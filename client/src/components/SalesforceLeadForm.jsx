import React from 'react';

const SalesforceLeadForm = () => {
  // Dynamically build the return URL so it works in both dev and production
  const retURL = `${window.location.origin}/thank-you`;

  return (
    <section id="home-lead-form" className="relative py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 lg:p-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Request a Quote
          </h3>
          {/* Salesforce Web-to-Lead form */}
          <form
            action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DHr0000077ygs"
            method="POST"
            className="space-y-6"
          >
            <input type="hidden" name="oid" value="00DHr0000077ygs" />
            <input type="hidden" name="retURL" value={retURL} />

            {/* Full Name */}
            <div>
              <label htmlFor="00NPY00000CMyxt" className="block text-gray-700 font-semibold mb-2">
                Full Name *
              </label>
              <input
                id="00NPY00000CMyxt"
                name="00NPY00000CMyxt"
                type="text"
                maxLength="40"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Your full name"
              />
            </div>

            {/* Email & Phone (two columns on md+) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  maxLength="80"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength="40"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="XXX-XXXXXXX"
                />
              </div>
            </div>

            {/* Service Type & Preferred Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Type */}
              <div>
                <label htmlFor="00NPY00000CKHAf" className="block text-gray-700 font-semibold mb-2">
                  Service Type *
                </label>
                <select
                  id="00NPY00000CKHAf"
                  name="00NPY00000CKHAf"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                >
                  <option value="">Select a service</option>
                  <option value="Executive Transport">Executive Transport</option>
                  <option value="Scenic Tours">Scenic Tours</option>
                  <option value="Medical Emergency">Medical Emergency</option>
                  <option value="Cargo &amp; Utility">Cargo &amp; Utility</option>
                  <option value="Wedding &amp; Events">Wedding &amp; Events</option>
                  <option value="Film &amp; Photography">Film &amp; Photography</option>
                </select>
              </div>

              {/* Preferred Date (optional) */}
              <div>
                <label htmlFor="00NPY00000CKKLR" className="block text-gray-700 font-semibold mb-2">
                  Preferred Date
                </label>
                <input
                  id="00NPY00000CKKLR"
                  name="00NPY00000CKKLR"
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                />
              </div>
            </div>

            {/* Number of Passengers */}
            <div>
              <label htmlFor="00NPY00000CK7b8" className="block text-gray-700 font-semibold mb-2">
                Number of Passengers
              </label>
              <select
                id="00NPY00000CK7b8"
                name="00NPY00000CK7b8"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
              >
                <option value="">Select number of passengers</option>
                {[...Array(9)].map((_, i) => {
                  const num = i + 1;
                  return (
                    <option key={num} value={`${num} Passenger${num > 1 ? 's' : ''}`}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Additional Details */}
            <div>
              <label htmlFor="00NPY00000CK7eM" className="block text-gray-700 font-semibold mb-2">
                Additional Details
              </label>
              <textarea
                id="00NPY00000CK7eM"
                name="00NPY00000CK7eM"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white resize-none"
                placeholder="Tell us more about your requirements..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transform transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SalesforceLeadForm; 