import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-[#000] rounded-2xl p-8 mx-20 mb-0 relative translate-y-1/2  z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-space-between gap-24">
        <h2 className="text-white text-2xl md:text-4xl uppercase tracking-tight leading-tight text-center md:text-left font-extrabold min-w-[50%]">
          Stay upto date about<br />our latest offers
        </h2>
        <div className="w-full">
          {subscribed ? (
            <p className="text-green-400 font-semibold text-sm whitespace-wrap">
              Subscribed successfully!
            </p>
          ) : (
            <>
            <div className='flex flex-col gap-4 w-full'>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 text-sm bg-white text-gray-900  focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-gray-400 min-w-0 rounded-2xl"
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-white text-gray-900 font-bold text-sm  hover:bg-gray-100 transition whitespace-wrap rounded-2xl"
              >
                Subscribe to Newsletter
              </button>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
