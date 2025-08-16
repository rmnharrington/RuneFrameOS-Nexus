'use client'

interface HeroBannerProps {
  appName: string
  heroBannerImage: string
  title: string
  subtitle: string
  details: Array<{
    icon: string
    text: string
  }>
}

export default function HeroBanner({
  appName,
  heroBannerImage,
  title,
  subtitle,
  details
}: HeroBannerProps) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-stone-700/50">
      {/* Background Image */}
      <div 
        className="w-full h-64 md:h-80 lg:h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBannerImage})` }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 -mt-20">
        {/* Gradient Background Behind Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-800/70 to-transparent rounded-b-lg"></div>
        
        {/* Text Content */}
        <div className="relative z-20">
          <h1 className="text-3xl font-bold text-gold-100 text-shadow-gold mb-2">
            {title}
          </h1>
          <p className="text-gold-300 text-lg">
            {subtitle}
          </p>
          
          {/* Details */}
          <div className="mt-4 flex items-center space-x-4 text-sm text-gold-400">
            {details.map((detail, index) => (
              <span key={index}>
                {detail.icon} {detail.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
