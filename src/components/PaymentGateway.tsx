// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { ChevronRight, Banknote, Loader } from 'lucide-react';

// interface Product {
//   image: string;
//   title: string;
//   price: number;
// }

// interface LocationState {
//   product: Product;
//   quantity: number;
//   totalAmount: number;
// }

// export default function PaymentGateway() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { product, quantity, totalAmount } = location.state as LocationState;

//   const MERCHANT_NAME = 'Mahaseth Mobile All Solution';
//   const TERMINAL_ID = '2222610015419744';
//   const MERCHANT_ADDRESS = 'Kshireshwarnath MC';

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedMethod, setSelectedMethod] = useState<string>('');

//   const generateKhaltiDeepLink = (): string => {
//     const amountInPaisa = Math.floor(totalAmount * 100);
//     return `khalti://splash?token=${Date.now()}&amount=${amountInPaisa}&product_name=${encodeURIComponent(product.title)}&product_url=undefined&product_category=&merchant_name=${encodeURIComponent(MERCHANT_NAME)}&public_key=test_public_key_do_not_modify_hJg922FW92EL92d&transaction_uuid=${Date.now()}&merchant=${encodeURIComponent(MERCHANT_NAME)}`;
//   };

//   const generateESewaDeepLink = (): string => {
//     const refId = `${Date.now()}`;
//     return `esewa://pay/merchant/details?scd=EPAYTEST&pid=${refId}&amt=${totalAmount}&psc=0&pdc=0&txAmt=0&tAmt=${totalAmount}&su=undefined&fu=undefined`;
//   };

//   const generateFonePayDeepLink = (): string => {
//     return `fonepay://transaction/initiate?amount=${totalAmount}&transaction_uuid=${Date.now()}&terminal_id=${TERMINAL_ID}&product_name=${encodeURIComponent(product.title)}&merchant_name=${encodeURIComponent(MERCHANT_NAME)}`;
//   };

//   const initiatePayment = (method: string, deepLink: string) => {
//     setSelectedMethod(method);
//     setIsProcessing(true);

//     const timeout = setTimeout(() => {
//       setIsProcessing(false);
//     }, 2500);

//     try {
//       window.location.href = deepLink;
//     } catch (err) {
//       clearTimeout(timeout);
//       console.error('Payment error:', err);
//       setIsProcessing(false);
//     }
//   };

//   const handleKhalti = () => {
//     initiatePayment('Khalti by IME', generateKhaltiDeepLink());
//   };

//   const handleESewa = () => {
//     initiatePayment('eSewa', generateESewaDeepLink());
//   };

//   const handleFonePay = () => {
//     initiatePayment('FonePay', generateFonePayDeepLink());
//   };

//   const handleCOD = () => {
//     alert('Order placed successfully with Cash on Delivery!');
//     navigate('/');
//   };

//   const paymentMethods = [
//     {
//       id: 'khalti',
//       name: 'Khalti by IME',
//       subtitle: 'Opens Khalti app to pay via FonePay',
//       icon: 'https://khalti.s3.amazonaws.com/image/KHT.png',
//       action: handleKhalti,
//     },
//     {
//       id: 'esewa',
//       name: 'eSewa Mobile Wallet',
//       subtitle: 'Opens eSewa app to pay via FonePay',
//       icon: 'https://esewa.com.np/assets/esewa_og.png',
//       action: handleESewa,
//     },
//     {
//       id: 'fonepay',
//       name: 'FonePay',
//       subtitle: 'Direct payment to FonePay account',
//       icon: 'https://www.fonepay.com/assets/img/logo.png',
//       action: handleFonePay,
//     },
//     {
//       id: 'cod',
//       name: 'Cash on Delivery',
//       subtitle: 'Pay when product arrives',
//       icon: null,
//       action: handleCOD,
//     },
//   ];

//   if (isProcessing) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
//           <div className="flex justify-center mb-6">
//             <Loader className="w-12 h-12 text-orange-600 animate-spin" />
//           </div>
//           <h2 className="text-2xl font-bold mb-2">Opening {selectedMethod}</h2>
//           <p className="text-gray-600 mb-2">Launching your payment app...</p>
//           <p className="text-sm text-gray-500 mb-6">
//             {selectedMethod} will open automatically. If it doesn't open within 3 seconds, please ensure the app is installed on your device.
//           </p>

