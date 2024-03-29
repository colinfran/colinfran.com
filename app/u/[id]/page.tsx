import React from "react"
import CountdownTimer from "@/components/CountdownTimer"

interface Links {
  [key: string]: string
}

const links: Links = {
  [process.env.MOMS_PICS_KEY!]: process.env.MOMS_PICS_VALUE!,
  [process.env.MEMAPAPA_PICS_KEY!]: process.env.MEMAPAPA_PICS_VALUE!,
}

type PageProps = { params: { id: string } }

const Page: React.FC<PageProps> = async ({ params }) => {
  const link = links[params.id]
  if (link === undefined) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="font-bold sm:text-lg">Not a valid URL</h2>
        <div className="mt-6 ">
          <CountdownTimer link="/" />
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="font-bold sm:text-lg">Link:</h2>
      <p>{`${link}`}</p>
      <div className="mt-6 ">
        <CountdownTimer link={link} />
      </div>
    </div>
  )
}

export default Page
