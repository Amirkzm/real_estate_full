import "./listPage.scss";
import { Filter } from "../../components/filter";
import { Card } from "../../components/card";
import { Map } from "../../components/map";
import { Await, useLoaderData } from "react-router-dom";
import { SingleLocationType } from "../../types/commonTypes";
import { Suspense } from "react";

const ListPage = () => {
  const data: any = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<div>Loading...</div>}>
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
        <Suspense fallback={<p>Loading...</p>}>
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
