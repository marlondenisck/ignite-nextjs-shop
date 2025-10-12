import { Button } from '@/components/Button'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className='flex flex-col items-start justify-center'>
      <Header />
      <h1>Welcome to Ignite Shop</h1>
      <Button>Click Me</Button>
    </main>
  );
}
