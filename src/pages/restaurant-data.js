import { useSession } from "next-auth/react"
import { prisma } from '../../server/db/client';

export async function getServerSideProps({ query }) {

  const parsed = parseInt(Object.keys(query))

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: parsed
    }
  });

  const items = await prisma.item.findMany({
    where: {
      restaurantId: parsed
    }
  })

  return {
    props: {
      restaurant,
      items
    }
  }
}

export default function RestaurantData(props) {
  const name = props.restaurant.name
  return (
    <div className="flex flex-col items-center">

      <div className="flex flex-col w-4/5 items-center border-2 border-blue-800 rounded-md m-5 p-2 bg-green-400">
        This is the Restaurant Data page for:<br></br>
        <div className="text-2xl text-bold underline text-blue-800 m-2 p-2 rounded-md">
          {name}
        </div>
      </div>

    </div>
  )
}