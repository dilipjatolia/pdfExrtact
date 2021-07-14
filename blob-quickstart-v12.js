const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');

async function main() {
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');
   
    // Retrieve the connection string for use with the application. The storage
    // connection string is stored in an environment variable on the machine
    // running the application called AZURE_STORAGE_CONNECTION_STRING. If the
    // environment variable is created after the application is launched in a
    // console or with Visual Studio, the shell or application needs to be closed
    // and reloaded to take the environment variable into account.
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

   
    const containerName = 'finalmtgocontracts';

    console.log('\ncontainer name...');
    console.log('\t', containerName);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    let blobarr =[];
    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
        blobarr.push(blob.name)
        // console.log(blobarr);
    }

    let blobName = blobarr[0];
    
    var storage = require("@azure/storage-blob")
    const accountname = "adobemacontract";
    const key = "o4Um2r71hbS4INGAS2Uc/DBr5NpoE9iS1vkxJC78OfsfgmgImCjG9wYnzGxHo4V6xDwpUtN1noO3uOKFXOtJgA==";
    const cerds = new storage.StorageSharedKeyCredential(accountname, key);
    const client = blobServiceClient.getContainerClient(containerName);
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
    const sasUrl = blobClient.url + "?" + blobSAS;
    console.log("Sas Url...")
    console.log(sasUrl);
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));