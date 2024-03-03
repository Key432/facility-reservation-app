export default function Card({ title, text }: { title: string; text?: string }) {
  return (
    <div className='w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-left hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg'>
      <h3 className='text-xl font-bold'>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
