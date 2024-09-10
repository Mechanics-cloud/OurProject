import Image from 'next/image'
import { Inter } from 'next/font/google'
import { DataPicker } from '@/common/components/dataPicker/DataPicker'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <DataPicker />
}
