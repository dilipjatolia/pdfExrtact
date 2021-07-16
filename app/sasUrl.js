var storage = require("@azure/storage-blob")
const accountname = "adobemacontract";
const key = "o4Um2r71hbS4INGAS2Uc/DBr5NpoE9iS1vkxJC78OfsfgmgImCjG9wYnzGxHo4V6xDwpUtN1noO3uOKFXOtJgA==";
const cerds = new storage.StorageSharedKeyCredential(accountname, key);
const client = blobServiceClient.getContainerClient(containerName);
export const allSasUrl = getAllSasUrl();

    function getAllSasUrl(blobArray) {
        let sasUrlArray = [];
        let sasUrl = "";
        blobArray.forEach(blobName => {
            
            const blobClient = client.getBlobClient(blobName);
            const blobSAS = storage.generateBlobSASQueryParameters({
                containerName,
                blobName,
                permissions: storage.BlobSASPermissions.parse("racwd"),
                startsOn: new Date(),
                expiresOn: new Date(new Date().valueOf() + 86400)
            },
                cerds
            ).toString();
            sasUrl = blobClient.url + "?" + blobSAS;
            sasUrlArray.push(sasUrl);
        });
        return sasUrlArray;
    }