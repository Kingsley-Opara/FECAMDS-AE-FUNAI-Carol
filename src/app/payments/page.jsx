"use client";

export default function PaystackButton({ email, amount, onSuccess }) {
  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email,
      amount: amount * 100, // convert Naira to Kobo
      currency: "NGN",
      callback: function (response) {
        onSuccess(response.reference);
      },
      onClose: function () {
        alert("Payment window closed");
      },
    });
    handler.openIframe();
  };

  return (
    <button
      onClick={payWithPaystack}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Pay Now
    </button>
  );
}
