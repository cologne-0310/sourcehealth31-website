import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Head>
        <title>源點身&心靈工作坊 - Source Health 31</title>
        <meta name="description" content="透過靈性療癒和身心靈成長，找到真正的自己" />
      </Head>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-purple-900 mb-6">
            源點身&心靈工作坊
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Source Health 31
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            透過靈性療癒和身心靈成長，找到真正的自己
          </p>
          <Link href="/booking">
            <a className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700 transition">
              立即預約
            </a>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">服務項目</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">靈性療癒</h3>
            <p className="text-gray-600">
              透過各種靈性療法，幫助您釋放負面能量，找回內在平静。
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">身心靈課程</h3>
            <p className="text-gray-600">
              定期開設工作坊和課程，帶領您探索內在智慧。
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">個人諮詢</h3>
            <p className="text-gray-600">
              一對一的個人化諮詢服務，針對您的需求提供協助。
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">關於我們</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">
              源點身&心靈工作坊致力於幫助人們透過靈性成長和療癒，
              重新連結內在的力量與智慧。
            </p>
            <Link href="/about">
              <a className="text-purple-600 hover:text-purple-700 font-semibold">
                了解更多 →
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 源點身&心靈工作坊. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
