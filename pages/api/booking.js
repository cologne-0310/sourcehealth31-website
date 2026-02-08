import crypto from 'crypto';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, email, date, time, service, type } = req.body;

    // PayUni 金流參數
    const merchantId = process.env.NEXT_PUBLIC_PAYUNI_MERCHANT_ID;
    const hashKey = process.env.PAYUNI_HASH_KEY;
    const hashIV = process.env.PAYUNI_HASH_IV;

    // 不同服務類型的金額設定
    const prices = {
      '預約制': 2000,
      '公益體驗': 0,
      '課程期數': 3000
    };

    const amount = prices[type] || 0;
    const tradeNo = `SH31${Date.now()}`;

    // 建立交易訊息
    const tradeInfo = {
      MerchantID: merchantId,
      TradeNo: tradeNo,
      TradeAmt: amount,
      ItemDesc: `${service} - ${type}`,
      ReturnURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-callback`,
      NotifyURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-notify`,
      Email: email,
      LoginType: 0
    };

    // 加密處理
    const cipher = crypto.createCipheriv('aes-256-cbc', hashKey, hashIV);
    let encrypted = cipher.update(JSON.stringify(tradeInfo), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // 發送 Line Notify 通知
    if (process.env.LINE_NOTIFY_TOKEN) {
      const message = `\n新預約\n姓名: ${name}\n電話: ${phone}\nEmail: ${email}\n日期: ${date}\n時間: ${time}\n服務: ${service}\n類型: ${type}\n金額: $${amount}`;
      
      await axios.post('https://notify-api.line.me/api/notify', 
        `message=${encodeURIComponent(message)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${process.env.LINE_NOTIFY_TOKEN}`
          }
        }
      );
    }

    // 如果是公益體驗，直接回傳成功
    if (amount === 0) {
      return res.status(200).json({ 
        success: true, 
        message: '預約成功！我們將透過電話與您確認。',
        requirePayment: false
      });
    }

    // 需要付款的服務
    res.status(200).json({
      success: true,
      requirePayment: true,
      paymentUrl: 'https://api.payuni.com.tw/api/uop/receive_info',
      tradeData: encrypted,
      tradeNo: tradeNo
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: '預約失敗，請稍後再試' });
  }
}
