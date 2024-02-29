import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-[#33CCBB] px-4'>
      <div className='container mx-auto flex w-full items-center justify-between'>
        {/* NOTE: v14のnext/Linkはそれ以前と仕様が変わっているので注意 */}
        <Link
          href='https://github.com/Key432/facility-reservation-app'
          target='_blank'
          className='py-4 text-lg'
        >
          GitHub
        </Link>
        <div>
          <p>Contributor: Shimizu</p>
          <p>Deployed at 2024/03/01 ver0.9</p>
        </div>
      </div>
    </footer>
  );
}
