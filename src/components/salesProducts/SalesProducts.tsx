import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useResize from "../../lib/hooks/useResize";

import SalesProductCardList from "../../components/salesProducts/SalesProductCardList";
import Title from "../../core/titles/Title";
import fetchProduct from "../../lib/api/product";

import "./sales-products.css";
import SearchInput from "../../core/search/SearchInput";
import Dropdown from "../../core/dropdown/Dropdown";
import BtnSmall from "../../core/buttons/BtnSmall";
import PagiNation from "../../components/salesProducts/PagiNation";
import { QueryOptions } from "core/Interface/Product";

const SalesProducts = () => {
  const [salesProducts, setSalesProducts] = useState([]);
  const [order, setOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Error>();

  const { size } = useResize({ pcSize: 10, tabletSize: 6, mobileSize: 4 });

  const handleSalesProducts = async (options: QueryOptions) => {
    try {
      setIsLoading(true);
      setErrorMessage(undefined);
      const { list, totalCount } = await fetchProduct(options);
      setSalesProducts(list);
      const newTotalPage = Math.ceil(totalCount / size);
      setTotalPage(newTotalPage);
    } catch (error) {
      setErrorMessage(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleListClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    if (isLoading) {
      return;
    }
    const newOrder = eventTarget.innerText === "최신순" ? "recent" : "favorite";

    if (newOrder === order) {
      return;
    }
    setOrder(newOrder);
    handleSalesProducts({
      currentPage: 1,
      pageSize: size,
      orderBy: newOrder,
      searchKeyword: "",
    });
    setCurrentPage(1);
  };

  const handleSearch = (keyword: string) => {
    handleSalesProducts({
      currentPage: 1,
      pageSize: size,
      orderBy: order,
      searchKeyword: keyword,
    });
    setCurrentPage(1);
  };

  const handleCurrentPage = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    const newCurrentPage = Number(eventTarget.innerText);
    setCurrentPage(newCurrentPage);
    handleSalesProducts({
      currentPage: newCurrentPage,
      pageSize: size,
      orderBy: order,
      searchKeyword: "",
    });
  };

  const handleAddClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e.target);
  };

  useEffect(() => {
    handleSalesProducts({
      currentPage: 1,
      pageSize: size,
      orderBy: "recent",
      searchKeyword: "",
    });
  }, [size]);

  return (
    <section className="sales-product-container">
      <div className="sales-header-container">
        <Title>판매 중인 상품</Title>
        <div className="sales-options-container">
          <SearchInput handleSearch={handleSearch} />
          <Link to="/addItem">
            <BtnSmall onClick={handleAddClick} disabled={true}>
              상품 등록하기
            </BtnSmall>
          </Link>
          <Dropdown
            isLoading={isLoading}
            order={order}
            handleListClick={handleListClick}
          />
        </div>
      </div>
      {!errorMessage ? (
        <div className="products-container">
          <SalesProductCardList salesProducts={salesProducts} />
          <PagiNation
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
            totalPage={totalPage}
          />
        </div>
      ) : (
        <p>상품 불러오기에 실패했습니다. 새로고침을 눌러주세요 😁</p>
      )}
    </section>
  );
};

export default SalesProducts;
