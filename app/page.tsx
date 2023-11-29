import Link from "next/link"

export default function Home() {

  const features = [
    {
      id: 1,
      number: "1.",
      name: "scheduler",
      status: "completed"
    },
    {
      id: 2,
      number: "2.",
      name: "ebook",
      status: "incomplete"
    },
    {
      id: 3,
      number: "3.",
      name: "accounter",
      status: "incomplete"
    },
    {
      id: 4,
      number: "4.",
      name: "gym buddy",
      status: "incomplete"
    },
    {
      id: 5,
      number: "5.",
      name: "timer",
      status: "incomplete"
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">

      <div className="flex flex-col text-left w">      
      <h1 className="text-6xl pb-5">Become Coming Soon...</h1>
      <div className="text-xl pb-6">We're hard at work building the finished web app</div>
      <div className="text-xl pb-2">These are the list of features the app will contain</div>
      <div className="text-xl pb-3">
        {
          features.map((feature)=>(
            <div className="text-xl pb-3" key={feature.id}>
              {feature.number}{" "}{feature.name}
              {
                feature.status === "completed" ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-600 ml-2 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              
                : 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-rose-600 ml-2 w-6 h-6 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>              
              }
            </div>
          ))
        }
      </div>
      <Link
        href={"https://become-one.vercel.app/login"}
      >
      <h4 className="text-2xl pr-3 text-slate-400 transition-all duration-1000 group">Click to checkout our <span className="text-white group-hover:text-slate-400">schedular</span> in the meantime       
  
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6 transition-transform group-hover:translate-x-2 inline-block rotate-180"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </h4>
      </Link>
      </div>
    </main>
  )
}
