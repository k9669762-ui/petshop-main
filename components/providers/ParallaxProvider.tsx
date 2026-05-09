'use client'

import { ParallaxProvider } from 'react-scroll-parallax'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function ParallaxProviderWrapper({ children }: Props) {
  return (
    <ParallaxProvider>
      {children}
    </ParallaxProvider>
  )
}

