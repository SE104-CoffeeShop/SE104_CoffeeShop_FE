import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setProducts, setLoadingSuccess } from '../../../stores/slices/productSlice';
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
    const products = useSelector((state: RootState) => state.product.products);
    // State for loading
    const loading = useSelector((state: RootState) => state.product.isLoading);
    // State for hold start index of product list
    const [itemOffset, setItemOffset] = useState<number>(0);
    // State for hold filter product list
    const [filterProductsList, setFilterProductsList] = useState<Product[]>(products);
    // State for hold search value
    const [searchValue, setSearchValue] = useState<string>('');
    // State for hold product type
    const [productType, setProductType] = useState<string>('');
    // State for hold product type
    const [selectedProductType, setSelectedProductType] = useState<string>('');
    // State for hold end index of product list
    const itemPerPage = 11;
    const endItemOffset = itemOffset + itemPerPage;
    const finalProductsList = filterProductsList.slice(itemOffset, endItemOffset);

    useEffect(() => {
        // If filter product list is not empty and final product list is empty means that at that offset
        // there is not enough product to display
        // So we need to decrease offset to display previous product list
        if (finalProductsList.length === 0 && filterProductsList.length > 0) {
            setItemOffset(itemOffset - 1);
        }
    }, [itemOffset, endItemOffset, filterProductsList, finalProductsList]);

    const totalPage = Math.ceil(filterProductsList.length / itemPerPage);
    // State for filter product list
    const dispatch = useDispatch();
    // useEffect for fetch data when component did mount
    useEffect(() => {
        fetchProducts();
        setFilterProductsList(products);
        // set filter products
    }, []);

    // Filter product list by search value
    const filterProductsBySearchValue = (products: Product[], searchValue: string) => {
        return products.filter((product) => {
            return (
                fuzzyMatch(searchValue, product.product_code) ||
                fuzzyMatch(searchValue, product.product_name)
            );
        });
    };
    const filterProductsByType = (products: Product[], productType: string) => {
        return products.filter((product) => {
            return product.product_type === productType;
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
    function boDau(str: string) {
        // Chuẩn hóa chuỗi Unicode về dạng NFD
        str = str.normalize('NFD');

        // Tạo một mảng chứa các ký tự dấu tiếng Việt
        const diacritics = [
            'á',
            'à',
            'ả',
            'ã',
            'â',
            'ạ',
            'ă',
            'ằ',
            'ẳ',
            'ẵ',
            'â',
            'ậ',
            'ä',
            'đ',
            'å',
            'æ',
            'ç',
            'é',
            'è',
            'ẻ',
            'ẽ',
            'ê',
            'ẹ',
            'ë',
            'í',
            'ì',
            'ỉ',
            'ĩ',
            'î',
            'ị',
            'ï',
            'ó',
            'ò',
            'ỏ',
            'õ',
            'ô',
            'ọ',
            'ơ',
            'ờ',
            'ở',
            'ỡ',
            'ô',
            'ợ',
            'ö',
            'ø',
            'œ',
            'ú',
            'ù',
            'ủ',
            'ũ',
            'ư',
            'ụ',
            'ü',
            'ý',
            'ỳ',
            'ỷ',
            'ỹ',
            'î',
            'ỵ',
            'ÿ',
        ];

        // Thay thế các ký tự dấu bằng ký tự không dấu tương ứng
        for (const diacritic of diacritics) {
            str = str.replace(
                diacritic,
                diacritic
                    .replace('á', 'a')
                    .replace('à', 'a')
                    .replace('ả', 'a')
                    .replace('ã', 'a')
                    .replace('â', 'a')
                    .replace('ạ', 'a')
                    .replace('ă', 'a')
                    .replace('ằ', 'a')
                    .replace('ẳ', 'a')
                    .replace('ẵ', 'a')
                    .replace('â', 'a')
                    .replace('ậ', 'a')
                    .replace('ä', 'a')
                    .replace('å', 'a')
                    .replace('æ', 'a')
                    .replace('ç', 'c')
                    .replace('đ', 'd')
                    .replace('é', 'e')
                    .replace('è', 'e')
                    .replace('ẻ', 'e')
                    .replace('ẽ', 'e')
                    .replace('ê', 'e')
                    .replace('ẹ', 'e')
                    .replace('ë', 'e')
                    .replace('í', 'i')
                    .replace('ì', 'i')
                    .replace('ỉ', 'i')
                    .replace('ĩ', 'i')
                    .replace('î', 'i')
                    .replace('ị', 'i')
                    .replace('ï', 'i')
                    .replace('ó', 'o')
                    .replace('ò', 'o')
                    .replace('ỏ', 'o')
                    .replace('õ', 'o')
                    .replace('ô', 'o')
                    .replace('ọ', 'o')
                    .replace('ơ', 'o')
                    .replace('ờ', 'o')
                    .replace('ở', 'o')
                    .replace('ỡ', 'o')
                    .replace('ô', 'o')
                    .replace('ợ', 'o')
                    .replace('ö', 'o')
                    .replace('ø', 'o')
                    .replace('œ', 'o')
                    .replace('ú', 'u')
                    .replace('ù', 'u')
                    .replace('ủ', 'u')
                    .replace('ũ', 'u')
                    .replace('ư', 'u')
                    .replace('ụ', 'u')
                    .replace('ü', 'u')
                    .replace('ý', 'y')
                    .replace('ỳ', 'y')
                    .replace('ỷ', 'y')
                    .replace('ỹ', 'y')
                    .replace('î', 'y')
                    .replace('ỵ', 'y')
                    .replace('ÿ', 'y'),
            );
        }

        // Trả về chuỗi đã bỏ dấu
        return str;
    }
    // Implement fuzzy search match for search bar
    const fuzzyMatch = (pattern: string, str: string) => {
        // Remove last space in pattern
        let newPattern = pattern.trim();
        // Remove last space in str
        let newStr = str.trim();
        // lowercase pattern and str
        newPattern = newPattern.toLowerCase();
        newStr = newStr.toLowerCase();
        // bo dau tieng viet
        newPattern = boDau(newPattern);
        newStr = boDau(newStr);
        // console.log(newPattern);
        // console.log(newStr);
        newPattern = `.*${newPattern.split(' ').join('.*')}.*`;
        // Add .* between each character in pattern
        const re = new RegExp(newPattern);
        return re.test(newStr);
    };

    // Uơdate filter products when product list change
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
            {loading === true && filterProductsList.length === 0 ? (
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
                        <ProductTable products={finalProductsList} />
                        {/** Only render Pagination when list product is larger than 11 */}
                        {filterProductsList.length > 11 && (
                            <Pagination
                                totalPage={totalPage}
                                itemsPerPage={itemPerPage}
                                itemOffset={itemOffset}
                                itemLength={filterProductsList.length}
                                setItemOffset={setItemOffset}
                            />
                        )}
                    </div>
                </AdminLayout>
            )}
        </>
    );
}
