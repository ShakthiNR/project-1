import React, { useCallback, useState } from "react";
import {
  IPrimaryVarients,
  IProduct,
  ISecondaryVarients,
} from "../types/products";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface IParams {
  loading: boolean;
  data: IProduct[];
  currentPage: number;
  limit: number;
}
export const Lists = ({ loading, data, currentPage, limit }: IParams) => {
  const getGlobalId = (index: number) => {
    return (currentPage - 1) * limit + index + 1; // Index is 0-based, so we adjust accordingly
  };

  const [id, setId] = useState("");

  if (loading && (data.length === 0 || !data))
    return <div>No Product Found</div>;

  const handleClick = useCallback(
    (pId: string) => {
      if (pId === id) {
        setId("");
        return;
      }
      setId(pId);
    },
    [id]
  );

  return (
    <>
      <table className="table-container">
        <thead>
          <tr className="table-header">
            <td>Id</td>
            <td>Product Name</td>
            <td>Variants</td>
            <td>Description</td>
            <td>Inventory</td>

            <td>Price</td>
            <td>Discount %</td>
            <td>Lead time</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: IProduct, index: number) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{getGlobalId(index)}</td>
                  <td>
                    <div className="flex-center" style={{ gap: "1rem" }}>
                      <div
                        onClick={() => handleClick(item?.id)}
                        className="flex-center"
                        style={{ cursor: "pointer" }}
                      >
                        {item?.id === id ? (
                          <FaChevronUp size={15} />
                        ) : (
                          <FaChevronDown size={15} />
                        )}
                      </div>
                      <div style={{ alignSelf: "start", marginBlock: "1rem" }}>
                        <img
                          style={{
                            borderRadius: "50%",
                            background: "transparent",
                          }}
                          src={item?.image}
                          height={30}
                          width={30}
                          alt={item?.title}
                        />
                      </div>
                      <div>{item?.title || "-"}</div>
                    </div>
                  </td>
                  <td>
                    {item?.primaryVariants?.map(
                      (varient: IPrimaryVarients, index) => {
                        const color = varient?.name?.toLowerCase() || "";
                        return (
                          <React.Fragment key={index}>
                            <span
                              style={{
                                width: 20,
                                display: "inline-block",
                                height: 20,
                                borderRadius: "50%",
                                background: color,
                                marginLeft: "0.25rem",
                              }}
                            ></span>
                          </React.Fragment>
                        );
                      }
                    )}
                  </td>
                  <td>{item?.description || "-"}</td>
                  <td>{item?.inventory || "-"}</td>

                  <td>{item?.price || "-"}</td>
                  <td>{item?.discountPercentage || "-"}</td>
                  <td>{item?.leadTime || "-"}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                </tr>
                {item?.id === id && (
                  <VariantListing
                    data={item?.primaryVariants}
                    isPrimary={true}
                  />
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const VariantListing: React.FC<any> = ({
  data,
  isPrimary,
}: {
  data: any[];
  isPrimary: boolean;
}) => {
  const [id, setId] = useState("");

  const handleClick = (pId: string) => {
    if (pId === id) {
      setId("");
      return;
    }
    setId(pId);
  };

  if (!data || data?.length === 0) return <></>;
  return (
    <>
      {data?.map((elm, index) => {
        return (
          <React.Fragment key={index}>
            <tr>
              <td>
                <div className="flex-center">
                  {isPrimary && (
                    <div
                      onClick={() => handleClick(elm?.id)}
                      className="flex-center"
                      style={{ cursor: "pointer" }}
                    >
                      {elm?.id === id ? (
                        <FaChevronUp size={15} />
                      ) : (
                        <FaChevronDown size={15} />
                      )}
                    </div>
                  )}
                  <div>{elm?.name}</div>
                </div>
              </td>
              <td>{elm?.price}</td>
              <td>{elm?.inventory}</td>
              <td>{elm?.discountPercentage}</td>
            </tr>
            {elm?.id === id && <VariantListing data={elm?.secondaryVariants} />}
          </React.Fragment>
        );
      })}
    </>
  );
};

interface IVPrams {
  data: IPrimaryVarients[];
}
