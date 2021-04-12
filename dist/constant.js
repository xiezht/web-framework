"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_CONFIG = exports.STORENAME = exports.getAutoName = exports.CONTEXT = exports.HELP = void 0;
exports.HELP = [
    {
        header: 'Options',
        optionList: [
            {
                name: 'help',
                description: 'Use guide',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            {
                example: '$ s exec -- deploy',
            },
            {
                example: '$ s exec -- remove',
            },
            {
                example: '$ s exec -- metrics',
            },
            {
                example: '$ s exec -- logs',
            },
        ],
    },
];
exports.CONTEXT = 'WEB-FRAMEWORK';
exports.getAutoName = function (accountID, region, serviceName) {
    return "framework-" + accountID + "-" + region + "-" + serviceName;
};
exports.STORENAME = 'logstore';
exports.HTTP_CONFIG = "{\"authType\":\"anonymous\",\"methods\":[\"GET\",\"POST\",\"PUT\"]}";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxJQUFJLEdBQUc7SUFDbEI7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsV0FBVztnQkFDeEIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRTtZQUNQO2dCQUNFLE9BQU8sRUFBRSxvQkFBb0I7YUFDOUI7WUFDRDtnQkFDRSxPQUFPLEVBQUUsb0JBQW9CO2FBQzlCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLHFCQUFxQjthQUMvQjtZQUNEO2dCQUNFLE9BQU8sRUFBRSxrQkFBa0I7YUFDNUI7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsT0FBTyxHQUFHLGVBQWUsQ0FBQztBQUUxQixRQUFBLFdBQVcsR0FBRyxVQUFDLFNBQWlCLEVBQUUsTUFBYyxFQUFFLFdBQW1CO0lBQ2hGLE9BQUEsZUFBYSxTQUFTLFNBQUksTUFBTSxTQUFJLFdBQWE7QUFBakQsQ0FBaUQsQ0FBQztBQUV2QyxRQUFBLFNBQVMsR0FBRyxVQUFVLENBQUM7QUFFdkIsUUFBQSxXQUFXLEdBQUcscUVBQXFFLENBQUMifQ==