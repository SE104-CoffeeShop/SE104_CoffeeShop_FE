import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../../stores/slices/productSlice';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import Loading from '../../../components/Loading/Loading';
import ProductTable from '../../../components/Admin/ProductTable/ProductTable';
import SearchProduct from '../../../components/Admin/SearchProduct/SearchProduct';
import ProductType from '../../../components/Admin/ProductType/ProductType';
import useGetProducts, { Product } from '../../../hooks/useGetProducts';
import { RootState } from '../../../stores/store';
import Pagination from '../../../components/Admin/Pagination/Pagination';
import useGetTotalPage from '../../../hooks/useGetTotalPage';
import fuzzyMatch from '../../../utils/customFunction';

export default function ProductPage() {
    // State for filter products

    const products = useSelector((state: RootState) => state.product.products);
    // State for hold start index of product list
    const [activePage, setActivePage] = useState<number>(1);
    // State for hold filter product list
    const [filterProductsList, setFilterProductsList] = useState<Product[]>(products);
    // State for hold search value
    const [searchValue, setSearchValue] = useState<string>('');
    // State for hold product type
    const [selectedProductType, setSelectedProductType] = useState<string>('');
    // State for hold end index of product list
    const { totalPage } = useGetTotalPage('/products');
    const { productsList, loading, getProducts } = useGetProducts(); // State for filter product list
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProducts(productsList));
        // set filter products
        setFilterProductsList(products);
    }, []);

    // Filter product list by search value
    const filterProductsBySearchValue = (products: Product[], searchValue: string) => {
        return products.filter((product) => {
            return fuzzyMatch(searchValue, product.id) || fuzzyMatch(searchValue, product.name);
        });
    };
    const filterProductsByType = (products: Product[], productType: string) => {
        return products.filter((product) => {
            return product.type === productType;
        });
    };
    // useEffect for filter product list when search value change
    useEffect(() => {
        // Filter product list by search value
        let newFilterProductsList = products;
        newFilterProductsList = filterProductsBySearchValue(newFilterProductsList, searchValue);
        // Filter product list by type
        // If product type is not empty
        if (selectedProductType !== '')
            newFilterProductsList = filterProductsByType(
                newFilterProductsList,
                selectedProductType,
            );

        setFilterProductsList(newFilterProductsList);
        // Reset item offset to 0
        // setItemOffset(0);
    }, [searchValue, filterProductsList, selectedProductType, products]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {loading === true ? (
                <Loading />
            ) : (
                <AdminLayout className="flex-row items-start justify-between pb-[4.63rem] pl-[4.81rem] pr-[4.63rem] pt-[1.5rem]">
                    <div className="mr-[3.62rem] flex w-fit flex-col items-start justify-center">
                        <SearchProduct searchValue={searchValue} setSearchValue={setSearchValue} />
                        <ProductType
                            selectedProductType={selectedProductType}
                            setSelectedProductType={setSelectedProductType}
                        />
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                        <ProductTable products={filterProductsList} />
                        {/** Only render Pagination when list product is larger than 11 */}
                        {totalPage > 1 && (
                            <Pagination
                                path="/products"
                                totalPage={totalPage}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        )}
                    </div>
                </AdminLayout>
            )}
        </>
    );
}
