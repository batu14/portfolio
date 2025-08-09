import React from 'react'
import { useNavigate } from 'react-router'
import { FaLock, FaHome } from 'react-icons/fa'
import { BiErrorCircle } from 'react-icons/bi'

const Error = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <BiErrorCircle className="text-red-500 text-5xl" />
          <FaLock className="text-gray-400 text-3xl" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Oturum Süresi Doldu
        </h1>
        
        <div className="h-1 w-20 bg-red-500 mx-auto mb-6"></div>
        
        <p className="text-gray-600 text-center text-lg mb-8">
          Güvenliğiniz için oturumunuz sonlandırıldı. Lütfen tekrar giriş yaparak devam edin.
        </p>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="space-y-3 text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
              <p>Sistemde uzun süre işlem yapılmadı</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
              <p>Oturum anahtarı geçerliliğini yitirdi</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
              <p>Başka bir cihazdan giriş yapılmış olabilir</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/admin')}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
        >
          <FaHome className="text-xl" />
          <span>Giriş Sayfasına Dön</span>
        </button>
      </div>
    </div>
  )
}

export default Error