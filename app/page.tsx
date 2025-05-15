import Pagination from "./components/Pagination";

interface Props {
  searchParams:Promise<{page?:string}>
  }

export default async function Home({searchParams}:Props) {
  const inParams = await searchParams
  return (
    <div className="">
      <Pagination pageSize={5} currentPage={parseInt(inParams.page || '1')} itemCount={200}/>
      </div>
  )
}
