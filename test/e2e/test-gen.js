var Generator,
    meta,
    gen,
    pretty,
    value;

Generator = require('mockdata-generator').Generator;

meta = {
    'name': 'Mockdata test set',
    'metadata': [
        // {
        //     'attributeName': 'creditCards',
        //     'dataType': 'Array',
        //     'metadata': [
        //         {
        //             'attributeName': 'ccNumber',
        //             'dataType': 'Pattern',
        //             'pattern': '####-####-####-####'
        //         },
        //         {
        //             'attributeName': 'cvv',
        //             'dataType': 'Pattern',
        //             'pattern': '###'
        //         },
        //         {
        //             'attributeName': 'expiration',
        //             'dataType': 'Date',
        //             'min': 30,
        //             'max': 1000
        //         },
        //         {
        //             'attributeName': 'limit',
        //             'dataType': 'OneOfList',
        //             'list': [500, 1000, 2000, 5000, 10000],
        //             'mode': 'shuffle'
        //         }
        //     ],
        //     'min': 2,
        //     'max': 5
        // },
        // {
        //     'attributeName': 'balance',
        //     'dataType': 'Currency',
        //     'min': 50,
        //     'max': 1000
        // },
        // {
        //     'attributeName': 'txDate',
        //     'dataType': 'Date',
        //     'min': 10,
        //     'max': 30
        // },
        // {
        //     'attributeName': 'id',
        //     'dataType': 'Guid',
        //     'prefix': 'test'
        // },
        // {
        //     'attributeName': 'branches',
        //     'dataType': 'Integer',
        //     'min': 10,
        //     'max': 30
        // },
        // {
        //     'attributeName': 'description',
        //     'dataType': 'Ipsum',
        //     'paragraphNum': 1,
        //     'wordMin': 10,
        //     'wordMax': 30
        // },
        // {
        //     'attributeName': 'accountOwner',
        //     'dataType': 'Name',
        //     'order': 'fl'
        // },
        // {
        //     'attributeName': 'beneficiaryContact',
        //     'dataType': 'Name',
        //     'order': 'lf'
        // },
        // {
        //     'attributeName': 'averageTxPerDay',
        //     'dataType': 'Number',
        //     'min': 5,
        //     'max': 20
        // },
        // {
        //     'attributeName': 'beneficiary',
        //     'dataType': 'OneOfList',
        //     'listName': 'ListBase.Beneficiaries',
        //     'mode': 'sequence',
        //     'index': 0
        // },
        // {
        //     'attributeName': 'clothesCategory',
        //     'dataType': 'OneOfList',
        //     'list': ['Accessories', 'Blouses', 'Cardigans', 'Dresses', 'Skirts'],
        //     'mode': 'shuffle'
        // },
        // {
        //     'attributeName': 'accountNumber',
        //     'dataType': 'Pattern',
        //     'pattern': '###-AA-###-aaa-####'
        // },
        // {
        //     'attributeName': 'accountName',
        //     'dataType': 'String',
        //     'min': 6,
        //     'max': 30
        // }
    ]
};

gen = new Generator(meta);
value = gen.getValue(1);
console.log(value);

let metaUser = {
    'name': 'test case',
    'metadata': [
        {
            'attributeName': 'name',
            'dataType': 'Name'
        },
        {
            'attributeName': 'ipsum',
            'dataType': 'Ipsum',
            'wordMax': 1
        }
    ]
};

genUserData = new Generator(metaUser);
const userData = genUserData.getValue(1);
console.log(userData);
