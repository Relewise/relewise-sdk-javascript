import { DataValueFactory } from '@relewise/client';
import { ProductUpdateBuilder } from './builders/products/productUpdateBuilder';
import { Integrator } from './integrator';
import { ProductAdministrativeActionBuilder } from './builders/products/productAdministrativeActionBuilder';

async function example() {

    var unix = Date.now();

    const product: ProductUpdateBuilder = createProduct('1', unix);

    const integrator = new Integrator('dataset', 'api-key', { serverUrl: 'url' });
    
    integrator.batchSize = 5;

    await integrator.updateProduct(product.build())
    
    const enable = new ProductAdministrativeActionBuilder({
        language: null,
        currency: null,
        filters: (f) => f.addProductDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unix))),
        productUpdateKind: 'Enable',
    });
    integrator.productAdministrativeAction(enable.build());

    const disable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unix), /* negated: */ true)),
        productUpdateKind: 'Disable',
    });
    integrator.productAdministrativeAction(disable.build());

    await integrator.batch([
        createProduct('2', unix).build(), 
        createProduct('3', unix).build(),
        enable.build(),
        disable.build(),
    ]);
}

function createProduct(id: string, unix: number) {
    return new ProductUpdateBuilder({
        id: id,
        productUpdateKind: 'ReplaceProvidedProperties',
    })
        .displayName(DataValueFactory.multilingual([{ language: 'da', value: 'product navn' }]))
        .data({
            'ProductType': DataValueFactory.string('Bluse'),
            'Description': DataValueFactory.string('Flot blå bluse som er top nice'),
            'UnixTimeStamp': DataValueFactory.number(unix),
        })
        .salesPrice(DataValueFactory.multiCurrency([{ currency: 'DKK', amount: 499.95 }]));
}