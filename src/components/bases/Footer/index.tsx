import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='fixed bottom-0 h-16 w-full bg-[#33CCBB]'>
      <div className='container mx-auto flex h-full w-full items-center justify-between px-4'>
        {/* NOTE: v14のnext/Linkはそれ以前と仕様が変わっているので注意 */}
        <Link
          href='https://github.com/Key432/facility-reservation-app'
          target='_blank'
          className='text-lg'
        >
          GitHub
        </Link>
        <div className='text-sm'>
          <p>Developer: Shimizu</p>
          <p>Deployed at 2024/03/06 ver1.0</p>
        </div>
      </div>
    </footer>
  );
}
