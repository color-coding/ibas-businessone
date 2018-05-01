var businessone;
(function (businessone) {
    let bo;
    (function (bo) {
        class BORepositoryDataInteraction extends ibas.BORepositoryApplication {
            createConverter() {
                return new DataConverter;
            }
            fetchItems(fetcher) {
                super.fetch("Items", fetcher);
            }
            fetchBusinessPartners(fetcher) {
                super.fetch("BusinessPartners", fetcher);
            }
            fetchOrders(fetcher) {
                super.fetch("Orders", fetcher);
            }
            fetchPurchaseOrders(fetcher) {
                super.fetch("PurchaseOrders", fetcher);
            }
        }
        bo.BORepositoryDataInteraction = BORepositoryDataInteraction;
        class DataConverter extends ibas.DataConverter4j {
            parsing(data, sign) {
                if (data.type === "DataWrapping") {
                    return JSON.parse(data.Content);
                }
                else {
                    return super.parsing(data, sign);
                }
            }
            createConverter() {
                return null;
            }
        }
    })(bo = businessone.bo || (businessone.bo = {}));
})(businessone || (businessone = {}));
