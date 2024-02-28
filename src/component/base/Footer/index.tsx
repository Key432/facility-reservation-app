import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-[#33CCBB]'>
      <div className='container mx-auto flex w-full items-center justify-between'>
        {/* NOTE: v14のnext/Linkはそれ以前と仕様が変わっているので注意 */}
        <Link href='/' className='py-4 text-lg'>
          GitHub
        </Link>
      </div>
    </footer>
  );
}
