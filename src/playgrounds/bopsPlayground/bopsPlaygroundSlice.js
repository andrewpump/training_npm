import data from './sample.json';

export const getInsightFromSKU = async (payload) => {
    var item = data.find((item) => {
        return item.product_code === payload.sku;
    });

    const justification = 'The policy action is justified because ' + item.policy_detail + '.';

    return item ? justification : 'Item not found';
};

export const getInsightFromProductName = async (payload) => {
    var item = data.find((item) => {
        return item.product_code_description
            .toLowerCase()
            .includes(payload.product_name.toLowerCase());
    });

    const justification = 'The policy action is justified because ' + item.policy_detail + '.';

    return item ? justification : 'Item not found';
};