//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 space-y-2">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Amount:</span>
//               <span className="font-semibold">Rs. {totalAmount}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Terminal:</span>
//               <span className="font-semibold text-sm">{TERMINAL_ID}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Merchant:</span>
//               <span className="font-semibold text-sm">{MERCHANT_NAME}</span>
//             </div>
//           </div>

//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-left">
//             <p className="text-sm font-semibold text-amber-900 mb-2">App not opening?</p>
//             <ol className="text-xs text-amber-800 space-y-1 list-decimal list-inside">
//               <li>Make sure {selectedMethod} app is installed</li>
//               <li>Check your app is updated to latest version</li>
//               <li>If using on web, use a mobile device for payment</li>
//             </ol>
//           </div>

//           <button
//             onClick={() => setIsProcessing(false)}
//             className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
//           >
//             Back to Payment Methods
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
//         <div className="border-b px-6 py-4">
//           <h1 className="text-2xl font-bold">Select Payment Method</h1>
//           <p className="text-sm text-gray-600 mt-1">All payments credited to: {MERCHANT_NAME}</p>
//         </div>

//         <div className="divide-y">
//           {paymentMethods.map((method) => (
//             <button
//               key={method.id}
//               onClick={method.action}
//               className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-100 transition"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
//                   {method.icon ? (
//                     <img src={method.icon} alt={method.name} className="w-10 h-10 object-contain" />
//                   ) : (
//                     <Banknote className="w-8 h-8 text-gray-600" />
//                   )}
//                 </div>

//                 <div className="text-left">
//                   <h3 className="text-lg font-semibold">{method.name}</h3>
//                   <p className="text-sm text-gray-500">{method.subtitle}</p>
//                 </div>
//               </div>

//               <ChevronRight className="text-gray-400" />
//             </button>
//           ))}
//         </div>

//         <div className="p-6 border-t">
//           <h2 className="font-semibold mb-4">Order Summary</h2>
//           <div className="flex gap-4">
//             <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded border" />
//             <div>
//               <p className="font-medium line-clamp-2">{product.title}</p>
//               <p className="text-sm text-gray-600">Quantity: {quantity}</p>
//               <p className="text-sm text-gray-600">Price: Rs. {product.price}</p>
//             </div>
//           </div>
//         </div>

//         <div className="px-6 py-4 border-t bg-gray-50 flex justify-between text-lg font-bold">
//           <span>Total Amount</span>
//           <span className="text-orange-600">Rs. {totalAmount}</span>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronRight, Banknote, Loader, AlertCircle } from 'lucide-react';

interface Product {
  image: string;
  title: string;
  price: number;
}

interface LocationState {
  product: Product;
  quantity: number;
  totalAmount: number;
}

