import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../hooks/useGetProducts';

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

interface ProductState {
    products: Product[];
    isLoading: boolean;
}

const initialState: ProductState = {
    products: [],
    isLoading: true,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.isLoading = false;
        },
        setLoadingSuccess: (state) => {
            state.isLoading = false;
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            // Find index of product in products array and replace it with new product
            const index = state.products.findIndex((product) => product.id === action.payload.id);
            // If product is found, replace it else do nothing
            if (index !== -1) state.products[index] = action.payload;
            // Update product list
            state.products = [...state.products];
        },
        removeProductItem: (state, action: PayloadAction<string>) => {
            // Find index of product in products array and remove it using product_code
            const index = state.products.findIndex((product) => product.id === action.payload);
            // If found then remove it else do nothing
            if (index !== -1) state.products.splice(index, 1);
            // Update product list
            state.products = [...state.products];
        },
        removeAllProducts: (state, action: PayloadAction<string[]>) => {
            // Remove all products that match product_code in action.payload
            action.payload.forEach((item) => {
                const index = state.products.findIndex((product) => product.id === item);
                // If found then remove it else do nothing
                if (index !== -1) state.products.splice(index, 1);
                // Update product list
                state.products = [...state.products];
            });
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            // CHeck if product is already in products array
            const index = state.products.findIndex((product) => product.id === action.payload.id);
            // If found then do nothing else add new product
            if (index === -1) {
                // Add new product to products array
                state.products.push(action.payload);
                // Update product list
                state.products = [...state.products];
            }
        },
    },
});

export const {
    setProducts,
    setLoadingSuccess,
    updateProduct,
    removeAllProducts,
    removeProductItem,
    addProduct,
} = productSlice.actions;
export default productSlice.reducer;
