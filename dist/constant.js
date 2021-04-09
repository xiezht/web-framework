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
                desc: '使用: deploy',
                example: '$ s deploy',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxJQUFJLEdBQUc7SUFDbEI7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsV0FBVztnQkFDeEIsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRTtZQUNQO2dCQUNFLElBQUksRUFBRSxZQUFZO2dCQUNsQixPQUFPLEVBQUUsWUFBWTthQUN0QjtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxPQUFPLEdBQUcsZUFBZSxDQUFDO0FBRTFCLFFBQUEsV0FBVyxHQUFHLFVBQUMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsV0FBbUI7SUFDaEYsT0FBQSxlQUFhLFNBQVMsU0FBSSxNQUFNLFNBQUksV0FBYTtBQUFqRCxDQUFpRCxDQUFDO0FBRXZDLFFBQUEsU0FBUyxHQUFHLFVBQVUsQ0FBQztBQUV2QixRQUFBLFdBQVcsR0FBRyxxRUFBcUUsQ0FBQyJ9