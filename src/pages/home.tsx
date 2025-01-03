import { lazy, Suspense } from 'react'
import { getTopGames } from '@/shared/api/twitchApi/axios'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
// import { QueryClient, queryOptions, useSuspenseQuery } from '@tanstack/react-query'
// import { ScrollRestoration } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { DialogInput } from '@/components/dialog-input'
import { Route } from './+types/home'
import EmblaCarousel from '@/components/carousel'
import Loading from '@/components/loading'
// import Loading from '@/components/loading'


// const getTopGamesLoads = () =>
//   queryOptions({
//     queryKey: ['games'],
//     queryFn: () => getTopGames(),
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     staleTime: 30000,
//     retry: 0,
//   })
// await queryClient.ensureQueryData(getTopGamesLoads())

export async function loader() {
   try {
    const games = await getTopGames();
    return games ;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // const { data: games } = useSuspenseQuery(getTopGamesLoads())
  const games = loaderData

  // console.log('Load', games)
  // return
  // if (!games) return <Loading></Loading>
  return (
    <Suspense fallback={<Loading />}>
      <main className="h-[2000px] overflow-hidden">
        {/* <ScrollRestoration /> */}
        <section className="w-full">
          <div className="flex flex-col items-center justify-end bg-background pb-10 pt-24 md:py-12">
            <div className="flex flex-col items-center justify-center ">
              <h1 className="pb-4 pt-12 text-9xl xl:text-6xl md:pt-16 md:text-4xl ">
                Discover Twitch Vods
              </h1>
              <p className="pb-10 text-center text-2xl lg:text-base md:pb-6 md:text-sm">
                Watch twitch past broadcasts streams Start by Typing twitch username...
              </p>
            </div>
            <DialogInput>
              <Button className="bg-button-foreground  px-40 text-xl text-text text-white lg:text-base md:px-32 md:text-sm sm:px-28">
                <MagnifyingGlassIcon className="h-6 w-6 pr-1" />
                Search Steamer
              </Button>
            </DialogInput>
          </div>
        </section>
        <section className="relative flex w-full flex-col items-center justify-center rounded-2xl ">
          <div>
            <h1 className="pb-3 text-7xl text-white xl:text-6xl md:text-4xl">Top streams Now</h1>
          </div>
          <EmblaCarousel slides={games} />
        </section>
      </main>
     </Suspense>
  )
}
