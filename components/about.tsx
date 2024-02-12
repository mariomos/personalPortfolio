"use client";

import React from 'react'
import SectionHeading from './section-heading'
import { motion } from 'framer-motion'
import { useSectionInView } from '@/lib/hooks';

export default function About() {
  const { ref } = useSectionInView('About');

  return (
    <motion.section ref={ref} className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-6 lg:scroll-mt-28'
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay:0.175 }}
    id='about'>
        <SectionHeading> About me </SectionHeading>
        <p className="mb-4 font-medium">
        Life threw me a curveball when a football injury shifted gears. Retail paid the bills, but dreams of coding never faded. Couldn't swing university, so I went rogue, self-taught, and made coding my hustle. Solving problems and writing clean code became my thing.
        I stumbled into coding like finding a hidden treasure. Now, I'm into JavaScript, React, Vue, and riding the Tailwind. I'm no wizard (yet), just a regular person who fell in love with turning ideas into reality.
      </p>

      <p className='mb-3 font-medium'>
      Beyond coding, I'm your fantasy football nerd. Yep, I enjoy building virtual teams as much as real code. Always chasing the latest tech trends - it's like trying to catch a speeding train, but I'm getting there, one code block at a time.
        Let's chat tech, code, or why my fantasy football team is the best!
      </p>


    </motion.section>
  )
}
