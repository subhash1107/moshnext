import Pagination from "./components/Pagination";


export default function Home() {
  return (
    <div className="">
      <Pagination pageSize={5} currentPage={4} itemCount={20}/>
      </div>
  )
}
