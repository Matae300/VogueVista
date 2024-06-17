import { QUERY_CATEGORIESBYID } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const Collection = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_CATEGORIESBYID , {
    variables: { id },
    context: { headers: { Authorization: `Bearer ${authToken}` } },
  });

  if (loading) return <p>Loading...</p>;
  if (collectionError) return <p>Error: {error.message}</p>;

  const categories = data.categories;

  return (
    <div>

    </div>
  )
}

export default Collection