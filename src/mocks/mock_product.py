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


def generate_order_data():
    # Random product code SP + 3 random number
    random_numbers = "".join(random.choice("0123456789") for _ in range(3))
    product_code = "SP" + random_numbers
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
