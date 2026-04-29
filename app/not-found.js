import Link from 'next/link'

export default function NotFound() {
  return (
<div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='text-center'>
        <h2 className='fw-bold'>404</h2>
        <h3 className='h5'>Page Not Found</h3>
        <p className='text-muted'>The requested resource could not be found.</p>
        <Link href="/" className="btn btn-primary mt-3">
          Return Home
        </Link>
      </div>
    </div>
  )
}
