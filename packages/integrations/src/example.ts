import { DataValueFactory } from '@relewise/client';
import { ProductUpdateBuilder } from './builders/products/productUpdateBuilder';
import { Integrator } from './integrator';
import { ProductAdministrativeActionBuilder } from './builders/products/productAdministrativeActionBuilder';

async function example() {

    var unix = Date.now();

    const product: ProductUpdateBuilder = createProduct('1', unix);

    const integrator = new Integrator('dataset', 'api-key', { serverUrl: 'url' });
    const updater = new Integrator('dataset', 'api-key', { serverUrl: 'url' });
    const cataloger = new Integrator('dataset', 'api-key', { serverUrl: 'url' });
    const registrar = new Integrator('dataset', 'api-key', { serverUrl: 'url' });
    
    integrator.batchSize = 1;

    await integrator.updateProduct(product.build());
    
    const enable = new ProductAdministrativeActionBuilder({
        language: null,
        currency: null,
        filters: (f) => f.addProductDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unix))),
        productUpdateKind: 'Enable',
    });
    //integrator.productAdministrativeAction(enable.build());

    const disable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unix), /* negated: */ true)),
        productUpdateKind: 'Disable',
    });
    //integrator.productAdministrativeAction(disable.build());

    await integrator.batch([
        createProduct('2', unix).build(), 
        createProduct('3', unix).build(),
        enable.build(),
        disable.build(),
    ]);

    await integrator.updateProduct(product.build());
    await updater.updateProduct(product.build());
    await cataloger.updateProduct(product.build());
    await registrar.updateProduct(product.build());
}

function createProduct(id: string, unix: number) {
    return new ProductUpdateBuilder({
        id: id,
        productUpdateKind: 'ReplaceProvidedProperties',
    })
        .displayName([{ language: 'da', value: 'product navn' }])
        .data({
            'ProductType': DataValueFactory.string('Bluse'),
            'Description': DataValueFactory.string('Flot blå bluse som er top nice'),
            'UnixTimeStamp': DataValueFactory.number(unix),
            'Removed': null,
        })
        .salesPrice([{ currency: 'DKK', amount: 499.95 }]);
}