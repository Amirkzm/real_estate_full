import "./listPage.scss";
import { Filter } from "../../components/filter";
import { Card } from "../../components/card";
import { Map } from "../../components/map";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { MapItem, SingleLocationType } from "../../types/commonTypes";
import { Suspense } from "react";
import { CardSkeleton } from "../../components/skeleton";
import { loadingMapCenters } from "../../lib/data";

const ListPage = () => {
  const data: any = useLoaderData();
  const [searchParams] = useSearchParams();
  const location = searchParams.get("city")?.toUpperCase();
  console.log(location);

  const fallback = [0, 1, 2, 3, 4, 5, 6].map((item) => (
    <CardSkeleton key={item} />
  ));

  const initMapItems: MapItem[] = [0, 1, 2, 3, 4, 5, 6].map((item) => ({
    id: item + "",
    latitude: loadingMapCenters[item].latitude,
    longitude: loadingMapCenters[item].longitude,
    title: "default title",
    images: [],
    price: 0,
    bedroom: 0,
    bathroom: 0,
  }));

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter targetCity={location} />
          <Suspense fallback={fallback}>
            <Await
              resolve={data.postListResponse}
              errorElement={<p>error loading posts</p>}
            >
              {(postListResponse) => {
                return postListResponse.data.data.map(
                  (item: SingleLocationType) => (
                    <Card key={item.id} item={item} />
                  )
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<Map items={initMapItems} />}>
          <Await
            resolve={data.postListResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postListResponse) => <Map items={postListResponse.data.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
