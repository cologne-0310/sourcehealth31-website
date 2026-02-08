import Head from 'next/head';
import { useState } from 'react';

const SERVICES = [
  {
    id: 1,
    name: '靈性療癒',
    description: '一對一個人服務',
    type: '預約制',
    price: 2000,
  },
  {
    id: 2,
    name: '公益体驗課程',
    description: '免費公益体驗',
    type: '公益體驗',
    price: 0,
  },
  {
    id: 3,
    name: '課程期数',
    description: '定期課程串賯',
    type: '課程期数',
    price: 3000,
  },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '14:00',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: selectedService.name,
          type: selectedService.type,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.requirePayment) {
          // 重定指向 PayUni 金流平台
          window.location.href = `${process.env.NEXT_PUBLIC_PAYUNI_PAYMENT_URL}?tradeNo=${data.tradeNo}`;
        } else {
          // 公益体驗 - 直接成功
          alert(data.message);
          setStep(3);
        }
      } else {
        alert('預約失敗，請程後再試');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('网綜錯誤，請程後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <Head>
        <title>線上預約 - 源點身&心靈工作坊</title>
      </Head>

      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-center text-purple-900 mb-12">
          線上預約
        </h1>

        {/* Step 1: 選擇服務 */}
        {step === 1 && (
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold text-purple-800">step 1: 選擇服務</h2>
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-purple-500"
                onClick={() => handleServiceSelect(service)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">
                      {service.price === 0 ? '免費' : `NT$ ${service.price.toLocaleString()}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">{service.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: 填寫詳詳 */}
        {step === 2 && selectedService && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6 pb-6 border-b-2 border-purple-200">
              <p className="text-sm text-gray-500">step 2 of 2</p>
              <h2 className="text-2xl font-semibold text-purple-800 mt-2">
                完整您的詳詳
              </h2>
              <p className="text-gray-600 mt-2">已選擇: {selectedService.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 姓名 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">姓名 *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="請輸入您的姓名"
                />
              </div>

              {/* 電話 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">電話 *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="09xx-xxx-xxx"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="your@email.com"
                />
              </div>

              {/* 日期 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">需求日期 *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* 時間 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">喜好時間 *</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                >
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </div>

              {/* 源会 信息 */}
              <div className="bg-purple-50 p-4 rounded-lg mt-6">
                <p className="font-semibold text-purple-900 mb-2">預約摘要:</p>
                <div className="space-y-1 text-gray-700">
                  <p>服務: {selectedService.name}</p>
                  <p>類型: {selectedService.type}</p>
                  {selectedService.price > 0 && (
                    <p className="font-semibold text-purple-600">金額: NT$ {selectedService.price.toLocaleString()}</p>
                  )}
                </div>
              </div>

              {/* 按鈕 */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setStep(1); setSelectedService(null); }}
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition"
                  disabled={loading}
                >
                  上一步
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-400"
                >
                  {loading ? '處理中...' : '下一步 / 确认預約'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: 成功 */}
        {step === 3 && (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">\u2713</span>
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">預約成功!</h2>
              <p className="text-gray-600">感謝您的預約，我們很後可以與您聯絡</p>
            </div>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              返回首頁
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