export default function PaymentGateway() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, totalAmount } = location.state as LocationState;

  // Nepal FonePay UPI ID - All payments will be credited here
  const UPI_ID = import.meta.env.VITE_UPI_ID || '2222610015419744@fonepayaxis';
  const PAYEE_NAME = import.meta.env.VITE_PAYEE_NAME || 'Store Name';

  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showManualPayment, setShowManualPayment] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      if (isProcessing) {
        setIsProcessing(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isProcessing]);

  const handleFonePayUPI = () => {
    setIsLoading(true);
    const amount = totalAmount.toFixed(2);
    const transactionNote = `Order: ${product.title.substring(0, 30)}`;
    
    // Try UPI deep link for FonePay (may work if FonePay supports UPI protocol)
    const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=NPR&tn=${encodeURIComponent(transactionNote)}`;

    console.log('Opening FonePay/UPI App with link:', upiLink);

    setIsProcessing(true);
    window.location.href = upiLink;

    // If app doesn't open in 3 seconds, show manual payment option
    setTimeout(() => {
      setIsLoading(false);
      setShowManualPayment(true);
    }, 3000);
  };

  const handleKhalti = () => {
    // Khalti requires SDK integration - show manual payment
    alert('Opening manual payment for Khalti. Please complete the payment using the UPI ID provided.');
    setShowManualPayment(true);
    setIsProcessing(true);
  };

  const handleESewa = () => {
    // eSewa requires SDK integration - show manual payment
    alert('Opening manual payment for eSewa. Please complete the payment using the UPI ID provided.');
    setShowManualPayment(true);
    setIsProcessing(true);
  };

  const handleCOD = () => {
    alert('Order placed successfully with Cash on Delivery!');
    navigate('/');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const paymentMethods = [
    {
      id: 'fonepay',
      name: 'FonePay',
      subtitle: 'UPI Payment - Quick transfer',
      icon: 'https://fonepay.com/assets/images/fonepay-logo.png',
      action: handleFonePayUPI,
    },
    {
      id: 'khalti',
      name: 'Khalti',
      subtitle: 'Digital wallet payment',
      icon: 'https://web.khalti.com/static/img/logo1.png',
      action: handleKhalti,
    },
    {
      id: 'esewa',
      name: 'eSewa',
      subtitle: 'Digital wallet payment',
      icon: 'https://esewa.com.np/common/images/esewa-logo.png',
      action: handleESewa,
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      subtitle: 'Pay when product arrives',
      icon: null,
      action: handleCOD,
    },
  ];

  // Manual Payment Screen (when app doesn't open automatically)
  if (showManualPayment && isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
          <div className="flex justify-center mb-6">
            <AlertCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Complete Payment</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-2">Payment Amount:</p>
            <p className="text-2xl font-bold text-orange-600 mb-4">NPR {totalAmount}</p>
            
            <p className="text-sm text-gray-600 mb-2">Payment UPI ID:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white px-3 py-2 rounded border text-sm break-all">
                {UPI_ID}
              </code>
              <button
                onClick={() => copyToClipboard(UPI_ID)}
                className="bg-orange-600 text-white px-3 py-2 rounded hover:bg-orange-700 text-sm whitespace-nowrap"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              <strong>Payment Instructions:</strong><br/>
              1. Open your FonePay, Khalti, or eSewa app<br/>
              2. Select "Send Money" or "UPI Transfer"<br/>
              3. Paste the UPI ID: {UPI_ID.split('@')[0]}...<br/>
              4. Enter amount: NPR {totalAmount}<br/>
              5. Add note: Order #{product.title.substring(0, 20)}<br/>
              6. Complete the payment
            </p>
          </div>

          <button
            onClick={() => {
              alert('Thank you! Please save your transaction ID. Our team will verify your payment shortly.');
              navigate('/');
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-2"
          >
            I've Completed Payment
          </button>

          <button
            onClick={() => {
              setIsProcessing(false);
              setIsLoading(false);
              setShowManualPayment(false);
            }}
            className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Processing Screen (while attempting to open app)
  if (isProcessing && !showManualPayment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
          <div className="flex justify-center mb-6">
            <Loader className="w-12 h-12 text-orange-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Opening Payment App</h2>
          <p className="text-gray-600 mb-4">Your payment app is opening. Please complete the payment.</p>
          <p className="text-sm text-gray-500">Amount: NPR {totalAmount}</p>
          <p className="text-sm text-gray-500 mt-2 break-all">Payment ID: {UPI_ID}</p>
          <button
            onClick={() => {
              setIsProcessing(false);
              setIsLoading(false);
            }}
            className="mt-6 w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Main Payment Selection Screen
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold">Select Payment Method</h1>
          <p className="text-sm text-gray-600 mt-1">Choose your preferred Nepal payment method</p>
        </div>

        <div className="divide-y">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={method.action}
              disabled={isLoading}
              className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-100 disabled:opacity-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
                  {method.icon ? (
                    <img 
                      src={method.icon} 
                      alt={method.name} 
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">${method.name[0]}</div>`;
                        }
                      }}
                    />
                  ) : (
                    <Banknote className="w-8 h-8 text-gray-600" />
                  )}
                </div>

                <div className="text-left">
                  <h3 className="text-lg font-semibold">{method.name}</h3>
                  <p className="text-sm text-gray-500">{method.subtitle}</p>
                </div>
              </div>

              <ChevronRight className="text-gray-400" />
            </button>
          ))}
        </div>

        <div className="p-6 border-t">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex gap-4">
            <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded border" />
            <div>
              <p className="font-medium line-clamp-2">{product.title}</p>
              <p className="text-sm text-gray-600">Quantity: {quantity}</p>
              <p className="text-sm text-gray-600">Price: NPR {product.price}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between text-lg font-bold">
          <span>Total Amount</span>
          <span className="text-orange-600">NPR {totalAmount}</span>
        </div>
      </div>
    </div>
  );
}