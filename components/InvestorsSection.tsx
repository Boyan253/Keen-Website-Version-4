'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CMSContent from './CMSContent'
import { useCMS } from '@/lib/cms/context'

export default function InvestorsSection() {
  const { getContentByKey } = useCMS()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Get investor logos from CMS (or use placeholder logos)
  const investors = [
    {
      name: getContentByKey('investor_1_name', 'investors')?.value || 'Sequoia Capital',
      logo: getContentByKey('investor_1_logo', 'investors')?.value || 'https://logo.clearbit.com/sequoiacap.com'
    },
    {
      name: getContentByKey('investor_2_name', 'investors')?.value || 'Andreessen Horowitz',
      logo: getContentByKey('investor_2_logo', 'investors')?.value || 'https://logo.clearbit.com/a16z.com'
    },
    {
      name: getContentByKey('investor_3_name', 'investors')?.value || 'Accel',
      logo: getContentByKey('investor_3_logo', 'investors')?.value || 'https://logo.clearbit.com/accel.com'
    },
    {
      name: getContentByKey('investor_4_name', 'investors')?.value || 'Kleiner Perkins',
      logo: getContentByKey('investor_4_logo', 'investors')?.value || 'https://logo.clearbit.com/kleinerperkins.com'
    },
    {
      name: getContentByKey('investor_5_name', 'investors')?.value || 'Index Ventures',
      logo: getContentByKey('investor_5_logo', 'investors')?.value || 'https://logo.clearbit.com/indexventures.com'
    },
    {
      name: getContentByKey('investor_6_name', 'investors')?.value || 'Benchmark',
      logo: getContentByKey('investor_6_logo', 'investors')?.value || 'https://logo.clearbit.com/benchmark.com'
    },
    {
      name: getContentByKey('investor_7_name', 'investors')?.value || 'Greylock Partners',
      logo: getContentByKey('investor_7_logo', 'investors')?.value || 'https://logo.clearbit.com/greylock.com'
    },
    {
      name: getContentByKey('investor_8_name', 'investors')?.value || 'Lightspeed',
      logo: getContentByKey('investor_8_logo', 'investors')?.value || 'https://logo.clearbit.com/lsvp.com'
    },
  ]

  // Duplicate the array for seamless infinite scroll
  const duplicatedInvestors = [...investors, ...investors]

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <CMSContent
            section="investors"
            contentKey="title"
            fallback="Investors backing our clients"
            as="h2"
            className="text-3xl md:text-4xl font-bold text-keen-gray mb-4"
          />
          <CMSContent
            section="investors"
            contentKey="description"
            fallback="Startups we've worked with have been backed by accomplished VC funds."
            as="p"
            className="text-lg text-keen-gray/70 max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Scrolling Investors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="overflow-hidden">
            <div className="flex items-center animate-scroll-infinite">
              {duplicatedInvestors.map((investor, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-16 flex items-center justify-center transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110"
                  style={{ minWidth: '160px', maxWidth: '160px', height: '100px' }}
                >
                  <img 
                    src={investor.logo} 
                    alt={investor.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const text = document.createElement('p');
                        text.className = 'text-xl font-bold text-keen-gray/60 whitespace-nowrap';
                        text.textContent = investor.name;
                        parent.appendChild(text);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for smooth edge effect */}
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

