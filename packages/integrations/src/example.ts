import { DataValueFactory } from '@relewise/client';
import { ProductUpdateBuilder } from './builders/products/productUpdateBuilder';
import { Integrator } from './integrator';

async function example() {

    const product: ProductUpdateBuilder = createProduct('1');

    const integrator = new Integrator('dataset', 'api-key', { serverUrl: 'url' });

    await integrator.updateProduct(product.build())
    await integrator.batch([
        createProduct('2').build(), 
        createProduct('3').build(),
    ]);
}

function createProduct(id: string) {
    return new ProductUpdateBuilder({
        id: id,
        productUpdateKind: 'ReplaceProvidedProperties',
    })
        .displayName(DataValueFactory.multilingual([{ language: 'da', value: 'product navn' }]))
        .data({
            'ProductType': DataValueFactory.string('Bluse'),
            'description': DataValueFactory.string('Flot blå bluse som er top nice'),
        })
        .salesPrice(DataValueFactory.multiCurrency([{ currency: 'DKK', amount: 499.95 }]));
}