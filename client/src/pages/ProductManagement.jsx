
import { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Filter,
    Package,
    Pencil,
    Trash2,
    X,
    ImagePlus,
    Star,
    CheckCircle,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const emptyProduct = {
    productName: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    brand: "",
    images: [""],
    stock: "",
    sizes: [],
    colors: [],
    isFeatured: false,
    isActive: true,
};

const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const labelClass =
    "mb-1.5 block text-sm font-medium text-gray-700";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [form, setForm] = useState(emptyProduct);
    const [sizeInput, setSizeInput] = useState("");
    const [colorInput, setColorInput] = useState("");


    const fetchProducts = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
            const data = await res.json();
            console.log(data);
            if (data.success) {
                setProducts(data.products)
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    const activeProductsCount = useMemo(() => {
        return products.filter((product) => product.isActive).length;
    }, [products]);
    const lowStockProductsCount = useMemo(() => {
        return products.filter((product) => product.stock <= 5).length;
    }, [products]);
    const featuredProductsCount = useMemo(() => {
        return products.filter((product) => product.isFeatured).length;
    }, [products]);

    const categories = [
        ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.productName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            !categoryFilter || product.category === categoryFilter;

        const matchesStatus =
            !statusFilter ||
            (statusFilter === "active" && product.isActive) ||
            (statusFilter === "inactive" && !product.isActive);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const openAddModal = () => {
        setEditingId(null);
        setForm({ ...emptyProduct, images: [""] });
        setSizeInput("");
        setColorInput("");
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditingId(product._id);
        setForm({
            ...product,
            images: [...product.images],
            sizes: [...product.sizes],
            colors: [...product.colors],
        });
        setSizeInput("");
        setColorInput("");
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const addTag = (field, value, clearInput) => {
        const tag = value.trim();
        if (!tag) return;

        setForm((prev) => ({
            ...prev,
            [field]: prev[field].includes(tag)
                ? prev[field]
                : [...prev[field], tag],
        }));
        clearInput("");
    };

    const removeTag = (field, tag) => {
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].filter((item) => item !== tag),
        }));
    };

    const updateImage = (index, value) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.map((img, i) =>
                i === index ? value : img
            ),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            price: Number(form.price),
            discountPrice:
                form.discountPrice === ""
                    ? null
                    : Number(form.discountPrice),
            stock: Number(form.stock),
            images: form.images.filter((img) => img.trim()),
        };

        // Connect your create/update API here.
        // POST /api/products
        // PUT /api/products/:id

        console.log("Product payload:", payload);
        setShowModal(false);
    };

    const handleDelete = () => {
        // Connect your DELETE /api/products/:id API here.
        console.log("Delete product:", deleteId);
        setDeleteId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* Page Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Product Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage your products, inventory, and availability.
                        </p>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Products"
                        icon={<Package size={21} />}
                        color="indigo"
                        value={products.length}
                    />
                    <StatCard
                        title="Active Products"
                        icon={<CheckCircle size={21} />}
                        color="green"
                        value={activeProductsCount}
                    />
                    <StatCard
                        title="Low Stock"
                        icon={<AlertTriangle size={21} />}
                        color="orange"
                        value={lowStockProductsCount}
                    />
                    <StatCard
                        title="Featured Products"
                        icon={<Star size={21} />}
                        color="purple"
                        value={featuredProductsCount}
                    />
                </div>

                {/* Product List */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-5">
                        <h2 className="text-lg font-semibold text-gray-900">
                            All Products
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            View, edit, and manage your product catalog.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col gap-3 border-b border-gray-100 p-5 lg:flex-row">
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className={`${inputClass} pl-10`}
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                                <Filter size={16} className="text-gray-400" />
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="bg-transparent py-2.5 text-sm outline-none"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className={inputClass}
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Featured</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                                                    {product.images?.[0] ? (
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.productName}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="m-3 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {product.productName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {product.brand}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {product.category}
                                        </td>

                                        <td className="px-6 py-4 font-medium">
                                            ${product.price}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={
                                                    product.stock <= 5
                                                        ? "font-medium text-orange-600"
                                                        : "text-gray-600"
                                                }
                                            >
                                                {product.stock}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${product.isActive
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {product.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Star
                                                size={18}
                                                className={
                                                    product.isFeatured
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50"
                                                    aria-label="Edit product"
                                                >
                                                    <Pencil size={17} />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(product._id)}
                                                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                                    aria-label="Delete product"
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredProducts.length === 0 && (
                            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                                <div className="mb-4 rounded-full bg-indigo-50 p-5">
                                    <Package size={32} className="text-indigo-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    No products found
                                </h3>
                                <p className="mt-2 max-w-sm text-sm text-gray-500">
                                    Your product catalog is empty or no products
                                    match your filters.
                                </p>
                                <button
                                    onClick={openAddModal}
                                    className="mt-5 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm text-white hover:bg-indigo-700"
                                >
                                    <Plus size={18} />
                                    Add Product
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination UI */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-6 py-4">
                        <p className="text-sm text-gray-500">
                            Showing {filteredProducts.length} products
                        </p>
                        <div className="flex gap-2">
                            <button
                                disabled
                                className="rounded-lg border p-2 text-gray-400 disabled:opacity-50"
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                disabled
                                className="rounded-lg border p-2 text-gray-400 disabled:opacity-50"
                                aria-label="Next page"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add / Edit Product Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">

                        <div className="flex items-center justify-between border-b px-6 py-5">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {editingId ? "Edit Product" : "Add New Product"}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Enter your product information below.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-lg p-2 hover:bg-gray-100"
                                aria-label="Close modal"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <form
                            id="product-form"
                            onSubmit={handleSubmit}
                            className="space-y-6 overflow-y-auto p-6"
                        >
                            {/* Basic Information */}
                            <section>
                                <h3 className="mb-4 font-semibold text-gray-900">
                                    Basic Information
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Product Name *</label>
                                        <input
                                            required
                                            name="productName"
                                            value={form.productName}
                                            onChange={handleChange}
                                            placeholder="Enter product name"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Description *</label>
                                        <textarea
                                            required
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Describe your product..."
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className={labelClass}>Category *</label>
                                            <input
                                                required
                                                name="category"
                                                value={form.category}
                                                onChange={handleChange}
                                                placeholder="e.g. Clothing"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Brand *</label>
                                            <input
                                                required
                                                name="brand"
                                                value={form.brand}
                                                onChange={handleChange}
                                                placeholder="Enter brand"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Pricing and Inventory */}
                            <section>
                                <h3 className="mb-4 font-semibold text-gray-900">
                                    Pricing & Inventory
                                </h3>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label className={labelClass}>Price *</label>
                                        <input
                                            required
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            name="price"
                                            value={form.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Discount Price</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            name="discountPrice"
                                            value={form.discountPrice ?? ""}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Stock *</label>
                                        <input
                                            required
                                            type="number"
                                            min="0"
                                            step="1"
                                            name="stock"
                                            value={form.stock}
                                            onChange={handleChange}
                                            placeholder="0"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Product Images */}
                            <section>
                                <h3 className="mb-4 font-semibold text-gray-900">
                                    Product Images
                                </h3>

                                <div className="space-y-3">
                                    {form.images.map((image, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt="Preview"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <ImagePlus size={20} className="text-gray-400" />
                                                )}
                                            </div>
                                            <input
                                                value={image}
                                                onChange={(e) =>
                                                    updateImage(index, e.target.value)
                                                }
                                                placeholder="Enter image URL"
                                                className={inputClass}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        images: prev.images.filter(
                                                            (_, i) => i !== index
                                                        ),
                                                    }))
                                                }
                                                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                                                aria-label="Remove image"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                images: [...prev.images, ""],
                                            }))
                                        }
                                        className="flex items-center gap-2 text-sm font-medium text-indigo-600"
                                    >
                                        <Plus size={17} />
                                        Add Image URL
                                    </button>
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Variants */}
                            <section>
                                <h3 className="mb-4 font-semibold text-gray-900">
                                    Product Variants
                                </h3>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className={labelClass}>Sizes</label>
                                        <div className="flex gap-2">
                                            <input
                                                value={sizeInput}
                                                onChange={(e) => setSizeInput(e.target.value)}
                                                placeholder="e.g. M, XL, 42"
                                                className={inputClass}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addTag("sizes", sizeInput, setSizeInput)
                                                }
                                                className="rounded-lg bg-indigo-50 px-3 text-indigo-600"
                                            >
                                                <Plus size={19} />
                                            </button>
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {form.sizes.map((size) => (
                                                <span
                                                    key={size}
                                                    className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-xs"
                                                >
                                                    {size}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTag("sizes", size)}
                                                    >
                                                        <X size={13} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Colors</label>
                                        <div className="flex gap-2">
                                            <input
                                                value={colorInput}
                                                onChange={(e) => setColorInput(e.target.value)}
                                                placeholder="e.g. Black, Blue"
                                                className={inputClass}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addTag("colors", colorInput, setColorInput)
                                                }
                                                className="rounded-lg bg-indigo-50 px-3 text-indigo-600"
                                            >
                                                <Plus size={19} />
                                            </button>
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {form.colors.map((color) => (
                                                <span
                                                    key={color}
                                                    className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-xs"
                                                >
                                                    {color}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTag("colors", color)}
                                                    >
                                                        <X size={13} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Visibility */}
                            <section>
                                <h3 className="mb-4 font-semibold text-gray-900">
                                    Product Visibility
                                </h3>

                                <div className="space-y-4">
                                    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                Active Product
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Make this product available in your store.
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={form.isActive}
                                            onChange={handleChange}
                                            className="h-5 w-5 accent-indigo-600"
                                        />
                                    </label>

                                    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                Featured Product
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Highlight this product in featured sections.
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="isFeatured"
                                            checked={form.isFeatured}
                                            onChange={handleChange}
                                            className="h-5 w-5 accent-indigo-600"
                                        />
                                    </label>
                                </div>
                            </section>
                        </form>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 border-t bg-white px-6 py-4">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="product-form"
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                {editingId ? "Update Product" : "Create Product"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                            <Trash2 size={24} className="text-red-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Delete Product?
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Are you sure you want to delete this product?
                            This action cannot be undone.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="rounded-lg border px-4 py-2 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ title, icon, color, value }) => {
    const colors = {
        indigo: "bg-indigo-50 text-indigo-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                    {title}
                </p>
                <div className={`rounded-lg p-2.5 ${colors[color]}`}>
                    {icon}
                </div>
            </div>
            <div className="mt-4 h-8 w-24 font-black text-3xl rounded-md " >
                {value}
            </div>
            <p className="mt-2 text-xs text-gray-400">
                Product overview
            </p>
        </div>
    );
};

export default ProductManagement;
