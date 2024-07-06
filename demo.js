
        let products = [];
        let editingProductIndex = null;

        function addAttribute() {
            const container = document.getElementById('attributesContainer');
            const row = document.createElement('div');
            row.className = 'form-row';
            row.innerHTML = `
                <div class="col">
                    <input type="text" class="form-control" placeholder="Key">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Value">
                </div>
                <button type="button" class="btn btn-danger btn-sm" onclick="removeAttribute(this)">Remove</button>
            `;
            container.appendChild(row);
        }

        function removeAttribute(button) {
            button.parentElement.remove();
        }

        document.getElementById('productForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const product = {
                id: editingProductIndex !== null ? products[editingProductIndex].id : new Date().getTime(),
                name: document.getElementById('productName').value,
                description: document.getElementById('productDescription').value,
                category: document.getElementById('productCategory').value,
                availability: document.getElementById('productAvailability').value,
                price: document.getElementById('productPrice').value,
                quantity: document.getElementById('productQuantity').value,
                attributes: []
            };

            const attributeRows = document.getElementById('attributesContainer').children;
            for (let row of attributeRows) {
                const key = row.children[0].children[0].value;
                const value = row.children[1].children[0].value;
                if (key && value) {
                    product.attributes.push({ key, value });
                }
            }

            if (editingProductIndex !== null) {
                products[editingProductIndex] = product;
                editingProductIndex = null;
            } else {
                products.push(product);
            }

            $('#productModal').modal('hide');
            document.getElementById('productForm').reset();
            document.getElementById('attributesContainer').innerHTML = '';
            renderProductList();
        });

        function renderProductList() {
            const tbody = document.getElementById('productList');
            tbody.innerHTML = '';
            products.forEach((product, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.availability}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="confirmDelete(${index})">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function editProduct(index) {
            const product = products[index];
            editingProductIndex = index;

            document.getElementById('productName').value = product.name;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productAvailability').value = product.availability;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productQuantity').value = product.quantity;

            const attributesContainer = document.getElementById('attributesContainer');
            attributesContainer.innerHTML = '';
            product.attributes.forEach(attribute => {
                const row = document.createElement('div');
                row.className = 'form-row';
                row.innerHTML = `
                    <div class="col">
                        <input type="text" class="form-control" value="${attribute.key}" placeholder="Key">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" value="${attribute.value}" placeholder="Value">
                    </div>
                    <button type="button" class="btn btn-danger btn-sm" onclick="removeAttribute(this)">Remove</button>
                `;
                attributesContainer.appendChild(row);
            });

            $('#productModal').modal('show');
        }

        function confirmDelete(index) {
            $('#deleteModal').modal('show');
            document.getElementById('confirmDelete').onclick = function() {
                products.splice(index, 1);
                $('#deleteModal').modal('hide');
                renderProductList();
            };
        }
    