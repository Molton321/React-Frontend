
import React, { useEffect, useState } from 'react';
import UniversalForm from '../../components/UniversalForm';
import * as Yup from 'yup';
import Product from '../../models/product';
import productService from '../../services/productService';
import { useParams } from 'react-router-dom';

const productFormSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    description: Yup.string(),
    price: Yup.number().required('El precio es obligatorio'),
    category: Yup.string(),
});

const UpdateProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [productModel, setProductModel] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            productService.getProductById(Number(id)).then(data => {
                setProductModel(data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: Product) => {
        try {
            await productService.updateProduct(values.id, values);
            alert('Product updated successfully!');
        } catch (error) {
            alert('Failed to update product.');
        }
    };

    if (!productModel) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Update Product {id}</h1>
            <UniversalForm
                model={productModel}
                validationSchema={productFormSchema}
                onSubmit={handleSubmit}
                submitLabel="Update Product"
            />
        </div>
    );
};

export default UpdateProductPage;
