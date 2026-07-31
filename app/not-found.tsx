import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
      </div>

      <p className="max-w-md text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      <div className="space-y-3">
        <Link href="/">
          <Button size="lg">Go Back Home</Button>
        </Link>
        <p className="text-xs text-muted-foreground">
          Or try exploring the{' '}
          <Link href="/" className="underline hover:text-foreground">
            homepage
          </Link>
        </p>
      </div>
    </div>
  )
}