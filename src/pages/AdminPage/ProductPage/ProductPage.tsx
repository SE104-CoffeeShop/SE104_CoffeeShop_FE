import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    setProducts,
    setLoadingSuccess,
    filterProducts,
} from '../../../stores/slices/productSlice';
import AdminLayout from '../../../layout/AdminLayout/AdminLayout';
import Loading from '../../../components/Loading/Loading';
import ProductTable from '../../../components/Admin/ProductTable/ProductTable';
import SearchProduct from '../../../components/Admin/SearchProduct/SearchProduct';
import ProductType from '../../../components/Admin/ProductType/ProductType';
import { Product, getProducts } from '../../../api/productAPI';
import { RootState } from '../../../stores/store';
import Pagination from '../../../components/Admin/Pagination/Pagination';

export default function ProductPage() {
    // State for filter products
    const filterProductsList = useSelector((state: RootState) => filterProducts(state));
    // State for loading
    const loading = useSelector((state: RootState) => state.product.isLoading);
    // State for hold start index of product list
    const [itemOffset, setItemOffset] = useState<number>(0);
    // State for hold end index of product list
    const itemPerPage = 10;
    const endItemOffset = itemOffset + itemPerPage;
    const finalProductsList = filterProductsList.slice(itemOffset, endItemOffset);
    const totalPage = Math.ceil(filterProductsList.length / itemPerPage);
    // State for filter product list
    const dispatch = useDispatch();
    // useEffect for fetch data when component did mount
    useEffect(() => {
        fetchProducts();
        // set filter products
    }, []);
    // Fetch data
    const fetchProducts = async () => {
        try {
            const productList: Product[] = await getProducts();
            // Perform sort by product code
            productList.sort((a, b) => {
                // Remove all character before number in product code and convert to number
                // Example: 'SP0001' => 001
                // If have 0 in front of number, remove it
                // Example: 001 => 1
                const codeA = parseInt(a.product_code.slice(2).replace(/^0+/, ''), 10);
                const codeB = parseInt(b.product_code.slice(2).replace(/^0+/, ''), 10);

                if (codeA < codeB) {
                    return -1;
                }
                if (codeA > codeB) {
                    return 1;
                }
                return 0;
            });
            dispatch(setProducts(productList));
            dispatch(setLoadingSuccess());
        } catch (error) {
            console.log(error);
        }
    };
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {loading === true && filterProducts.length === 0 ? (
                <Loading />
            ) : (
                <AdminLayout className="flex-row items-start justify-between pb-[4.63rem] pl-[4.81rem] pr-[4.63rem] pt-[1.5rem]">
                    <div className="mr-[3.62rem] flex w-fit flex-col items-start justify-center">
                        <SearchProduct />
                        <ProductType />
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                        <ProductTable products={finalProductsList} />
                        <Pagination
                            totalPage={totalPage}
                            itemsPerPage={itemPerPage}
                            itemOffset={itemOffset}
                            itemLength={filterProductsList.length}
                            setItemOffset={setItemOffset}
                        />
                    </div>
                </AdminLayout>
            )}
        </>
    );
}
