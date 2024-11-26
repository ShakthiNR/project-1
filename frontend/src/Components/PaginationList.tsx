import React, { useEffect, useState } from "react";
import { IPrimaryVarients, IProduct } from "../types/products";
import Pagination from "./Pagination";
import "./Pagination.css";
import { Lists } from "./ProductsTable";

const LIMIT = 2;

const PaginationList = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/v1/products?page=${currentPage}&limit=${limit}`
        );
        const items = await response.json();
        setLoading(false);
        setData(items?.data || []);
        setTotalPages(items?.totalPages || 0);
      } catch (error) {
        setLoading(false);
        console.log("Err in fetching data", error);
      }
    };
    fetchData();
  }, [currentPage, limit]);

  return (
    <>
      {loading ? (
        <div className="table-container flex-center loader"></div>
      ) : (
        <Lists
          loading={loading}
          data={data}
          currentPage={currentPage}
          limit={limit}
         />
      )}

      <div className="flex-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PaginationList;
