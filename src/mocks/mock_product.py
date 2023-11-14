import random, string, json

# Define mock product name
name = [
    "Cà phê",
    "Trà sữa",
    "Trà đào",
    "Trà chanh",
    "Trà xanh",
    "Trà ô long",
    "Bạc xỉu",
    "Cà phê sữa",
    "Cà phê đen",
    "Trà sữa trân châu",
    "Trà sữa trân châu đường đen",
    "Bánh mì sữa",
]
# Define mock product type
type = ["Đồ uống", "Đồ ăn", "Khác"]

# Keep track of generated product codes
generated_codes = set()


def generate_product_code():
    # Generate a random product code until a unique one is found
    while True:
        random_numbers = "".join(random.choice("0123456789") for _ in range(3))
        product_code = "SP" + random_numbers
        if product_code not in generated_codes:
            generated_codes.add(product_code)
            return product_code


def generate_order_data():
    product_code = generate_product_code()
    product_name = random.choice(name)
    product_type = random.choice(type)
    product_price = random.randint(10000, 50000)
    product_img = "https://picsum.photos/200/200"
    return {
        "product_code": product_code,
        "product_name": product_name,
        "product_type": product_type,
        "product_price": product_price,
        "product_img": product_img,
    }


# Generate mock data
mock_data = []

for i in range(1, 100):
    mock_data.append(generate_order_data())

# Write mock data to json file
with open("src/mocks/mock_product.json", "w", encoding="utf-8") as f:
    json.dump(mock_data, f, ensure_ascii=False)
