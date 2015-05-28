﻿(function () {

    var unlockId = "premiumunlock";
    var updatedProducts = [];

    function updateProductInfo(id, owned) {

        updatedProducts = updatedProducts.filter(function (r) {
            return r.id != id;
        });

        updatedProducts.push({
            id: id,
            owned: owned
        });
    }

    function hasPurchased(id) {
        var product = getProduct(id);

        return product != null && product.owned;
    }

    function getProduct(id) {
        var products = updatedProducts.filter(function (r) {
            return r.id == id;
        });

        return products.length ? products[0] : null;
    }

    function isPurchaseAvailable(id) {

        return NativeIapManager.isStoreAvailable();
    }

    function beginPurchase(id) {
        return NativeIapManager.beginPurchase(id);
    }

    window.IapManager = {
        isPurchaseAvailable: isPurchaseAvailable,
        hasPurchased: hasPurchased,
        updateProduct: updateProductInfo,
        beginPurchase: beginPurchase
    };

    NativeIapManager.isPurchased(unlockId, "window.IapManager.updateProduct");

})();