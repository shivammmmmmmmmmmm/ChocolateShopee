import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartProvider } from '@/lib/cart-context'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}