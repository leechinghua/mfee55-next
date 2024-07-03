import { useRouter } from 'next/router'
import React from 'react'

export default function SlugNum() {
  const router = useRouter();
  return (
    <>
    <div></div>
      <pre>
      {
        JSON.stringify(router.query, null, 4)
      }
    </pre>
    </>
    
  )
}
